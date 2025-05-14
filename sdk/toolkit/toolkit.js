"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolkit = void 0;
const ws_1 = __importDefault(require("ws"));
const json_bigint_1 = __importDefault(require("json-bigint"));
const events_1 = require("events");
const common_1 = require("../common");
const context_1 = require("./context");
const api_1 = require("./api");
const messages_1 = require("./messages");
class Toolkit extends events_1.EventEmitter {
    constructor({ apiKey, reconnectInterval = 5000 }) {
        super();
        this.apiKey = apiKey;
        this.reconnectInterval = reconnectInterval;
        this.ws = null;
        this.actionHandlers = {};
        this.wsEndpoint = common_1.BACKEND_WS_ENDPOINT;
        this.api = new api_1.ToolkitAPI({ apiKey });
        this.setWsEndpoint(common_1.BACKEND_WS_ENDPOINT);
    }
    /**
     * Set the WebSocket endpoint for the toolkit.
     *
     * @param endpoint - The WebSocket endpoint URL
     */
    setWsEndpoint(endpoint) {
        this.wsEndpoint = `${endpoint}?type=toolkit&api-key=${this.apiKey}`;
    }
    /**
     * Set the API endpoint for the toolkit.
     *
     * @param endpoint - The API endpoint URL
     */
    setApiEndpoint(endpoint) {
        this.api.setEndpoint(endpoint);
    }
    /**
     * Register an action handler.
     *
     * @param config - Configuration for the action.
     * @param handler - The handler function.
     */
    action(config, handler) {
        this.actionHandlers[config.action] = {
            func: handler,
            actionDescription: config.actionDescription || '',
            payloadDescription: config.payloadDescription || '',
            paymentDescription: config.paymentDescription || '',
        };
    }
    event(eventName, handler) {
        this.on(eventName, handler);
    }
    /**
     * Update the toolkit's name and/or description.
     *
     * @param info - An object containing optional name and/or description for the toolkit
     * @param info.name - Optional new name for the toolkit
     * @param info.description - Optional new description for the toolkit
     */
    updateToolkit(info) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.updateToolkit(info);
        });
    }
    handleAction(actionData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const actionName = actionData.action;
            const handler = this.actionHandlers[actionName];
            if (handler) {
                const ctx = new context_1.ActionContext(this, actionData.agentID, actionData.actionID, actionName);
                let payload = (_a = actionData.payload) !== null && _a !== void 0 ? _a : {};
                let payment = actionData.payment;
                if (typeof payload === 'string') {
                    try {
                        payload = JSON.parse(payload);
                    }
                    catch (e) {
                    }
                }
                try {
                    const result = yield handler.func(ctx, payload, payment);
                    if (!result) {
                        console.warn(`Action handler '${actionName}' returned None, sending empty result.`);
                        yield ctx.sendResult(ctx.result(null));
                    }
                    else {
                        yield ctx.sendResult(result);
                    }
                }
                catch (error) {
                    console.error(`Error handling action '${actionName}', please consider adding error handling and notify the caller:`, error);
                    yield ctx.sendResult(ctx.result({ error: "An unexpected error occurred, please report to the toolkit developer" }));
                }
            }
            else {
                console.warn(`No handler for action '${actionName}'`);
            }
        });
    }
    handleMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const msg = json_bigint_1.default.parse(message);
                if (msg.type === messages_1.ServerToToolkitMessageType.ACTION) {
                    yield this.handleAction(msg.data);
                }
            }
            catch (error) {
                console.warn('Failed to handle message:', error);
            }
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            while (true) {
                try {
                    this.ws = new ws_1.default(this.wsEndpoint);
                    this.ws.on('open', () => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b;
                        console.log('WebSocket connection established.');
                        const pingInterval = setInterval(() => {
                            var _a;
                            (_a = this.ws) === null || _a === void 0 ? void 0 : _a.ping();
                        }, 30000);
                        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.on('close', () => {
                            clearInterval(pingInterval);
                        });
                        const actionsData = {};
                        for (const [action, handler] of Object.entries(this.actionHandlers)) {
                            actionsData[action] = {
                                description: handler.actionDescription,
                                payload: handler.payloadDescription,
                                payment: handler.paymentDescription,
                            };
                        }
                        const setActionsMessage = {
                            type: messages_1.ToolkitToServerMessageType.REGISTER_ACTIONS,
                            data: { actions: actionsData },
                        };
                        yield ((_b = this.ws) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify(setActionsMessage)));
                        this.emit('ready');
                    }));
                    this.ws.on('ping', () => {
                        var _a;
                        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.pong();
                    });
                    this.ws.on('message', (data) => __awaiter(this, void 0, void 0, function* () {
                        yield this.handleMessage(data.toString());
                    }));
                    yield new Promise((resolve, reject) => {
                        var _a, _b;
                        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.on('close', resolve);
                        (_b = this.ws) === null || _b === void 0 ? void 0 : _b.on('error', reject);
                    });
                }
                catch (error) {
                    console.error('Error during WebSocket connection:', error);
                    (_a = this.ws) === null || _a === void 0 ? void 0 : _a.close();
                }
                finally {
                    console.info(`Reconnecting in ${this.reconnectInterval / 1000} seconds...`);
                    yield new Promise(resolve => setTimeout(resolve, this.reconnectInterval));
                }
            }
        });
    }
    /**
     * Start the toolkit client.
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
        });
    }
}
exports.Toolkit = Toolkit;

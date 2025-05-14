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
exports.ActionContext = exports.ActionResult = void 0;
const json_bigint_1 = __importDefault(require("json-bigint"));
const messages_1 = require("./messages");
class ActionResult {
    constructor(payload, payment = 0) {
        this.payload = payload;
        this.payment = payment;
    }
}
exports.ActionResult = ActionResult;
class ActionContext {
    constructor(toolkit, agentId, actionId, actionName) {
        this.toolkit = toolkit;
        this.agentId = agentId;
        this.actionId = actionId;
        this.actionName = actionName;
    }
    result(payload, payment = 0) {
        return new ActionResult(payload, payment);
    }
    sendResult(result) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const actionResultMessage = {
                type: messages_1.ToolkitToServerMessageType.ACTION_RESULT,
                data: {
                    action: this.actionName,
                    actionID: this.actionId,
                    agentID: this.agentId,
                    payload: result.payload,
                    payment: result.payment,
                },
            };
            yield ((_a = this.toolkit.ws) === null || _a === void 0 ? void 0 : _a.send(json_bigint_1.default.stringify(actionResultMessage)));
        });
    }
}
exports.ActionContext = ActionContext;

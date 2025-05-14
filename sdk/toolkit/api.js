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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionAPI = exports.ToolkitAPI = void 0;
const common_1 = require("../common");
class ToolkitAPI extends common_1.API {
    constructor(config) {
        if (!config.endpoint) {
            config.endpoint = common_1.FRONTEND_API_ENDPOINT;
        }
        super(config);
    }
    updateToolkit(info) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request('POST', '/toolkits/fields/', { json: info });
        });
    }
}
exports.ToolkitAPI = ToolkitAPI;
class TransactionAPI extends common_1.API {
    constructor(config) {
        if (!config.endpoint) {
            config.endpoint = common_1.TRANSACTION_API_ENDPOINT;
        }
        super(config);
    }
    createTransaction(type_1, ctx_1) {
        return __awaiter(this, arguments, void 0, function* (type, ctx, payload = {}) {
            const data = {
                agentId: ctx.agentId,
                actionId: ctx.actionId,
                actionName: ctx.actionName,
                type,
                payload,
            };
            return yield this.request('POST', `/tx/create`, { json: data });
        });
    }
}
exports.TransactionAPI = TransactionAPI;

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
exports.ToolsAPI = void 0;
const common_1 = require("../common");
class ToolsAPI extends common_1.API {
    constructor(config) {
        if (!config.endpoint) {
            config.endpoint = common_1.BACKEND_API_ENDPOINT;
        }
        super(config);
    }
    searchTools(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request('GET', '/actions/search', { params: args });
        });
    }
    callTool(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request('POST', '/actions/call', { json: args, timeout: 50000 });
        });
    }
}
exports.ToolsAPI = ToolsAPI;

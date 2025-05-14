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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
class API {
    constructor(config) {
        this.apiKey = config.apiKey || '';
        this.apiUri = config.endpoint || '';
    }
    setEndpoint(endpoint) {
        this.apiUri = endpoint;
    }
    request(method_1, path_1) {
        return __awaiter(this, arguments, void 0, function* (method, path, options = {}) {
            const { timeout = 10000, headers = {}, params, json } = options, rest = __rest(options, ["timeout", "headers", "params", "json"]);
            if (!headers['Authorization'] && this.apiKey) {
                headers['Authorization'] = this.apiKey;
            }
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            // Construct the URL with query parameters
            const url = new URL(`${this.apiUri}${path}`);
            if (params) {
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            }
            try {
                const response = yield fetch(url.toString(), Object.assign({ method, headers: Object.assign({ 'Content-Type': 'application/json' }, headers), body: json ? JSON.stringify(json) : undefined, signal: controller.signal }, rest));
                if (!response.ok) {
                    const errorBody = yield response.text();
                    throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
                }
                return yield response.json();
            }
            finally {
                clearTimeout(timeoutId);
            }
        });
    }
}
exports.API = API;
exports.default = API;

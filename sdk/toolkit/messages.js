"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolkitToServerMessageType = exports.ServerToToolkitMessageType = void 0;
var ServerToToolkitMessageType;
(function (ServerToToolkitMessageType) {
    ServerToToolkitMessageType["ACTION"] = "action";
    ServerToToolkitMessageType["TOOLKIT"] = "toolkit";
})(ServerToToolkitMessageType || (exports.ServerToToolkitMessageType = ServerToToolkitMessageType = {}));
var ToolkitToServerMessageType;
(function (ToolkitToServerMessageType) {
    ToolkitToServerMessageType["REGISTER_ACTIONS"] = "registerActions";
    ToolkitToServerMessageType["ACTION_RESULT"] = "actionResult";
})(ToolkitToServerMessageType || (exports.ToolkitToServerMessageType = ToolkitToServerMessageType = {}));

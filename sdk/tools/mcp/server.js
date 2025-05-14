#!/usr/bin/env node
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
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const tools_1 = require("../tools");
const ToolInputSchema = types_js_1.ToolSchema.shape.inputSchema;
const server = new index_js_1.Server({
    name: "unifai-tools",
    version: process.env.npm_package_version || "",
}, {
    capabilities: {
        tools: {},
    },
});
const tools = new tools_1.Tools({ apiKey: process.env.UNIFAI_AGENT_API_KEY || "" });
server.setRequestHandler(types_js_1.ListToolsRequestSchema, () => __awaiter(void 0, void 0, void 0, function* () {
    const tools = tools_1.functionList.map((fn) => ({
        name: fn.name,
        description: fn.description,
        inputSchema: fn.parameters,
    }));
    return { tools };
}));
server.setRequestHandler(types_js_1.CallToolRequestSchema, (request) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, arguments: args } = request.params;
    const result = yield tools.callTool(name, args);
    return {
        content: [{ type: "text", text: JSON.stringify(result) }],
    };
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = new stdio_js_1.StdioServerTransport();
        yield server.connect(transport);
        process.on("SIGINT", () => __awaiter(this, void 0, void 0, function* () {
            yield server.close();
            process.exit(0);
        }));
    });
}
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});

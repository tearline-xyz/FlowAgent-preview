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
exports.Tools = exports.functionList = void 0;
const p_limit_1 = __importDefault(require("p-limit"));
const api_1 = require("./api");
var FunctionName;
(function (FunctionName) {
    FunctionName["SEARCH_TOOLS"] = "search_services";
    FunctionName["CALL_TOOL"] = "invoke_service";
    FunctionName["GENERATE_FLOWCHART"] = "generate_flowchart";
    FunctionName["UPDATE_FLOWCHART_STATE"] = "update_flowchart_state";
    FunctionName["UPDATE_FLOWCHART"] = "update_flowchart";
})(FunctionName || (FunctionName = {}));
exports.functionList = [
    {
        name: FunctionName.SEARCH_TOOLS,
        description: `Search for tools. The tools cover a wide range of domains include data source, API, SDK, etc. Try searching whenever you need to use a tool. Returned actions should ONLY be used in ${FunctionName.CALL_TOOL}.`,
        parameters: {
            type: 'object',
            properties: {
                query: {
                    type: 'string',
                    description: 'The query to search for tools, you can describe what you want to do or what tools you want to use'
                },
                limit: {
                    type: 'number',
                    description: 'The maximum number of tools to return, must be between 1 and 100, default is 10, recommend at least 10'
                }
            },
            required: ['query'],
        },
    },
    {
        name: FunctionName.CALL_TOOL,
        description: `Call a tool returned by ${FunctionName.SEARCH_TOOLS}`,
        parameters: {
            type: 'object',
            properties: {
                action: {
                    type: 'string',
                    description: `The exact action you want to call in the ${FunctionName.SEARCH_TOOLS} result.`
                },
                payload: {
                    type: 'string',
                    description: `Action payload, based on the payload schema in the ${FunctionName.SEARCH_TOOLS} result. You can pass either the json object directly or json encoded string of the object.`,
                },
                payment: {
                    type: 'number',
                    description: 'Amount to authorize in USD. Positive number means you will be charged no more than this amount, negative number means you are requesting to get paid for at least this amount. Only include this field if the action you are calling includes payment information.',
                }
            },
            required: ['action', 'payload'],
        },
    },
    {
        name: FunctionName.GENERATE_FLOWCHART,
        description: `Generates a flowchart based on the provided Mermaid description.
    Before executing a complex task, this tool should be invoked to create a flowchart.
    The flowchart will describe the task steps and their relationships using Mermaid syntax.
    The 'start_state' should be the ID of the starting node, such as 'A'.`,
        parameters: {
            type: 'object',
            properties: {
                mermaid_description: {
                    type: 'string',
                    description: ` A Mermaid description of the task's flowchart.
    Example:
        graph TD
        A[Task 1] --> B[Task 2]
        B --> C{Task 3}
        C --> D[Finish]
        C --> E[Fail]`
                },
                start_state: {
                    type: 'string',
                    description: 'The ID of the starting node in the flowchart, such as \'A\'.'
                }
            },
            required: ['mermaid_description', 'start_state']
        }
    },
    {
        name: FunctionName.UPDATE_FLOWCHART_STATE,
        description: `Updates the flowchart state based on the completed state and the new state.
    This tool should be invoked after executing a task to update the flowchart.
    The 'completed_state' should be the ID of the completed node, such as 'A'.
    The 'new_state' should be the ID of the new node, such as 'B'.`,
        parameters: {
            type: 'object',
            properties: {
                completed_state: {
                    type: 'string',
                    description: `The ID of the completed node in the flowchart, such as 'A'.`
                },
                new_state: {
                    type: 'string',
                    description: `The ID of the new node in the flowchart, such as 'B'.`
                }
            },
            required: ['completed_state', 'new_state']
        }
    },
    {
        name: FunctionName.UPDATE_FLOWCHART,
        description: `Updates the existing flowchart with a new Mermaid description.
    This tool should be used when the flowchart needs to be modified during task execution.
    For example, adding new steps or changing the sequence of existing steps.`,
        parameters: {
            type: 'object',
            properties: {
                new_mermaid_description: {
                    type: 'string',
                    description: 'A new Mermaid description of the task\'s flowchart.'
                },
                start_state: {
                    type: 'string',
                    description: `The ID of the starting node in the flowchart, such as 'A'.`
                }
            },
            required: ['new_mermaid_description', 'start_state']
        }
    }
];
const toolList = exports.functionList.map(func => ({
    type: 'function',
    function: func
}));
class Tools {
    constructor({ apiKey }) {
        this.api = new api_1.ToolsAPI({ apiKey });
    }
    /**
     * Set the API endpoint for the tools.
     *
     * @param endpoint - The API endpoint URL
     */
    setApiEndpoint(endpoint) {
        this.api.setEndpoint(endpoint);
    }
    getTools() {
        return toolList;
    }
    callTool(name, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const toolName = typeof name === 'string' ? name : FunctionName[name];
            const params = typeof args === 'string' ? JSON.parse(args) : args;
            if (toolName === FunctionName.SEARCH_TOOLS) {
                return yield this.api.searchTools(params);
            }
            else if (toolName === FunctionName.CALL_TOOL) {
                return yield this.api.callTool(params);
            }
            else if (toolName === FunctionName.GENERATE_FLOWCHART) {
                return { 'flowchart': params.mermaid_description, 'start_state': params.start_state };
            }
            else if (toolName === FunctionName.UPDATE_FLOWCHART_STATE) {
                return { 'flowchart': params.completed_state, 'start_state': params.new_state };
            }
            else if (toolName === FunctionName.UPDATE_FLOWCHART) {
                return { 'flowchart': params.flowchart, 'start_state': params.start_state };
            }
            else {
                throw new Error(`Unknown tool name: ${toolName}`);
            }
        });
    }
    callTools() {
        return __awaiter(this, arguments, void 0, function* (toolCalls = null, concurrency = 1) {
            if (!toolCalls)
                return [];
            const limit = (0, p_limit_1.default)(concurrency);
            const tasks = toolCalls.map(toolCall => limit(() => __awaiter(this, void 0, void 0, function* () {
                let result;
                try {
                    result = yield this.callTool(toolCall.function.name, toolCall.function.arguments);
                    if (result === null)
                        return null;
                }
                catch (error) {
                    result = { error: error instanceof Error ? error.message : String(error) };
                }
                return {
                    role: 'tool',
                    tool_call_id: toolCall.id,
                    content: JSON.stringify(result),
                };
            })));
            const results = yield Promise.all(tasks);
            return results.filter((result) => result !== null);
        });
    }
}
exports.Tools = Tools;

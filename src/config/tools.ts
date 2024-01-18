// separate file, not in use
// to be updated in tandem with any functions created as defined in functions.ts

import { ChatCompletionTool } from "openai/resources";

export const tools: ChatCompletionTool[] = [
	{
		type: "function",
		function: {
			name: "getErrorInput",
			description:
				"Retrieve stack trace information to diagnose cause of program crashes",
			parameters: {},
		},
	},
];

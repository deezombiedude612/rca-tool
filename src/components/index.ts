import { ChatCompletionTool } from "openai/resources";
import { readCrashes } from "./functions";

// for calling API with user input
export const tools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "readCrashes",
      description:
        "Read stack traces to diagnose root cause of program crashes",
      parameters: {},
    },
  },
];

// ChatGPT arguments to call function
export const availableFunctions = {
  readCrashes: readCrashes,
};

// library functions
export { getReadLimit, getNewUserPrompt, saveSession } from "./lib";

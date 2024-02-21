import * as fs from "fs";
import { ChatCompletionTool } from "openai/resources";
import { getReadLimit } from "./lib";

export function readCrashes() {
  // const crashesDir = "../crashes";
  const crashesDir = "./crashes";
  let crashInputs = "";

  try {
    const readCountLimit = getReadLimit();

    const crashFiles = fs.readdirSync(crashesDir);
    // console.log(fs.readdirSync("../crashes"));

    crashFiles.slice(0, readCountLimit).forEach((crashFile) => {
      crashInputs += `\nStack trace ${crashFile}`;
      crashInputs += "\n```\n";
      crashInputs += fs.readFileSync(`${crashesDir}/${crashFile}`, "utf-8");
      crashInputs += "\n```\n";
    });
  } catch (err) {
    console.error(`Something went wrong in readCrashes():\n` + err);
  }

  return (
    "What is the root cause(s) of the software crash producing the following stack traces?\n" +
    crashInputs
  );
}

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

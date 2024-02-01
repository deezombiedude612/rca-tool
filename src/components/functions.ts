import * as fs from "fs";
import { ChatCompletionTool } from "openai/resources";

export function readCrashes() {
	// const CRASHES_DIR = "../crashes";
	const CRASHES_DIR = "./crashes";
	let crashInputs = "";

	try {
		const CRASH_FILES = fs.readdirSync(CRASHES_DIR);
		// console.log(fs.readdirSync("../crashes"));

		CRASH_FILES.forEach((crashFile) => {
			crashInputs += `\nCrash file: ${crashFile}`;
			crashInputs += "\n```\n";
			crashInputs += fs.readFileSync(`${CRASHES_DIR}/${crashFile}`, "utf-8");
			crashInputs += "\n```\n";
		});
	} catch (err) {
		console.error(`Something went wrong in readCrashes():\n` + err);
	}

	return crashInputs;
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

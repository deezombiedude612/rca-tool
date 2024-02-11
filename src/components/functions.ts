import * as fs from "fs";
import { ChatCompletionTool } from "openai/resources";
import readlineSync from "readline-sync";

export function readCrashes() {
	// ask for number of crash files to analyze
	let readCountLimit: number = 0;

	while (readCountLimit < 1) {
		try {
			readCountLimit = parseInt(
				readlineSync.question("Enter number of crash files to analyze >> "),
			);

			if (readCountLimit < 1) console.log("Invalid read limit, try again.");
		} catch (err) {
			console.log("Invalid read limit, try again.");
		}
	}

	// const CRASHES_DIR = "../crashes";
	const CRASHES_DIR = "./crashes";
	let crashInputs = "";

	try {
		const CRASH_FILES = fs.readdirSync(CRASHES_DIR);
		// console.log(fs.readdirSync("../crashes"));

		CRASH_FILES.slice(0, readCountLimit).forEach((crashFile) => {
			crashInputs += `\nStack trace ${crashFile}`;
			crashInputs += "\n```\n";
			crashInputs += fs.readFileSync(`${CRASHES_DIR}/${crashFile}`, "utf-8");
			crashInputs += "\n```\n";
		});
	} catch (err) {
		console.error(`Something went wrong in readCrashes():\n` + err);
	}

	return (
		"What is the main root cause of the software crash from the following stack traces?\n" +
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

import * as fs from "fs";

function readCrashes() {
	const CRASHES_DIR = "../crashes";
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
		console.error(err);
	}

	return crashInputs;
}

console.log(readCrashes());

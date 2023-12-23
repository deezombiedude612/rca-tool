import readlineSync from "readline-sync";

export function getErrorInput(): string | false {
	console.log("You'll be required to enter two pieces of information from the stack trace.");

	const errorDescription: string = readlineSync.question("Enter error description (e.g., heap overflow) > ");
	const lineZero: string = readlineSync.question("Enter the information included in line #0 > ");

	let confirmString: string = "";
	do {
		console.log(`Error description: ${errorDescription}\n`);
		console.log(`Line #0: ${lineZero}\n`);

		confirmString = readlineSync.question("Confirm? (Y/n) > ");
	} while (["y", "n"].includes(confirmString.toLowerCase().trim()));

	if (["n"].includes(confirmString.toLowerCase().trim())) return false;

	return `What is wrong with this error? \nError description: ${errorDescription}\n Line #0: ${lineZero}`;
}

export function getUserInput(): string | false {
	const userInput: string = readlineSync.question("> ");

	// Use "exit" or "quit" to exit the Chatbot interface - should modify to only take in keywords?
	if (["exit", "quit"].includes(userInput.toLowerCase().trim())) {
		console.log("Goodbye!\n");
		return false;
	}

	return userInput;
}

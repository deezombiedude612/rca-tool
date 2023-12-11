import readlineSync from "readline-sync";

export function getUserInput(): string | false {
	const userInput: string = readlineSync.question("> ");

	// Use "exit" or "quit" to exit the Chatbot interface - should modify to only take in keywords?
	if (["exit", "quit"].includes(userInput.toLowerCase().trim())) {
		console.log("Goodbye!\n");
		return false;
	}

	return userInput;
}

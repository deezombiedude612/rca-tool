import openai from "./config/open-ai";
import readlineSync from "readline-sync";
import ChatMessage from "./models/ChatMessage";

async function main() {
	console.log(`----- ROOT CAUSE ANALYSIS TOOL -----`);
	console.log(`Type in your query after ">" to begin.`);

	const chatHistory: ChatMessage[] = []; // Store conversation history

	while (true) {
		const userInput = readlineSync.question("> ");

		try {
			// Construct messages by iterating over history
			const messages: ChatMessage[] = chatHistory.map(({ role, content }) => ({ role, content }));

			// Add latest user input
			messages.push({ role: "user", content: userInput });

			// Call API with user input
			const res = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [{ role: "user", content: userInput }],
			});

			if (["exit", "quit"].includes(userInput.toLowerCase().trim())) {
				console.log("Goodbye!\n");
				return;
			}

			// Display response
			console.log(res.choices[0].message.content + "\n");

			// Update history with user input and assistant response
			chatHistory.push({ role: "user", content: userInput });
			chatHistory.push({ role: "assistant", content: res.choices[0].message.content! });
		} catch (err) {
			console.error(err);
		}
	}
}

main();

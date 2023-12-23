import openai from "./config/open-ai";
import ChatMessage from "./models/ChatMessage";
import { ChatCompletion } from "openai/resources";
import { getChatHistory, setChatHistory } from "./components/chat-history";
import { getUserInput } from "./components/user-input";

async function main() {
	console.log(`----- ROOT CAUSE ANALYSIS TOOL -----`);
	console.log(`Type in your query after ">" to begin.`);

	// contain chat history, including messages from current session
	const chatHistory: ChatMessage[] = getChatHistory();

	while (true) {
		const userInput: string | false = getUserInput();
		if (userInput === false) {
			// Save chat response to file
			setChatHistory(chatHistory);

			return;
		}

		try {
			// Construct messages by iterating over history
			const messages: ChatMessage[] = chatHistory.map(({ role, content }) => ({ role, content }));
			// messages.unshift({
			// 	role: "system",
			// 	content:
			// 		"You will be provided with stack trace information of software crashes, and your task is to explain what caused the crashes.",
			// });

			// Add latest user input
			messages.push({ role: "user", content: userInput });

			// Call API with user input
			const res: ChatCompletion = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: messages,
			});

			// Total number of possible responses
			console.log(`Number of responses: ${res.choices.length}\n`);

			// Display response
			console.log(res.choices[0].message.content + "\n");

			// Update history with user input and assistant response
			chatHistory.push({ role: "user", content: userInput });
			chatHistory.push({ role: "assistant", content: res.choices[0].message.content as string });

			// console.log(chatHistory);
		} catch (err) {
			console.error(err);
		}
	}
}

main();

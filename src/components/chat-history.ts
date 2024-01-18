import * as fs from "fs";
import { ChatCompletionMessageParam } from "openai/resources";

const CHAT_HISTORY_FILE = "chat-history.json";

// retrieve chat history from JSON file
export function getChatHistory(): ChatCompletionMessageParam[] {
	// return chat history as ChatCompletionMessageParam[]
	try {
		const data = require("../../" + CHAT_HISTORY_FILE); // going out from JS files in dist/, why do I need to cater for this?

		return data;
	} catch (err) {
		console.log(
			"Unable to load chat history, you might want to back up the chat history like.. NOW!"
		);
		return [];
	}
}

// Store conversation history after session
export function setChatHistory(
	chatHistory: ChatCompletionMessageParam[]
): void {
	console.log("Saving chat history..\n");

	try {
		fs.writeFileSync(CHAT_HISTORY_FILE, JSON.stringify(chatHistory), {
			flag: "w+",
		});

		// fs.writeFileSync(CHAT_HISTORY_FILE, "[", { flag: "w+" });
		// chatHistory.forEach((chatEntry, index) => {
		// 	fs.appendFileSync(CHAT_HISTORY_FILE, "{", { flag: "a+" });
		// 	fs.appendFileSync(CHAT_HISTORY_FILE, `"role": "${chatEntry.role}",`);
		// 	fs.appendFileSync(CHAT_HISTORY_FILE, `"content": "${chatEntry.content}"`);
		// 	fs.appendFileSync(CHAT_HISTORY_FILE, "}");
		// 	index < chatHistory.length - 1 && fs.appendFileSync(CHAT_HISTORY_FILE, ",");
		// });
		// fs.appendFileSync(CHAT_HISTORY_FILE, "]");
	} catch (err) {
		console.log("Unable to save chat history: " + err);
	}
}

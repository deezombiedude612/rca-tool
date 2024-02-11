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
			"Unable to load chat history, you might want to back up the chat history like.. NOW!",
		);
		return [];
	}
}

// Store conversation history after session
export function setChatHistory(
	chatHistory: ChatCompletionMessageParam[],
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

// Construct `messages` list by iterating over history
// NOTE: `messages` contains chat history including prompts in current session
export function setMessages(
	chatHistory: ChatCompletionMessageParam[],
): ChatCompletionMessageParam[] {
	const messages: ChatCompletionMessageParam[] = [];
	chatHistory.forEach((chatObj) => {
		if (chatObj.role === "function") {
			messages.push({
				role: chatObj.role,
				content: chatObj.content || "",
				name: chatObj.name,
			});
		} else if (chatObj.role === "tool") {
			messages.push({
				role: chatObj.role,
				content: chatObj.content || "",
				tool_call_id: chatObj.tool_call_id,
			});
		} else if (chatObj.role === "assistant") {
			if (typeof chatObj.name === undefined) {
				messages.push({
					role: chatObj.role,
					content: chatObj.content,
				});
			} else {
				messages.push({
					role: chatObj.role,
					content: chatObj.content,
					name: chatObj.name,
				});
			}
		} else if (chatObj.role === "user") {
			if (typeof chatObj.name === undefined) {
				messages.push({
					role: chatObj.role,
					content: chatObj.content,
				});
			} else {
				messages.push({
					role: chatObj.role,
					content: chatObj.content,
					name: chatObj.name,
				});
			}
		} else if (chatObj.role === "system") {
			if (typeof chatObj.name === undefined) {
				messages.push({
					role: chatObj.role,
					content: chatObj.content,
				});
			} else {
				messages.push({
					role: chatObj.role,
					content: chatObj.content,
					name: chatObj.name,
				});
			}
		}

		/** Doesn't seem to work for some reason..
				// else if (["system", "user", "assistant"].includes(chatObj.role)) {
				// 	// somehow this logic doesn't seem to work
				// 	const anObject:
				// 		| ChatCompletionSystemMessageParam
				// 		| ChatCompletionUserMessageParam
				// 		| ChatCompletionAssistantMessageParam = {
				// 		role: chatObj.role,	// ambiguity in here
				// 		content: chatObj.content,
				// 	};
				// 	if (typeof chatObj.name !== undefined) {
				// 		anObject.name = chatObj.name;
				// 	}
				// 	messages.push(anObject);
				// }
				 */
	});
	// const messages: ChatCompletionMessageParam[] = chatHistory.map(({ role, content }) => ({
	// 	role,
	// 	content,
	// }));

	return messages;
}

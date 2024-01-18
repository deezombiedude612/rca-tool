import openai from "./config/open-ai";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources";
import { getChatHistory, setChatHistory } from "./components/chat-history";
import { getErrorInput, getUserInput, tools } from "./components/functions";

async function main() {
	console.log(`----- ROOT CAUSE ANALYSIS TOOL -----`);
	console.log(`Type in your query after ">" to begin.`);

	// contain chat history, including messages from current session
	const chatHistory: ChatCompletionMessageParam[] = getChatHistory();

	// add system directive
	chatHistory.unshift({
		role: "system",
		content:
			"You will be provided with stack trace information of software crashes, and your task is to explain what caused the crashes.",
	});

	while (true) {
		const userInput: string | false = getUserInput();

		// userInput becomes false if "quit" or "exit" is entered to exit the program
		if (userInput === false) {
			chatHistory.shift(); // remove system directive

			// Save chat response to file
			setChatHistory(chatHistory);

			return;
		}

		try {
			// Construct messages by iterating over history
			const messages: ChatCompletionMessageParam[] = [];
			chatHistory.forEach((chatObj: ChatCompletionMessageParam) => {
				if (chatObj.role === "function") {
					messages.push({
						role: chatObj.role,
						content: chatObj.content,
						name: chatObj.name,
					});
				} else if (chatObj.role === "tool") {
					messages.push({
						role: chatObj.role,
						content: chatObj.content,
						tool_call_id: chatObj.tool_call_id,
					});
				}
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
				else if (chatObj.role === "system") {
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
				}
			});
			// const messages: ChatCompletionMessageParam[] = chatHistory.map(({ role, content }) => ({
			// 	role,
			// 	content,
			// }));

			// Add latest user input
			messages.push({ role: "user", content: userInput });

			// Call API with user input
			const res: ChatCompletion = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: messages,
				tools: tools,
				tool_choice: "auto",
			});

			// Prints out total number of possible responses
			// console.log(`Number of responses: ${res.choices.length}\n`);

			// Check if function is called
			// TEST CASE #1: "Invoke the getErrorInput function."
			// TEST CASE #2: "I'd like to figure out what caused my software to crash."
			if (res.choices[0].message.tool_calls) {
				// ChatGPT arguments to call function
				const availableFunctions = {
					getErrorInput: getErrorInput,
				};

				messages.push(res.choices[0].message); // extend conversation with assistant's reply
				const toolCall = res.choices[0].message.tool_calls[0];
				const functionName = toolCall.function.name;
				const functionToCall =
					availableFunctions[functionName as keyof typeof availableFunctions];
				const functionArgs = JSON.parse(toolCall.function.arguments);
				let functionResponse = "";

				if (functionName === "getErrorInput") {
					functionResponse = functionToCall();
				}

				messages.push({
					tool_call_id: toolCall.id,
					role: "tool",
					content: functionResponse,
				});
			}

			// Display response
			console.log(res.choices[0].message.content + "\n");

			// Update history with user input and assistant response
			chatHistory.push({ role: "user", content: userInput });
			chatHistory.push({
				role: "assistant",
				content: res.choices[0].message.content as string,
			});

			// console.log(chatHistory);
		} catch (err) {
			console.error(err);
		}
	}
}

main();

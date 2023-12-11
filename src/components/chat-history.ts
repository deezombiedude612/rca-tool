import ChatMessage from "../models/ChatMessage";

// retrieve chat history from JSON file
export function getChatHistory(): ChatMessage[] {
	// open file (if doesn't exist, create file and return [])

	// read from JSON

	// close file

	// return chat history as ChatMessage[]
	return [];
}

// Store conversation history after session
export function setChatHistory(chatHistory: ChatMessage[]): void {
	// open file
	// write to JSON
	// close file
}

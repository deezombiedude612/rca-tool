export default interface ChatMessage {
	// role: string;
	role: "user" | "system" | "assistant";
	content: string;
}

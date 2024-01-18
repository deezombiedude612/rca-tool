// not in use

import { ChatCompletionRole } from "openai/resources";

export default interface ChatMessage {
	// role: string;
	// role: "user" | "system" | "assistant";
	role: ChatCompletionRole;
	content: string;
}

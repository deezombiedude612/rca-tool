import { config } from "dotenv";
import { OpenAI } from "openai";

config();

const openai = new OpenAI({
	apiKey: process.env.API_KEY,
});

export default openai;

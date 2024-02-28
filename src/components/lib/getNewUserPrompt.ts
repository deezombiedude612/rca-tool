import { question } from "readline-sync";

export default async function getNewUserPrompt() {
  let userPrompt = "";

  do {
    console.log(
      "\nEnter 'exit' or 'quit' to exit the chatbot, or 'readCrashes' to reanalyze the crash's stack trace files again.",
    );
    userPrompt = question("Enter next prompt >> ").trim();
  } while (userPrompt === "");

  return userPrompt;
}

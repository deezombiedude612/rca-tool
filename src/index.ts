import { ChatCompletionMessageParam } from "openai/resources";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { availableFunctions, tools } from "./components/functions";
import { getNewUserPrompt, saveSession } from "./components/lib";
import openai from "./config/open-ai";

async function main() {
  const gptModel: ChatCompletionCreateParamsBase["model"] = "gpt-4";
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "Perform function requests for the user.",
      // content:
      // 	"You will be provided fuzzing results for a software crash, determine the root cause of the software crash using the readCrashes function.",
    },
  ];

  let userPrompt = "readCrashes"; // initialize user prompt to call readCrashes() on launch

  // enter quit to exit
  while (!["quit", "exit"].includes(userPrompt.toLowerCase())) {
    messages.push({
      role: "user",
      content: userPrompt,
    });

    // Step 1: Call ChatGPT with function name
    const chat = await openai.chat.completions.create({
      model: gptModel,
      messages: messages,
      tools: tools,
      tool_choice: "auto",
    });

    // Step 2: Check if ChatGPT wants to use a function
    if (chat.choices[0].message.tool_calls) {
      // Step 3: Use ChatGPT arguments to call function (refer to `availableFunctions` in `functions.ts)`
      messages.push(chat.choices[0].message); // extend conversation with assistant's reply
      const toolCall = chat.choices[0].message.tool_calls[0];
      const functionName = toolCall.function.name;
      const functionToCall =
        availableFunctions[functionName as keyof typeof availableFunctions];
      // const functionArgs = JSON.parse(toolCall.function.arguments);

      let functionResponse = "";
      if (functionName === "readCrashes") functionResponse = functionToCall();

      messages.push({
        tool_call_id: toolCall.id,
        role: "tool",
        content: functionResponse as string,
      });
    }

    // Step 4: Call ChatGPT again with function response (second response)
    let res = await openai.chat.completions.create({
      model: gptModel,
      messages: messages,
    });

    console.log("\nCHATBOT'S RESPONSE");
    console.log("--------------------");

    // console.log(res.choices);
    res.choices.length < 2 && console.log(res.choices[0].message.content);
    if (res.choices.length === 2) {
      console.log("There are more than one responses:");
      res.choices.forEach((resObject, index) => {
        console.log(`\nResponse ${index}:`);
        console.log(resObject.message.content);

        messages.push(resObject.message);
      });
    }
    console.log("--------------------");

    userPrompt = await getNewUserPrompt();
  }

  saveSession(messages);
}

main().catch((err) => console.log(err));

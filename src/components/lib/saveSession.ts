import { ChatCompletionMessageParam } from "openai/resources";
import * as fs from "fs";

export default function saveSession(messages: ChatCompletionMessageParam[]) {
  const currentDate = new Date();
  const sessionFileName =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() < 9 ? "0" : "") +
    (currentDate.getMonth() + 1) +
    "-" +
    (currentDate.getDate() < 10 ? "0" : "") +
    currentDate.getDate() +
    " " +
    (currentDate.getHours() < 10 ? "0" : "") +
    currentDate.getHours() +
    ":" +
    (currentDate.getMinutes() < 10 ? "0" : "") +
    currentDate.getMinutes() +
    ":" +
    (currentDate.getSeconds() < 10 ? "0" : "") +
    currentDate.getSeconds() +
    ".json";

  try {
    const sessionsFolderPath = "sessions/";
    !fs.existsSync(sessionsFolderPath) && fs.mkdirSync(sessionsFolderPath);

    fs.writeFileSync(
      sessionsFolderPath + sessionFileName,
      JSON.stringify(messages),
      { flag: "w+" },
    );
    console.log(`Saved session as ${sessionFileName}.`);
  } catch (err) {
    console.log("Unable to save session: " + err);
  }
}

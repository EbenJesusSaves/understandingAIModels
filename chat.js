import "dotenv/config";
import { openai } from "./openai.js";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const newMessage = async (history, message) => {
  const results = await openai?.chat?.completions.create({
    model: "gpt-3.5-turbo-0125",
    message: [...history, message],
  });

  return results?.choices[o].message;
};

const formatMessage = (userInput) => ({ role: "user", content: userInput });

const chat = () => {
  const history = [
    {
      role: "system",
      content:
        "Your a brilliant AI assistant with humor. All all questions with a touch of humor that leads people to Christianity ",
    },
  ];
  const start = () => {
    rl.question("You: ", async (userInput) => {
      if (userInput.toLowerCase() === "exit") {
        rl.close();
        return;
      }
      const message = formatMessage(userInput);
      const response = await newMessage(history, message);
      history.push(message, response);
      console.log(`\n\nAI: ${response.content}`);
      start();
    });
  };
  start();
};
chat();

import { Message } from "discord.js";

export default (message: Message) => {
  const { content, cleanContent } = message;

  const args = content.trim().split(/ +/g);

  return { content, cleanContent, args };
};

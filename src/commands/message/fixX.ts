import { Message, TextChannel } from "discord.js";
import { MessageCommand } from "../../structures";
import { MessageCommandDef } from "../../types";

const xRegex = /(https:\/\/)x(.com\/.+?\/status\/\d+)([^\s]*)/g;

const action = async (message: Message) => {
  if (!message.channel.isTextBased()) return;

  const fixed = message.cleanContent.replace(xRegex, "$1fixupx$2");

  await message.delete();
  (message.channel as TextChannel).send(
    `Sent by ***${message.author.username}***:\n${fixed}`
  );
};

export const commandProps: MessageCommandDef = {
  enabled: true,
  name: "X link fixer",
  description: "Fixes sent X links",
  triggers: [(message) => xRegex.test(message.content)],
  action,
};

export default async () => {
  return new MessageCommand(commandProps);
};

import { Message, TextChannel } from "discord.js";
import { MessageCommand } from "../../structures";
import { MessageCommandDef } from "../../types";

const tiktokRegex = /(https:\/\/www.tikt)o(k.com\/@[\w\d]+\/video\/\d+)/g;

const action = async (message: Message) => {
  if (!message.channel.isTextBased()) return;

  const fixed = message.cleanContent.replace(tiktokRegex, "$1x$2");

  await message.delete();
  (message.channel as TextChannel).send(
    `Sent by ***${message.author.username}***:\n${fixed}`
  );
};

export const commandProps: MessageCommandDef = {
  enabled: true,
  name: "Tiktok link fixer",
  description: "Fixes sent Tiktok links",
  triggers: [(message) => tiktokRegex.test(message.content)],
  action,
};

export default async () => {
  return new MessageCommand(commandProps);
};

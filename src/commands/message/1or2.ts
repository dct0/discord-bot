import { Message, TextChannel } from "discord.js";
import { MessageCommand } from "../../structures";
import { MessageCommandDef } from "../../types";

const action = async (message: Message) => {
  if (!message.channel.isTextBased()) return;

  const rng = Math.random();
  await (message.channel as TextChannel).send(Math.ceil(rng * 2).toString());
};

export const commandProps: MessageCommandDef = {
  enabled: true,
  name: "1 or 2",
  description: "Picks 1 or 2",
  triggers: [(message) => message.content.includes("1 or 2")],
  action,
};

export default async () => {
  return new MessageCommand(commandProps);
};

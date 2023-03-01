import { Message, TextChannel } from "discord.js";
import { MessageCommand } from "../../structures";
import { MessageCommandDef } from "../../types";

const twitterRegex = /(https:\/\/twitt)e(r.com\/.+?\/status\/\d+)([^\s]*)/g;

const action = async (message: Message) => {
  if (!message.channel.isTextBased()) return;

  // const links = message.content.match(twitterRegex);
  // if (!links) return;

  // const fixedLinks = links.map((link) => link.replace(twitterRegex, "$1p$2"));

  // await message.suppressEmbeds(true);
  // await (message.channel as TextChannel).send(fixedLinks?.join("\n"));
  const fixed = message.cleanContent.replace(twitterRegex, "$1p$2");

  await message.delete();
  (message.channel as TextChannel).send(
    `Sent by ***${message.author.username}***:\n${fixed}`
  );

  // // TODO add reactions to undo the fix?
  // console.log(
  //   `Fixed ${links.length} Twitter links in ${message.channel.id} (${message.guild?.name})`
  // );
};

export const commandProps: MessageCommandDef = {
  enabled: true,
  name: "Twitter link fixer",
  description: "Fixes sent Twitter links",
  triggers: [(message) => twitterRegex.test(message.content)],
  action,
};

export default async () => {
  return new MessageCommand(commandProps);
};

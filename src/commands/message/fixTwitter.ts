import { Message, TextChannel } from "discord.js";
import { twitterRegex } from "../../helpers/twitter";
import { MessageCommand } from "../../structures";
import { MessageCommandDef } from "../../types";

const action = async (message: Message) => {
  if (!message.channel.isTextBased()) return;

  // const links = message.content.match(twitterRegex);
  // if (!links) return;

  // const fixedLinks = links.map((link) => link.replace(twitterRegex, "$1p$2"));

  // await message.suppressEmbeds(true);
  // await (message.channel as TextChannel).send(fixedLinks?.join("\n"));
  (message.channel as TextChannel).send(
    message.cleanContent.replace(twitterRegex, "$1p$2")
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

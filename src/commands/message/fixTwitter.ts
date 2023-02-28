import { Message, TextChannel } from "discord.js";
import { twitterRegex } from "../../helpers/twitter";
import { MessageCommand } from "../../structures";
import { MessageCommandDef } from "../../types";

const action = async (message: Message) => {
  if (!message.channel.isTextBased()) return;
  else if (!twitterRegex.test(message.content)) {
    // console.log("No Twitter links found in message");
    return;
  }

  const links = message.content.match(twitterRegex);
  if (!links) return;

  const fixedLinks = links.map((link) => link.replace(twitterRegex, "$1p$2"));

  try {
    await message.suppressEmbeds(true);
    await (message.channel as TextChannel).send(fixedLinks?.join("\n"));
  } catch (error) {
    console.error(error);
  }

  // TODO add reactions to undo the fix?
  console.log(
    `Fixed ${links.length} Twitter links in ${message.channel.id} (${message.guild?.name})`
  );
};

export const commandProps: MessageCommandDef = {
  enabled: true,
  name: "Twitter link fixer",
  description: "Fixes sent Twitter links",
  triggers: [() => true],
  action,
};

export default async () => {
  return new MessageCommand(commandProps);
};

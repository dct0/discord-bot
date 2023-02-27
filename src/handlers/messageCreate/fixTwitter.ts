import {
  ChannelType,
  Message,
  TextBasedChannel,
  TextChannel,
} from "discord.js";
import { twitterRegex } from "../../helpers/twitter";

export default async (message: Message) => {
  if (!message.channel.isTextBased()) return;
  else if (!twitterRegex.test(message.content)) {
    // console.log("No Twitter links found in message");
    return;
  }

  const links = message.content.match(twitterRegex);
  if (!links) return;

  const fixedLinks = links.map((link) => link.replace(twitterRegex, "$1p$2"));

  await message.suppressEmbeds(true);
  await (message.channel as TextChannel).send(fixedLinks?.join("\n"));

  // add reactions to undo the fix
  console.log(
    `Fixed ${links.length} Twitter links in ${message.channel.id} (${message.guild?.name})`
  );
};

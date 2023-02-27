import { Message, TextChannel } from "discord.js";
import { twitterRegex } from "../../helpers/twitter";

export default async (message: Message) => {
  if (!message.channel.isTextBased()) return;
  else if (!twitterRegex.test(message.content)) return;

  await message.removeAttachments();

  const links = message.content.match(twitterRegex);
  if (!links) return;

  const fixedLinks = links.map((link) => link.replace(twitterRegex, "$1p$2"));

  (message.channel as TextChannel).send(fixedLinks?.join("\n"));
};

import { Message, TextChannel } from "discord.js";
import { MessageCommand } from "../../structures";
import { MessageCommandDef } from "../../types";

const chance = 10;
const goatVideos = [
  "https://media.discordapp.net/attachments/694193310117396480/1045356356640718899/cracked.gif",
  "https://media.discordapp.net/attachments/694193310117396480/1076871850145091614/ezgif.com-gif-maker_5.gif",
];

const action = async (message: Message) => {
  if (!message.channel.isTextBased()) return;

  const rng = Math.random();
  if (Math.floor(rng * chance) === 0) {
    const goatVideo = goatVideos[Math.floor(rng * goatVideos.length)];
    await (message.channel as TextChannel).send(goatVideo);
  }
};

export const commandProps: MessageCommandDef = {
  enabled: true,
  name: "1/10 Goat Command",
  description: "Sends a goat video 1/10 of the time if goat is said",
  triggers: [(message) => message.content.includes("goat")],
  action,
};

export default async () => {
  return new MessageCommand(commandProps);
};

import { Client, Events, Message } from "discord.js";
import fixTwitter from "../handlers/messageCreate/fixTwitter";

export default (client: Client): void => {
  client.on(Events.MessageCreate, (message: Message) => {
    if (message.author.bot) return;

    fixTwitter(message);
  });
};

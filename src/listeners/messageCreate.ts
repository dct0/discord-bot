import { Events, Message } from "discord.js";
import { handleMessageCreate } from "../handlers";
import { Client } from "../structures";

export default (client: Client): void => {
  client.on(Events.MessageCreate, (message: Message) => {
    if (message.author.bot) return;

    handleMessageCreate(client, message);
  });
};

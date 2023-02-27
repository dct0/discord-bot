import { Client, Events } from "discord.js";

export default (client: Client): void => {
  client.on(Events.Invalidated, () => {
    console.log("Client invalidated");
    process.exit(0);
  });
};

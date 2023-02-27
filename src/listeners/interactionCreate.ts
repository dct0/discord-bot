import { BaseInteraction, Events } from "discord.js";
import { Client } from "../structures";
import { handleSlashCommand } from "../handlers/interactionCreate";

export default (client: Client): void => {
  client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.isCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

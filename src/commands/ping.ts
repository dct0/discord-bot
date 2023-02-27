import { BaseInteraction } from "discord.js";

export default async (interaction: BaseInteraction) => {
  if (!interaction.isChatInputCommand()) return;
  await interaction.reply("Pong!");
};

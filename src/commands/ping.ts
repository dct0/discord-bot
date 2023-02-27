import { BaseInteraction } from "discord.js";
import { Command } from "../structures";

export const action = async (interaction: BaseInteraction) => {
  if (!interaction.isChatInputCommand()) return;
  await interaction.reply("Pong!");
};

export const commandProps = {
  enabled: true,
  name: "ping",
  description: "Ping!",
  aliases: [],
  usage: "/ping",
  action,
};

export default async () => {
  return new Command(commandProps);
};

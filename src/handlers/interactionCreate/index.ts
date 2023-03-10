import { CommandInteraction } from "discord.js";
import { Client } from "../../structures";

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const command = client.commands.slash.get(interaction.commandName);

  if (!command) {
    return console.error(`Command ${interaction.commandName} not found`);
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
};

export { handleSlashCommand };

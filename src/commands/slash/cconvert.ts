import currency from "currency.js";
import { ApplicationCommandOptionType, BaseInteraction } from "discord.js";
import { SlashCommand } from "../../structures";
import { SlashCommandDef } from "../../types";
import { fx } from "../../helpers";

const action = async (interaction: BaseInteraction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    const from = interaction.options.get("from", true)?.value;
    const to = interaction.options.get("to", true)?.value;
    const amount = currency(
      interaction.options.get("amount", true)?.value as any
    ) as unknown as string;

    const converted = fx.convert(amount, { from, to }).convert().toFixed(2);

    await interaction.reply(`${amount} ${from} is ${converted} ${to}`);
  } catch (error) {
    console.error(error);
    await interaction.reply("There was an error with ur input lol");
  }
};

export const commandProps: SlashCommandDef = {
  enabled: true,
  name: "cconvert",
  description: "Converts currencies",
  aliases: [],
  usage: "/cconvert <amount> <from> <to>",
  options: {
    strings: [
      {
        type: ApplicationCommandOptionType.String,
        name: "from",
        description: "The currency to convert from",
        required: true,
      },
      {
        type: ApplicationCommandOptionType.String,
        name: "to",
        description: "The currency to convert to",
        required: true,
      },
    ],
    numbers: [
      {
        type: ApplicationCommandOptionType.Number,
        name: "amount",
        description: "The amount to convert",
        required: true,
      },
    ],
  },
  action,
};

export default () => {
  return new SlashCommand(commandProps);
};

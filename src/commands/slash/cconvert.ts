import {
  ApplicationCommandOptionType,
  BaseInteraction,
  Collection,
} from "discord.js";
import { SlashCommand } from "../../structures";
import { SlashCommandDef } from "../../types";
const CC = require("currency-converter-lt");

const action = async (interaction: BaseInteraction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    const from = interaction.options
      .get("from", true)
      .value?.toString()
      .toUpperCase();
    const to = interaction.options
      .get("to", true)
      .value?.toString()
      .toUpperCase();
    const amount = interaction.options.get("amount", true).value;

    if (!from || !to || !amount) return;

    const cc = new CC({ from, to, amount });

    const converted = await cc.convert();

    await interaction.reply(
      `${amount} ${from} is ${converted.toFixed(2)} ${to}`
    );
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
  optionsOrder: ["amount", "from", "to"],
  options: {
    strings: new Collection([
      [
        "from",
        {
          type: ApplicationCommandOptionType.String,
          description: "The currency to convert from",
          required: true,
        },
      ],
      [
        "to",
        {
          type: ApplicationCommandOptionType.String,
          description: "The currency to convert to",
          required: true,
        },
      ],
    ]),
    numbers: new Collection([
      [
        "amount",
        {
          type: ApplicationCommandOptionType.Number,
          name: "amount",
          description: "The amount to convert",
          required: true,
        },
      ],
    ]),
  },
  action,
};

export default () => {
  return new SlashCommand(commandProps);
};

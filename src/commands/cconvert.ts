import currency from "currency.js";
import { Interaction } from "discord.js";
import { fx } from "../helpers";

export default async (interaction: Interaction) => {
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

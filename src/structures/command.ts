import { BaseInteraction, SlashCommandBuilder } from "discord.js";
import { CommandDef } from "../types";

export class Command implements CommandDef {
  enabled: boolean;
  name: string;
  description: string;
  aliases: string[];
  usage: string;
  action: (action: BaseInteraction) => Promise<void>;

  private builder: SlashCommandBuilder;

  constructor({
    enabled,
    name,
    description,
    aliases,
    usage,
    options,
    action,
  }: CommandDef) {
    this.enabled = enabled;
    this.name = name;
    this.description = description;
    this.aliases = aliases;
    this.usage = usage;

    this.action = action;

    this.builder = new SlashCommandBuilder();
    this.builder.setName(name).setDescription(description);

    if (options) {
      for (const option of options) {
        this.builder;
      }
    }
  }

  async execute(action: BaseInteraction) {
    if (!this.enabled) throw new Error("This command is disabled");

    await this.action(action);
  }

  set setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  getBuilder({
    as: format = "builder",
  }: {
    as?: "builder" | "json";
  } = {}) {
    if (format === "json") return this.builder.toJSON();
    return this.builder;
  }
}

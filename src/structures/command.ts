import {
  BaseInteraction,
  SlashCommandAttachmentOption,
  SlashCommandBooleanOption,
  SlashCommandBuilder,
  SlashCommandChannelOption,
  SlashCommandIntegerOption,
  SlashCommandMentionableOption,
  SlashCommandNumberOption,
  SlashCommandRoleOption,
  SlashCommandStringOption,
} from "discord.js";
import { CommandDef, CommandOptionsKeys, CommandOptionsValues } from "../types";

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
      for (const [_key, _value] of Object.entries(options)) {
        const key = _key as CommandOptionsKeys;
        const value = _value as CommandOptionsValues;
        if (!value) continue;

        for (const option of value) {
          switch (key) {
            case "attachments":
              const attachmentOption = new SlashCommandAttachmentOption()
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required);
              this.builder.addAttachmentOption(attachmentOption);
            // and the rest to come...
            case "booleans":
              const booleanOption = new SlashCommandBooleanOption()
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required);
              this.builder.addBooleanOption(booleanOption);
            case "channels":
              const channelOption = new SlashCommandChannelOption()
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required);
              this.builder.addChannelOption(channelOption);
              break;
            case "integers":
              const integerOption = new SlashCommandIntegerOption()
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required);
              this.builder.addIntegerOption(integerOption);
              break;
            case "mentionables":
              const mentionableOption = new SlashCommandMentionableOption()
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required);
              this.builder.addMentionableOption(mentionableOption);
              break;
            case "numbers":
              const numberOption = new SlashCommandNumberOption()
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required);
              this.builder.addNumberOption(numberOption);
              break;
            case "roles":
              const roleOption = new SlashCommandRoleOption()
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required);
              this.builder.addRoleOption(roleOption);
              break;
            case "strings":
              const stringOption = new SlashCommandStringOption()
                .setName(option.name)
                .setDescription(option.description)
                .setRequired(option.required);
              this.builder.addStringOption(stringOption);
              break;
          }
        }
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

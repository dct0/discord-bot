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
import { BaseCommand } from ".";
import {
  SlashCommandDef,
  SlashCommandOptionsKeys,
  SlashCommandOptionsValues,
} from "../types";

export class SlashCommand
  extends BaseCommand<BaseInteraction>
  implements SlashCommandDef
{
  aliases: string[];
  usage: string;

  private builder: SlashCommandBuilder;

  constructor({
    enabled,
    name,
    description,
    aliases,
    usage,
    options,
    action,
  }: SlashCommandDef) {
    super({ enabled, name, description, action });
    this.aliases = aliases;
    this.usage = usage;

    this.builder = new SlashCommandBuilder();
    this.builder.setName(name).setDescription(description);

    if (options) {
      for (const [_key, _value] of Object.entries(options)) {
        const key = _key as SlashCommandOptionsKeys;
        const value = _value as SlashCommandOptionsValues;
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

  getBuilder({
    as: format = "builder",
  }: {
    as?: "builder" | "json";
  } = {}) {
    if (format === "json") return this.builder.toJSON();
    return this.builder;
  }
}

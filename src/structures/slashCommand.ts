import {
  ApplicationCommandOptionType,
  BaseInteraction,
  Collection,
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
  SlashCommandOptionsCollectionValues,
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
    optionsOrder,
    options,
    action,
  }: SlashCommandDef) {
    super({ enabled, name, description, action });
    this.aliases = aliases;
    this.usage = usage;

    this.builder = new SlashCommandBuilder();
    this.builder.setName(name).setDescription(description);

    if (!optionsOrder && options)
      throw new Error("optionsOrder is required when options are provided");
    else if (optionsOrder && !options)
      throw new Error("options are required when optionsOrder is provided");
    else if (optionsOrder && options) {
      const optionCollections: Collection<string, SlashCommandOptionsValues>[] =
        [];
      for (const [key, value] of Object.entries(options)) {
        if (!key) continue;
        optionCollections.push(value);
      }

      const allOptions = new Collection().concat(
        ...optionCollections
      ) as Collection<string, SlashCommandOptionsCollectionValues>;

      for (const optionKey of optionsOrder) {
        const option = allOptions.get(optionKey);
        if (!option) {
          throw new Error(`Option ${optionKey} is not defined in options`);
        }

        switch (option.type) {
          case ApplicationCommandOptionType.Attachment: {
            const attachmentOption = new SlashCommandAttachmentOption()
              .setName(optionKey)
              .setDescription(option.description)
              .setRequired(option.required);
            this.builder.addAttachmentOption(attachmentOption);
            break;
          }
          case ApplicationCommandOptionType.Boolean: {
            const booleanOption = new SlashCommandBooleanOption()
              .setName(optionKey)
              .setDescription(option.description)
              .setRequired(option.required);
            this.builder.addBooleanOption(booleanOption);
            break;
          }
          case ApplicationCommandOptionType.Channel: {
            const channelOption = new SlashCommandChannelOption()
              .setName(optionKey)
              .setDescription(option.description)
              .setRequired(option.required);
            this.builder.addChannelOption(channelOption);
            break;
          }
          case ApplicationCommandOptionType.Integer: {
            const integerOption = new SlashCommandIntegerOption()
              .setName(optionKey)
              .setDescription(option.description)
              .setRequired(option.required);
            this.builder.addIntegerOption(integerOption);
            break;
          }
          case ApplicationCommandOptionType.Mentionable: {
            const mentionableOption = new SlashCommandMentionableOption()
              .setName(optionKey)
              .setDescription(option.description)
              .setRequired(option.required);
            this.builder.addMentionableOption(mentionableOption);
            break;
          }
          case ApplicationCommandOptionType.Number: {
            const numberOption = new SlashCommandNumberOption()
              .setName(optionKey)
              .setDescription(option.description)
              .setRequired(option.required);
            this.builder.addNumberOption(numberOption);
            break;
          }
          case ApplicationCommandOptionType.Role: {
            const roleOption = new SlashCommandRoleOption()
              .setName(optionKey)
              .setDescription(option.description)
              .setRequired(option.required);
            this.builder.addRoleOption(roleOption);
            break;
          }
          case ApplicationCommandOptionType.String: {
            const stringOption = new SlashCommandStringOption()
              .setName(optionKey)
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

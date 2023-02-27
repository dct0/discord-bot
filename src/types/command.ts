import {
  BaseInteraction,
  SlashCommandAttachmentOption,
  SlashCommandBooleanOption,
  SlashCommandChannelOption,
  SlashCommandIntegerOption,
  SlashCommandMentionableOption,
  SlashCommandNumberOption,
  SlashCommandRoleOption,
  SlashCommandStringOption,
} from "discord.js";
import { OmitFunctions, ValueOf } from "./helpers";

export interface CommandDef {
  enabled: boolean;
  name: string;
  description: string;
  aliases: string[];
  usage: string;
  options?: CommandOptions;
  action: (action: BaseInteraction) => Promise<void>;
}

export interface CommandOptions {
  attachments?: SlashCommandAttachmentOption[];
  booleans?: OmitFunctions<SlashCommandBooleanOption>[];
  channels?: OmitFunctions<SlashCommandChannelOption>[];
  integers?: OmitFunctions<SlashCommandIntegerOption>[];
  mentionables?: OmitFunctions<SlashCommandMentionableOption>[];
  numbers?: OmitFunctions<SlashCommandNumberOption>[];
  roles?: OmitFunctions<SlashCommandRoleOption>[];
  strings?: OmitFunctions<SlashCommandStringOption>[];
  // subCommands?: SlashCommandSubcommandBuilder[];
  // subCommandGroups?: SlashCommandSubcommandGroupBuilder[];
}

export type CommandOptionsKeys = keyof CommandOptions;
export type CommandOptionsValues = ValueOf<CommandOptions>;

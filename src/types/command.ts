import { BaseInteraction } from "discord.js";
import { ValueOf } from "./helpers";
import {
  ApplicationCommandAttachmentOption,
  ApplicationCommandBooleanOption,
  ApplicationCommandChannelOption,
  ApplicationCommandIntegerOption,
  ApplicationCommandMentionableOption,
  ApplicationCommandNumberOption,
  ApplicationCommandRoleOption,
  ApplicationCommandStringOption,
} from "./options";

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
  attachments?: ApplicationCommandAttachmentOption[];
  booleans?: ApplicationCommandBooleanOption[];
  channels?: ApplicationCommandChannelOption[];
  integers?: ApplicationCommandIntegerOption[];
  mentionables?: ApplicationCommandMentionableOption[];
  numbers?: ApplicationCommandNumberOption[];
  roles?: ApplicationCommandRoleOption[];
  strings?: ApplicationCommandStringOption[];
  // subCommands?: SlashCommandSubcommandBuilder[];
  // subCommandGroups?: SlashCommandSubcommandGroupBuilder[];
}

// woo type safety!
export type CommandOptionsKeys = keyof CommandOptions;
export type CommandOptionsValues = ValueOf<CommandOptions>;

import { BaseInteraction, Collection } from "discord.js";
import { BaseCommandDef } from "./baseCommand";
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

export interface SlashCommandDef extends BaseCommandDef<BaseInteraction> {
  aliases: string[];
  usage: string;
  optionsOrder?: string[];
  options?: SlashCommandOptions;
}

export interface SlashCommandOptions {
  attachments?: Collection<string, ApplicationCommandAttachmentOption>;
  booleans?: Collection<string, ApplicationCommandBooleanOption>;
  channels?: Collection<string, ApplicationCommandChannelOption>;
  integers?: Collection<string, ApplicationCommandIntegerOption>;
  mentionables?: Collection<string, ApplicationCommandMentionableOption>;
  numbers?: Collection<string, ApplicationCommandNumberOption>;
  roles?: Collection<string, ApplicationCommandRoleOption>;
  strings?: Collection<string, ApplicationCommandStringOption>;
}

// woo type safety!
export type SlashCommandOptionsKeys = keyof SlashCommandOptions;
export type SlashCommandOptionsValues = ValueOf<SlashCommandOptions>;
export type SlashCommandOptionsCollectionValues =
  | ApplicationCommandAttachmentOption
  | ApplicationCommandBooleanOption
  | ApplicationCommandChannelOption
  | ApplicationCommandIntegerOption
  | ApplicationCommandMentionableOption
  | ApplicationCommandNumberOption
  | ApplicationCommandRoleOption
  | ApplicationCommandStringOption;

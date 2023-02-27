import { BaseInteraction } from "discord.js";
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
  options?: SlashCommandOptions;
}

export interface SlashCommandOptions {
  attachments?: ApplicationCommandAttachmentOption[];
  booleans?: ApplicationCommandBooleanOption[];
  channels?: ApplicationCommandChannelOption[];
  integers?: ApplicationCommandIntegerOption[];
  mentionables?: ApplicationCommandMentionableOption[];
  numbers?: ApplicationCommandNumberOption[];
  roles?: ApplicationCommandRoleOption[];
  strings?: ApplicationCommandStringOption[];
}

// woo type safety!
export type SlashCommandOptionsKeys = keyof SlashCommandOptions;
export type SlashCommandOptionsValues = ValueOf<SlashCommandOptions>;

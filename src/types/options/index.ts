import {
  APIApplicationCommandAttachmentOption,
  APIApplicationCommandBooleanOption,
  APIApplicationCommandChannelOption,
  APIApplicationCommandIntegerOption,
  APIApplicationCommandMentionableOption,
  APIApplicationCommandNumberOption,
  APIApplicationCommandRoleOption,
  APIApplicationCommandStringOption,
} from "discord-api-types/v10";
import { WithRequired } from "../helpers";

export type ApplicationCommandAttachmentOption = WithRequired<
  APIApplicationCommandAttachmentOption,
  "required"
>;

export type ApplicationCommandBooleanOption = WithRequired<
  APIApplicationCommandBooleanOption,
  "required"
>;

export type ApplicationCommandChannelOption = WithRequired<
  APIApplicationCommandChannelOption,
  "required"
>;

export type ApplicationCommandIntegerOption = WithRequired<
  APIApplicationCommandIntegerOption,
  "required"
>;

export type ApplicationCommandMentionableOption = WithRequired<
  APIApplicationCommandMentionableOption,
  "required"
>;

export type ApplicationCommandNumberOption = WithRequired<
  APIApplicationCommandNumberOption,
  "required"
>;

export type ApplicationCommandRoleOption = WithRequired<
  APIApplicationCommandRoleOption,
  "required"
>;

export type ApplicationCommandStringOption = WithRequired<
  APIApplicationCommandStringOption,
  "required"
>;

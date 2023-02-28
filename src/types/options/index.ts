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
  Omit<APIApplicationCommandAttachmentOption, "name">,
  "required"
>;

export type ApplicationCommandBooleanOption = WithRequired<
  Omit<APIApplicationCommandBooleanOption, "name">,
  "required"
>;

export type ApplicationCommandChannelOption = WithRequired<
  Omit<APIApplicationCommandChannelOption, "name">,
  "required"
>;

export type ApplicationCommandIntegerOption = WithRequired<
  Omit<APIApplicationCommandIntegerOption, "name">,
  "required"
>;

export type ApplicationCommandMentionableOption = WithRequired<
  Omit<APIApplicationCommandMentionableOption, "name">,
  "required"
>;

export type ApplicationCommandNumberOption = WithRequired<
  Omit<APIApplicationCommandNumberOption, "name">,
  "required"
>;

export type ApplicationCommandRoleOption = WithRequired<
  Omit<APIApplicationCommandRoleOption, "name">,
  "required"
>;

export type ApplicationCommandStringOption = WithRequired<
  Omit<APIApplicationCommandStringOption, "name">,
  "required"
>;

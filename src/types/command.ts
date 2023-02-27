import { ApplicationCommandOption, BaseInteraction } from "discord.js";

export interface CommandDef {
  enabled: boolean;
  name: string;
  description: string;
  aliases: string[];
  usage: string;
  options?: ApplicationCommandOption[];
  action: (action: BaseInteraction) => Promise<void>;
}

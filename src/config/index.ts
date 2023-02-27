import { Events } from "discord.js";
import { commands } from "./commands";

const listeners: Events[] = [
  Events.ClientReady,
  Events.InteractionCreate,
  Events.Invalidated,
  Events.MessageCreate,
];

export { commands, listeners };

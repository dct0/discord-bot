import { Events } from "discord.js";

const listeners: Events[] = [
  Events.ClientReady,
  Events.InteractionCreate,
  Events.Invalidated,
  Events.MessageCreate,
];

export { listeners };

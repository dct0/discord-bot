import { MessageCommand, SlashCommand } from ".";

export * from "./baseCommand";
export * from "./messageCommand";
export * from "./slashCommand";
export { CustomClient as Client } from "./client";

export type CommandTypes = MessageCommand | SlashCommand;

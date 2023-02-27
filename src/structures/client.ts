import { Client, ClientOptions, Collection, Events } from "discord.js";
import { MessageCommand, SlashCommand } from "../structures";

export class CustomClient extends Client {
  commands: {
    message: Collection<string, MessageCommand>;
    slash: Collection<string, SlashCommand>;
  };
  constructor(options: ClientOptions) {
    super(options);
    this.commands = {
      message: new Collection(),
      slash: new Collection(),
    };
  }
}

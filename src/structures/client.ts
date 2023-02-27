import { Client, ClientOptions, Collection } from "discord.js";
import { Command } from "src/structures";

export class CustomClient extends Client {
  commands: Collection<string, Omit<Command, "name">> = new Collection();

  constructor(options: ClientOptions) {
    super(options);
  }
}

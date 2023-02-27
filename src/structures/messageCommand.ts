import { Message } from "discord.js";
import { MessageCommandDef } from "../types";
import { BaseCommand } from ".";

export class MessageCommand
  extends BaseCommand<Message>
  implements MessageCommandDef
{
  triggers?: ((message?: Message) => boolean)[];

  constructor({
    enabled,
    name,
    description,
    triggers,
    action,
  }: MessageCommandDef) {
    super({ enabled, name, description, action });
    this.triggers = triggers;
  }
}

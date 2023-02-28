import { Message } from "discord.js";
import { BaseCommandDef } from "./baseCommand";

export interface MessageCommandDef extends BaseCommandDef<Message> {
  triggers?: ((message: Message) => boolean)[];
}

import { Message } from "discord.js";
import { Client } from "../../structures";

const handleMessageCreate = (client: Client, message: Message) => {
  for (const command of client.commands.message.values()) {
    if (!command.triggers) {
      command.execute(message);
      return;
    }

    command.triggers.forEach((trigger) => {
      if (trigger(message)) {
        command.execute(message);
        return;
      }
    });
  }
};

export { handleMessageCreate };

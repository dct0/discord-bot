import { BaseInteraction, Collection, REST, Routes } from "discord.js";
import * as dotenv from "dotenv";
import { commands, listeners } from "./config";
import { Client, Command } from "./structures";

dotenv.config();

console.log("Starting bot...");

const client = new Client({ intents: [] });

client.commands = new Collection<string, Command>();

const loadCommands = async () => {
  for (const command of commands) {
    if (!command.enabled)
      return console.log(`Skipping ${command.name}: disabled`);

    let action: (interaction: BaseInteraction) => Promise<void>;
    try {
      action = (await import(`./commands/${command.name}`)).default;

      if (!action) return console.log(`Skipping ${command.name}: no action`);
    } catch (error) {
      return console.log(`Skipping ${command.name}: ${error}`);
    }

    client.commands.set(command.name, new Command({ ...command, action }));
  }
};

const deployCommands = async () => {
  console.log("Deploying commands...");

  const rest = new REST({ version: "10" }).setToken(
    process.env.BOT_TOKEN || ""
  );

  const slashCommands = client.commands.map((cmd) =>
    cmd.getBuilder({ as: "json" })
  );

  const data = (await rest.put(
    Routes.applicationGuildCommands(
      process.env.APP_ID || "",
      process.env.GUILD_ID || ""
    ),
    { body: slashCommands }
  )) as unknown[];

  console.log(`Successfully reloaded ${data.length} application (/) commands.`);
};

(async () => {
  await loadCommands();

  if (process.env.DEPLOY_COMMANDS === "true") {
    await deployCommands();
  }

  for (const listener of listeners) {
    const { default: listenerFunction } = await import(
      `./listeners/${listener}`
    );
    listenerFunction(client);
  }
})();

client.login(process.env.BOT_TOKEN);

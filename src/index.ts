import {
  BaseInteraction,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import * as dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import { listeners } from "./config";
import { Client, Command } from "./structures";
import { CommandDef } from "./types";

dotenv.config();

console.log("Starting bot...");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection<string, Command>();

const loadCommands = async () => {
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"));

  for (const commandFile of commandFiles) {
    try {
      const {
        commandProps,
        default: getCommand,
      }: { commandProps: CommandDef; default: () => Promise<Command> } =
        await import(`./commands/${commandFile}`);

      const command = await getCommand();

      if (!commandProps || !command) {
        console.log(`Skipping ${commandFile}: no commandProps or command`);
        continue;
      }

      if (!commandProps.enabled) {
        console.log(`Skipping ${command.name}: disabled`);
        continue;
      } else if (!commandProps.action) {
        console.log(`Skipping ${command.name}: no action`);
        continue;
      }

      client.commands.set(command.name, command);
      console.log(`Loaded command: ${command.name}`);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(`Loaded: ${client.commands.size} commands`);
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

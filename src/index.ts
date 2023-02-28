import { Collection, GatewayIntentBits, REST, Routes } from "discord.js";
import * as dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { listeners } from "./config";
import { Client, CommandTypes } from "./structures";

dotenv.config();

console.log("Starting bot...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commandFolders = ["message", "slash"] as const;

const loadCommands = async (folder: (typeof commandFolders)[number]) => {
  console.log(`Loading ${folder} commands...`);

  const commandsPath = path.join(__dirname, "commands", folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"));

  for (const commandFile of commandFiles) {
    try {
      const {
        commandProps,
        default: createCommand,
      }: {
        commandProps: CommandTypes;
        default: () => Promise<CommandTypes>;
      } = await import(`./commands/${folder}/${commandFile}`);

      const command = await createCommand();

      if (!commandProps || !command) {
        console.log(`  Skipping ${commandFile}: no commandProps or command`);
        continue;
      }

      if (!commandProps.enabled) {
        console.log(`  Skipping ${command.name}: disabled`);
        continue;
      } else if (!commandProps.action) {
        console.log(`  Skipping ${command.name}: no action`);
        continue;
      }

      (client.commands[folder] as Collection<string, CommandTypes>).set(
        command.name,
        command
      );
      console.log(`  Loaded ${folder} command: ${command.name}`);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(`Loaded: ${client.commands[folder].size} ${folder} commands`);
};

const deploySlashCommands = async () => {
  console.log("Deploying slash commands...");

  const rest = new REST({ version: "10" }).setToken(
    process.env.BOT_TOKEN || ""
  );

  const commands = client.commands.slash.map((cmd) =>
    cmd.getBuilder({ as: "json" })
  );

  const data = (await rest.put(
    Routes.applicationCommands(process.env.APP_ID || ""),
    { body: commands }
  )) as unknown[];

  console.log(`Successfully reloaded ${data.length} application (/) commands.`);
};

(async () => {
  for (const folder of commandFolders) {
    await loadCommands(folder);
  }

  if (process.env.DEPLOY_SLASH_COMMANDS === "true") {
    await deploySlashCommands();
  }

  for (const listener of listeners) {
    const { default: listenerFunction } = await import(
      `./listeners/${listener}`
    );
    listenerFunction(client);
  }
})();

client.login(process.env.BOT_TOKEN);

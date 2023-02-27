import { CommandDef } from "src/types";

export const commands: Omit<CommandDef, "action">[] = [
  {
    enabled: true,
    name: "ping",
    description: "Ping!",
    aliases: [],
    usage: "/ping",
  },
  {
    enabled: true,
    name: "cconvert",
    description: "Converts currencies",
    aliases: [],
    usage: "/cconvert <amount> <from> <to>",
  },
];

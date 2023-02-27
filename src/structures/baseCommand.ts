import { BaseCommandDef } from "../types";

export class BaseCommand<T> implements BaseCommandDef<T> {
  enabled: boolean;
  name: string;
  description: string;
  action: (action: T) => Promise<void>;

  constructor({ enabled, name, description, action }: BaseCommandDef<T>) {
    this.enabled = enabled;
    this.name = name;
    this.description = description;
    this.action = action;
  }

  async execute(action: T) {
    if (!this.enabled) throw new Error("This command is disabled");

    await this.action(action);
  }

  set setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
}

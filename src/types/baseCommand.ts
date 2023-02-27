export interface BaseCommandDef<T> {
  enabled: boolean;
  name: string;
  description: string;
  action: (action: T) => Promise<void>;
}

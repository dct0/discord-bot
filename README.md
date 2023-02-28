# discord-bot

![Builder](https://cdn.discordapp.com/attachments/287551742667915264/1080095931946500106/7cqdlt.png)

## Setup

```
yarn
```

- Rename `example.env` to `.env`
- Make sure `DEPLOY_SLASH_COMMANDS=true` for first time setup

## Start

```
yarn start
```

## Configuration

- Slash commands are in `./src/commands/slash`
  - Only option `name`, `description`, and `required` properties are parsed at the moment
- Message commands are in `./src/commands/message`
  - You can configure their triggers in the `triggers` property
  - When at least one of the conditions are met, it will run
- Stuff triggered by events are in `./src/handlers`

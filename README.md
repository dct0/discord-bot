# discord-bot

but dockerized

## Start

Docker run:

```sh
docker run -d -e BOT_TOKEN=changeme -e APP_ID=changme -e DEPLOY_SLASH_COMMANDS=true fourilent/discord-bot
```

Docker compose:
See [docker-compose.yml](/docker-compose.yml)

## Configuration

- Slash commands are in `./src/commands/slash`
  - Only option `name`, `description`, and `required` properties are parsed at the moment
- Message commands are in `./src/commands/message`
  - You can configure their triggers in the `triggers` property
  - When at least one of the conditions are met, it will run
- Stuff triggered by events are in `./src/handlers`

<p align="center">
   <img width="75%" src="images/Jetti.png" alt="Logo">
</p>
<p align="center">
   <b>Custom game teams builder for Valorant & League of Legends</b>
</p>
<p align="center">
   <a href="https://playvalorant.com/en-gb/">
      <img src="https://img.shields.io/badge/Game-Valorant-blue" alt="Valorant Badge">
   </a>
   <a href="https://na.leagueoflegends.com/en-gb/">
      <img src="https://img.shields.io/badge/Game-League_of_Legends-blue" alt="Valorant Badge">
   </a>
   <a href="https://discord.com/">
      <img src="https://img.shields.io/badge/Discord-BOT-blue" alt="Discord BOT Badge">
   </a>
   <a href="https://github.com/Glup3/Jetti/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/glup3/jetti?color=success" alt="Contributors Badge">
   </a>
   <a href="https://github.com/glup3/jetti/blob/master/LICENSE.txt">
      <img src="https://img.shields.io/github/license/glup3/jetti.svg?color=green" alt="License Badge">
   </a>
   <a href="https://github.com/koekeishiya/yabai/releases">
      <img src="https://img.shields.io/github/v/tag/glup3/jetti" alt="Version Badge">
   </a>
</p>

## Quick Overview

tbd

## Developer Environment

Best Editor: [VS Code](https://code.visualstudio.com/)

### Plugins for VS Code

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Bracket Pair Colorizer 2 (Recommendation)](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
- [Material Icon Theme (Recommendation)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [One Dark Pro (Recommendation)](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)

### Autoformat On Save:

1. Press `Ctrl + ,` (Settings UI) or `Ctrl + Shift + P` > `Open Settings (UI)`
2. Search for `format on save`
3. Tick the box with the title `Editor: Format On Save`

![Format on Save](images/format-on-save.png)

## How to start/develop

Do this once to install dependencies.

```bash
npm install
```

Changes in the `src` directory will automatically restart the bot.

```bash
npm start
```

## Config File

Copy the `.env.example` file and name it `.env`. Change those fields:

`owner` = userID who has all rights over the bot.

`token` = your secret Bot token, you should never share!

## Migrations

Migrations are used to keep the database in sync with the data models. Those migrations have to be typed by hand and can't be auto generated through the TypeScript Model. Small guide can be found [here](https://dev.to/anayooleru/modifying-an-existing-sequelize-migration-1mnn).

### Add Migration Model

```
npx sequelize-cli model:generate --name Player --attributes userId:string,skillLevel:float,userTag:string
```

### Modify Migration Model

```
npx sequelize-cli migration:create --name name_of_migration
```

### Run Migration

```
// default environment: development
npx sequelize-cli db:migrate

// migrate on production
npx sequelize-cli db:migrate --env production
```

### Undo Migration

```
npx sequelize-cli db:migrate:undo

// specify migration
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-player.js
```

## Database

We use `sqlite` for local development and `postgres` in production.

### View Postgres DB with GUI

I use [pgweb](http://sosedoff.github.io/pgweb/) as GUI for our postgres instance. Can be installed for all operating systems. (I use MacOS)

```
pgweb --host localhost
```

### View Heroku Postgres DB in pgweb

```
heroku config:get DATABASE_URL -a <HEROKU_APP_NAME> | xargs pgweb --url
```

## Skill Level Formula

Every player gets a skill level (weight). They are from 1 to 6 (low to high).

- Level 1 = Iron
- Level 2 = Bronze
- Level 3 = Silver
- Level 4 = Gold
- Level 5 = Platinum
- Level 6 = Diamond+

while no fair teams:

1. create two random teams
2. sum up skill levels for each team
3. compare total skill level
   1. if difference of 1 --> fair teams
   2. else go to step 1

## Commands

Generated command list by Jetti (last updated: 19th January 2021)

```
To run a command in any server, use @Jetti#4545 command. For example, @Jetti#4545 prefix.
To run a command in this DM, simply use command with no prefix.

Use help <command> to view detailed information about a specific command.
Use help all to view a list of all commands, not just available ones.

All commands

Team commands
add-team: Creates a new team with 5 players
build: Drafts two fair or unfair teams
change-team-player: Changes a player with another one.
delete-team: Deletes a team entry in the database
get-team: Get info about team
list-recent-teams: Lists # most recent teams in the database
number-pick: Provides users with numbers for "picking-by-numbers"
update-team-name: Changes the team-name of a team entry in the database

Player commands
add-player: Adds a new Player to the db
get-player: Get Information about a Player
missing-players: Lists all players in the voice chat who are not in the database.
list-players: Lists all players in the database
list-skill-levels: Lists values for skill levels
remove-player: Removes a given Player from the database
update-player: Updates the level of a Player

Match commands
add-match: Creates a new match with 2 teams
delete-match: Deletes a match entry in the database
get-match: Get info about match
store-image-match: Stores the link of the game screenshot as a link (string). Image must be embedded with message.
update-match-result: Updates match result for given match ID

Commands
groups: Lists all command groups.
enable: Enables a command or command group.
disable: Disables a command or command group.
reload: Reloads a command or command group.
load: Loads a new command.
unload: Unloads a command.

Utility
help: Displays a list of available commands, or detailed information for a specified command.
prefix: Shows or sets the command prefix.
ping: Checks the bot's ping to the Discord server.
eval: Executes JavaScript code.
```

## Resources

- https://discordpy.readthedocs.io/en/latest/discord.html
- https://discordjs.guide/commando/
- https://discordjs.guide/
- https://github.com/discordjs/discord.js
- https://discord.js.org/#/
- https://github.com/RobinBuschmann/sequelize-typescript#usage
- https://dev.to/anayooleru/modifying-an-existing-sequelize-migration-1mnn
- https://stackoverflow.com/questions/51509499/how-do-i-view-a-postgresql-database-on-heroku-with-a-gui

## Contributors

- Glup3 | Tran Phuc
- Sicari-s

# Valorant Team Builder

Discord Bot which creates 2 balanced teams for a custom Valorant match.

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

Every player gets a skill level (weight). They are from 1 to 5 (low to high).

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

TBD

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

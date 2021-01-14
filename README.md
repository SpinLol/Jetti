# Valorant Team Builder

Discord Bot which creates 2 balanced teams for a custom Valorant match.

## How to start

tbd

## Config File

Modify the `src/config.json` to use your credentials.

`owner` = userID who has all rights over the bot.

`token` = your secret Bot token, you should never share!

## Skill Level Formula

Every player gets a skill level (weight). They are from 1 to 5 (low to high).

- Level 1 = Iron
- Level 2 = Bronze
- Level 3 = Silver
- Level 4 = Gold
- Level 5 = Plat+

while no fair teams:

1. create two random teams
2. sum up skill levels for each team
3. compare total skill level
   1. if difference of 1 --> fair teams
   2. else go to step 1

## Commands

## Contributors

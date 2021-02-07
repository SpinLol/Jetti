import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Player } from '../../db/models';

export default class ListPlayersCommand extends Command {
  skillAliases = ['s', 'skill', 'skill level'];
  alphaAliases = ['a', 'alpha', 'alphabetically'];

  constructor(client: CommandoClient) {
    super(client, {
      name: 'list-players',
      aliases: ['list', 'l'],
      group: 'player',
      memberName: 'list',
      description: 'Lists all players in the database',
      examples: ['list a', 'l a', 'l s', 'l'],
    });
  }

  async run(msg: CommandoMessage, rawArgs: string) {
    const args = rawArgs.trim().split(/ +/);
    let options = {};

    if (this.skillAliases.some((v) => args.includes(v))) {
      options = {
        order: [['skillLevel', 'DESC']],
      };
    } else if (this.alphaAliases.some((v) => args.includes(v))) {
      options = {
        order: [['userTag', 'ASC']],
      };
    }

    const players = await Player.findAll(options);
    const playerList = players.reduce(this.printPlayers, '');

    return msg.say(this.printAllPlayers(playerList));
  }

  printPlayers(prev: string, { userTag, skillLevel }: Player, i: number): string {
    return `${prev}\n\t${('' + (i + 1)).padStart(2, '0')}) Level ${skillLevel} \t ${userTag}`;
  }

  printAllPlayers(players: string): string {
    let res = '```\nAll Awesome Players';
    res += players;
    res += '\n```';

    return res;
  }
}

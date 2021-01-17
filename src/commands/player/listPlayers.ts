import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import Player from '../../db/models/Player.model';

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
    let players;
    if (this.skillAliases.includes(rawArgs)) {
      players = await Player.findAll({
        order: [['skillLevel', 'ASC']],
      });
    } else if (this.alphaAliases.includes(rawArgs)) {
      players = await Player.findAll({
        order: [['userTag', 'ASC']],
      });
    } else {
      players = await Player.findAll({});
    }
    const playerList = players.reduce(this.printPlayers, '');

    msg.say(this.printAllPlayers(playerList));
    return new Message(null, null, msg.channel);
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

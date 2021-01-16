import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import Player from '../../db/models/Player.model';

export default class ListPlayersCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'list-players',
      aliases: ['list', 'l'],
      group: 'player',
      memberName: 'list',
      description: 'Lists all players in the database',
      argsCount: 0,
    });
  }

  async run(msg: CommandoMessage) {
    const players = await Player.findAll({
      order: [['userTag', 'ASC']],
    });

    const playerList = players.reduce(this.printPlayers, '');

    msg.say(this.printAllPlayers(playerList));
    return new Message(null, null, msg.channel);
  }

  printPlayers(prev: string, { userTag, skillLevel }: Player, i: number): string {
    return `${prev}\n\t${('0' + (i + 1)).slice(-2)}) Level ${skillLevel} \t ${userTag}`;
  }

  printAllPlayers(players: string): string {
    let res = '```\nAll Awesome Players';
    res += players;
    res += '\n```';

    return res;
  }
}

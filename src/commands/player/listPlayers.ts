/* eslint-disable @typescript-eslint/ban-types */
import { Message, User } from 'discord.js';
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
    let players = await Player.findAll();

    // players.sort((a, b) => {
    //   if (msg.guild.members.cache.get(a.userId) < msg.guild.members.cache.get(b.userId)) {
    //     return -1;
    //   }
    //   if (msg.guild.members.cache.get(a.userId) > msg.guild.members.cache.get(b.userId)) {
    //     return 1;
    //   }
    //   return 0;
    // });
    // players.sort((a, b) =>
    //   msg.guild.members.cache
    //     .get(a.userId)
    //     .user.username.localeCompare(msg.guild.members.cache.get(b.userId).user.username),
    // );
    let playersAsStrings = '';
    for (const player of players) {
      playersAsStrings += `${msg.guild.members.cache.get(player.userId)} - ${player.skillLevel}\n`;
    }

    msg.say(playersAsStrings);
    return new Message(null, null, msg.channel);
  }
}

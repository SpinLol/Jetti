import { GuildMember } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Player } from '../../db/models';

export default class ListPlayersCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'missing-players',
      aliases: ['missing', 'm'],
      group: 'player',
      memberName: 'missing',
      description: 'Lists all players in the voice chat who are not in the database.',
      argsCount: 0,
    });
  }

  async run(msg: CommandoMessage) {
    const channel = msg.member.voice.channel;

    if (channel == null) {
      return msg.reply('You are not in a voice channel!');
    }

    const players = await Player.findAll({
      where: {
        userId: channel.members.map((_, k) => k),
      },
    });

    const missingUsers = channel.members.filter((_, k) => players.find((p) => p.userId === k) == undefined);

    if (missingUsers.size === 0) {
      return msg.say('All Players are in the database! None is missing.');
    }

    const userList = missingUsers.reduce(this.printUsers, '');
    return msg.say(this.printAllUsers(userList));
  }

  printUsers(prev: string, guildUser: GuildMember): string {
    return `${prev}\n\t${guildUser.user.tag}`;
  }

  printAllUsers(players: string): string {
    let res = '```\nAll Missing Players';
    res += players;
    res += '\n```';

    return res;
  }
}

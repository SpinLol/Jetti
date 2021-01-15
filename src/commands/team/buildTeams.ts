/* eslint-disable @typescript-eslint/ban-types */
import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import Player from '../../db/models/Player.model';
import { shuffle } from '../../util/arrayHelper';

export default class buildTeamsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'build',
      group: 'team',
      memberName: 'build',
      description: 'Drafts two fair or unfair teams',
    });
  }

  async run(msg: CommandoMessage, rawArgs: string) {
    const end = new Message(null, null, msg.channel);

    const tries = 10;
    const neededUsers = 2;
    const half = Math.ceil(neededUsers / 2);
    const channel = msg.member.voice.channel;

    if (rawArgs.trim() === '') {
      if (channel == null) {
        msg.reply('you are not in a voice channel!');
        return end;
      }

      if (channel.members.size < neededUsers) {
        msg.say('There are not enough players in the voice channel.');
      } else if (channel.members.size > neededUsers) {
        msg.say('There are too many players in the voice channel. Can not choose players.');
      } else {
        const userIds = channel.members.map((_, k) => k);
        const players = await Player.findAll({ where: { userId: userIds } });

        for (let i = 0; i < tries; i++) {
          const p = players.slice();
          shuffle(p);

          const team1 = p.splice(0, half);
          const team2 = p.splice(-half);

          const skill1 = team1.reduce((a, b) => {
            return a + b.skillLevel;
          }, 0);
          const skill2 = team2.reduce((a, b) => {
            return a + b.skillLevel;
          }, 0);

          if (skill1 == skill2 || skill1 + 1 == skill2 || skill1 - 1 == skill2) {
            const teamNames1 = team1.reduce((a, b) => {
              const playerName = msg.guild.members.cache.get(b.userId);
              return ` ${playerName}`;
            }, '');
            const teamNames2 = team2.reduce((a, b) => {
              const playerName = msg.guild.members.cache.get(b.userId);
              return ` ${playerName}`;
            }, '');
            msg.say(`Team 1: ${teamNames1}\nTeam 2: ${teamNames2}`);
            return end;
          }
        }

        msg.say(`Could not create fair teams after trying ${tries} times. Try again`);
      }

      return end;
    }

    // if (msg.mentions.users.size > 0) {
    //   msg.say(msg.mentions.users.first().username);
    //   return end;
    // }

    // const args = rawArgs.trim().split(/ +/);

    // console.log(args);

    return end;
  }
}

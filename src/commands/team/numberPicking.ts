/*
questions
can users be args?
should first two users mentioned be team pickers?
pm the users their number?

ideas
say *team leader 1* picked *user* to be on their team
edit initial message to update teams as they are picked, create two columns with embeds
always delete number messages shortly after to not clutter chat

catches
same leader tries to pick twice
leader picks number already picked
leader picks illegal number

*/

/* eslint-disable @typescript-eslint/ban-types */
import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { shuffle } from '../../util/arrayHelper';

export default class numberPickingCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'number-pick',
      aliases: ['andi', 'ondi'],
      group: 'team',
      memberName: 'andi',
      description: 'Provides users with numbers for "picking-by-numbers"',
    });
  }

  async run(msg: CommandoMessage, rawArgs: string) {
    console.log(rawArgs);
    const end = new Message(null, null, msg.channel);
    const neededUsers = 2;
    let userIds: string[];
    const channel = msg.member.voice.channel;

    if (rawArgs.trim() === '') {
      if (channel == null) {
        msg.reply('You are not in a voice channel!');
        return end;
      }

      if (channel.members.size < neededUsers) {
        msg.say('There are not enough players in the voice channel.');
        return end;
      } else if (channel.members.size > neededUsers) {
        msg.say('There are too many players in the voice channel. Can not choose players.');
        return end;
      }

      userIds = channel.members.map((_, k) => k);
      await this.distributeNumbers(msg, userIds);
      return end;
    }

    if (channel == null && msg.mentions.users.size == 0) {
      msg.reply('You are not in a voice channel and forgot to mention enough players.');
      return end;
    }

    if (msg.mentions.users.size == 0) {
      msg.say('You forgot to choose the remaining players.');
      return end;
    }

    if (msg.mentions.users.size == neededUsers) {
      userIds = msg.mentions.users.map((_, k) => k);
      await this.distributeNumbers(msg, userIds);
      return end;
    }

    if (channel == null) {
      msg.reply('You are not in a voice channel.');
      return end;
    }

    userIds = channel.members.map((_, k) => k).concat(msg.mentions.users.map((_, k) => k));

    if (userIds.length < neededUsers) {
      msg.reply(`You didn't mention enough players. ${neededUsers - userIds.length} players are missing.`);
      return end;
    } else if (userIds.length > neededUsers) {
      msg.reply(`You mentioned too many players. You need ${neededUsers} players, not ${userIds.length}`);
      return end;
    }

    await this.distributeNumbers(msg, userIds);
    return end;
  }

  async distributeNumbers(msg: CommandoMessage, userIds: string[]) {
    userIds = shuffle(userIds);
    for (let i = 0; i < userIds.length; i++) {
      const guildMember = await msg.guild.members.fetch(userIds[i]);
      guildMember.user.send(`Your number is: ${i + 1}`);
    }
    msg.say('Sent all users their number. Start picking!');
  }
}

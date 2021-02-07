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
    const neededUsers = 10;
    let userIds: string[];
    const channel = msg.member.voice.channel;

    if (rawArgs.trim() === '') {
      if (channel == null) {
        return msg.reply('You are not in a voice channel!');
      }

      if (channel.members.size < neededUsers) {
        return msg.say('There are not enough players in the voice channel.');
      } else if (channel.members.size > neededUsers) {
        return msg.say('There are too many players in the voice channel. Can not choose players.');
      }

      userIds = channel.members.map((_, k) => k);
      return await this.distributeNumbers(msg, userIds);
    }

    if (channel == null && msg.mentions.users.size == 0) {
      return msg.reply('You are not in a voice channel and forgot to mention enough players.');
    }

    if (msg.mentions.users.size == 0) {
      return msg.say('You forgot to choose the remaining players.');
    }

    if (msg.mentions.users.size == neededUsers) {
      userIds = msg.mentions.users.map((_, k) => k);
      return await this.distributeNumbers(msg, userIds);
    }

    if (channel == null) {
      return msg.reply('You are not in a voice channel.');
    }

    userIds = channel.members.map((_, k) => k).concat(msg.mentions.users.map((_, k) => k));

    if (userIds.length < neededUsers) {
      return msg.reply(`You didn't mention enough players. ${neededUsers - userIds.length} players are missing.`);
    } else if (userIds.length > neededUsers) {
      return msg.reply(`You mentioned too many players. You need ${neededUsers} players, not ${userIds.length}`);
    }

    return await this.distributeNumbers(msg, userIds);
  }

  async distributeNumbers(msg: CommandoMessage, userIds: string[]) {
    userIds = shuffle(userIds);
    for (let i = 0; i < userIds.length; i++) {
      const guildMember = await msg.guild.members.fetch(userIds[i]);
      guildMember.user.send(`Your number is: ${i + 1}`);
    }
    return msg.say('Sent all users their number. Start picking!');
  }
}

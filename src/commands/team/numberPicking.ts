import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { userAndi } from '../../constants';
import { shuffle } from '../../util/arrayHelper';

const andiResponses = [
  'https://tenor.com/view/simon-cowell-thats-a-no-its-a-no-its-a-no-from-me-gif-7663264',
  'https://tenor.com/view/denied-blocked-getout-gif-6214299',
  'https://tenor.com/view/no-bugs-bunny-nope-gif-14359850',
  'https://tenor.com/view/no-randy-jackson-dawg-gif-12730917',
  'https://tenor.com/view/inauguration-cnn2017-donald-trump-finger-wag-no-absolutely-not-gif-12953442',
  'https://tenor.com/view/stop-stop-it-mj-michael-jordan-nope-gif-5098905',
  'https://tenor.com/view/denied-barney-legendary-stinson-st-legend-challenge-accepted-gif-17940726',
  'https://tenor.com/view/nope-no-no-no-pokemon-gif-11020690',
  'https://tenor.com/view/meme-pikachu-pokemon-shocked-gif-16985133',
  'https://tenor.com/view/duck-pokemon-no-gif-9996831',
  'https://tenor.com/view/no-no-no-pikachu-pokemon-pikachu-saying-no-no-gif-18968430',
  'https://tenor.com/view/nope-torchic-pokemon-no-gif-4735088',
  'get out of iron first, noob - alinchen8',
  'only people bronze 1 or higher can use this command - alinchen8',
  'no u - Glup3',
];

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
    const chance = Math.random();

    if (msg.author.id === userAndi && chance < 0.1) {
      if (chance < 0.01) {
        for (let i = 1; i <= 10; i++) {
          msg.author.send(`Your Number is: ${i}`);
        }

        return msg;
      }

      return msg.say(andiResponses[Math.floor(Math.random() * andiResponses.length)]);
    }

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

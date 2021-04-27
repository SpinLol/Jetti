import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors, neededUsers, userAndi } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';
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

export default class NumberPickingCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'number-picking',
      aliases: ['andi', 'ondi'],
      group: 'team',
      memberName: 'number-picking',
      description: 'Sends every user a random number',
    });
  }

  async run(message: CommandoMessage) {
    const userIds: string[] = [];
    const channel = message.member.voice.channel;

    if (channel != null) {
      userIds.push(...channel.members.map((_, k) => k));
    }
    userIds.push(...message.mentions.users.map((_, k) => k));

    if (userIds.length < neededUsers) {
      return message.say(WarningEmbed('Not enough players selected'));
    }

    if (userIds.length > neededUsers) {
      return message.say(WarningEmbed('Too many players selected'));
    }

    const sdk = getSdk(apiClient);
    const { players } = await sdk.GetPlayersWithUserIds({ userIds: userIds });

    const missingUsers = userIds.filter((userId) => {
      return players.find((player) => player.userId === userId) == undefined;
    });

    if (missingUsers.length > 0) {
      return message.say(WarningEmbed(`Some players are missing in the database! Try ${this.client.commandPrefix}lmp`));
    }

    const chance = Math.random();

    if (message.author.id === userAndi && chance <= 0.9) {
      if (chance <= 0.01) {
        for (let i = 1; i <= 10; i++) {
          await message.author.send(`Your Number is: ${i}`);
        }

        return message;
      }

      return message.say(andiResponses[Math.floor(Math.random() * andiResponses.length)]);
    }

    shuffle(userIds);

    try {
      for (let i = 1; i <= userIds.length; i++) {
        const guildMember = await message.guild.members.fetch(userIds[i - 1]);

        guildMember.send(
          new MessageEmbed({
            title: i === 1 || i === 2 ? `Team Captain ${i} (${i === 1 ? 'Attacker' : 'Defender'})` : 'Player',
            description: `Your number is **${i}**!`,
            color: colors.primary,
            timestamp: Date.now(),
            footer: { text: guildMember.user.tag },
          }),
        );
      }
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }

    return message.say(
      new MessageEmbed({
        title: 'Finished distributing numbers',
        description: 'All Players have received their number. Team Captains can choose their Players now!',
        color: colors.success,
        timestamp: Date.now(),
      }),
    );
  }
}

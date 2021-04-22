import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Player } from '../../db/models';
import { MessageReaction } from 'discord.js';

export const allMaps = ['ASCENT', 'BIND', 'HAVEN', 'ICEBOX', 'SPLIT'] as const;
export type ValorantMaps = typeof allMaps;

interface PromptArgs {
  biased: 'r' | 'b';
  choice: 'y' | 'n';
}

export default class RandomMapCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'random-map',
      aliases: ['random'],
      group: 'match',
      memberName: 'random-map',
      description: 'choose a random map for the next match',
      argsCount: 2,
      args: [
        {
          key: 'biased',
          prompt: 'Want to choose random or biased? "r/b"',
          type: 'string',
          oneOf: ['r', 'b'],
        },
        {
          key: 'choice',
          prompt: 'Want to choose from two maps? "y/n"',
          type: 'string',
          oneOf: ['y', 'n'],
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { biased, choice }: PromptArgs) {
    const channel = msg.member.voice.channel;
    if (channel == null) {
      return msg.reply('You are not in a voice channel!');
    }
    const userIds = channel.members.map((_, k) => k);

    const players = await Player.findAll({ where: { userId: userIds } });

    if (biased == 'r') {
      const c = Math.floor(Math.random() * allMaps.length);

      if (choice == 'y') {
        return msg.say(allMaps[c]);
      } else {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const z = Math.floor(Math.random() * allMaps.length);
          if (z != c) {
            const pollTopic = await msg.say(['✌️ :' + allMaps[c], '😙 :' + allMaps[z]]);

            await pollTopic.react('✌️');
            await pollTopic.react('😙');
            const filter = (reaction: MessageReaction) => reaction.emoji.name === '✌️' || reaction.emoji.name === '😙';

            const major = Math.floor(players.length / 2) + 1;
            const collector = pollTopic.createReactionCollector(filter, { time: 15000 });
            collector.on('collect', (r) => {
              if (r.count > major) {
                if (r.emoji.toString() === '✌️') {
                  collector.stop();
                  return msg.say(allMaps[c] + ' has won!');
                }
                if (r.emoji.toString() === '😙') {
                  collector.stop();
                  return msg.say(allMaps[z] + ' has won!');
                }
              }
            });

            break;
          }
        }
      }
    }
    if (biased == 'b') {
      const biasMaps = players.map((p) => p.favMap);

      const c = Math.floor(Math.random() * biasMaps.length);
      if (choice == 'y' || biasMaps.length == 1) {
        return msg.say(biasMaps[c]);
      } else {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const z = Math.floor(Math.random() * biasMaps.length);
          if (z != c) {
            const pollTopic = await msg.say(['✌️ :' + biasMaps[c], '😙 :' + biasMaps[z]]);

            await pollTopic.react('✌️');
            await pollTopic.react('😙');
            const filter = (reaction: MessageReaction) => reaction.emoji.name === '✌️' || reaction.emoji.name === '😙';

            const major = Math.floor(players.length / 2) + 1;
            const collector = pollTopic.createReactionCollector(filter, { time: 15000 });
            collector.on('collect', (r) => {
              if (r.count > major) {
                if (r.emoji.toString() === '✌️') {
                  collector.stop();
                  return msg.say(biasMaps[c] + ' has won!');
                }
                if (r.emoji.toString() === '😙') {
                  collector.stop();
                  return msg.say(biasMaps[z] + ' has won!');
                }
              }
            });

            break;
          }
        }
      }
    }
  }
}

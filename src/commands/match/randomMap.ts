import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Player } from '../../db/models';
import { MessageReaction } from 'discord.js';

export const allMaps = ['ASCENT', 'BIND', 'HAVEN', 'ICEBOX', 'SPLIT'] as const;
export type ValorantMaps = typeof allMaps;

interface PromptArgs {
  isBiased: boolean;
  areTwoMaps: boolean;
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
          key: 'isBiased',
          prompt: 'Should the map be chosen biased? "y/n"',
          type: 'boolean',
        },
        {
          key: 'areTwoMaps',
          prompt: 'Want to choose from two maps? "y/n"',
          type: 'boolean',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { isBiased, areTwoMaps }: PromptArgs) {
    const channel = msg.member.voice.channel;

    if (channel == null) {
      return msg.reply('You are not in a voice channel!');
    }

    const userIds = channel.members.map((_, k) => k);
    const players = await Player.findAll({ where: { userId: userIds } });
    const poolMaps: string[] = [];

    if (isBiased == false) {
      poolMaps.push(...allMaps);
    } else {
      poolMaps.push(...players.map((p) => p.favMap));
    }

    const index1 = Math.floor(Math.random() * poolMaps.length);

    if (areTwoMaps == false || [...new Set(poolMaps)].length == 1) {
      return msg.say(poolMaps[index1]);
    }

    let index2 = 0;

    do {
      index2 = Math.floor(Math.random() * poolMaps.length);
    } while (poolMaps[index2] == poolMaps[index1]);

    const pollTopic = await msg.say([`✌️ : ${poolMaps[index1]}`, `😙 : ${poolMaps[index2]}`]);

    await pollTopic.react('✌️');
    await pollTopic.react('😙');

    const major = Math.floor(players.length / 2) + 1;
    const filter = (reaction: MessageReaction) => reaction.emoji.name === '✌️' || reaction.emoji.name === '😙';
    const collector = pollTopic.createReactionCollector(filter, { time: 1000 * 10 });

    collector.on('collect', (r) => {
      if (r.count > major) {
        collector.stop();
        msg.say(poolMaps[r.emoji.toString() === '✌️' ? index1 : index2] + ' has won!');
      }
    });
    collector.on('end', async (_, reason) => {
      if (reason == 'time') {
        await msg.say('Voting over, time has ended.');
        await msg.say("Guess we're playing ICEBOX!");
      }
    });
  }
}

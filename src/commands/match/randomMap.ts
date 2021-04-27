import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { MessageEmbed, MessageReaction } from 'discord.js';
import { allMaps, colors, emojiList } from '../../constants';
import { getSdk } from '../../api/generated/graphql';
import { apiClient } from '../../api/client';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';

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

  async run(message: CommandoMessage, { isBiased, areTwoMaps }: PromptArgs) {
    const sdk = getSdk(apiClient);
    const userIds: string[] = [];
    let poolMaps: string[] = [...allMaps];
    const channel = message.member.voice.channel;

    if (channel == null) {
      return message.say(WarningEmbed('You are not in a voice channel!'));
    }

    userIds.push(...channel.members.map((_, k) => k));

    try {
      if (isBiased) {
        const { players } = await sdk.GetPlayers({ userIds: userIds });

        if (players.length > 0) {
          poolMaps = [...players.map((p) => p.favoriteMap.toString())];
        }
      }

      const mapIdx = Math.floor(Math.random() * poolMaps.length);
      const emoji = getRandomNonEqualEmoji();
      let mapIdx2 = 0;

      if (areTwoMaps == false || [...new Set(poolMaps)].length == 1) {
        return message.say(
          new MessageEmbed({
            color: colors.primary,
            title: 'Random map is',
            description: poolMaps[mapIdx],
            timestamp: Date.now(),
          }),
        );
      }

      do {
        mapIdx2 = Math.floor(Math.random() * poolMaps.length);
      } while (poolMaps[mapIdx2] == poolMaps[mapIdx]);
      const emoji2 = getRandomNonEqualEmoji(emoji);

      const pollTopic = await message.say([`${emoji} : ${poolMaps[mapIdx]}`, `${emoji2} : ${poolMaps[mapIdx2]}`]);
      await pollTopic.react(emoji);
      await pollTopic.react(emoji2);

      const major = Math.floor(userIds.length / 2) + 1;
      const filter = (reaction: MessageReaction) => [emoji, emoji2].includes(reaction.emoji.name);
      const collector = pollTopic.createReactionCollector(filter, { time: 1000 * 60 });

      collector.on('collect', (r) => {
        if (r.count > major) {
          collector.stop();
          message.say(
            new MessageEmbed({
              color: colors.primary,
              title: `${poolMaps[r.emoji.toString() === emoji ? mapIdx : mapIdx2]} has won!`,
              timestamp: Date.now(),
            }),
          );
        }
      });

      collector.on('end', async (_, reason) => {
        if (reason == 'time') {
          message.say(
            new MessageEmbed({
              color: colors.danger,
              title: 'Voting over, time has ended.',
              description: "Guess we're playing ICEBOX!",
              timestamp: Date.now(),
            }),
          );
        }
      });
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

function getRandomNonEqualEmoji(emoji?: string): string {
  for (let i = 0; i < 100; i++) {
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

    if (randomEmoji != emoji || i >= 100) {
      return randomEmoji;
    }
  }
}

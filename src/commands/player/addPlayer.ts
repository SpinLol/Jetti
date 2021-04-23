import { MessageEmbed, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed } from '../../core/customEmbeds';
import { printLevelName } from '../../core/print';

interface PromptArgs {
  user: User;
  level: number;
}

export default class AddPlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'add-player',
      aliases: ['ap'],
      group: 'player',
      memberName: 'add-player',
      description: 'Adds a new Player to the database',
      argsCount: 2,
      args: [
        {
          key: 'user',
          prompt: 'Which user do you wanna add? Ping him (@username)',
          type: 'user',
        },
        {
          key: 'level',
          prompt: "What's his/her skill level?",
          type: 'float',
          validate: (level: number) => level >= 1 && level <= 8,
        },
      ],
    });
  }

  async run(message: CommandoMessage, { user, level }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { player } = await sdk.GetPlayer({ userId: user.id });

      if (player != null) {
        return message.reply(`Player \`${user.tag}\` was already added!`);
      }

      const { newPlayer } = await sdk.AddPlayer({
        userId: user.id,
        level: level,
        userTag: user.tag,
        imageUrl: user.avatarURL({ size: 2048 }),
      });

      return message.say(
        new MessageEmbed({
          color: colors.success,
          title: newPlayer.userTag,
          description: 'Player was successfully added!',
          fields: [
            {
              name: 'Skill Level',
              value: `${printLevelName(newPlayer.skillLevel)} (${newPlayer.skillLevel})`,
              inline: true,
            },
            { name: 'Favorite Map', value: newPlayer.favoriteMap, inline: true },
          ],
          image: { url: newPlayer.imageUrl },
          timestamp: Date.now(),
          footer: { text: user.id },
        }),
      );
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

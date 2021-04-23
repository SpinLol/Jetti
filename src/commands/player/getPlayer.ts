import { MessageEmbed, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed } from '../../core/customEmbeds';

interface PromptArgs {
  user: User;
}

export default class GetPlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'get-player',
      aliases: ['gp'],
      group: 'player',
      memberName: 'get-player',
      description: 'Get information about a Player',
      argsCount: 1,
      args: [
        {
          key: 'user',
          prompt: 'Which player do you want? Ping him! (@username)',
          type: 'user',
        },
      ],
    });
  }

  async run(message: CommandoMessage, { user }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { player } = await sdk.GetPlayer({ userId: user.id });

      if (player == null) {
        return message.say(`Player \`${user.tag}\` is not in database!`);
      }

      return message.say(
        new MessageEmbed({
          color: colors.primary,
          fields: [{ name: 'Skill Level', value: `${player.skillLevel}`, inline: true }],
          title: player.userTag,
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

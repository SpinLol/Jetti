import { MessageEmbed, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';
import { logger } from '../../util/logger';

interface PromptArgs {
  user: User;
}

export default class UpdatePlayerImageCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'update-player-image',
      aliases: ['upi'],
      group: 'match',
      memberName: 'update-player-image',
      description: 'Updates the avatar image of a player',
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
      const { player } = await sdk.GetPlayerImage({ userId: user.id });

      if (player == null) {
        return message.say(WarningEmbed(`Player \`${user.tag}\` is not in database!`));
      }

      if (message.attachments.size === 0) {
        return message.say(WarningEmbed('No image attached!'));
      }

      const { updatedPlayer } = await sdk.UpdatePlayerImage({
        userId: user.id,
        image: message.attachments.first().url,
      });

      return message.say(
        new MessageEmbed({
          color: colors.success,
          title: user.tag,
          description: `Updated match screenshot from ${player.imageUrl} to ${updatedPlayer.imageUrl}`,
          image: { url: updatedPlayer.imageUrl },
          timestamp: Date.now(),
        }),
      );
    } catch (err) {
      logger.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

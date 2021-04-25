import { MessageEmbed, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';
import { printLevelName } from '../../core/print';

interface PromptArgs {
  user: User;
}

export default class RemovePlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'remove-player',
      aliases: ['rp'],
      group: 'player',
      memberName: 'remove-player',
      description: 'Removes a player from the database',
      argsCount: 1,
      args: [
        {
          key: 'user',
          prompt: 'Which user do you wanna add? Ping him (@UserName)',
          type: 'user',
        },
      ],
      ownerOnly: true,
    });
  }

  async run(message: CommandoMessage, { user }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { player } = await sdk.GetPlayer({ userId: user.id });

      if (player == null) {
        return message.say(WarningEmbed(`Player \`${user.tag}\` is not in database!`));
      }

      const { removedPlayer } = await sdk.RemovePlayer({ userId: user.id });

      return message.say(
        new MessageEmbed({
          color: colors.danger,
          title: removedPlayer.userTag,
          description: 'Player was successfully removed!',
          fields: [
            {
              name: 'Skill Level',
              value: `${printLevelName(removedPlayer.skillLevel)} (${removedPlayer.skillLevel})`,
              inline: true,
            },
            { name: 'Favorite Map', value: removedPlayer.favoriteMap, inline: true },
          ],
          image: { url: removedPlayer.imageUrl },
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

import { MessageEmbed, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk, Map } from '../../api/generated/graphql';
import { allMaps, colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';

interface PromptArgs {
  user: User;
  map: string;
}

export default class UpdatePlayerMapCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'update-player-map',
      aliases: ['upm'],
      group: 'player',
      memberName: 'update-player-map',
      description: 'Updates the favorite map of a Player',
      argsCount: 2,
      args: [
        {
          key: 'user',
          prompt: "Which user's level do you want to update? Ping him (@username)",
          type: 'user',
        },
        {
          key: 'map',
          prompt: `What's the new favorite map? (${allMaps.join(' | ')})`,
          type: 'string',
          oneOf: allMaps,
        },
      ],
    });
  }

  async run(message: CommandoMessage, { user, map }: PromptArgs) {
    const sdk = getSdk(apiClient);
    try {
      const { player } = await sdk.GetPlayer({ userId: user.id });

      if (player == null) {
        return message.say(WarningEmbed(`Player \`${user.tag}\` is not in database!`));
      }

      const { updatedPlayer } = await sdk.UpdatePlayerMap({ userId: user.id, map: map.toUpperCase() as Map });

      return message.say(
        new MessageEmbed({
          color: colors.success,
          title: user.tag,
          description: `Updated favorite map from ${player.favoriteMap} to ${updatedPlayer.favoriteMap}`,
          timestamp: Date.now(),
        }),
      );
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

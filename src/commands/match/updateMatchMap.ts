import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk, Map } from '../../api/generated/graphql';
import { allMaps, colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';

interface PromptArgs {
  matchId: number;
  map: string;
}

export default class UpdateMatchMapCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'update-match-map',
      aliases: ['umm'],
      group: 'match',
      memberName: 'update-match-map',
      description: 'Updates the map of a match',
      argsCount: 2,
      args: [
        {
          key: 'matchId',
          prompt: 'What is the match ID?',
          type: 'integer',
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

  async run(message: CommandoMessage, { matchId, map }: PromptArgs) {
    const sdk = getSdk(apiClient);
    try {
      const { match } = await sdk.GetMatchMap({ id: matchId });

      if (match == null) {
        return message.say(WarningEmbed(`Match with ID ${matchId} was not found!`));
      }

      const { updatedMatch } = await sdk.UpdateMatchMap({ id: matchId, map: map.toUpperCase() as Map });

      return message.say(
        new MessageEmbed({
          color: colors.success,
          title: `Match ID ${matchId}`,
          description: `Updated match map from ${match.map} to ${updatedMatch.map}`,
          timestamp: Date.now(),
        }),
      );
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

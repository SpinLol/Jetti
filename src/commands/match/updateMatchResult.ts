import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';
import { logger } from '../../util/logger';

interface PromptArgs {
  matchId: number;
  matchResult: string;
}

export default class UpdateMatchResultCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'update-match-result',
      aliases: ['umr'],
      group: 'match',
      memberName: 'update-match-result',
      description: 'Updates match result for given match ID',
      argsCount: 2,
      args: [
        {
          key: 'matchId',
          prompt: 'What is the match ID?',
          type: 'integer',
        },
        {
          key: 'matchResult',
          prompt: 'Who won? Team1 = 1, Team2 = 2, Draw = 0',
          type: 'string',
          oneOf: ['0', '1', '2'],
        },
      ],
    });
  }

  async run(message: CommandoMessage, { matchId, matchResult }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { match } = await sdk.GetMatchResult({ id: matchId });

      if (match == null) {
        return message.say(WarningEmbed(`Match with ID ${matchId} was not found!`));
      }

      const { updatedMatch } = await sdk.UpdateMatchResult({ id: matchId, result: Number(matchResult) });

      return message.say(
        new MessageEmbed({
          color: colors.success,
          title: `Match ID ${matchId}`,
          description: `Updated match result from ${match.matchResult} to ${updatedMatch.matchResult}`,
          timestamp: Date.now(),
        }),
      );
    } catch (err) {
      logger.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

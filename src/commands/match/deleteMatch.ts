import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';
import { logger } from '../../util/logger';

interface PromptArgs {
  matchId: number;
}

export default class DeleteMatchCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'delete-match',
      aliases: ['dm'],
      group: 'match',
      memberName: 'delete-match',
      description: 'Deletes a match in the database',
      argsCount: 1,
      args: [
        {
          key: 'matchId',
          prompt: 'What is the id of the match?',
          type: 'integer',
        },
      ],
      ownerOnly: true,
    });
  }

  async run(message: CommandoMessage, { matchId }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { match } = await sdk.findMatch({ id: matchId });

      if (match == null) {
        return message.say(WarningEmbed(`Match with ID ${matchId} was not found!`));
      }

      const { deletedMatch } = await sdk.DeleteMatch({ id: matchId });

      return message.say(
        new MessageEmbed({
          color: colors.danger,
          description: 'Successfully deleted Match!',
          timestamp: Date.now(),
          footer: { text: `ID ${deletedMatch.id}` },
        }),
      );
    } catch (err) {
      logger.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

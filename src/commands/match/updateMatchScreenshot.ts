import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';

interface PromptArgs {
  matchId: number;
}

export default class UpdateMatchScreenshot extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'update-match-screenshot',
      aliases: ['ums', 'screenshot'],
      group: 'match',
      memberName: 'update-match-screenshot',
      description: 'Updates the screenshot of a Match',
      argsCount: 1,
      args: [
        {
          key: 'matchId',
          prompt: 'What is the match ID?',
          type: 'integer',
        },
      ],
    });
  }

  async run(message: CommandoMessage, { matchId }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { match } = await sdk.GetMatchScreenshot({ id: matchId });

      if (match == null) {
        return message.say(WarningEmbed(`Match with ID ${matchId} was not found!`));
      }

      if (message.attachments.size === 0) {
        return message.say(WarningEmbed('No screenshot attached!'));
      }

      const { updatedMatch } = await sdk.UpdateMatchScreenshot({
        id: matchId,
        screenshot: message.attachments.first().url,
      });

      return message.say(
        new MessageEmbed({
          color: colors.success,
          title: `Match ID ${matchId}`,
          description: `Updated match screenshot from ${match.screenshotPath} to ${updatedMatch.screenshotPath}`,
          image: { url: updatedMatch.screenshotPath },
          timestamp: Date.now(),
        }),
      );
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

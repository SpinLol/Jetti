import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';
import { playerToString } from '../../core/print';
import { logger } from '../../util/logger';

interface PromptArgs {
  teamId: number;
}

export default class GetTeamCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'get-team',
      aliases: ['gt'],
      group: 'team',
      memberName: 'get-team',
      description: 'Get info about team',
      argsCount: 1,
      args: [
        {
          key: 'teamId',
          prompt: 'What is the team ID?',
          type: 'integer',
        },
      ],
    });
  }

  async run(message: CommandoMessage, { teamId }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { team } = await sdk.GetTeam({ id: teamId });

      if (team == null) {
        return message.say(WarningEmbed(`Team with ID ${teamId} was not found!`));
      }

      const players = [
        playerToString(team.PlayerH1),
        playerToString(team.PlayerH2),
        playerToString(team.PlayerH3),
        playerToString(team.PlayerH4),
        playerToString(team.PlayerH5),
      ];

      return message.say(
        new MessageEmbed({
          color: colors.primary,
          title: `Team ${team.teamName}`,
          description: players.join('\n'),
          timestamp: Date.now(),
          footer: { text: `ID ${teamId}` },
        }),
      );
    } catch (err) {
      logger.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

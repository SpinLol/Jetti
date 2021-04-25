import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';

interface PromptArgs {
  teamId: number;
}

export default class DeleteTeamCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'delete-team',
      aliases: ['dt'],
      group: 'team',
      memberName: 'delete-team',
      description: 'Deletes a team in the database',
      argsCount: 1,
      args: [
        {
          key: 'teamId',
          prompt: 'What is the id of the team?',
          type: 'integer',
        },
      ],
    });
  }

  async run(message: CommandoMessage, { teamId }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { team } = await sdk.findTeam({ id: teamId });

      if (team == null) {
        return message.say(WarningEmbed(`Team with ID ${teamId} was not found`));
      }

      const { deletedTeam } = await sdk.DeleteTeam({ id: teamId });

      return message.say(
        new MessageEmbed({
          color: colors.danger,
          title: `Team ${deletedTeam.teamName}`,
          description: 'Successfully deleted team!',
          timestamp: Date.now(),
          footer: { text: `ID ${teamId}` },
        }),
      );
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

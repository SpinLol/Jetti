import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';

interface PromptArgs {
  teamId: number;
  newTeamName: string;
}

export default class UpdateTeamNameCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'update-team-name',
      aliases: ['utn'],
      group: 'team',
      memberName: 'update-team-name',
      description: 'Updates the team name',
      argsCount: 2,
      args: [
        {
          key: 'teamId',
          prompt: 'What is the id of the team?',
          type: 'integer',
        },
        {
          key: 'newTeamName',
          prompt: 'What is the new name of the team?',
          type: 'string',
        },
      ],
    });
  }

  async run(message: CommandoMessage, { teamId, newTeamName }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { team } = await sdk.GetTeamName({ id: teamId });

      if (team == null) {
        return message.say(WarningEmbed(`Team with ID ${teamId} was not found!`));
      }

      const { updatedTeam } = await sdk.UpdateTeamName({ id: teamId, name: newTeamName });

      return message.say(
        new MessageEmbed({
          title: `Team ${updatedTeam.teamName}`,
          description: `Updated team name from ${team.teamName} to ${updatedTeam.teamName}`,
          color: colors.success,
          timestamp: Date.now(),
          footer: { text: `ID ${updatedTeam.id}` },
        }),
      );
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

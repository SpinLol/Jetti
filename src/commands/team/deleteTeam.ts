import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Team } from '../../db/models';

interface PromptArgs {
  teamId: number;
}

export default class DeleteTeamCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'delete-team',
      aliases: ['dt', 'remove-team', 'rt'],
      group: 'team',
      memberName: 'delete-team',
      description: 'Deletes a team entry in the database',
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

  async run(msg: CommandoMessage, { teamId }: PromptArgs) {
    const teamToDelete = await Team.findOne({
      where: { id: teamId },
    });

    if (teamToDelete == null) {
      return msg.say(`Team with ID \`${teamId}\` is not in the database...`);
    }

    await teamToDelete.destroy();

    return msg.say(`Team \`${teamId}\` was successfully removed from the database!`);
  }
}

import { Message } from 'discord.js';
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
    const end = new Message(null, null, msg.channel);

    const teamToDelete = await Team.findOne({
      where: { id: teamId },
    });

    if (teamToDelete == null) {
      msg.say(`Team with ID \`${teamId}\` is not in the database...`);
      return end;
    }

    await teamToDelete.destroy();

    msg.say(`Team \`${teamId}\` was successfully removed from the database!`);
    return end;
  }
}

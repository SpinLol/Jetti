import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Team } from '../../db/models';

interface PromptArgs {
  teamIdStr: string;
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
          key: 'teamIdStr',
          prompt: 'What is the id of the team?',
          type: 'string',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { teamIdStr }: PromptArgs) {
    const end = new Message(null, null, msg.channel);
    const teamIdInt = parseInt(teamIdStr);

    const teamToDelete = await Team.findOne({
      where: { id: teamIdInt },
    });

    if (teamToDelete == null) {
      msg.say(`Team with ID \`${teamIdStr}\` is not in the database...`);
      return end;
    }

    await teamToDelete.destroy();

    msg.say(`Team \`${teamIdStr}\` was successfully removed from the database!`);
    return end;
  }
}

import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Team } from '../../db/models';

interface PromptArgs {
  teamId: number;
  newTeamName: string;
}

export default class UpdateTeamCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'update-team-name',
      aliases: ['utn'],
      group: 'team',
      memberName: 'update-team-name',
      description: 'Changes the team-name of a team entry in the database',
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

  async run(msg: CommandoMessage, { teamId, newTeamName }: PromptArgs) {
    const end = new Message(null, null, msg.channel);

    const teamToEdit = await Team.findOne({
      where: { id: teamId },
    });

    if (teamToEdit == null) {
      msg.say(`Team with ID \`${teamId}\` is not in the database...`);
      return end;
    }

    msg.say(teamToEdit);

    teamToEdit.teamName = newTeamName;
    teamToEdit.save();

    msg.say(`Team \`${teamId}\` was renamed to \`${teamToEdit.teamName}\``);
    return end;
  }
}

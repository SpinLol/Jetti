import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Team } from '../../db/models';

interface PromptArgs {
  teamIdStr: string;
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
          key: 'teamIdStr',
          prompt: 'What is the id of the team?',
          type: 'string',
        },
        {
          key: 'newTeamName',
          prompt: 'What is the new name of the team?',
          type: 'string',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { teamIdStr, newTeamName }: PromptArgs) {
    const end = new Message(null, null, msg.channel);
    const teamIdInt = parseInt(teamIdStr);

    const teamToEdit = await Team.findOne({
      where: { id: teamIdInt },
    });

    if (teamToEdit == null) {
      msg.say(`Team with ID \`${teamIdStr}\` is not in the database...`);
      return end;
    }

    msg.say(teamToEdit);

    teamToEdit.teamName = newTeamName;
    teamToEdit.save();

    msg.say(`Team \`${teamIdStr}\` was renamed to \`${teamToEdit.teamName}\``);
    return end;
  }
}

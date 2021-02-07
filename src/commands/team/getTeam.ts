import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { printTeam } from '../../core/print';

import { Team } from '../../db/models';

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

  async run(msg: CommandoMessage, { teamId }: PromptArgs) {
    const team = await Team.findOne({ where: { id: teamId }, include: [{ all: true }] });

    if (team == null) {
      return msg.say(`Team \`${teamId}\` was not found!`);
    }

    return msg.say(printTeam(team));
  }
}

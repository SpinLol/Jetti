import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

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
      msg.say(`Team \`${teamId}\` was not found!`);
      return new Message(null, null, msg.channel);
    }

    msg.say(this.printTeam(team));
    return new Message(null, null, msg.channel);
  }

  printTeam(team: Team): string {
    let res = '```\n';
    res += `Team ${team.teamName} (ID: ${team.id})`;
    res += `\n\tLevel ${team.player1.skillLevel}\t${team.player1.userTag}`;
    res += `\n\tLevel ${team.player2.skillLevel}\t${team.player2.userTag}`;
    res += `\n\tLevel ${team.player3.skillLevel}\t${team.player3.userTag}`;
    res += `\n\tLevel ${team.player4.skillLevel}\t${team.player4.userTag}`;
    res += `\n\tLevel ${team.player5.skillLevel}\t${team.player5.userTag}`;
    res += '\n```';
    return res;
  }
}

import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Player, Team } from '../../db/models';

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
    const player1 = await Player.findOne({ where: { id: team.player1.playerId } });
    const player2 = await Player.findOne({ where: { id: team.player2.playerId } });
    const player3 = await Player.findOne({ where: { id: team.player3.playerId } });
    const player4 = await Player.findOne({ where: { id: team.player4.playerId } });
    const player5 = await Player.findOne({ where: { id: team.player5.playerId } });

    if (team == null) {
      msg.say(`Team \`${teamId}\` was not found!`);
      return new Message(null, null, msg.channel);
    }

    msg.say(this.printTeam(team, player1, player2, player3, player4, player5));
    return new Message(null, null, msg.channel);
  }

  printTeam(team: Team, player1: Player, player2: Player, player3: Player, player4: Player, player5: Player): string {
    let res = '```\n';
    res += `Team ${team.teamName} (ID: ${team.id})`;
    res += `\n\tLevel ${team.player1.skillLevel}\t${player1.userTag}`;
    res += `\n\tLevel ${team.player2.skillLevel}\t${player2.userTag}`;
    res += `\n\tLevel ${team.player3.skillLevel}\t${player3.userTag}`;
    res += `\n\tLevel ${team.player4.skillLevel}\t${player4.userTag}`;
    res += `\n\tLevel ${team.player5.skillLevel}\t${player5.userTag}`;
    res += '\n```';
    return res;
  }
}

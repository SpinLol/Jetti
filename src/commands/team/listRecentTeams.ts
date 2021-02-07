import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { printTeam } from '../../core/print';

import { Team } from '../../db/models';

interface PromptArgs {
  amount: number;
}

export default class ListTeamsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'list-recent-teams',
      aliases: ['lrt', 'list-latest-teams'],
      group: 'team',
      memberName: 'list-recent-teams',
      description: 'Lists # most recent teams in the database',
      argsCount: 1,
      args: [
        {
          key: 'amount',
          prompt: 'How many teams do you want to see (max = 20)',
          type: 'integer',
          default: 10,
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { amount }: PromptArgs) {
    amount = Math.max(0, Math.min(amount, 20));

    const nMostRecentTeams = await Team.findAll({
      limit: amount,
      order: [['createdAt', 'DESC']],
    });

    nMostRecentTeams.reverse();

    if (nMostRecentTeams.length == 0 && amount != 0) {
      return msg.say('No teams in database');
    } else if (nMostRecentTeams.length == 1) {
      msg.say(`Most recent team in database:`);
    } else if (nMostRecentTeams.length < amount) {
      msg.say(`Only found ${nMostRecentTeams.length} team(s):`);
    } else {
      msg.say(`${amount} most recent teams teams:`);
    }

    let res = '```'; // + nMostRecentTeams.length + ' most recent teams:\n';
    for (const team of nMostRecentTeams) {
      res += '\n' + (await printTeam(team));
    }
    res += '\n```';
    return msg.say(res);
  }

  // async teamToString(team: Team): Promise<string> {
  //   let res = ('' + team.id).padStart(3) + ' | ' + team.teamName + ' | ';
  //   const playerHs = [];

  //   playerHs.push(await PlayerH.findOne({ where: { id: team.playerId1 } }));
  //   playerHs.push(await PlayerH.findOne({ where: { id: team.playerId2 } }));
  //   playerHs.push(await PlayerH.findOne({ where: { id: team.playerId3 } }));
  //   playerHs.push(await PlayerH.findOne({ where: { id: team.playerId4 } }));
  //   playerHs.push(await PlayerH.findOne({ where: { id: team.playerId5 } }));

  //   for (const player of playerHs) {
  //     res += player.userTag.substring(0, player.userTag.length - 5) + ', '; //maybe print out nicknames?
  //   }
  //   return res.substring(0, res.length - 2);
  // }
}

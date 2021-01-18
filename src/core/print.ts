import { Team } from '../db/models';

export function printTeam(team: Team): string {
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

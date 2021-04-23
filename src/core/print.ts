import { Team } from '../db/models';

export function printTeam(team: Team): string {
  const skillTotal =
    team.player1.skillLevel +
    team.player2.skillLevel +
    team.player3.skillLevel +
    team.player4.skillLevel +
    team.player5.skillLevel;

  let res = '```\n';
  res += `Team ${team.teamName} (Total Skill: ${skillTotal} | ID: ${team.id})`;
  res += `\n\tLevel ${team.player1.skillLevel}\t${team.player1.userTag}`;
  res += `\n\tLevel ${team.player2.skillLevel}\t${team.player2.userTag}`;
  res += `\n\tLevel ${team.player3.skillLevel}\t${team.player3.userTag}`;
  res += `\n\tLevel ${team.player4.skillLevel}\t${team.player4.userTag}`;
  res += `\n\tLevel ${team.player5.skillLevel}\t${team.player5.userTag}`;
  res += '\n```';
  return res;
}

export function printLevelName(skillLevel: number): string {
  if (skillLevel < 2) {
    return 'Iron';
  }
  if (skillLevel < 3) {
    return 'Bronze';
  }
  if (skillLevel < 4) {
    return 'Silver';
  }
  if (skillLevel < 5) {
    return 'Gold';
  }
  if (skillLevel < 6) {
    return 'Platinum';
  }
  if (skillLevel < 7) {
    return 'Diamond';
  }
  if (skillLevel < 8) {
    return 'Immortal';
  }
  if (skillLevel < 9) {
    return 'Radiant';
  }

  return 'UNKNOWN';
}

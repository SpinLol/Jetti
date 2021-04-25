import { GetPlayerQuery, GetTeamQuery } from '../api/generated/graphql';

export function playerToString(player: GetPlayerQuery['player'] | GetTeamQuery['team']['PlayerH1']): string {
  return `${player.userTag} (${printLevelName(player.skillLevel)})`;
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

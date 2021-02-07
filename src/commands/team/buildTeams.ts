import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Player } from '../../db/models';
import { shuffle } from '../../util/arrayHelper';
import { neededUsers } from '../../constants';

export default class buildTeamsCommand extends Command {
  randomAliases = ['r', 'rand', 'random'];
  constructor(client: CommandoClient) {
    super(client, {
      name: 'build',
      group: 'team',
      memberName: 'build',
      description: 'Drafts two fair or unfair teams',
    });
  }

  async run(msg: CommandoMessage, rawArgs: string) {
    const tries = 10;
    let userIds: string[];
    const channel = msg.member.voice.channel;

    const args = rawArgs.trim().split(/ +/);
    const isRandom = this.randomAliases.some((v) => args.includes('-' + v));

    if (rawArgs.trim() === '') {
      if (channel == null) {
        return msg.reply('You are not in a voice channel!');
      }

      if (channel.members.size < neededUsers) {
        return msg.say('There are not enough players in the voice channel.');
      } else if (channel.members.size > neededUsers) {
        return msg.say('There are too many players in the voice channel. Can not choose players.');
      }

      userIds = channel.members.map((_, k) => k);
      return await this.buildTeams(msg, userIds, neededUsers, tries, isRandom);
    }

    if (channel == null && msg.mentions.users.size == 0) {
      return msg.reply('You are not in a voice channel and forgot to mention enough players.');
    }

    if (msg.mentions.users.size == 0) {
      return msg.say('You forgot to choose the remaining players.');
    }

    if (msg.mentions.users.size == neededUsers) {
      userIds = msg.mentions.users.map((_, k) => k);
      return await this.buildTeams(msg, userIds, neededUsers, tries, isRandom);
    }

    if (channel == null) {
      return msg.reply('You are not in a voice channel.');
    }

    userIds = channel.members.map((_, k) => k).concat(msg.mentions.users.map((_, k) => k));

    if (userIds.length < neededUsers) {
      return msg.reply(`You didn't mention enough players. ${neededUsers - userIds.length} players are missing.`);
    } else if (userIds.length > neededUsers) {
      return msg.reply(`You mentioned too many players. You need ${neededUsers} players, not ${userIds.length}`);
    }

    return await this.buildTeams(msg, userIds, neededUsers, tries, isRandom);
  }

  async buildTeams(msg: CommandoMessage, userIds: string[], playerCount: number, tries: number, isRandom: boolean) {
    const half = Math.ceil(playerCount / 2);
    const players = await Player.findAll({ where: { userId: userIds } });
    const maxSkillGap = 1;

    if (players.length < playerCount) {
      return msg.say(`${playerCount - players.length} players are not in the database. Add them first and try again.`);
    }

    for (let i = 0; i < tries; i++) {
      const p = players.slice();
      shuffle(p);

      const team1 = p.splice(0, half);
      const team2 = p.splice(-half);

      const skill1 = team1.reduce(this.totalSkillLevel, 0);
      const skill2 = team2.reduce(this.totalSkillLevel, 0);

      if (isRandom || Math.abs(skill1 - skill2) <= maxSkillGap) {
        const teamNames1 = team1.reduce(this.printTeamMembers, '');
        const teamNames2 = team2.reduce(this.printTeamMembers, '');

        return msg.say(this.printTeams(teamNames1, teamNames2));
      }
    }

    return msg.say(`Could not create fair teams after trying ${tries} times. Try again.`);
  }

  printTeams(team1: string, team2: string): string {
    let res = '```\n';
    res += 'Team 1';
    res += team1;
    res += '\nTeam 2';
    res += team2;
    res += '\n```';

    return res;
  }

  printTeamMembers(prev: string, { userTag, skillLevel }: Player): string {
    return `${prev}\n\tLevel ${skillLevel} \t ${userTag}`;
  }

  totalSkillLevel(total: number, player: Player): number {
    return total + player.skillLevel;
  }
}

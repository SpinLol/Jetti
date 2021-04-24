import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { shuffle } from '../../util/arrayHelper';
import { colors, neededUsers } from '../../constants';
import { WarningEmbed } from '../../core/customEmbeds';
import { apiClient } from '../../api/client';
import { GetPlayersWithUserIdsQuery, getSdk } from '../../api/generated/graphql';
import { MessageEmbed } from 'discord.js';
import { playerToString } from '../../core/print';

const randomAliases = ['r', 'rand', 'random'];
const tries = 10;

export default class buildTeamsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'build',
      group: 'team',
      memberName: 'build',
      description: 'Drafts two fair or unfair teams',
    });
  }

  async run(message: CommandoMessage, rawArgs: string) {
    const userIds: string[] = [];
    const channel = message.member.voice.channel;

    const args = rawArgs.trim().split(/ +/);
    const isRandom = randomAliases.some((v) => args.includes('-' + v));

    if (channel != null) {
      userIds.push(...channel.members.map((_, k) => k));
    }

    userIds.push(...message.mentions.users.map((_, k) => k));

    if (userIds.length < neededUsers) {
      return message.say(WarningEmbed('Not enough players selected'));
    }

    if (userIds.length > neededUsers) {
      return message.say(WarningEmbed('Too many players selected'));
    }

    const sdk = getSdk(apiClient);
    const { players } = await sdk.GetPlayersWithUserIds({ userIds: channel.members.map((_, k) => k) });

    const missingUsers = channel.members.filter((_, userId) => {
      return players.find((player) => player.userId === userId) == undefined;
    });

    if (missingUsers.size > 0) {
      return message.say(WarningEmbed(`Some players are missing in the database! Try ${this.client.commandPrefix}lmp`));
    }

    const teams = this.buildTeams(players, tries, isRandom);

    if (teams.length === 0) {
      return message.say(WarningEmbed(`Couldn't create fair teams after trying ${tries} times! Try again`));
    }

    return message.say(
      new MessageEmbed({
        color: colors.success,
        title: 'Successfully built teams!',
        fields: [
          {
            name: 'Team 1',
            value: players
              .splice(0, 5)
              .map((p) => playerToString(p))
              .join('\n'),
          },
          {
            name: '\u200b',
            value: '\u200b',
          },
          {
            name: 'Team 2',
            value: players
              .splice(-5)
              .map((p) => playerToString(p))
              .join('\n'),
          },
        ],
        timestamp: Date.now(),
      }),
    );
  }

  buildTeams(
    players: GetPlayersWithUserIdsQuery['players'],
    tries: number,
    isRandom: boolean,
  ): GetPlayersWithUserIdsQuery['players'] {
    const half = Math.ceil(players.length / 2);
    const skillGap = 1;

    for (let i = 0; i < tries; i++) {
      shuffle(players);

      if (isRandom) {
        return players;
      }

      const team1 = players.splice(0, half);
      const team2 = players.splice(-half);

      const totalSkillTeam1 = team1.reduce((t, p) => t + p.skillLevel, 0);
      const totalSkillTeam2 = team2.reduce((t, p) => t + p.skillLevel, 0);

      if (Math.abs(totalSkillTeam1 - totalSkillTeam2) <= skillGap) {
        return players;
      }
    }

    return [];
  }
}

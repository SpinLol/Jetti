import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';
import { playerToString } from '../../core/print';

interface PromptArgs {
  matchId: number;
}

export default class GetMatchCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'get-match',
      aliases: ['gm'],
      group: 'match',
      memberName: 'get-match',
      description: 'Get info about match',
      argsCount: 1,
      args: [
        {
          key: 'matchId',
          prompt: 'What is the match ID?',
          type: 'integer',
        },
      ],
    });
  }

  async run(message: CommandoMessage, { matchId }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { match } = await sdk.GetMatch({ id: matchId });

      if (match == null) {
        return message.say(WarningEmbed(`Match with ID ${matchId} was not found!`));
      }

      const team1Players = [
        match.Team1.PlayerH1,
        match.Team1.PlayerH2,
        match.Team1.PlayerH3,
        match.Team1.PlayerH4,
        match.Team1.PlayerH5,
      ];
      const team2Players = [
        match.Team2.PlayerH1,
        match.Team2.PlayerH2,
        match.Team2.PlayerH3,
        match.Team2.PlayerH4,
        match.Team2.PlayerH5,
      ];

      let winnerTeam = 'Nobody - Draw';
      if (match.matchResult !== 0) {
        winnerTeam = `Team ${match.matchResult === 1 ? match.Team1.teamName : match.Team2.teamName}`;
      }

      return message.say(
        new MessageEmbed({
          color: colors.primary,
          title: `Team ${match.Team1.teamName} vs Team ${match.Team2.teamName}`,
          fields: [
            {
              name: 'Winner',
              value: winnerTeam,
              inline: true,
            },
            {
              name: 'Map',
              value: match.map,
              inline: true,
            },
            {
              name: 'Date',
              value: match.updatedAt,
              inline: true,
            },
            {
              name: `Team ${match.Team1.teamName}`,
              value: team1Players.map((p) => playerToString(p)).join('\n'),
            },
            {
              name: '\u200b',
              value: '\u200b',
            },
            {
              name: `Team ${match.Team2.teamName}`,
              value: team2Players.map((p) => playerToString(p)).join('\n'),
            },
          ],
          image: { url: match.screenshotPath },
          timestamp: Date.now(),
          footer: { text: `ID ${matchId}` },
        }),
      );
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

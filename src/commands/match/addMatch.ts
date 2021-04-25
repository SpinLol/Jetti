import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';
import { playerToString } from '../../core/print';

interface PromptArgs {
  teamId1: number;
  teamId2: number;
}

export default class AddMatchCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'add-match',
      aliases: ['am'],
      group: 'match',
      memberName: 'add-match',
      description: 'Creates a new match with 2 teams',
      argsCount: 2,
      args: [
        {
          key: 'teamId1',
          prompt: 'What is the ID from team1?',
          type: 'integer',
        },
        {
          key: 'teamId2',
          prompt: 'What is the ID from team2?',
          type: 'integer',
        },
      ],
    });
  }

  async run(message: CommandoMessage, { teamId1, teamId2 }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { teams } = await sdk.GetTeams({ id1: teamId1, id2: teamId2 });

      if (teams.length !== 2) {
        return message.say(WarningEmbed('Provided Teams were not found!'));
      }

      const { match } = await sdk.AddMatch({ team1Id: teamId1, team2Id: teamId2 });

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

      return message.say(
        new MessageEmbed({
          color: colors.success,
          title: `Successfully created Match between Team ${match.Team1.teamName} & Team ${match.Team2.teamName}`,
          fields: [
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
          timestamp: Date.now(),
          footer: { text: `ID ${match.id}` },
        }),
      );
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

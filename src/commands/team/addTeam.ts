import { User, MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { printLevelName } from '../../core/print';
import { colors } from '../../constants';
import { ErrorEmbed } from '../../core/customEmbeds';

interface PromptArgs {
  teamName: string;
  user1: User;
  user2: User;
  user3: User;
  user4: User;
  user5: User;
}

export default class AddTeamCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'add-team',
      aliases: ['at'],
      group: 'team',
      memberName: 'add-team',
      description: 'Creates a new team with 5 players',
      argsCount: 6,
      args: [
        {
          key: 'teamName',
          prompt: 'What is the name of the team?',
          type: 'string',
        },
        {
          key: 'user1',
          prompt: 'Who is Player 1? Ping him (@username)',
          type: 'user',
        },
        {
          key: 'user2',
          prompt: 'Who is Player 2? Ping him (@username)',
          type: 'user',
        },
        {
          key: 'user3',
          prompt: 'Who is Player 3? Ping him (@username)',
          type: 'user',
        },
        {
          key: 'user4',
          prompt: 'Who is Player 4? Ping him (@username)',
          type: 'user',
        },
        {
          key: 'user5',
          prompt: 'Who is Player 5? Ping him (@username)',
          type: 'user',
        },
      ],
    });
  }

  async run(message: CommandoMessage, { teamName, user1, user2, user3, user4, user5 }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { players } = await sdk.GetPlayers({
        userIds: [user1.id, user2.id, user3.id, user4.id, user5.id],
      });

      if (players.length < 5) {
        return message.reply(
          `There are missing players in the database. Use \`${this.client.commandPrefix}lmp\` to find out who`,
        );
      }

      const { team } = await sdk.CreateTeamWithPlayers({
        data: {
          teamName: teamName,
          PlayerH1: {
            create: {
              Player: { connect: { userId: players[0].userId } },
              skillLevel: players[0].skillLevel,
              userTag: players[0].userTag,
            },
          },
          PlayerH2: {
            create: {
              Player: { connect: { userId: players[1].userId } },
              skillLevel: players[1].skillLevel,
              userTag: players[1].userTag,
            },
          },
          PlayerH3: {
            create: {
              Player: { connect: { userId: players[2].userId } },
              skillLevel: players[2].skillLevel,
              userTag: players[2].userTag,
            },
          },
          PlayerH4: {
            create: {
              Player: { connect: { userId: players[3].userId } },
              skillLevel: players[3].skillLevel,
              userTag: players[3].userTag,
            },
          },
          PlayerH5: {
            create: {
              Player: { connect: { userId: players[4].userId } },
              skillLevel: players[4].skillLevel,
              userTag: players[4].userTag,
            },
          },
        },
      });

      return message.say(
        new MessageEmbed({
          color: colors.primary,
          title: `Team ${team.teamName}`,
          timestamp: Date.now(),
          fields: [
            { name: 'Player 1', value: `${players[0].userTag} (${printLevelName(players[0].skillLevel)})` },
            { name: 'Player 2', value: `${players[1].userTag} (${printLevelName(players[1].skillLevel)})` },
            { name: 'Player 3', value: `${players[2].userTag} (${printLevelName(players[2].skillLevel)})` },
            { name: 'Player 4', value: `${players[3].userTag} (${printLevelName(players[3].skillLevel)})` },
            { name: 'Player 5', value: `${players[4].userTag} (${printLevelName(players[4].skillLevel)})` },
          ],
          footer: { text: `Team ID: ${team.id}` },
        }),
      );
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

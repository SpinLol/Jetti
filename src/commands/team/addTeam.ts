import { User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { neededUsers } from '../../constants';

import { Player, PlayerH, Team } from '../../db/models';

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

  async run(msg: CommandoMessage, { teamName, user1, user2, user3, user4, user5 }: PromptArgs) {
    const neededPlayers = Math.ceil(neededUsers / 2);
    const userIds = [user1.id, user2.id, user3.id, user4.id, user5.id];
    const foundPlayers = await Player.findAll({
      where: { userId: userIds },
    });

    if (foundPlayers.length < neededPlayers) {
      return msg.say(
        `Some of your players need to be in the database first! Amount: ${neededPlayers - foundPlayers.length}`,
      );
    }

    const now = Date.now();
    const team = new Team({
      teamName: teamName,
    });

    const player1 = new PlayerH({
      playerId: foundPlayers[0].id,
      player: foundPlayers[0],
      skillLevel: foundPlayers[0].skillLevel,
      userTag: foundPlayers[0].userTag,
      historyDate: now,
    });
    const player2 = new PlayerH({
      playerId: foundPlayers[1].id,
      player: foundPlayers[1],
      skillLevel: foundPlayers[1].skillLevel,
      userTag: foundPlayers[1].userTag,
      historyDate: now,
    });
    const player3 = new PlayerH({
      playerId: foundPlayers[2].id,
      player: foundPlayers[2],
      skillLevel: foundPlayers[2].skillLevel,
      userTag: foundPlayers[2].userTag,
      historyDate: now,
    });
    const player4 = new PlayerH({
      playerId: foundPlayers[3].id,
      player: foundPlayers[3],
      skillLevel: foundPlayers[3].skillLevel,
      userTag: foundPlayers[3].userTag,
      historyDate: now,
    });
    const player5 = new PlayerH({
      playerId: foundPlayers[4].id,
      player: foundPlayers[4],
      skillLevel: foundPlayers[4].skillLevel,
      userTag: foundPlayers[4].userTag,
      historyDate: now,
    });
    await player1.save();
    await player2.save();
    await player3.save();
    await player4.save();
    await player5.save();

    team.playerId1 = player1.id;
    team.playerId2 = player2.id;
    team.playerId3 = player3.id;
    team.playerId4 = player4.id;
    team.playerId5 = player5.id;

    await team.save();

    return msg.say(
      `Successfully created team ${team.teamName} (ID: ${team.id}) with \`${user1.tag}\`, \`${user2.tag}\`, \`${user3.tag}\`, \`${user4.tag}\` & \`${user5.tag}\` `,
    );
  }
}

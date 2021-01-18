import { Message, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Player, PlayerH, Team } from '../../db/models';

interface PromptArgs {
  teamId: number;
  user: User;
  newUser: User;
}

export default class ChangeTeamPlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'change-team-player',
      aliases: ['ctp'],
      group: 'team',
      memberName: 'change-team-player',
      description: 'Changes a player with another one.',
      argsCount: 3,
      args: [
        {
          key: 'teamId',
          prompt: 'What is the id of the team?',
          type: 'integer',
        },
        {
          key: 'user',
          prompt: 'Which player do you want to replace?',
          type: 'user',
        },
        {
          key: 'newUser',
          prompt: 'Who is the new player?',
          type: 'user',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { teamId, user, newUser }: PromptArgs) {
    const end = new Message(null, null, msg.channel);

    const team = await Team.findOne({ where: { id: teamId }, include: [{ all: true }] });

    if (team == null) {
      msg.say(`Team with ID \`${teamId}\` is not in the database...`);
      return end;
    }

    const player = await Player.findOne({ where: { userId: user.id } });

    if (player == null) {
      msg.say(`Player ${user.tag} is not in the database...`);
      return end;
    }

    const newPlayer = await Player.findOne({ where: { userId: newUser.id } });

    if (newPlayer == null) {
      msg.say(`Player ${newUser.tag} is not in the database...`);
      return end;
    }

    let isInTeam = false;

    if (team.player1.userTag === newPlayer.userTag) {
      isInTeam = true;
    } else if (team.player2.userTag === newPlayer.userTag) {
      isInTeam = true;
    } else if (team.player3.userTag === newPlayer.userTag) {
      isInTeam = true;
    } else if (team.player4.userTag === newPlayer.userTag) {
      isInTeam = true;
    } else if (team.player5.userTag === newPlayer.userTag) {
      isInTeam = true;
    }

    if (isInTeam) {
      msg.say(`Player ${newPlayer.userTag} is already in the team...`);
      return end;
    }

    const p = new PlayerH({
      playerId: newPlayer.id,
      player: newPlayer,
      skillLevel: newPlayer.skillLevel,
      userTag: newPlayer.userTag,
      historyDate: Date.now(),
    });
    await p.save();

    if (team.player1.userTag == player.userTag) {
      team.playerId1 = p.id;
    } else if (team.player2.userTag == player.userTag) {
      team.playerId2 = p.id;
    } else if (team.player3.userTag == player.userTag) {
      team.playerId3 = p.id;
    } else if (team.player4.userTag == player.userTag) {
      team.playerId4 = p.id;
    } else if (team.player5.userTag == player.userTag) {
      team.playerId5 = p.id;
    } else {
      msg.say(`Player ${user.tag} is not in this team (${teamId})`);
      p.destroy();
      return end;
    }

    await team.save();

    msg.say(`Team \`${teamId}\`: Player ${user.tag} was swapped out with ${newUser.tag}`);
    return end;
  }
}

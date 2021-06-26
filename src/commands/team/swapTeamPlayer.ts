import { MessageEmbed, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk, GetTeamAndCheckPlayersQuery } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';
import { logger } from '../../util/logger';

interface PromptArgs {
  teamId: number;
  user: User;
  newUser: User;
}

export default class SwapTeamPlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'swap-team-player',
      aliases: ['stp'],
      group: 'team',
      memberName: 'swap-team-player',
      description: 'Swaps a Player with another one.',
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

  async run(message: CommandoMessage, { teamId, user, newUser }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { team, player, newPlayer } = await sdk.GetTeamAndCheckPlayers({
        teamId: teamId,
        userId: user.id,
        newUserId: newUser.id,
      });

      if (team == null) {
        return message.say(WarningEmbed(`Team with ID ${teamId} was not found!`));
      }

      if (player == null) {
        return message.say(WarningEmbed(`User ${user.tag} is not in the database!`));
      }

      if (newPlayer == null) {
        return message.say(WarningEmbed(`User ${newUser.tag} is not in the database!`));
      }

      const { isInTeam, playerId } = hasPlayer(team, user);

      if (!isInTeam) {
        return message.say(WarningEmbed(`Player ${user.tag} is not in the team!`));
      }

      if (hasPlayer(team, newUser).isInTeam) {
        return message.say(WarningEmbed(`Player ${newUser.tag} is already in the team!`));
      }

      const { updatePlayerH } = await sdk.SwapPlayerH({
        id: playerId,
        playerId: newPlayer.id,
        skillLevel: newPlayer.skillLevel,
        userTag: newPlayer.userTag,
      });

      return message.say(
        new MessageEmbed({
          title: `Team ${team.teamName}`,
          color: colors.success,
          description: `Swapped Player ${user.tag} with ${updatePlayerH.userTag}`,
          timestamp: Date.now(),
          footer: { text: `ID ${team.id}` },
        }),
      );
    } catch (err) {
      logger.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

interface PlayerInfo {
  isInTeam: boolean;
  playerId?: number;
}

function hasPlayer(team: GetTeamAndCheckPlayersQuery['team'], user: User): PlayerInfo {
  if (team.PlayerH1.userTag === user.tag) {
    return { isInTeam: true, playerId: team.PlayerH1.id };
  } else if (team.PlayerH2.userTag === user.tag) {
    return { isInTeam: true, playerId: team.PlayerH2.id };
  } else if (team.PlayerH3.userTag === user.tag) {
    return { isInTeam: true, playerId: team.PlayerH3.id };
  } else if (team.PlayerH4.userTag === user.tag) {
    return { isInTeam: true, playerId: team.PlayerH4.id };
  } else if (team.PlayerH5.userTag === user.tag) {
    return { isInTeam: true, playerId: team.PlayerH5.id };
  }

  return { isInTeam: false, playerId: null };
}

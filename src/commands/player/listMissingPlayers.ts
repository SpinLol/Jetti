import { MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed } from '../../core/customEmbeds';
import { logger } from '../../util/logger';

export default class ListMissingPlayersCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'list-missing-players',
      aliases: ['lmp'],
      group: 'player',
      memberName: 'list-missing-players',
      description: 'Lists all players in the voice chat who are not in the database',
      argsCount: 0,
    });
  }

  async run(message: CommandoMessage) {
    const channel = message.member.voice.channel;
    if (channel == null) {
      return message.reply('You are not in a voice channel!');
    }

    const sdk = getSdk(apiClient);

    try {
      const { players } = await sdk.GetPlayersWithUserIds({ userIds: channel.members.map((_, k) => k) });

      const missingUsers = channel.members.filter((_, userId) => {
        return players.find((player) => player.userId === userId) == undefined;
      });

      if (missingUsers.size === 0) {
        return message.reply('All Players are in the database, nobody is missing :)');
      }

      return message.say(
        new MessageEmbed({
          color: colors.primary,
          title: 'Missing Players',
          description: missingUsers.map((guildMember) => `- ${guildMember.user.tag}`).join('\n'),
          timestamp: Date.now(),
        }),
      );
    } catch (err) {
      logger.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

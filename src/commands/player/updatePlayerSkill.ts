import { MessageEmbed, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';
import { colors } from '../../constants';
import { ErrorEmbed, WarningEmbed } from '../../core/customEmbeds';
import { printLevelName } from '../../core/print';

interface PromptArgs {
  user: User;
  level: number;
}

export default class UpdatePlayerSkillCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'update-player-skill',
      aliases: ['ups'],
      group: 'player',
      memberName: 'update-player-skill',
      description: 'Updates the skill level of a Player',
      argsCount: 2,
      args: [
        {
          key: 'user',
          prompt: "Which user's level do you want to update? Ping him (@username)",
          type: 'user',
        },
        {
          key: 'level',
          prompt: "What's his/her new skill level?",
          type: 'float',
          validate: (level: number) => level >= 1 && level <= 8,
        },
      ],
    });
  }

  async run(message: CommandoMessage, { user, level }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { player } = await sdk.GetPlayer({ userId: user.id });

      if (player == null) {
        return message.say(WarningEmbed(`Player \`${user.tag}\` is not in database!`));
      }

      const { updatedPlayer } = await sdk.UpdatePlayerSkill({ userId: user.id, level: level });
      const newSkillName = printLevelName(updatedPlayer.skillLevel);

      return message.say(
        new MessageEmbed({
          color: colors.success,
          title: user.tag,
          description: `Updated skill level from ${printLevelName(player.skillLevel)} to ${newSkillName}`,
          timestamp: Date.now(),
        }),
      );
    } catch (err) {
      console.error(err);
      return message.say(ErrorEmbed(err.message));
    }
  }
}

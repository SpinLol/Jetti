import { User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';

interface PromptArgs {
  user: User;
  level: number;
}

export default class UpdatePlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'update-player',
      aliases: ['up'],
      group: 'player',
      memberName: 'update-player',
      description: 'Updates the level of a Player',
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
        return message.say(`Player \`${user.tag}\` is not in database!`);
      }

      const { updatedPlayer } = await sdk.UpdatePlayer({ userId: user.id, level: level });

      return message.say(
        `Player \`${user.tag}\`' skill level has been updated from ${player.skillLevel} to ${updatedPlayer.skillLevel}!`,
      );
    } catch (err) {
      console.error(err);
      return message.say(`Error happened while trying \`${message.content}\``);
    }
  }
}

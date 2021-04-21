import { User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';

interface PromptArgs {
  user: User;
}

export default class GetPlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'get-player',
      aliases: ['gp'],
      group: 'player',
      memberName: 'get-player',
      description: 'Get information about a Player',
      argsCount: 1,
      args: [
        {
          key: 'user',
          prompt: 'Which player do you want? Ping him! (@username)',
          type: 'user',
        },
      ],
    });
  }

  async run(message: CommandoMessage, { user }: PromptArgs) {
    const sdk = getSdk(apiClient);

    try {
      const { player } = await sdk.GetPlayer({ userId: user.id });

      if (player == null) {
        return message.say(`Player \`${user.tag}\` is not in database!`);
      }

      return message.say(`Player \`${user.tag}\` has the skill level ${player.skillLevel}`);
    } catch (err) {
      console.error(err);
      return message.say(`Error happened while trying \`${message.content}\``);
    }
  }
}

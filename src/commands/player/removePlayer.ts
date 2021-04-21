import { User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';

interface PromptArgs {
  user: User;
}

export default class RemovePlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'remove-player',
      aliases: ['rp'],
      group: 'player',
      memberName: 'remove-player',
      description: 'Removes a player from the database',
      argsCount: 1,
      args: [
        {
          key: 'user',
          prompt: 'Which user do you wanna add? Ping him (@UserName)',
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

      const { removedPlayer } = await sdk.RemovePlayer({ userId: user.id });

      return message.say(`Player \`${removedPlayer.userTag}\` was successfully removed from the database!`);
    } catch (err) {
      console.error(err);
      return message.say(`Error happened while trying \`${message.content}\``);
    }
  }
}

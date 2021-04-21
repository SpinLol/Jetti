import { User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { apiClient } from '../../api/client';
import { getSdk } from '../../api/generated/graphql';

interface PromptArgs {
  user: User;
  level: number;
}

export default class AddPlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'add-player',
      aliases: ['ap'],
      group: 'player',
      memberName: 'add-player',
      description: 'Adds a new Player to the database',
      argsCount: 2,
      args: [
        {
          key: 'user',
          prompt: 'Which user do you wanna add? Ping him (@username)',
          type: 'user',
        },
        {
          key: 'level',
          prompt: "What's his/her skill level?",
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

      if (player != null) {
        return message.say(`Player \`${user.tag}\` was already added!`);
      }

      const { newPlayer } = await sdk.AddPlayer({ userId: user.id, level: level, userTag: user.tag });

      return message.say(
        `Player \`${newPlayer.userTag}\` has the skill level ${newPlayer.skillLevel} and was added successfully!`,
      );
    } catch (err) {
      console.error(err);
      return message.say(`Error happened while trying \`${message.content}\``);
    }
  }
}

import { User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

interface PromptArgs {
  user: User;
}

export default class GetUserImageCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'get-user-image',
      aliases: ['gui'],
      group: 'player',
      memberName: 'get-user-image',
      description: 'Get a users discord profile image',
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
    return message.say(user.avatarURL({ size: 2048 }));
  }
}

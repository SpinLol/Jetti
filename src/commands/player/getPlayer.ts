import { User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Player } from '../../db/models';

interface PromptArgs {
  user: User;
}

export default class GetPlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'get-player',
      aliases: ['get', 'g'],
      group: 'player',
      memberName: 'get',
      description: 'Get Information about a Player',
      argsCount: 1,
      args: [
        {
          key: 'user',
          prompt: 'Who do you want to know about? Ping him (@username)',
          type: 'user',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { user }: PromptArgs) {
    const foundPlayer = await Player.findOne({
      where: { userId: user.id },
    });

    if (foundPlayer == null) {
      return msg.say(`Player \`${user.tag}\` is not in database!`);
    }

    return msg.say(`Player \`${user.tag}\` has the skill level ${foundPlayer.skillLevel}`);
  }
}

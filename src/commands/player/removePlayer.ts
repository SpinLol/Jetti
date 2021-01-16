import { Message, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import Player from '../../db/models/Player.model';

interface PromptArgs {
  user: User;
}

export default class RemovePlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'remove-player',
      aliases: ['remove', 'del', 'delete', 'r'],
      group: 'player',
      memberName: 'remove',
      description: 'Removes a given Player from the database',
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

  async run(msg: CommandoMessage, { user }: PromptArgs) {
    const player = await Player.findOne({
      where: { userId: user.id },
    });

    if (player == null) {
      msg.say(`Player \`${user.tag}\` is not in the database...`);
      return new Message(null, null, msg.channel);
    }

    await player.destroy();

    msg.say(`Player \`${user.tag}\` was successfully removed from the database!`);
    return new Message(null, null, msg.channel);
  }
}

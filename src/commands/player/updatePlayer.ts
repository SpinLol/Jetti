import { Message, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Player } from '../../db/models';

interface PromptArgs {
  user: User;
  level: number;
}

export default class UpdatePlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'update-player',
      aliases: ['update', 'u'],
      group: 'player',
      memberName: 'update',
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
          validate: (level: number) => level >= 1 && level <= 5,
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { user, level }: PromptArgs) {
    const foundPlayer = await Player.findOne({
      where: { userId: user.id },
    });

    if (foundPlayer == null) {
      msg.say(`Player \`${user.tag}\` is not in database!`);
      return new Message(null, null, msg.channel);
    }

    foundPlayer.skillLevel = level;
    foundPlayer.save();

    msg.say(`Player \`${user.tag}\`' skill level has been updated to ${foundPlayer.skillLevel}!`);
    return new Message(null, null, msg.channel);
  }
}

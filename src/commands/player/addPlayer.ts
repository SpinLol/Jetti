import { Message, User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import Player from '../../db/models/Player.model';

interface PromptArgs {
  user: User;
  level: number;
}

export default class AddPlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'add-player',
      aliases: ['add', 'a'],
      group: 'player',
      memberName: 'add',
      description: 'Adds a new Player to the db',
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
          validate: (level: number) => level >= 1 && level <= 5,
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { user, level }: PromptArgs) {
    const foundPlayer = await Player.findOne({
      where: { userId: user.id },
    });

    if (foundPlayer != null) {
      msg.say(`Player \`${user.tag}\` was already added!`);
      return new Message(null, null, msg.channel);
    }

    const player = new Player({
      userId: user.id,
      skillLevel: level,
      userTag: msg.guild.members.cache.get(user.id).user.tag,
    });
    await player.save();

    msg.say(`Player \`${player.userTag}\` has the skill level ${player.skillLevel} and was added successfully!`);
    return new Message(null, null, msg.channel);
  }
}

import { User } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Player } from '../../db/models';

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
          validate: (level: number) => level >= 1 && level <= 6,
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { user, level }: PromptArgs) {
    const foundPlayer = await Player.findOne({
      where: { userId: user.id },
    });

    if (foundPlayer != null) {
      return msg.say(`Player \`${user.tag}\` was already added!`);
    }

    const player = new Player({
      userId: user.id,
      skillLevel: level,
      userTag: msg.guild.members.cache.get(user.id).user.tag,
    });
    await player.save();

    return msg.say(`Player \`${player.userTag}\` has the skill level ${player.skillLevel} and was added successfully!`);
  }
}

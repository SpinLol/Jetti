/* eslint-disable @typescript-eslint/ban-types */
import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export default class AddPlayerCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'add-player',
      aliases: ['add'],
      group: 'player',
      memberName: 'add',
      description: 'Adds a new Player to the db',
      argsCount: 2,
      args: [
        {
          key: 'user',
          prompt: 'Which User?',
          type: 'user',
        },
        {
          key: 'level',
          prompt: 'Skill Level?',
          type: 'integer',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, args: object | string | string[]) {
    // if (args.toString().length == 0) {
    //   msg.say('No arguments found...');
    //   return new Message(null, null, msg.channel);
    // }

    // if (msg.mentions.users.size == 0) {
    //   msg.say('No User tagged...');
    //   return new Message(null, null, msg.channel);
    // }

    //console.log(msg.mentions.users.first());

    // const argss = args.toString().slice(this.client.commandPrefix.length).trim().split(/ +/);

    return new Message(null, null, msg.channel);
  }
}

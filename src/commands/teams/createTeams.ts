/* eslint-disable @typescript-eslint/ban-types */
import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export default class CreateTeamsCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'create',
      group: 'teams',
      memberName: 'teams',
      description: 'Creates two teams',
      details: 'tbd',
      examples: ['create'],
    });
  }

  async run(msg: CommandoMessage, args: object | string | string[]) {
    // const res = msg.member!.voice!.channel.members;

    // res.forEach((v, k) => {
    //   msg.say(`v: ${v}, k: ${k}`);
    // });

    const channel = msg.guild.channels.cache.get('799354236226895905');

    channel.members.forEach((_, k) => {
      msg.say(k);
    });

    console.log(`args: ${typeof args}`);

    return new Message(null, null, msg.channel);
  }
}

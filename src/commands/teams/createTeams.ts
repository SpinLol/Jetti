import { Command, CommandoClient, CommandMessage } from 'discord.js-commando';

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

  async run(msg: CommandMessage) {
    return msg.say(`created teams`);
  }
}

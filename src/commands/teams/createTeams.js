const Command = require('discord.js-commando').Command;

module.exports = class CreateTeamsCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: 'create',
      group: 'teams',
      memberName: 'teams',
      description: 'Creates two teams',
      details: 'tbd',
      examples: ['create'],
    });
  }

  async run(msg, args) {
    return msg.say(`created teams`);
  }
};

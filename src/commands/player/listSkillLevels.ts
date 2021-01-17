import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export default class AddPlayerCommand extends Command {
  skills = new Map([
    [1, 'Iron'],
    [2, 'Bronze'],
    [3, 'Silver'],
    [4, 'Gold'],
    [5, 'Platinum'],
    [6, 'Diamond+'],
  ]);

  constructor(client: CommandoClient) {
    super(client, {
      name: 'list-skill-levels',
      aliases: ['lsl', 'skill-levels', 'ls'],
      group: 'player',
      memberName: 'list skill',
      description: 'Lists values for skill levels',
      argsCount: 0,
    });
  }

  async run(msg: CommandoMessage) {
    msg.say(this.printAllSkills());
    return new Message(null, null, msg.channel);
  }

  printAllSkills(): string {
    let res = '```\nAll Skill Levels\n';
    const padding = Array.from(this.skills.values()).reduce((t, s) => {
      return t < s.length ? s.length : t;
    }, 0);
    this.skills.forEach((v, k) => {
      res += `\n${(v + ':').padEnd(padding + 1)} \t ${k}`;
    });
    res += '\n```';
    return res;
  }
}

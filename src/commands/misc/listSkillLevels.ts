import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export default class AddPlayerCommand extends Command {
  skillLevelsArr: skillLevel[];
  toStrPadding = 0; //super ugly, gotta change at some point

  constructor(client: CommandoClient) {
    super(client, {
      name: 'list-skill-levels',
      aliases: ['lsl', 'skill-levels'],
      group: 'misc',
      memberName: 'list skill',
      description: 'Lists values for skill levels',
      argsCount: 0,
    });
    this.skillLevelsArr = this.getSkillLevels();
  }

  async run(msg: CommandoMessage) {
    msg.say(this.printAllSkills());
    return new Message(null, null, msg.channel);
  }

  printAllSkills(): string {
    let res = '```\nAll Skill Levels\n';
    this.skillLevelsArr.forEach((sL) => {
      res += `${sL.toString(this.toStrPadding)}\n`;
    });
    res += '\n```';
    return res;
  }

  //seems bad but you gotta init somehow
  getSkillLevels(): skillLevel[] {
    const skillStrs: string[] = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum+'];
    const skillVals: number[] = [1, 2, 3, 4, 5];
    const skills: skillLevel[] = [];
    for (let i = 0; i < skillStrs.length; i++) {
      this.toStrPadding = Math.max(skillStrs[i].length, this.toStrPadding); //yuck
      skills.push(new skillLevel(skillStrs[i], skillVals[i]));
    }
    this.toStrPadding += 3; //arbitrary, should be above 1 for asthetic purposes though
    return skills;
  }
}

class skillLevel {
  text: string;
  value: number;
  constructor(txt: string, val: number) {
    this.text = txt;
    this.value = val;
  }

  //also ugly that I gotta pass it as an arg, dont want to use global though
  toString(padding: number): string {
    return `${this.text}:`.padEnd(padding) + this.value;
  }
}

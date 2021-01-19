import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Match, Team } from '../../db/models';

interface PromptArgs {
  teamId1: number;
  teamId2: number;
}

export default class AddMatchCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'add-match',
      aliases: ['am'],
      group: 'match',
      memberName: 'add-match',
      description: 'Creates a new match with 2 teams',
      argsCount: 2,
      args: [
        {
          key: 'teamId1',
          prompt: 'What is the ID from team1?',
          type: 'integer',
        },
        {
          key: 'teamId2',
          prompt: 'What is the ID from team2?',
          type: 'integer',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { teamId1, teamId2 }: PromptArgs) {
    const end = new Message(null, null, msg.channel);

    const team1 = await Team.findOne({ where: { id: teamId1 } });

    if (team1 == null) {
      msg.say(`Couldn't find team 1 with ID ${teamId1}`);
      return end;
    }

    const team2 = await Team.findOne({ where: { id: teamId2 } });

    if (team2 == null) {
      msg.say(`Couldn't find team 2 with ID ${teamId2}`);
      return end;
    }

    const match = new Match({
      teamId1: team1.id,
      teamId2: team2.id,
    });

    await match.save();

    msg.say(`Successfully created Match (ID: ${match.id}) with Team1 (ID: ${team1.id}) and Team2 (ID: ${team2.id})`);
    return end;
  }
}

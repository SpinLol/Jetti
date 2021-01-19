import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { printTeam } from '../../core/print';

import { Match } from '../../db/models';

interface PromptArgs {
  matchId: number;
}

export default class GetMatchCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'get-match',
      aliases: ['gm'],
      group: 'team',
      memberName: 'get-match',
      description: 'Get info about match',
      argsCount: 1,
      args: [
        {
          key: 'matchId',
          prompt: 'What is the match ID?',
          type: 'integer',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { matchId }: PromptArgs) {
    const match = await Match.findOne({ where: { id: matchId }, include: [{ all: true, include: [{ all: true }] }] });

    if (match == null) {
      msg.say(`Match with ID ${matchId} was not found!`);
      return new Message(null, null, msg.channel);
    }

    const hasScreenshot = match.screenshotPath != null;

    let message = `Match ${match.id} - ${match.getOutcome()}${!hasScreenshot ? ` (no screenshot provided)` : ''}\n`;
    message += printTeam(match.team1);
    message += printTeam(match.team2);

    const embed = { embed: { image: { url: `${match.screenshotPath}` } } };

    msg.say(message, hasScreenshot ? embed : {});
    return new Message(null, null, msg.channel);
  }
}

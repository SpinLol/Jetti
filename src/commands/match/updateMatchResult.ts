import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Match } from '../../db/models';

interface PromptArgs {
  matchId: number;
  matchResult: number;
}

export default class UpdateMatchResultCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'update-match-result',
      aliases: ['umr'],
      group: 'match',
      memberName: 'update-match-result',
      description: 'Updates match result for given match ID',
      argsCount: 2,
      args: [
        {
          key: 'matchId',
          prompt: 'What is the match ID?',
          type: 'integer',
        },
        {
          key: 'matchResult',
          prompt: 'Who won? Team1 = 1, Team2 = 2, Draw = 0',
          type: 'integer',
          oneOf: [0, 1, 2],
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { matchId, matchResult }: PromptArgs) {
    const end = new Message(null, null, msg.channel);

    const match = await Match.findOne({ where: { id: matchId }, include: [{ all: true }] });

    if (match == null) {
      msg.say(`Match with ID ${matchId} was not found!`);
      return end;
    }

    const oldMatchResult = match.getOutcome();

    match.matchResult = matchResult;
    match.save();

    msg.say(
      `Match Result was changed from \`${oldMatchResult}\` to \`${match.getOutcome()}\` for Match ID ${match.id}`,
    );
    return end;
  }
}

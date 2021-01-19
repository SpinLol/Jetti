import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Match } from '../../db/models';

interface PromptArgs {
  matchId: number;
}

export default class DeleteMatchCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'delete-match',
      aliases: ['dm', 'remove-match', 'rm'],
      group: 'match',
      memberName: 'delete-match',
      description: 'Deletes a match entry in the database',
      argsCount: 1,
      args: [
        {
          key: 'matchId',
          prompt: 'What is the id of the match?',
          type: 'integer',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { matchId }: PromptArgs) {
    const end = new Message(null, null, msg.channel);

    const match = await Match.findOne({ where: { id: matchId } });

    if (match == null) {
      msg.say(`Match with ID \`${matchId}\` is not in the database...`);
      return end;
    }

    await match.destroy();

    msg.say(`Match \`${matchId}\` was successfully removed from the database!`);
    return end;
  }
}

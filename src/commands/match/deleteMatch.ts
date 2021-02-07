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
    const match = await Match.findOne({ where: { id: matchId } });

    if (match == null) {
      return msg.say(`Match with ID \`${matchId}\` is not in the database...`);
    }

    await match.destroy();

    return msg.say(`Match \`${matchId}\` was successfully removed from the database!`);
  }
}

import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { Match } from '../../db/models';

interface PromptArgs {
  matchId: number;
  matchResult: number;
}

export default class StoreImageCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'store-image-match',
      aliases: ['sim', 'screenshot'],
      group: 'match',
      memberName: 'store-image-match',
      description: 'Stores the link of the game screenshot as a link (string). Image must be embedded with message.',
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
          oneOf: ['0', '1', '2'],
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { matchId, matchResult }: PromptArgs) {
    const match = await Match.findOne({ where: { id: matchId } });
    if (match == null) {
      return msg.say(`Match with ID ${matchId} was not found!`);
    }

    if (msg.attachments.size == 0) {
      return msg.say(`No attached image detected. Write command as comment when uploading image.`);
    }

    const oldScreenshot = match.screenshotPath;
    match.matchResult = matchResult;
    match.screenshotPath = msg.attachments.first().url;
    match.save();

    let message = `Changed Screenshot from ${oldScreenshot} to ${match.screenshotPath}\n`;
    message += `for Match ID ${match.id} and set result to ${matchResult}`;

    return msg.say(message);
  }
}

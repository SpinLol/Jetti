import { Message } from 'discord.js';
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
          prompt: 'Who won? T1 => 1, T2 => 2, Draw => 0',
          type: 'integer',
        },
      ],
    });
  }

  async run(msg: CommandoMessage, { matchId, matchResult }: PromptArgs) {
    const end = new Message(null, null, msg.channel);

    if (matchId == undefined) {
      msg.say(`\`${matchId}\` is not a valid integer`);
      return end;
    }

    // const match = await Match.findOne({ where: { id: matchId } });
    const match = await Match.findOne({ where: { id: matchId }, include: [{ all: true, include: [{ all: true }] }] });
    if (match == null) {
      msg.say(`Match with ID ${matchId} was not found!`);
      return end;
    }

    if (matchResult < 0 || matchResult > 2) {
      msg.say(`Match result \`${matchId}\` is invalid! Must be 0, 1 or 2`);
      return end;
    }

    if (msg.attachments.size == 0) {
      msg.say(`No attached image detected. Write command as comment when uploading image.`);
      return end;
    }

    match.matchResult = matchResult;
    match.screenshotPath = msg.attachments.first().url;
    match.save();


    msg.say(`Added \`${match.screenshotPath}\` to Match with ID \`${match.id}\`, and set result as\`${match.matchResult}\`); //.url is same as.attachment
    return end;
  }
}

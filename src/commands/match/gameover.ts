// TODO: Implement this
// import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
// import { moveTeams } from '../../core/moveTeams';

// import { Match } from '../../db/models';

// const defaultName = 'Valorant';

// interface PromptArgs {
//   matchId: number;
//   channelName: string;
// }

// export default class GameoverCommands extends Command {
//   constructor(client: CommandoClient) {
//     super(client, {
//       name: 'gameover',
//       aliases: ['gameover', 'end'],
//       group: 'match',
//       memberName: 'gameover',
//       description: 'Moves all players into 1 voice channel',
//       argsCount: 2,
//       args: [
//         {
//           key: 'matchId',
//           prompt: 'What is the match ID',
//           type: 'integer',
//         },
//         {
//           key: 'channelName',
//           prompt: 'What is the channel name?',
//           type: 'string',
//           default: defaultName,
//         },
//       ],
//     });
//   }

//   async run(msg: CommandoMessage, { matchId, channelName }: PromptArgs) {
//     const ch = msg.guild.channels.cache.find((channel) => channel.name == channelName);

//     if (ch == undefined) {
//       return msg.say(`Couldn't find channel with the name '${channelName}'`);
//     }

//     const match = await Match.findOne({
//       where: { id: matchId },
//       include: [{ all: true, include: [{ all: true, include: [{ all: true }] }] }],
//     });

//     await msg.say('Moving all players');
//     await moveTeams(match.team1, ch, msg);
//     await moveTeams(match.team2, ch, msg);

//     return await msg.say('Done moving players');
//   }
// }

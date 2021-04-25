// TODO: Implement this
// import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
// import { moveTeams } from '../../core/moveTeams';

// import { Match } from '../../db/models';

// const defaultName1 = 'Team 1';
// const defaultName2 = 'Team 2';

// interface PromptArgs {
//   matchId: number;
//   channelName1: string;
//   channelName2: string;
// }

// export default class MoveTeamsToVoiceChannelCommand extends Command {
//   constructor(client: CommandoClient) {
//     super(client, {
//       name: 'move-teams-to-voice-channel',
//       aliases: ['mttvc', 'move', 'dip', 'sweat', 'split'],
//       group: 'match',
//       memberName: 'move-teams-to-voice-channel',
//       description: 'Moves teams into separate voice channels',
//       argsCount: 3,
//       args: [
//         {
//           key: 'matchId',
//           prompt: 'What is the match ID',
//           type: 'integer',
//         },
//         {
//           key: 'channelName1',
//           prompt: 'What is the first channel name?',
//           type: 'string',
//           default: defaultName1,
//         },
//         {
//           key: 'channelName2',
//           prompt: 'What is the second channel name?',
//           type: 'string',
//           default: defaultName2,
//         },
//       ],
//     });
//   }

//   async run(msg: CommandoMessage, { matchId, channelName1, channelName2 }: PromptArgs) {
//     const ch1 = msg.guild.channels.cache.find((channel) => channel.name == channelName1);

//     if (ch1 == undefined) {
//       return msg.say(`Couldn't find channel with the name '${channelName1}'`);
//     }

//     const ch2 = msg.guild.channels.cache.find((channel) => channel.name == channelName2);

//     if (ch2 == undefined) {
//       return msg.say(`Couldn't find channel with the name '${channelName2}'`);
//     }

//     const match = await Match.findOne({
//       where: { id: matchId },
//       include: [{ all: true, include: [{ all: true, include: [{ all: true }] }] }],
//     });

//     await msg.say('Moving Team 1');
//     await moveTeams(match.team1, ch1, msg);

//     await msg.say('Moving Team 2');
//     await moveTeams(match.team2, ch2, msg);

//     return await msg.say('Done moving players');
//   }
// }

// import { User } from 'discord.js';
// import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

// import { Player } from '../../db/models';
// import { ValorantMaps } from '../match/randomMap';

// interface PromptArgs {
//   user: User;
//   favMap: ValorantMaps[number];
// }

// export default class UpdateMapCommand extends Command {
//   constructor(client: CommandoClient) {
//     super(client, {
//       name: 'set-favorite-map',
//       aliases: ['fav'],
//       group: 'player',
//       memberName: 'set-favorite-map',
//       description: 'sets the favorite map of a player',
//       argsCount: 1,
//       args: [
//         {
//           key: 'user',
//           prompt: "Which user's favorite map do you want to update? Ping him (@username)",
//           type: 'user',
//         },
//         {
//           key: 'favMap',
//           prompt: "What's his/her new favorite map?",
//           type: 'string',
//           oneOf: ['ASCENT', 'BIND', 'HAVEN', 'ICEBOX', 'SPLIT'],
//         },
//       ],
//     });
//   }

//   async run(msg: CommandoMessage, { user, favMap }: PromptArgs) {
//     const foundPlayer = await Player.findOne({
//       where: { userId: user.id },
//     });

//     if (foundPlayer == null) {
//       return msg.say(`Player \`${user.tag}\` is not in database!`);
//     }

//     foundPlayer.favMap = favMap;
//     foundPlayer.save();

//     return msg.say(`Player \`${user.tag}\`' favorite Map has been updated to ${foundPlayer.favMap}!`);
//   }
// }

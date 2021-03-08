import { GuildChannel } from 'discord.js';
import { CommandoMessage } from 'discord.js-commando';
import { Team } from '../db/models';

export const moveTeams = async (team: Team, channel: GuildChannel, msg: CommandoMessage) => {
  const players = [team.player1, team.player2, team.player3, team.player4, team.player5];

  for (const player of players) {
    const user = await msg.guild.members.fetch(player.player.userId);
    if (user.voice.channel != null) {
      await user.voice.setChannel(channel);
    } else {
      await msg.say(`Didn't move \`${user.displayName}\` because he/she isn't in a voice channel`);
    }
  }
};

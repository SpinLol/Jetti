import { CommandoClient } from 'discord.js-commando';
import cron from 'node-cron';
import { botStatus } from '../constants';
import { logger } from '../util/logger';

export const randomStatus = (client: CommandoClient) => {
  cron.schedule('*/30 * * * *', async () => {
    await client.user.setPresence({
      activity: botStatus[Math.floor(Math.random() * botStatus.length)],
      status: 'dnd',
    });
    logger.info('Updated bot activity');
  });
};

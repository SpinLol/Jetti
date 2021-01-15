import { CommandoClient } from 'discord.js-commando';
import path from 'path';
import config from './config/config.json';
import { sequelize } from './database';

const client = new CommandoClient({
  owner: config.owner,
});

client
  .on('error', console.error)
  .on('warn', console.warn)
  .on('debug', console.log)
  .on('ready', async () => {
    console.log(`Client ready: logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
    try {
      await sequelize.authenticate();
      console.log('Connection to database was successfully.');
    } catch (error) {
      console.error('Unable to connect to database.');
    }
  })
  .on('disconnect', () => {
    console.warn('Disconnected');
  });

client.registry
  .registerGroups([
    ['teams', 'Team commands'],
    ['player', 'Player commands'],
  ])
  .registerDefaults()
  .registerCommandsIn({
    filter: /^([^.].*)\.(js|ts)$/,
    dirname: path.join(__dirname, 'commands'),
  });

client.login(config.token);

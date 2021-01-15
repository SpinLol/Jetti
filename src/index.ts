import { CommandoClient } from 'discord.js-commando';
import path from 'path';
import config from './config.json';

const client = new CommandoClient({
  owner: config.owner,
});

client
  .on('error', console.error)
  .on('warn', console.warn)
  .on('debug', console.log)
  .on('ready', () => {
    console.log(`Client ready: logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
  })
  .on('disconnect', () => {
    console.warn('Disconnected');
  })
  .on('reconnecting', () => {
    console.warn('Reconnecting...');
  });

client.registry
  .registerGroups([['teams', 'Team commands']])
  .registerDefaults()
  .registerCommandsIn({
    filter: /^([^.].*)\.(js|ts)$/,
    dirname: path.join(__dirname, 'commands'),
  });

client.login(config.token);

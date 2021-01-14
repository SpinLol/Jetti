const Commando = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');

const client = new Commando.Client({
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
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(config.token);

import { MessageEmbed } from 'discord.js';
import { colors } from '../constants';

export const ErrorEmbed = (description: string): MessageEmbed => {
  return new MessageEmbed({
    color: colors.danger,
    title: 'Error occurred',
    description: description,
    timestamp: Date.now(),
  });
};

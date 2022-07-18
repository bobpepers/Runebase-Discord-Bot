import {
  InteractionType,
  ChannelType,
} from 'discord.js';
import {
  invalidAmountMessage,
} from '../../../embeds';

export const handleInvalidAmountMessage = async (
  discordClient,
  message,
  capType,
) => {
  if (message.type && message.type === InteractionType.ApplicationCommand) {
    const discordUser = await discordClient.users.cache.get(message.user.id);
    if (message.guildId) {
      const discordChannel = await discordClient.channels.cache.get(message.channelId);
      await discordChannel.send({
        embeds: [
          invalidAmountMessage(
            message.user.id,
            capType,
          ),
        ],
      });
    } else {
      await discordUser.send({
        embeds: [
          invalidAmountMessage(
            message.user.id,
            capType,
          ),
        ],
      });
    }
  } else {
    if (message.channel.type === ChannelType.DM) {
      await message.author.send({
        embeds: [
          invalidAmountMessage(
            message.author.id,
            capType,
          ),
        ],
      });
    }
    if (message.channel.type === ChannelType.GuildText) {
      await message.channel.send({
        embeds: [
          invalidAmountMessage(
            message.author.id,
            capType,
          ),
        ],
      });
    }
  }
};

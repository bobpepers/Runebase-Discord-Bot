import { Transaction } from "sequelize";
import {
  priceMessage,
  discordErrorMessage,
  cannotSendMessageUser,
} from '../messages';
import db from '../models';
import logger from "../helpers/logger";
import { userWalletExist } from "../helpers/client/userWalletExist";

export const discordPrice = async (
  discordClient,
  message,
  io,
) => {
  const activity = [];
  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const [
      user,
      userActivity,
    ] = await userWalletExist(
      message,
      t,
      'price',
    );
    if (userActivity) {
      activity.unshift(userActivity);
    }
    if (!user) return;

    const priceRecord = await db.currency.findAll({});
    let replyString = ``;
    replyString += priceRecord.map((a) => `${a.iso}: ${a.price}`).join('\n');

    if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordUser = await discordClient.users.cache.get(message.user.id);
      if (message.guildId) {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            priceMessage(
              replyString,
            ),
          ],
        });
      } else {
        await discordUser.send({
          embeds: [
            priceMessage(
              replyString,
            ),
          ],
        });
      }
    } else {
      if (message.channel.type === 'DM') {
        await message.author.send({
          embeds: [
            priceMessage(
              replyString,
            ),
          ],
        });
      }
      if (message.channel.type === 'GUILD_TEXT') {
        await message.channel.send({
          embeds: [
            priceMessage(
              replyString,
            ),
          ],
        });
      }
    }

    const createActivity = await db.activity.create({
      type: 'price_s',
      earnerId: user.id,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    const findActivity = await db.activity.findOne({
      where: {
        id: createActivity.id,
      },
      include: [
        {
          model: db.user,
          as: 'earner',
        },
      ],
      lock: t.LOCK.UPDATE,
      transaction: t,
    });
    activity.unshift(findActivity);

    t.afterCommit(() => {
      console.log('done price request');
    });
  }).catch(async (err) => {
    try {
      await db.error.create({
        type: 'help',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
    logger.error(`Error Discord Deposit Requested by: ${message.author.id}-${message.author.username}#${message.author.discriminator} - ${err}`);
    if (err.code && err.code === 50007) {
      if (message.type && message.type === 'APPLICATION_COMMAND') {
        const discordChannel = await discordClient.channels.cache.get(message.channelId);
        await discordChannel.send({
          embeds: [
            cannotSendMessageUser(
              "Deposit",
              message,
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      } else {
        await message.channel.send({
          embeds: [
            cannotSendMessageUser(
              "Deposit",
              message,
            ),
          ],
        }).catch((e) => {
          console.log(e);
        });
      }
    } else if (message.type && message.type === 'APPLICATION_COMMAND') {
      const discordChannel = await discordClient.channels.cache.get(message.channelId);
      await discordChannel.send({
        embeds: [
          discordErrorMessage(
            "Deposit",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      await message.channel.send({
        embeds: [
          discordErrorMessage(
            "Deposit",
          ),
        ],
      }).catch((e) => {
        console.log(e);
      });
    }
  });
  if (activity.length > 0) {
    io.to('admin').emit('updateActivity', {
      activity,
    });
  }
};
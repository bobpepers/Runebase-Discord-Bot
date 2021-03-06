/* eslint-disable import/prefer-default-export */
import {
  Transaction,
} from "sequelize";
import {
  ActionRowBuilder,
} from "discord.js";
import {
  createCanvas,
  loadImage,
} from 'canvas';
import db from '../models';
import logger from "../helpers/logger";
// import { userWalletExist } from "../helpers/client/userWalletExist";
// import { generateLoot } from "../helpers/items/generateLoot";
// import { generateRandomStartDagger } from '../helpers/items/generateStartingDagger';
import { generateRandomMagicItem } from "../helpers/items/generateRandomMagicItem";
// import { generateRandomNormalItem } from "../helpers/items/generateRandomNormalItem";
// import { generateRandomLowQualityItem } from "../helpers/items/generateRandomLowQualityItem";
// import { generateRandomSuperiorItem } from "../helpers/items/generateRandomSuperiorItem";
// import { generateModifierStringArray } from "../helpers/items/generateModifierStringArray";
import { renderItemImage } from "../render/item";
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import { generateLootButton } from "../buttons";

const generateLootImage = async (
  lootItem,
  distance,
  trueEnd = false,
) => {
  const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 60)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const ended = (
    (days < 1 && hours < 1 && minutes < 1 && seconds < 1)
    || lootItem.inventoryId
    || trueEnd
  );

  const itemImage = await renderItemImage(lootItem);
  const backgroundItemImage = await loadImage(itemImage);
  const canvas = createCanvas(backgroundItemImage.width, backgroundItemImage.height + 20);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    backgroundItemImage,
    0, // x position
    0, // y position
    backgroundItemImage.width,
    backgroundItemImage.height,
  );
  ctx.fillStyle = "#ccc";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.textAlign = "center";
  ctx.font = 'bold 15px "HeartWarming"';

  if (
    !lootItem.inventoryId
    && distance < 0
  ) {
    ctx.strokeText(
      `Nobody Looted`,
      backgroundItemImage.width / 2,
      backgroundItemImage.height + 10,
      backgroundItemImage.width,
    );
    ctx.fillText(
      `Nobody Looted`,
      backgroundItemImage.width / 2,
      backgroundItemImage.height + 10,
      backgroundItemImage.width,
    );
  } else if (lootItem.inventoryId) {
    ctx.strokeText(
      `Looted by ${lootItem.inventory.UserGroupClass.UserGroup.user.username}`,
      backgroundItemImage.width / 2,
      backgroundItemImage.height + 10,
      backgroundItemImage.width,
    );
    ctx.fillText(
      `Looted by ${lootItem.inventory.UserGroupClass.UserGroup.user.username}`,
      backgroundItemImage.width / 2,
      backgroundItemImage.height + 10,
      backgroundItemImage.width,
    );
  } else if (!lootItem.inventoryId) {
    ctx.strokeText(
      `${!ended ? `Time remaining ${days > 0 ? `${days} days` : ''}  ${hours > 0 ? `${hours} hours` : ''} ${minutes > 0 ? `${minutes} minutes` : ''} ${seconds > 0 ? `${seconds} seconds` : ''}` : `Ended`}`,
      backgroundItemImage.width / 2,
      backgroundItemImage.height + 10,
      backgroundItemImage.width,
    );
    ctx.fillText(
      `${!ended ? `Time remaining ${days > 0 ? `${days} days` : ''}  ${hours > 0 ? `${hours} hours` : ''} ${minutes > 0 ? `${minutes} minutes` : ''} ${seconds > 0 ? `${seconds} seconds` : ''}` : `Ended`}`,
      backgroundItemImage.width / 2,
      backgroundItemImage.height + 10,
      backgroundItemImage.width,
    );
  }

  const finalImage = await canvas.toBuffer();
  return finalImage;
};

const listenLoot = async (
  messageDropLoot,
  io,
  queue,
  newItem,
  distance,
  updateMessage,
) => {
  const collector = messageDropLoot.createMessageComponentCollector({
    // componentType: 'BUTTON', // Stopped working in discord.js v14 <- no mention in documentation that it would stop working
    time: distance,
  });

  collector.on('collect', async (
    button,
  ) => {
    if (!button.user.bot) {
      await queue.add(async () => {
        await db.sequelize.transaction({
          isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        }, async (t) => {
          // const userCollectingId = await fetchDiscordUserIdFromMessageOrInteraction(
          //   button,
          // );
          const userCurrentCharacterCollecting = await fetchUserCurrentCharacter(
            button.user.id, // user discord id
            true, // Need inventory?
            t,
          );
          if (!userCurrentCharacterCollecting) {
            await button.reply({
              content: 'You have not selected a class yet\n!runebase pickclass\n/pickclass',
              ephemeral: true,
            });
            return;
          }

          const findItem = await db.item.findOne({
            where: {
              id: newItem.id,
            },
            lock: t.LOCK.UPDATE,
            transaction: t,
          });

          if (!findItem.inventoryId) {
            const waitForUpdateItem = await findItem.update({
              inventoryId: userCurrentCharacterCollecting.inventoryId,
            }, {
              lock: t.LOCK.UPDATE,
              transaction: t,
            });
            const itemLootedFinal = await db.item.findOne({
              where: {
                id: waitForUpdateItem.id,
              },
              lock: t.LOCK.UPDATE,
              transaction: t,
              include: [
                {
                  model: db.inventory,
                  as: 'inventory',
                  include: [
                    {
                      model: db.UserGroupClass,
                      as: 'UserGroupClass',
                      include: [
                        {
                          model: db.UserGroup,
                          as: 'UserGroup',
                          include: [
                            {
                              model: db.user,
                              as: 'user',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  model: db.itemQuality,
                  as: 'itemQuality',
                  required: true,
                },
                {
                  model: db.itemBase,
                  as: 'itemBase',
                  required: true,
                  include: [
                    {
                      model: db.itemFamily,
                      as: 'itemFamily',
                      required: true,
                      include: [
                        {
                          model: db.itemType,
                          as: 'itemType',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            });

            const updatedLootImage = await generateLootImage(
              itemLootedFinal,
              distance,
              true,
            );

            await messageDropLoot.edit({
              files: [
                {
                  attachment: updatedLootImage,
                  name: 'lootItem.png',
                },
              ],
              components: [],
            });
            clearInterval(updateMessage);
          } else {
            await button.reply({
              content: 'Somebody else already looted',
              ephemeral: true,
            });
          }
        }).catch(async (err) => {
          try {
            await db.error.create({
              type: 'randomChannelLoot',
              error: `${err}`,
            });
          } catch (e) {
            logger.error(`Error Discord: ${e}`);
          }
          console.log(err);
          logger.error(`PickUp Loot error: ${err}`);
        });
      });
    }
  });

  collector.on('end', async () => {
    const activity = [];
    await queue.add(async () => {
      clearInterval(updateMessage);
      await db.sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      }, async (t) => {
        const itemLootedFinal = await db.item.findOne({
          where: {
            id: newItem.id,
          },
          include: [
            {
              model: db.inventory,
              as: 'inventory',
              include: [
                {
                  model: db.UserGroupClass,
                  as: 'UserGroupClass',
                  include: [
                    {
                      model: db.UserGroup,
                      as: 'UserGroup',
                      include: [
                        {
                          model: db.user,
                          as: 'user',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              model: db.itemQuality,
              as: 'itemQuality',
              required: true,
            },
            {
              model: db.itemBase,
              as: 'itemBase',
              required: true,
              include: [
                {
                  model: db.itemFamily,
                  as: 'itemFamily',
                  required: true,
                  include: [
                    {
                      model: db.itemType,
                      as: 'itemType',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        });

        const updatedLootImage = await generateLootImage(
          itemLootedFinal,
          distance,
        );

        await messageDropLoot.edit({
          files: [
            {
              attachment: updatedLootImage,
              name: 'lootItem.png',
            },
          ],
          components: [],
        });
        clearInterval(updateMessage);
      }).catch(async (err) => {
        try {
          await db.error.create({
            type: 'endTrivia',
            error: `${err}`,
          });
        } catch (e) {
          logger.error(`Error Discord: ${e}`);
        }
        console.log(err);
        logger.error(`trivia error: ${err}`);
      });
      if (activity.length > 0) {
        io.to('admin').emit('updateActivity', {
          activity,
        });
      }
    });
  });
};

export const discordShowCaseMagicItem = async (
  discordClient,
  message,
  level,
  queue,
  io,
) => {
  const activity = [];

  await db.sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  }, async (t) => {
    const userId = await fetchDiscordUserIdFromMessageOrInteraction(
      message,
    );
    const discordChannel = await fetchDiscordChannel(
      discordClient,
      message,
    );

    const userCurrentCharacter = await fetchUserCurrentCharacter(
      userId, // user discord id
      false, // Need inventory?
      t,
    );

    if (!userCurrentCharacter) {
      console.log('user has not selected a class yet'); // Add notice message here to warn user to select a class
      return;
    }

    const newItem = await generateRandomMagicItem(
      level,
      t,
    );
    // const itemImage = await renderItemImage(newItem);

    const countDownDate = await new Date(await new Date().getTime() + 120000);
    let now = await new Date().getTime();
    let distance = countDownDate - now;

    const lootImage = await generateLootImage(
      newItem,
      distance,
    );

    const messageDropLoot = await discordChannel.send({
      files: [
        {
          attachment: lootImage,
          name: 'lootItem.png',
        },
      ],
      components: [
        new ActionRowBuilder({
          components: [
            await generateLootButton(),
          ],
        }),
      ],
    });

    const updateMessage = setInterval(async () => {
      now = new Date().getTime();
      distance = countDownDate - now;
      const findItem = await db.item.findOne({
        where: {
          id: newItem.id,
        },
        include: [
          {
            model: db.inventory,
            as: 'inventory',
            include: [
              {
                model: db.UserGroupClass,
                as: 'UserGroupClass',
                include: [
                  {
                    model: db.UserGroup,
                    as: 'UserGroup',
                    include: [
                      {
                        model: db.user,
                        as: 'user',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: db.itemQuality,
            as: 'itemQuality',
            required: true,
          },
          {
            model: db.itemBase,
            as: 'itemBase',
            required: true,
            include: [
              {
                model: db.itemFamily,
                as: 'itemFamily',
                required: true,
                include: [
                  {
                    model: db.itemType,
                    as: 'itemType',
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      });

      const updatedLootImage = await generateLootImage(
        findItem,
        distance,
      );

      if (!findItem.inventoryId) {
        await messageDropLoot.edit({
          files: [
            {
              attachment: updatedLootImage,
              name: 'lootItem.png',
            },
          ],
          components: [
            new ActionRowBuilder({
              components: [
                await generateLootButton(),
              ],
            }),
          ],
        });
      }

      if (findItem.inventoryId) {
        await messageDropLoot.edit({
          files: [
            {
              attachment: updatedLootImage,
              name: 'lootItem.png',
            },
          ],
          components: [],
        });
        clearInterval(updateMessage);
      }
      if (distance < 0) {
        clearInterval(updateMessage);
      }
    }, 10000);

    await listenLoot(
      messageDropLoot,
      io,
      queue,
      newItem,
      distance,
      updateMessage,
    );

    const preActivity = await db.activity.create({
      type: 'myrank_s',
      earnerId: userCurrentCharacter.UserGroup.user.id,
    }, {
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    const finalActivity = await db.activity.findOne({
      where: {
        id: preActivity.id,
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
    activity.unshift(finalActivity);
    // const item = await generateLoot(1);
  }).catch(async (err) => {
    console.log(err);
    try {
      await db.error.create({
        type: 'MyRank',
        error: `${err}`,
      });
    } catch (e) {
      logger.error(`Error Discord: ${e}`);
    }
  });

  if (activity.length > 0) {
    io.to('admin').emit('updateActivity', {
      activity,
    });
  }
};

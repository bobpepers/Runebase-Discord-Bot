/* eslint-disable import/prefer-default-export */
import {
  Transaction,
} from "sequelize";
import {
  ActionRowBuilder,
} from 'discord.js';
import db from '../models';
import { destroyItem } from '../helpers/items/destroyItem';
import { equipItem } from '../helpers/equipment/equipItem';
import { fetchUserCurrentCharacter } from "../helpers/character/character";
import { fetchDiscordUserIdFromMessageOrInteraction } from '../helpers/client/fetchDiscordUserIdFromMessageOrInteraction';
import { fetchDiscordChannel } from '../helpers/client/fetchDiscordChannel';
import {
  generateBackButton,
  generateForwardButton,
  generateExitInventoryButton,
  generateDestroyItemButton,
  generateDestroyNoButton,
  generateEquipItemButton,
  generateDestroyYesButton,
  generateEquipmentCompareButton,
} from '../buttons';

import {
  playingOnRealmMessage,
} from '../messages';
import testPlayerReadyness from '../helpers/testPlayerReadyness';

import { renderCancelInventoryImage } from "../render/inventory/cancelInventory";
import { renderEmptyInventoryImage } from "../render/inventory/emptyInventory";
import { renderInventoryImage } from '../render/inventory/inventory';
import { renderDestroyIventoryItemImage } from "../render/inventory/destroyInventoryItem";
import { renderItemCompareImage } from "../render/inventory/itemCompare";
import isUserInRealm from "../helpers/realm/isUserInRealm";

export const discordShowInventory = async (
  discordClient,
  message,
  setting,
  io,
  queue,
  isDefered,
) => {
  const activity = [];
  let failed;
  let usedDeferReply;
  const userId = await fetchDiscordUserIdFromMessageOrInteraction(
    message,
  );
  const discordChannel = await fetchDiscordChannel(
    discordClient,
    message,
  );

  let userCurrentCharacter = await fetchUserCurrentCharacter(
    userId, // user discord id
    true, // Need inventory?
  );

  [
    failed,
    usedDeferReply,
  ] = await testPlayerReadyness(
    userCurrentCharacter,
    message,
    isDefered,
  );
  if (failed) return usedDeferReply;

  [
    failed,
    usedDeferReply,
  ] = await isUserInRealm(
    userCurrentCharacter,
    discordClient,
    message,
    isDefered,
  );
  if (failed) return usedDeferReply;

  const canFitOnOnePage = userCurrentCharacter.inventory.items.length <= 1;

  console.log('before send message');
  const embedMessage = await discordChannel.send({
    content: playingOnRealmMessage(userCurrentCharacter),
    files: [
      ...(
        userCurrentCharacter.inventory.items.length > 0 ? [
          {
            attachment: await renderInventoryImage(
              userCurrentCharacter,
              false,
              false,
              false,
              false,
              0,
            ),
            name: 'inventory.png',
          },
        ] : [
          {
            attachment: await renderEmptyInventoryImage(userCurrentCharacter),
            name: 'emptyInventory.png',
          },
        ]
      ),
    ],
    components: [
      ...(
        userCurrentCharacter.inventory
          && userCurrentCharacter.inventory.items
          && userCurrentCharacter.inventory.items.length > 0
          ? [
            new ActionRowBuilder({
              components: [
                await generateEquipmentCompareButton(
                  userCurrentCharacter,
                  0,
                ),
              ],
            }),
            new ActionRowBuilder({
              components: [
                await generateEquipItemButton(
                  0,
                  userCurrentCharacter,
                ),
                await generateDestroyItemButton(
                  0,
                  userCurrentCharacter,
                ),
              ],
            }),
          ] : []
      ),
      ...(
        !canFitOnOnePage ? [
          new ActionRowBuilder({
            components: [
              generateForwardButton(),
            ],
          }),
        ] : []
      ),
      ...(
        userCurrentCharacter.inventory.items.length > 0 ? [
          new ActionRowBuilder({
            components: [
              await generateExitInventoryButton(),
            ],
          }),
        ] : []
      ),
    ],
  });

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user: discordUser }) => discordUser.id === userCurrentCharacter.UserGroup.user.user_id,
  });

  let currentIndex = 0;
  collector.on('collect', async (interaction) => {
    await interaction.deferUpdate();
    let destroyedItem = false;
    let equipedItem = false;
    let cannotEquip = false;
    let cannotEquipReason = '';
    if (interaction.customId.startsWith('Compare:')) {
      // The stuff in here is a placeholder for item comparing
      let updatedUserCharacter;
      await queue.add(async () => {
        await db.sequelize.transaction({
          isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        }, async (t) => {
          console.log('item compare');
        }).catch(async (err) => {
          console.log(err);
        });
        if (activity.length > 0) {
          io.to('admin').emit('updateActivity', {
            activity,
          });
        }
      });

      await interaction.update({
        files: [
          {
            attachment: await renderItemCompareImage(
              currentIndex,
            ),
            name: 'itemCompare.png',
          },
        ],
        components: [],
      });
      return;
    }

    if (interaction.customId.startsWith('Equip:')) {
      const itemId = Number(interaction.customId.replace("Equip:", ""));
      [
        userCurrentCharacter,
        equipedItem,
        cannotEquip,
        cannotEquipReason,
      ] = await equipItem(
        userCurrentCharacter,
        itemId,
        discordChannel,
        io,
        queue,
      );
      if (currentIndex + 1 > userCurrentCharacter.inventory.items.length) {
        currentIndex -= 1;
      }
    }
    if (interaction.customId.startsWith('Destroy:')) {
      await interaction.editReply({
        content: playingOnRealmMessage(userCurrentCharacter),
        files: [
          ...(
            userCurrentCharacter.inventory.items.length > 0 ? [
              {
                attachment: await renderDestroyIventoryItemImage(
                  currentIndex,
                  userCurrentCharacter,
                ),
                name: 'destroyInventoryItem.png',
              },
            ] : [
              {
                attachment: await renderEmptyInventoryImage(userCurrentCharacter),
                name: 'emptyInventory.png',
              },
            ]
          ),
        ],
        components: [
          new ActionRowBuilder({
            components: [
              await generateDestroyYesButton(
                currentIndex,
                userCurrentCharacter,
              ),
            ],
          }),
          new ActionRowBuilder({
            components: [
              await generateDestroyNoButton(),
            ],
          }),
        ],
      });
      return;
    }
    if (interaction.customId.startsWith('ConfirmDestroy:')) {
      const itemId = Number(interaction.customId.replace("ConfirmDestroy:", ""));
      console.log('before item destroy');
      [
        userCurrentCharacter,
        destroyedItem,
      ] = await destroyItem(
        userCurrentCharacter,
        itemId,
        discordChannel,
        io,
        queue,
      );
      if (currentIndex + 1 > userCurrentCharacter.inventory.items.length) {
        currentIndex -= 1;
      }
    }
    // Cancel class selection
    if (interaction.customId === 'exitInventory') {
      await interaction.editReply({
        content: playingOnRealmMessage(userCurrentCharacter),
        files: [
          {
            attachment: await renderCancelInventoryImage(userCurrentCharacter),
            name: 'inventory.png',
          },
        ],
        components: [],
      });
      return;
    }
    if (interaction.customId === 'back') {
      currentIndex -= 1;
    }
    if (interaction.customId === 'forward') {
      currentIndex += 1;
    }

    await interaction.editReply({
      content: playingOnRealmMessage(userCurrentCharacter),
      files: [
        ...(
          userCurrentCharacter.inventory.items.length > 0 ? [
            {
              attachment: await renderInventoryImage(
                userCurrentCharacter,
                destroyedItem,
                equipedItem,
                cannotEquip,
                cannotEquipReason,
                currentIndex,
              ),
              name: 'inventory.png',
            },
          ] : [
            {
              attachment: await renderEmptyInventoryImage(userCurrentCharacter),
              name: 'emptyInventory.png',
            },
          ]
        ),
      ],
      components: [
        ...(
          userCurrentCharacter.inventory.items.length > 0 ? [
            new ActionRowBuilder({
              components: [
                await generateEquipmentCompareButton(
                  userCurrentCharacter,
                  currentIndex,
                ),
              ],
            }),
          ] : []
        ),
        ...(
          userCurrentCharacter.inventory.items.length > 0 ? [
            new ActionRowBuilder({
              components: [
                await generateEquipItemButton(
                  currentIndex,
                  userCurrentCharacter,
                ),
                await generateDestroyItemButton(
                  currentIndex,
                  userCurrentCharacter,
                ),
              ],
            }),
          ] : []
        ),
        ...(
          userCurrentCharacter.inventory.items.length > 1 ? [
            new ActionRowBuilder({
              components: [
                ...(currentIndex
                  ? [
                    generateBackButton(),
                  ]
                  : []
                ),
                ...(currentIndex + 1 < userCurrentCharacter.inventory.items.length
                  ? [
                    generateForwardButton(),
                  ]
                  : []
                ),
              ],
            }),
          ] : []
        ),
        new ActionRowBuilder({
          components: [
            await generateExitInventoryButton(),
          ],
        }),
      ],
    });
  });
};

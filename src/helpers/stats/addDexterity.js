import {
  Sequelize,
  Transaction,
  Op,
} from "sequelize";
import db from '../../models';
import logger from "../logger";
import { fetchUserCurrentCharacter } from "../character/character";

export const addDexterity = async (
  currentUserCharacter,
  io,
  queue,
) => {
  const activity = [];
  let cannotSpend;
  await queue.add(async () => {
    await db.sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    }, async (t) => {
      const user = await db.user.findOne({
        where: {
          id: currentUserCharacter.UserGroup.user.id,
        },
        include: [
          {
            model: db.class,
            as: 'currentClass',
          },
          {
            model: db.UserGroup,
            as: 'UserGroup',
            where: {
              groupId: {
                [Op.col]: 'user.currentRealmId',
              },
            },
            include: [
              {
                model: db.UserGroupRank,
                as: 'UserGroupRank',
                include: [
                  {
                    model: db.rank,
                    as: 'rank',
                  },
                ],
              },
              {
                model: db.UserGroupClass,
                as: 'UserGroupClass',
                where: {
                  classId: {
                    [Op.col]: 'user.currentClassId',
                  },
                },
                include: [
                  {
                    model: db.stats,
                    as: 'stats',
                  },
                  {
                    model: db.condition,
                    as: 'condition',
                  },
                ],
              },
            ],
          },

        ],
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const calc = (
        user.UserGroup.UserGroupClass.stats.strength
        + user.UserGroup.UserGroupClass.stats.dexterity
        + user.UserGroup.UserGroupClass.stats.vitality
        + user.UserGroup.UserGroupClass.stats.energy
      ) < (user.UserGroup.UserGroupRank.rank.level * 5);

      if (!calc) {
        cannotSpend = true;
        return;
      }

      const updateDexterity = await user.UserGroup.UserGroupClass.stats.update({
        dexterity: user.UserGroup.UserGroupClass.stats.dexterity + 1,
      }, {
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      const preActivity = await db.activity.create({
        type: 'addDexterity_s',
        earnerId: currentUserCharacter.UserGroup.user.id,
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
      t.afterCommit(() => {
        console.log('done updating dex');
      });
    }).catch(async (err) => {
      console.log(err);
      try {
        await db.error.create({
          type: 'addDexterity',
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
  });

  const myUpdatedUser = await fetchUserCurrentCharacter(
    currentUserCharacter.UserGroup.user.user_id, // user discord id
    false, // Need inventory?
  );

  return [
    myUpdatedUser,
    cannotSpend,
  ];
};

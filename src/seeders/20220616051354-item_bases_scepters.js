module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get all the itemDifficultyId's
    const itemDifficultyNormal = await queryInterface.rawSelect('itemDifficulty', {
      where: {
        name: 'Normal',
      },
    }, ['id']);
    const itemDifficultyExceptional = await queryInterface.rawSelect('itemDifficulty', {
      where: {
        name: 'Exceptional',
      },
    }, ['id']);
    const itemDifficultyElite = await queryInterface.rawSelect('itemDifficulty', {
      where: {
        name: 'Elite',
      },
    }, ['id']);

    // Dagger
    const itemFamilyScepter = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Scepter',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Scepter',
        levelReq: null,
        levelMonster: 3,
        minDefense: null,
        maxDefense: null,
        minDamage: 6,
        maxDamage: 11,
        strengthReq: 25,
        dexterityReq: null,
        durability: 50,
        sockets: 2,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyScepter,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rune Scepter',
        levelReq: 19,
        levelMonster: 31,
        minDefense: null,
        maxDefense: null,
        minDamage: 13,
        maxDamage: 24,
        strengthReq: 58,
        dexterityReq: null,
        durability: 50,
        sockets: 2,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyScepter,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mighty Scepter',
        levelReq: 46,
        levelMonster: 62,
        minDefense: null,
        maxDefense: null,
        minDamage: 40,
        maxDamage: 52,
        strengthReq: 125,
        dexterityReq: 65,
        durability: 50,
        sockets: 2,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyScepter,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const itemFamilyGrandScepter = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Grand Scepter',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Grand Scepter',
        levelReq: null,
        levelMonster: 15,
        minDefense: null,
        maxDefense: null,
        minDamage: 8,
        maxDamage: 18,
        strengthReq: 37,
        dexterityReq: null,
        durability: 60,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyGrandScepter,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Holy Water Sprinkler',
        levelReq: 25,
        levelMonster: 40,
        minDefense: null,
        maxDefense: null,
        minDamage: 14,
        maxDamage: 36,
        strengthReq: 76,
        dexterityReq: null,
        durability: 60,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyGrandScepter,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Seraph Rod',
        levelReq: 57,
        levelMonster: 76,
        minDefense: null,
        maxDefense: null,
        minDamage: 45,
        maxDamage: 54,
        strengthReq: 108,
        dexterityReq: 69,
        durability: 60,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyGrandScepter,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const itemFamilyWarScepter = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'War Scepter',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'War Scepter',
        levelReq: null,
        levelMonster: 21,
        minDefense: null,
        maxDefense: null,
        minDamage: 10,
        maxDamage: 17,
        strengthReq: 55,
        dexterityReq: null,
        durability: 70,
        sockets: 5,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyWarScepter,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Divine Scepter',
        levelReq: 25,
        levelMonster: 45,
        minDefense: null,
        maxDefense: null,
        minDamage: 16,
        maxDamage: 38,
        strengthReq: 103,
        dexterityReq: null,
        durability: 70,
        sockets: 5,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyWarScepter,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Caduceus',
        levelReq: 66,
        levelMonster: 85,
        minDefense: null,
        maxDefense: null,
        minDamage: 37,
        maxDamage: 43,
        strengthReq: 97,
        dexterityReq: 70,
        durability: 70,
        sockets: 5,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyWarScepter,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemBase', null, {}),
};

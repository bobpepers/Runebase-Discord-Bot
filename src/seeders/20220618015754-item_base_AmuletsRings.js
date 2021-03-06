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
    const itemFamilyRings = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Rings',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Eturn',
        levelReq: null,
        levelMonster: null,
        minDefense: null,
        maxDefense: null,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: null,
        sockets: null,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyRings,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bband',
        levelReq: null,
        levelMonster: null,
        minDefense: null,
        maxDefense: null,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: null,
        sockets: null,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyRings,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Orange',
        levelReq: null,
        levelMonster: null,
        minDefense: null,
        maxDefense: null,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: null,
        sockets: null,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyRings,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sloop',
        levelReq: null,
        levelMonster: null,
        minDefense: null,
        maxDefense: null,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: null,
        sockets: null,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyRings,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chain',
        levelReq: null,
        levelMonster: null,
        minDefense: null,
        maxDefense: null,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: null,
        sockets: null,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyRings,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Dagger
    const itemFamilyAmulets = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Amulets',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Cross',
        levelReq: null,
        levelMonster: null,
        minDefense: null,
        maxDefense: null,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: null,
        sockets: null,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyAmulets,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Star',
        levelReq: null,
        levelMonster: null,
        minDefense: null,
        maxDefense: null,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: null,
        sockets: null,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyAmulets,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sun',
        levelReq: null,
        levelMonster: null,
        minDefense: null,
        maxDefense: null,
        minDamage: null,
        maxDamage: null,
        strengthReq: null,
        dexterityReq: null,
        durability: null,
        sockets: null,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyAmulets,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemBase', null, {}),
};

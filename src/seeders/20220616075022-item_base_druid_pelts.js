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
    const itemFamilyWolfHead = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Wolf Head',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Wolf Head',
        levelReq: 3,
        levelMonster: 4,
        minDefense: 8,
        maxDefense: 11,
        minDamage: null,
        maxDamage: null,
        strengthReq: 16,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyWolfHead,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alpha Helm',
        levelReq: 26,
        levelMonster: 35,
        minDefense: 52,
        maxDefense: 62,
        minDamage: null,
        maxDamage: null,
        strengthReq: 44,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyWolfHead,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Blood Spirit',
        levelReq: 46,
        levelMonster: 62,
        minDefense: 101,
        maxDefense: 145,
        minDamage: null,
        maxDamage: null,
        strengthReq: 86,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyWolfHead,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const itemFamilyHawkHelm = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Hawk Helm',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Hawk Helm',
        levelReq: 6,
        levelMonster: 8,
        minDefense: 4,
        maxDefense: 15,
        minDamage: null,
        maxDamage: null,
        strengthReq: 20,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyHawkHelm,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Griffon Headdress',
        levelReq: 30,
        levelMonster: 40,
        minDefense: 46,
        maxDefense: 68,
        minDamage: null,
        maxDamage: null,
        strengthReq: 50,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyHawkHelm,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sun Spirit',
        levelReq: 51,
        levelMonster: 69,
        minDefense: 98,
        maxDefense: 147,
        minDamage: null,
        maxDamage: null,
        strengthReq: 95,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyHawkHelm,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const itemFamilyAntlers = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Antlers',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Antlers',
        levelReq: 12,
        levelMonster: 16,
        minDefense: 18,
        maxDefense: 24,
        minDamage: null,
        maxDamage: null,
        strengthReq: 24,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyHawkHelm,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hunter's Guise",
        levelReq: 29,
        levelMonster: 46,
        minDefense: 67,
        maxDefense: 81,
        minDamage: null,
        maxDamage: null,
        strengthReq: 56,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyHawkHelm,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Earth Spirit',
        levelReq: 57,
        levelMonster: 76,
        minDefense: 107,
        maxDefense: 152,
        minDamage: null,
        maxDamage: null,
        strengthReq: 104,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyHawkHelm,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const itemFamilyAFalconMask = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Falcon Mask',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Falcon Mask',
        levelReq: 15,
        levelMonster: 20,
        minDefense: 12,
        maxDefense: 28,
        minDamage: null,
        maxDamage: null,
        strengthReq: 28,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyAFalconMask,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sacred Feathers",
        levelReq: 32,
        levelMonster: 50,
        minDefense: 58,
        maxDefense: 87,
        minDamage: null,
        maxDamage: null,
        strengthReq: 62,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyAFalconMask,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sky Spirit',
        levelReq: 62,
        levelMonster: 83,
        minDefense: 103,
        maxDefense: 155,
        minDamage: null,
        maxDamage: null,
        strengthReq: 113,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilyAFalconMask,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const itemFamilySpiritmask = await queryInterface.rawSelect('itemFamily', {
      where: {
        name: 'Spirit Mask',
      },
    }, ['id']);
    await queryInterface.bulkInsert('itemBase', [
      {
        name: 'Spirit Mask',
        levelReq: 18,
        levelMonster: 24,
        minDefense: 22,
        maxDefense: 35,
        minDamage: null,
        maxDamage: null,
        strengthReq: 30,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilySpiritmask,
        itemDifficultyId: itemDifficultyNormal,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Totemic Mask",
        levelReq: 41,
        levelMonster: 55,
        minDefense: 73,
        maxDefense: 98,
        minDamage: null,
        maxDamage: null,
        strengthReq: 65,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilySpiritmask,
        itemDifficultyId: itemDifficultyExceptional,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dream Spirit',
        levelReq: 66,
        levelMonster: 85,
        minDefense: 109,
        maxDefense: 159,
        minDamage: null,
        maxDamage: null,
        strengthReq: 118,
        dexterityReq: null,
        durability: 20,
        sockets: 3,
        block: null,
        maxStack: null,
        itemFamilyId: itemFamilySpiritmask,
        itemDifficultyId: itemDifficultyElite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('itemBase', null, {}),
};
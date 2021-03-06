module.exports = {
  up: async (queryInterface, Sequelize) => {
    const SummoningSpellsSkills = await queryInterface.rawSelect('skillTree', {
      where: {
        name: 'Summoning Spells',
      },
    }, ['id']);
    const PoisonandBonekills = await queryInterface.rawSelect('skillTree', {
      where: {
        name: 'Poison and Bone Spells',
      },
    }, ['id']);

    const CursesSkills = await queryInterface.rawSelect('skillTree', {
      where: {
        name: 'Curses',
      },
    }, ['id']);

    await queryInterface.bulkInsert('skill', [
      // Amazon
      // Bows
      {
        name: 'Raise Skeleton',
        level: 1,
        row: 1,
        column: 3,
        skillTreeId: SummoningSpellsSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Skeleton Mastery',
        level: 1,
        row: 1,
        column: 1,
        skillTreeId: SummoningSpellsSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Clay Golem',
        level: 6,
        row: 2,
        column: 2,
        skillTreeId: SummoningSpellsSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Golem Mastery',
        level: 12,
        row: 3,
        column: 1,
        skillTreeId: SummoningSpellsSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Raise Skeletal Mage',
        level: 12,
        row: 3,
        column: 3,
        skillTreeId: SummoningSpellsSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Blood Golem',
        level: 18,
        row: 4,
        column: 2,
        skillTreeId: SummoningSpellsSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Summon Resist',
        level: 24,
        row: 5,
        column: 1,
        skillTreeId: SummoningSpellsSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Iron Golem',
        level: 24,
        row: 5,
        column: 2,
        skillTreeId: SummoningSpellsSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fire Golem',
        level: 30,
        row: 6,
        column: 2,
        skillTreeId: SummoningSpellsSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Revive',
        level: 30,
        row: 6,
        column: 3,
        skillTreeId: SummoningSpellsSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Javelins
      {
        name: 'Teeth',
        level: 1,
        row: 1,
        column: 2,
        skillTreeId: PoisonandBonekills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bone Armor',
        level: 1,
        row: 1,
        column: 3,
        skillTreeId: PoisonandBonekills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Poison Dagger',
        level: 6,
        row: 2,
        column: 1,
        skillTreeId: PoisonandBonekills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Corpse Explosion',
        level: 6,
        row: 2,
        column: 2,
        skillTreeId: PoisonandBonekills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bone Wall',
        level: 12,
        row: 3,
        column: 3,
        skillTreeId: PoisonandBonekills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Poison Explosion',
        level: 18,
        row: 4,
        column: 1,
        skillTreeId: PoisonandBonekills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bone Spear',
        level: 18,
        row: 4,
        column: 2,
        skillTreeId: PoisonandBonekills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bone Prison',
        level: 24,
        row: 5,
        column: 3,
        skillTreeId: PoisonandBonekills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Poison Nova',
        level: 30,
        row: 6,
        column: 1,
        skillTreeId: PoisonandBonekills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bone Spirit',
        level: 30,
        row: 6,
        column: 2,
        skillTreeId: PoisonandBonekills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Passice
      {
        name: 'Amplify Damage',
        level: 1,
        row: 1,
        column: 2,
        skillTreeId: CursesSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dim Vision',
        level: 6,
        row: 1,
        column: 1,
        skillTreeId: CursesSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Weaken',
        level: 6,
        row: 2,
        column: 3,
        skillTreeId: CursesSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Iron Maiden',
        level: 12,
        row: 3,
        column: 2,
        skillTreeId: CursesSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Terror',
        level: 12,
        row: 3,
        column: 3,
        skillTreeId: CursesSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Confuse',
        level: 18,
        row: 4,
        column: 1,
        skillTreeId: CursesSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Life Tap',
        level: 18,
        row: 4,
        column: 2,
        skillTreeId: CursesSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Attract',
        level: 24,
        row: 5,
        column: 1,
        skillTreeId: CursesSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Decrepify',
        level: 24,
        row: 5,
        column: 3,
        skillTreeId: CursesSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lower Resist',
        level: 30,
        row: 6,
        column: 2,
        skillTreeId: CursesSkills,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('skill', null, {}),
};

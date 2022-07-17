module.exports = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.removeColumn('UserGroupClass', 'userId');
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      queryInterface.addColumn(
        'UserGroupClass',
        'userId',
        {
          type: DataTypes.BIGINT,
          references: {
            model: 'user', // name of Source model
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};

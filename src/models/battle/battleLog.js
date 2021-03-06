module.exports = (sequelize, DataTypes) => {
  // 1: The model schema.
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    log: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const BattleLogModel = sequelize.define('battleLog', modelDefinition, modelOptions);

  BattleLogModel.associate = (model) => {
    BattleLogModel.belongsTo(model.battle);
  };

  return BattleLogModel;
};

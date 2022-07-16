module.exports = (sequelize, DataTypes) => {
  // 1: The model schema.
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    damageBonus: {
      type: DataTypes.INTEGER,
    },
    attackBonus: {
      type: DataTypes.INTEGER,
    },
    defenseBonus: {
      type: DataTypes.INTEGER,
    },
    parryBonus: {
      type: DataTypes.INTEGER,
    },
    lifeBonus: {
      type: DataTypes.INTEGER,
    },
    critBonus: {
      type: DataTypes.INTEGER,
    },
    chance: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      allowNull: false,
    },
    rounds: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    new: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const BuffModel = sequelize.define('buff', modelDefinition, modelOptions);

  BuffModel.associate = (model) => {
    BuffModel.belongsTo(model.UserGroupClass);
    BuffModel.belongsTo(model.BattleMonster);
  };

  return BuffModel;
};

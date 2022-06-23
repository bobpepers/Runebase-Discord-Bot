"use strict";

module.exports = function (sequelize, DataTypes) {
  // 1: The model schema.
  var modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    log: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var BattleLogModel = sequelize.define('battleLog', modelDefinition, modelOptions);

  BattleLogModel.associate = function (model) {
    BattleLogModel.belongsTo(model.battle);
  };

  return BattleLogModel;
};
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
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expNeeded: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    discordRankRoleId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var RankModel = sequelize.define('rank', modelDefinition, modelOptions);

  RankModel.associate = function (model) {
    RankModel.belongsTo(model.group);
    RankModel.belongsToMany(model.user, {
      through: 'UserRank'
    });
    RankModel.belongsToMany(model.UserGroup, {
      through: 'UserGroupRank'
    });
  };

  return RankModel;
};
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
    groupId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    banMessage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lastActive: {
      type: DataTypes.DATE,
      allowNull: true
    },
    inviteLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activeRealm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    expRewardChannelId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var GroupModel = sequelize.define('group', modelDefinition, modelOptions);

  GroupModel.associate = function (model) {
    GroupModel.hasMany(model.active);
    GroupModel.hasMany(model.UserGroup);
    GroupModel.hasMany(model.rank);
    GroupModel.hasMany(model.channel);
    GroupModel.hasMany(model.featureSetting);
    GroupModel.hasOne(model.user, {
      foreignKey: "currentRealmId"
    });
  };

  return GroupModel;
};
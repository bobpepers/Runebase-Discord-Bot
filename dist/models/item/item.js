"use strict";

module.exports = function (sequelize, DataTypes) {
  var modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    levelReq: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    durability: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    defense: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    minDamage: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    maxDamage: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    strength: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    dexterity: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    vitality: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    energy: {
      type: DataTypes.SMALLINT,
      allowNull: true
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var itemModel = sequelize.define('item', modelDefinition, modelOptions);

  itemModel.associate = function (model) {
    itemModel.belongsTo(model.itemBase); // itemModel.hasOne(model.itemCategory);

    itemModel.belongsTo(model.itemQuality);
  };

  return itemModel;
};
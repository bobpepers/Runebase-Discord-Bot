"use strict";

module.exports = function (sequelize, DataTypes) {
  // 1: The model schema.
  var modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var InventoryModel = sequelize.define('inventory', modelDefinition, modelOptions);

  InventoryModel.associate = function (model) {
    InventoryModel.hasMany(model.item);
    InventoryModel.hasOne(model.UserGroupClass, {
      as: 'UserGroupClass',
      foreignKey: 'inventoryId'
    });
  };

  return InventoryModel;
};
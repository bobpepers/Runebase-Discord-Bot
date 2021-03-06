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
    twoHanded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }; // 2: The model options.

  var modelOptions = {
    freezeTableName: true
  }; // 3: Define the Wallet model.

  var ItemFamilyModel = sequelize.define('itemFamily', modelDefinition, modelOptions);

  ItemFamilyModel.associate = function (model) {
    ItemFamilyModel.belongsTo(model.itemType);
  };

  return ItemFamilyModel;
};
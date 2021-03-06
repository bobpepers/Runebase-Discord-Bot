module.exports = (sequelize, DataTypes) => {
  // 1: The model schema.
  const modelDefinition = {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const InventoryModel = sequelize.define('inventory', modelDefinition, modelOptions);

  InventoryModel.associate = (model) => {
    InventoryModel.hasMany(model.item);
    InventoryModel.hasOne(model.UserGroupClass, {
      as: 'UserGroupClass',
      foreignKey: 'inventoryId',
    });
  };

  return InventoryModel;
};

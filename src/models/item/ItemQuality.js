module.exports = (sequelize, DataTypes) => {
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
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const ItemQualityModel = sequelize.define('itemQuality', modelDefinition, modelOptions);

  ItemQualityModel.associate = (model) => {
    ItemQualityModel.hasOne(model.itemModifier);
  };

  return ItemQualityModel;
};

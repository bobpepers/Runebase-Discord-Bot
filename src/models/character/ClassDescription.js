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
    description: {
      type: DataTypes.STRING(4096),
      allowNull: false,
    },
  };

  // 2: The model options.
  const modelOptions = {
    freezeTableName: true,
  };

  // 3: Define the Wallet model.
  const ClassDescriptionModel = sequelize.define('classDescription', modelDefinition, modelOptions);

  ClassDescriptionModel.associate = (model) => {
    ClassDescriptionModel.hasOne(model.class);
  };

  return ClassDescriptionModel;
};

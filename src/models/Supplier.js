const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

class Supplier extends Model {}

Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Supplier",
    tableName: "suppliers",
    paranoid: true,
    timestamps: true,
    underscored: true,
  },
);

module.exports = Supplier;

const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

class Warehouse extends Model {}

Warehouse.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["physique", "logic"],
    },
  },
  {
    sequelize,
    modelName: "Warehouse",
    tableName: "warehouses",
    paranoid: true,
    timestamps: true,
  },
);

module.exports = Warehouse;

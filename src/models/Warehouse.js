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
    min_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    modelName: "Warehouse",
    tableName: "warehouses",
    paranoid: true,
    timestamps: true,
    underscored: true,
  },
);

// Warehouse.sync();
module.exports = Warehouse;

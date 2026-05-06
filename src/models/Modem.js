const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Warehouse = require("./Warehouse");
const PurchaseOrder = require("./PurchaseOrder");

class Modem extends Model {}

Model.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mac_address: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    serial_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["free", "returned", "damaged", "saled", "on_delivery"],
    },
  },
  {
    sequelize,
    modelName: "Modem",
    tableName: "modems",
    paranoid: true,
    timestamps: true,
  },
);

Modem.belongsTo(Warehouse, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

Warehouse.hasMany(Modem);

Modem.belongsTo(PurchaseOrder, {
  foreignKey: "purchase_order",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

PurchaseOrder.hasMany(Modem);

module.exports = Modem;

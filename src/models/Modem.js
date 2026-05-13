const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Warehouse = require("./Warehouse");
const PurchaseOrder = require("./PurchaseOrder");

class Modem extends Model {}

Modem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mac: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    sn: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["free", "returned", "damaged", "saled", "on_delivery"],
      defaultValue: "free",
    },
  },
  {
    sequelize,
    modelName: "Modem",
    tableName: "modems",
    paranoid: true,
    timestamps: true,
    underscored: true,
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

PurchaseOrder.hasMany(Modem, {
  foreignKey: "purchase_order",
});

module.exports = Modem;

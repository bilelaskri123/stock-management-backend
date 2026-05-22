const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Modem = require("./Modem");

class SalesOrder extends Model {}

SalesOrder.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    client_tel_adsl: { type: DataTypes.STRING, allowNull: false },
    client_cin: { type: DataTypes.STRING, allowNull: false },
    modem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "modems",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "SalesOrder",
    tableName: "sales_order",
    paranoid: true,
    timestamps: true,
    underscored: true,
  },
);

Modem.hasMany(SalesOrder, {
  foreignKey: "modem_id",
  sourceKey: "id",
});

SalesOrder.belongsTo(Modem, {
  foreignKey: "modem_id",
  targetKey: "id",
});

SalesOrder.sync({ alter: true });

module.exports = SalesOrder;

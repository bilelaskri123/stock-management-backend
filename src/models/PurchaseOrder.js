const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

class PurchaseOrder extends Model {}

PurchaseOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity_ordered: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity_received: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["created", "partial delivered", "completely delivered"],
      defaultValue: "created",
    },
  },
  {
    sequelize,
    modelName: "PurchaseOrder",
    tableName: "purchase_orders",
    paranoid: true,
    timestamps: true,
  },
);

PurchaseOrder.belongsTo(User, {
  foreignKey: "created_by",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

User.hasMany(PurchaseOrder, {
  foreignKey: "created_by",
  as: "purchase_orders",
});

module.exports = PurchaseOrder;

const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const PurchaseOrder = require("./PurchaseOrder");

class PurchaseOrderHistory extends Model {}

PurchaseOrderHistory.init(
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
    },
    action: {
      type: DataTypes.ENUM,
      values: ["create", "update"],
    },
  },
  {
    sequelize,
    modelName: "PurchaseOrderHistory",
    tableName: "purchase_order_histories",
    paranoid: true,
    timestamps: true,
    underscored: true,
  },
);

PurchaseOrderHistory.belongsTo(User, {
  foreignKey: "created_by",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

User.hasMany(PurchaseOrderHistory, {
  foreignKey: "created_by",
  as: "purchase_orders",
});

PurchaseOrderHistory.belongsTo(PurchaseOrder, {
  foreignKey: "purchase_order",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

PurchaseOrder.hasMany(PurchaseOrderHistory, {
  foreignKey: "purchase_order",
  as: "purchase_orders",
});

// PurchaseOrderHistory.sync({ alter: true });

module.exports = PurchaseOrderHistory;

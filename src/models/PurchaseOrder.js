const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Supplier = require("./Supplier");

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
    underscored: true,
  },
);

// join between user and purchase order
PurchaseOrder.belongsTo(User, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
  foreignKey: "created_by",
});

User.hasMany(PurchaseOrder, {
  foreignKey: "created_by",
});

// join between supplier and purchase order
PurchaseOrder.belongsTo(Supplier, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
  foreignKey: "supplier_id",
});

Supplier.hasMany(PurchaseOrder, {
  foreignKey: "supplier_id",
});

// PurchaseOrder.sync({ alter: true });

module.exports = PurchaseOrder;

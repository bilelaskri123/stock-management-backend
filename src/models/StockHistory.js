const { Model, DataTypes } = require("sequelize");
const User = require("./User");
const StockMovement = require("./StockMovement");
const { sequelize } = require("../config/db");

class StockHistory extends Model {}

StockHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    action: {
      type: DataTypes.ENUM,
      values: ["stock_movement", "sales_order", "returned", "damaged"],
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "stock_history",
    modelName: "StockHistory",
    paranoid: true,
    underscored: true,
    timestamps: true,
  },
);

User.hasMany(StockHistory, {
  foreignKey: "created_by",
  sourceKey: "id",
});

StockHistory.belongsTo(User, {
  foreignKey: "created_by",
  targetKey: "id",
});

module.exports = StockHistory;

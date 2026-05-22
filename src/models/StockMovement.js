const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Warehouse = require("./Warehouse");
const Modem = require("./Modem");
const User = require("./User");

class StockMovement extends Model {}

StockMovement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    from_warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "warehouses",
        key: "id",
      },
    },
    to_warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "warehouses",
        key: "id",
      },
    },
    moved_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
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
    timestamps: true,
    paranoid: true,
    modelName: "StockMovement",
    tableName: "stock_movement",
    underscored: true,
  },
);

// FROM warehouse → StockMovement
Warehouse.hasMany(StockMovement, {
  foreignKey: "from_warehouse_id",
  sourceKey: "id",
  as: "outgoingMovements", // movements leaving this warehouse
});

StockMovement.belongsTo(Warehouse, {
  foreignKey: "from_warehouse_id",
  targetKey: "id",
  as: "fromWarehouse", // the source warehouse
});

// TO warehouse → StockMovement
Warehouse.hasMany(StockMovement, {
  foreignKey: "to_warehouse_id",
  sourceKey: "id",
  as: "incomingMovements", // movements arriving at this warehouse
});

StockMovement.belongsTo(Warehouse, {
  foreignKey: "to_warehouse_id",
  targetKey: "id",
  as: "toWarehouse", // the destination warehouse
});

User.hasMany(StockMovement, {
  foreignKey: "moved_by",
  sourceKey: "id",
});

StockMovement.belongsTo(User, {
  foreignKey: "moved_by",
  targetKey: "id",
});

Modem.hasMany(StockMovement, {
  foreignKey: "modem_id",
  sourceKey: "id",
});

StockMovement.belongsTo(Modem, {
  foreignKey: "modem_id",
  targetKey: "id",
});

// StockMovement.sync({ alter: true });

module.exports = StockMovement;

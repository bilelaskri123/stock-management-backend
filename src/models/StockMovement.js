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

StockMovement.sync({ alter: true });

module.exports = StockMovement;

// Create a stock movement between two warehouses
// await StockMovement.create({
//   quantity:          150,
//   moved_at:          new Date(),
//   from_warehouse_id: 1,              // leaving warehouse #1
//   to_warehouse_id:   2               // arriving at warehouse #2
// });

// // Fetch movement with both warehouses populated
// const movement = await StockMovement.findOne({
//   where:   { movement_id: 1 },
//   include: [
//     { model: Warehouse, as: 'fromWarehouse' },
//     { model: Warehouse, as: 'toWarehouse'   }
//   ]
// });

// console.log(movement.fromWarehouse.name);  // "Warehouse A"
// console.log(movement.toWarehouse.name);    // "Warehouse B"

// // Fetch a warehouse with all its incoming & outgoing movements
// const warehouse = await Warehouse.findOne({
//   where:   { warehouse_id: 1 },
//   include: [
//     { model: StockMovement, as: 'outgoingMovements' },
//     { model: StockMovement, as: 'incomingMovements' }
//   ]
// });

// console.log(warehouse.outgoingMovements);  // movements where from_warehouse_id = 1
// console.log(warehouse.incomingMovements);  // movements where to_warehouse_id   = 1

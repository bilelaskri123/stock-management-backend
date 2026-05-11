const StockMovement = require("../models/StockMovement");
const User = require("../models/User");
const Modem = require("../models/Modem");
const Warehouse = require("../models/Warehouse");

class StockMovementRepository {
  async findAll({ page = 1, limit = 10, modemId = "" }) {
    const offset = (page - 1) * limit;
    const where = { modem_id: modemId };
    const { count, rows } = await StockMovement.findAndCountAll({
      where,
      include: [
        { model: User },
        { model: Modem },
        { model: Warehouse, as: "fromWarehouse" },
        { model: Warehouse, as: "toWarehouse" },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    return {
      total: count,
      data: rows,
      page,
      totalPages: Math.ceil(count / limit),
    };
  }

  async findById(id) {
    return await StockMovement.findByPk(id, {
      include: [
        { model: User },
        { model: Modem },
        { model: Warehouse, as: "fromWarehouse" },
        { model: Warehouse, as: "toWarehouse" },
      ],
    });
  }

  async create(StockMovementData) {
    return await StockMovement.create(StockMovementData);
  }

  async update(id, StockMovementData) {
    const stockMovement = await StockMovement.findByPk(id);
    if (!stockMovement) {
      throw new Error("Stock Movement not found");
    }
    return await stockMovement.update(StockMovementData);
  }

  async delete(id) {
    const stockMovement = await StockMovement.findByPk(id);
    if (!stockMovement) {
      return false;
    }
    await stockMovement.destroy();
    return true;
  }
}

module.exports = new StockMovementRepository();

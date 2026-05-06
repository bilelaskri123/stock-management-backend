const { Op } = require("sequelize");
const Warehouse = require("../models/Warehouse");

class WarehouseRepository {
  async findAll({ page = 1, limit = 10, search = "" }) {
    const offset = (page - 1) * limit;
    const where = search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { address: { [Op.iLike]: `%${search}%` } },
            { type: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};
    const { count, rows } = await Warehouse.findAndCountAll({
      where,
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
    return await Warehouse.findByPk(id);
  }

  async create(WarehouseData) {
    return await Warehouse.create(WarehouseData);
  }

  async update(id, WarehouseData) {
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
      throw new Error("Warehouse not found");
    }
    return await Warehouse.update(WarehouseData);
  }

  async delete(id) {
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
      throw new Error("Warehouse not found");
    }
    await Warehouse.destroy();
    return true;
  }
}

module.exports = new WarehouseRepository();

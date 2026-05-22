const SalesOrder = require("../models/SalesOrder");
const Modem = require("../models/Modem");
const { Op } = require("sequelize");

class SalesOrderRepository {
  async findAll({ page = 1, limit = 10, search = "" }) {
    const offset = (page - 1) * limit;
    const where = search
      ? {
          [Op.or]: [
            { client_tel_adsl: { [Op.iLike]: `%${search}%` } },
            { client_cin: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};
    const { count, rows } = await SalesOrder.findAndCountAll({
      where,
      include: { model: Modem },
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
    return await SalesOrder.findByPk(id, {
      include: { model: Modem },
    });
  }

  async create(salesOrderData) {
    return await SalesOrder.create(salesOrderData);
  }

  async update(id, salesOrderData) {
    const salesOrder = await SalesOrder.findByPk(id);
    if (!salesOrder) {
      throw new Error("Sales Order not found");
    }
    return await salesOrder.update(salesOrderData);
  }

  async delete(id) {
    const salesOrder = await SalesOrder.findByPk(id);
    if (!salesOrder) {
      return false;
    }
    await salesOrder.destroy();
    return true;
  }
}

module.exports = new SalesOrderRepository();

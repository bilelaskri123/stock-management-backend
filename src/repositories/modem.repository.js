const Modem = require("../models/Modem");
const Warehouse = require("../models/Warehouse");
const PurchaseOrder = require("../models/PurchaseOrder");
const { Op } = require("sequelize");

class ModemRepository {
  async findAll({ page = 1, limit = 10, search = "" }) {
    const offset = (page - 1) * limit;
    const where = search
      ? {
          [Op.or]: [
            { mac: { [Op.iLike]: `%${search}%` } },
            { sn: { [Op.iLike]: `%${search}%` } },
            { status: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};
    const { count, rows } = await Modem.findAndCountAll({
      where,
      include: [{ model: Modem }, { model: Warehouse }],
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
    return await Modem.findByPk(id, {
      include: [{ model: Modem }, { model: Warehouse }],
    });
  }

  async create(modemData) {
    return await Modem.create(modemData);
  }

  async update(id, modemData) {
    const modem = await Modem.findByPk(id);
    if (!modem) {
      throw new Error("Modem not found");
    }
    return await modem.update(modemData);
  }

  async delete(id) {
    const modem = await Modem.findByPk(id);
    if (!modem) {
      return false;
    }
    await modem.destroy();
    return true;
  }
}

module.exports = new ModemRepository();

const { Op } = require("sequelize");
const WareHouse = require("../models/Warehouse");

class WarehoWareHouseepository {
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
    const { count, rows } = await WareHouse.findAndCountAll({
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
    return await WareHouse.findByPk(id);
  }

  async create(WareHouseData) {
    return await WareHouse.create(WareHouseData);
  }

  async update(id, WareHouseData) {
    const WareHouse = await WareHouse.findByPk(id);
    if (!WareHouse) {
      throw new Error("WareHouse not found");
    }
    return await WareHouse.update(WareHouseData);
  }

  async delete(id) {
    const WareHouse = await WareHouse.findByPk(id);
    if (!WareHouse) {
      throw new Error("WareHouse not found");
    }
    await WareHouse.destroy();
    return true;
  }
}

const Supplier = require("../models/Supplier");

class SupplierRepository {
  async findAll({ page = 1, limit = 10, search = "" }) {
    const offset = (page - 1) * limit;
    const where = search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { phone: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};
    const { count, rows } = await Supplier.findAndCountAll({
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
    return await Supplier.findByPk(id);
  }

  async create(SupplierData) {
    return await Supplier.create(SupplierData);
  }

  async update(id, SupplierData) {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      throw new Error("Supplier not found");
    }
    return await Supplier.update(SupplierData);
  }

  async delete(id) {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      throw new Error("Supplier not found");
    }
    await Supplier.destroy();
    return true;
  }
}

module.exports = new SupplierRepository();

const PurchaseOrder = require("../models/PurchaseOrder");
const Supplier = require("../models/Supplier");

class PurchaseOrderRepository {
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
    const { count, rows } = await PurchaseOrder.findAndCountAll({
      where,
      include: { model: Supplier },
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
    return await PurchaseOrder.findByPk(id, {
      include: { model: Supplier },
    });
  }

  async create(PurchaseOrderData) {
    return await PurchaseOrder.create(PurchaseOrderData);
  }

  async update(id, PurchaseOrderData) {
    const purchaseOrder = await PurchaseOrder.findByPk(id);
    if (!purchaseOrder) {
      throw new Error("PurchaseOrder not found");
    }
    return await purchaseOrder.update(PurchaseOrderData);
  }

  async delete(id) {
    const purchaseOrder = await PurchaseOrder.findByPk(id);
    if (!purchaseOrder) {
      return false;
    }
    await purchaseOrder.destroy();
    return true;
  }
}

module.exports = new PurchaseOrderRepository();

const PurchaseOrderHistory = require("../models/PurchaseOrderHistory");
const PurchaseOrder = require("../models/PurchaseOrder");
const Supplier = require("../models/Supplier");
const User = require("../models/User");

class PurchaseOrderHistoryRepository {
  async findAll({ page = 1, limit = 10, purchaseOrder }) {
    const offset = (page - 1) * limit;
    const where = {
      purchase_order: purchaseOrder,
    };
    const { count, rows } = await PurchaseOrderHistory.findAndCountAll({
      where,
      include: [
        {
          model: PurchaseOrder,
          attributes: [
            "id",
            "quantity_ordered",
            "quantity_received",
            "status",
            "createdAt",
          ],
          include: [{ model: Supplier, attributes: ["id", "name"] }],
        },
        { model: User, attributes: ["id", "firstName", "lastName"] },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        "quantity_ordered",
        "quantity_received",
        "status",
        "action",
        "createdAt",
      ],
    });
    return {
      total: count,
      data: rows,
      page,
      totalPages: Math.ceil(count / limit),
    };
  }

  async findById(id) {
    return await PurchaseOrderHistory.findByPk(id, {
      include: [
        { model: PurchaseOrder, include: [{ model: Supplier }] },
        { model: User },
      ],
    });
  }

  async create(PurchaseOrderHistoryData) {
    return await PurchaseOrderHistory.create(PurchaseOrderHistoryData);
  }

  async update(id, PurchaseOrderHistoryData) {
    const purchaseOrderHistory = await PurchaseOrder.findByPk(id);
    if (!purchaseOrderHistory) {
      throw new Error("PurchaseOrderHistory not found");
    }
    return await purchaseOrderHistory.update(PurchaseOrderHistoryData);
  }

  async delete(id) {
    const purchaseOrderHistory = await PurchaseOrderHistory.findByPk(id);
    if (!purchaseOrderHistory) {
      return false;
    }
    await purchaseOrderHistory.destroy();
    return true;
  }
}

module.exports = new PurchaseOrderHistoryRepository();

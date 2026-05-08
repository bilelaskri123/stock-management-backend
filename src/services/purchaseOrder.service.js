const purchaseOrderRepository = require("../repositories/purchaseOrder.repository");
const { AppError } = require("../utils/AppError");

class PurchaseOrderService {
  async getAllPurchaseOrders(query) {
    return await purchaseOrderRepository.findAll(query);
  }

  async getPurchaseOrderById(purchaseOrderId) {
    const purchaseOrder =
      await purchaseOrderRepository.findById(purchaseOrderId);
    if (!purchaseOrder) {
      throw new AppError("Purchase Order not found", 404);
    }
    return purchaseOrder;
  }

  async createPurchaseOrder(purchaseOrderData) {
    console.log(purchaseOrderData);

    return await purchaseOrderRepository.create(purchaseOrderData);
  }

  async updatePurchaseOrder(purchaseOrderId, purchaseOrderData) {
    const purchaseOrder =
      await purchaseOrderRepository.findById(purchaseOrderId);
    if (!purchaseOrder) {
      throw new AppError("Purchase Order not found", 404);
    }

    return await purchaseOrderRepository.update(
      purchaseOrderId,
      purchaseOrderData,
    );
  }

  async deletePurchaseOrder(purchaseOrderId) {
    const deleted = await purchaseOrderRepository.delete(purchaseOrderId);
    if (!deleted) {
      throw new AppError("Purchase Order not found", 404);
    }
    return true;
  }
}

module.exports = new PurchaseOrderService();

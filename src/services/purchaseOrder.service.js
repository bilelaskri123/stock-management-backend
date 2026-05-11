const purchaseOrderRepository = require("../repositories/purchaseOrder.repository");
const purchaseOrderHistoryService = require("./purchaseOrderHistory.service");
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
    // add purchase order history
    const purchaseOrder =
      await purchaseOrderRepository.create(purchaseOrderData);

    const purchaseOrderHistoryData = {
      quantity_received: purchaseOrder.quantity_received,
      quantity_ordered: purchaseOrder.quantity_ordered,
      status: purchaseOrder.status,
      action: "create",
      purchase_order: purchaseOrder.id,
      created_by: purchaseOrder.UserId,
    };

    await purchaseOrderHistoryService.createPurchaseOrderHistory(
      purchaseOrderHistoryData,
    );
    return purchaseOrder;
  }

  async updatePurchaseOrder(purchaseOrderId, purchaseOrderData) {
    // add purchase order history for update action
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
    // purchase order history for delete action
    const deleted = await purchaseOrderRepository.delete(purchaseOrderId);
    if (!deleted) {
      throw new AppError("Purchase Order not found", 404);
    }
    return true;
  }
}

module.exports = new PurchaseOrderService();

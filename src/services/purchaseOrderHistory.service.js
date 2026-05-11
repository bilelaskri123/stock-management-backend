const purchaseOrderHistoryRepository = require("../repositories/purchaseOrderHistory.repository");
const { AppError } = require("../utils/AppError");

class PurchaseOrderHistoryService {
  async getAllPurchaseOrderHistories(query) {
    return await purchaseOrderHistoryRepository.findAll(query);
  }

  async getPurchaseOrderById(purchaseOrderHistoryId) {
    const purchaseOrderHistory = await purchaseOrderHistoryRepository.findById(
      purchaseOrderHistoryId,
    );
    if (!purchaseOrderHistory) {
      throw new AppError("Purchase Order not found", 404);
    }
    return purchaseOrderHistory;
  }

  async createPurchaseOrderHistory(purchaseOrderHistoryData) {
    return await purchaseOrderHistoryRepository.create(
      purchaseOrderHistoryData,
    );
  }

  async updatePurchaseOrderHistory(
    purchaseOrderHistoryId,
    purchaseOrderHistoryData,
  ) {
    const purchaseOrderHistory =
      await purchaseOrderHistoryRepository.findById(purchaseOrderId);
    if (!purchaseOrderHistory) {
      throw new AppError("Purchase Order History not found", 404);
    }

    return await purchaseOrderHistoryRepository.update(
      purchaseOrderHistoryId,
      purchaseOrderHistoryData,
    );
  }

  async deletePurchaseOrderHistory(purchaseOrderHistoryId) {
    const deleted = await purchaseOrderHistoryRepository.delete(
      purchaseOrderHistoryId,
    );
    if (!deleted) {
      throw new AppError("Purchase Order History not found", 404);
    }
    return true;
  }
}

module.exports = new PurchaseOrderHistoryService();

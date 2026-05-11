const stockMovementRepository = require("../repositories/stockMovement.repository");
const { AppError } = require("../utils/AppError");

class StockMovementService {
  async getAllStockMovements(query) {
    return await stockMovementRepository.findAll(query);
  }

  async getStockMovementById(stockMovementId) {
    const stockMovement =
      await stockMovementRepository.findById(stockMovementId);
    if (!stockMovement) {
      throw new AppError("Stock Movement not found", 404);
    }
    return stockMovement;
  }

  async createStockMovement(stockMovementData) {
    // update modem after each stock movement
    const stockMovement =
      await stockMovementRepository.create(stockMovementData);
    return stockMovement;
  }

  async updateStockMovement(stockMovementId, stockMovementData) {
    // update modem after each update
    const stockMovement =
      await stockMovementRepository.findById(stockMovementId);
    if (!stockMovement) {
      throw new AppError("Stock Movement not found", 404);
    }

    const savedPurchaseOrder = await stockMovementRepository.update(
      stockMovementId,
      stockMovementData,
    );

    return savedPurchaseOrder;
  }

  async deleteStockMovement(stockMovementId) {
    const deleted = await stockMovementRepository.delete(stockMovementId);
    if (!deleted) {
      throw new AppError("Purchase Order not found", 404);
    }
    return true;
  }
}

module.exports = new StockMovementService();

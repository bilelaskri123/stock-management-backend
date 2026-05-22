const salesOrderRepository = require("../repositories/salesOrder.repository");
const { AppError } = require("../utils/AppError");

class SalesOrderService {
  async getAllSalesOrders(query) {
    return await salesOrderRepository.findAll(query);
  }

  async getSalesOrderById(salesOrderId) {
    const salesOrder = await salesOrderRepository.findById(salesOrderId);
    if (!salesOrder) {
      throw new AppError("Sales Order not found", 404);
    }
    return salesOrder;
  }

  async createSalesOrder(salesOrderData) {
    const salesOrder = await salesOrderRepository.create(salesOrderData);
    return salesOrder;
  }

  async updateSalesOrder(salesOrderId, salesOrderData) {
    const salesOrder = await salesOrderRepository.findById(salesOrderId);
    if (!salesOrder) {
      throw new AppError("Sales Order not found", 404);
    }

    const savedSalesOrder = await salesOrderRepository.update(
      salesOrderId,
      salesOrderData,
    );

    return savedSalesOrder;
  }

  async deleteSalesOrder(salesOrderId) {
    const deleted = await salesOrderRepository.delete(salesOrderId);
    if (!deleted) {
      throw new AppError("Sales Order not found", 404);
    }
    return true;
  }
}

module.exports = new SalesOrderService();

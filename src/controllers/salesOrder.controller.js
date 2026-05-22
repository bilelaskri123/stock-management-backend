const salesOrderService = require("../services/salesOrder.service");

class SalesOrderController {
  async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;
      const salesOrders = await salesOrderService.getAllSalesOrders({
        page,
        limit,
        search,
      });
      res.status(200).json({ success: true, salesOrders });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const salesOrderId = req.params.id;
      const salesOrder =
        await salesOrderService.getSalesOrderById(salesOrderId);
      res.status(200).json({ success: true, salesOrder });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { success, error, data } = createSalesOrderSchema.safeParse(
        req.body,
      );
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const newSalesOrder = await salesOrderService.createSalesOrder(data);
      res.status(201).json({ success: true, salesOrder: newSalesOrder });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const salesOrderId = req.params.id;
      const { success, error, data } = updateSalesOrderSchema.safeParse(
        req.body,
      );
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const updatedSalesOrder = await salesOrderService.updateSalesOrder(
        salesOrderId,
        data,
      );
      res.status(200).json({ success: true, salesOrder: updatedSalesOrder });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const salesOrderId = req.params.id;
      await salesOrderService.deleteSalesOrder(salesOrderId);
      res.status(200).json({
        success: true,
        message: "Sales Order deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SalesOrderController();

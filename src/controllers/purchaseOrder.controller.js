const purchaseOrderService = require("../services/purchaseOrder.service");

class PurchaseOrderController {
  async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;
      const purchaseOrders = await purchaseOrderService.getAllPurchaseOrders({
        page,
        limit,
        search,
      });
      res.status(200).json({ success: true, purchaseOrders });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const purchaseOrderId = req.params.id;
      const purchaseOrder =
        await purchaseOrderService.getPurchaseOrderById(purchaseOrderId);
      res.status(200).json({ success: true, purchaseOrder });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { success, error, data } = createPurchaseOrderSchema.safeParse(
        req.body,
      );
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const newPurchaseOrder =
        await purchaseOrderService.createPurchaseOrder(data);
      res.status(201).json({ success: true, purchaseOrder: newPurchaseOrder });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const purchaseOrderId = req.params.id;
      const { success, error, data } = updatePurchaseOrderSchema.safeParse(
        req.body,
      );
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const updatedPurchaseOrder =
        await purchaseOrderService.updatePurchaseOrder(purchaseOrderId, data);
      res
        .status(200)
        .json({ success: true, purchaseOrder: updatedPurchaseOrder });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const purchaseOrderId = req.params.id;
      await purchaseOrderService.deletePurchaseOrder(purchaseOrderId);
      res
        .status(200)
        .json({
          success: true,
          message: "Purchase Order deleted successfully",
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PurchaseOrderController();

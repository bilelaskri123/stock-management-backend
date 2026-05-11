const purchaseOrderHistoryService = require("../services/purchaseOrderHistory.service");

class PurchaseOrderHistoryController {
  async getAll(req, res, next) {
    try {
      const { page, limit, purchaseOrder } = req.query;
      if (!purchaseOrder) {
        return res
          .status(400)
          .json({ success: false, error: "missing purchase order query" });
      }
      const purchaseOrderHistories =
        await purchaseOrderHistoryService.getAllPurchaseOrderHistories({
          page,
          limit,
          purchaseOrder,
        });
      res.status(200).json({ success: true, purchaseOrderHistories });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const purchaseOrderHistoryId = req.params.id;
      const purchaseOrderHistory =
        await purchaseOrderHistoryService.getPurchaseOrderById(
          purchaseOrderHistoryId,
        );
      res.status(200).json({ success: true, purchaseOrderHistory });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PurchaseOrderHistoryController();

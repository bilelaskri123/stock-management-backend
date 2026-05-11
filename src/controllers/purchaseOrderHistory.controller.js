const purchaseOrderHistoryService = require("../services/purchaseOrderHistory.service");

class PurchaseOrderHistoryController {
  async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;
      if (!search) {
        return res
          .status(400)
          .json({ success: false, error: "missing search query" });
      }
      const purchaseOrderHistories =
        await purchaseOrderHistoryService.getAllPurchaseOrderHistories({
          page,
          limit,
          search,
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

const { Router } = require("express");
const purchaseOrderHistoryController = require("../controllers/purchaseOrderHistory.controller");
const permission = require("../middlewares/permission.middleware");
const router = Router();

router.get(
  "/",
  permission("view_purchase_order"),
  purchaseOrderHistoryController.getAll,
);
router.get(
  "/:id",
  permission("view_purchase_order"),
  purchaseOrderHistoryController.getById,
);

module.exports = router;

const { Router } = require("express");
const purchaseOrderHistoryController = require("../controllers/purchaseOrderHistory.controller");
const router = Router();

router.get("/", purchaseOrderHistoryController.getAll);
router.get("/:id", purchaseOrderHistoryController.getById);

module.exports = router;

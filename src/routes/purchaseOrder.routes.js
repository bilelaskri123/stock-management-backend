const { Router } = require("express");
const purchaseOrderController = require("../controllers/purchaseOrder.controller");
const router = Router();

router.get("/", purchaseOrderController.getAll);
router.get("/:id", purchaseOrderController.getById);
router.post("/", purchaseOrderController.create);
router.put("/:id", purchaseOrderController.update);
router.delete("/:id", purchaseOrderController.delete);

module.exports = router;

const { Router } = require("express");
const purchaseOrderController = require("../controllers/purchaseOrder.controller");
const permission = require("../middlewares/permission.middleware");
const upload = require("../utils/upload-excel");
const validateFile = require("../utils/validate-file");
const { fileUploadSchema } = require("../validators/purchaseOrder.validator");
const router = Router();

router.get(
  "/",
  permission("view_purchase_order"),
  purchaseOrderController.getAll,
);
router.get(
  "/:id",
  permission("view_purchase_order"),
  purchaseOrderController.getById,
);
router.post(
  "/",
  permission("create_purchase_order"),
  purchaseOrderController.create,
);
router.put(
  "/:id",
  permission("edit_purchase_order"),
  purchaseOrderController.update,
);
router.delete(
  "/:id",
  permission("delete_purchase_order"),
  purchaseOrderController.delete,
);

module.exports = router;

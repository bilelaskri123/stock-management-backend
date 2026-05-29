const { Router } = require("express");
const warehouseController = require("../controllers/warehouse.controller");
const permission = require("../middlewares/permission.middleware");

const router = Router();

router.get("/", permission("view_warehouse"), warehouseController.getAll);
router.get("/:id", permission("view_warehouse"), warehouseController.getById);
router.post("/", permission("create_warehouse"), warehouseController.create);
router.put("/:id", permission("edit_warehouse"), warehouseController.update);
router.delete(
  "/:id",
  permission("delete_warehouse"),
  warehouseController.delete,
);

module.exports = router;

const { Router } = require("express");
const warehouseController = require("../controllers/warehouse.controller");

const router = Router();

router.get("/", warehouseController.getAll);
router.get("/:id", warehouseController.getById);
router.post("/", warehouseController.create);
router.put("/:id", warehouseController.update);
router.delete("/:id", warehouseController.delete);

module.exports = router;

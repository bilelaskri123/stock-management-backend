const stockMovementController = require("../controllers/stockMovement.controller");
const { Router } = require("express");

const router = Router();

router.get("/", stockMovementController.getAll);
router.get("/:id", stockMovementController.getById);
router.post("/", stockMovementController.create);
router.put("/:id", stockMovementController.update);
router.delete("/:id", stockMovementController.delete);

module.exports = router;

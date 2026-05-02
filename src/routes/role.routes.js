const { Router } = require("express");
const roleController = require("../controllers/role.controller");

const router = Router();
router.get("/", roleController.getAll);
router.get("/:id", roleController.getById);
router.post("/", roleController.create);
router.put("/:id", roleController.update);
router.delete("/:id", roleController.delete);
module.exports = router;

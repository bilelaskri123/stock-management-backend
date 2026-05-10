const { Router } = require("express");
const roleController = require("../controllers/role.controller");
const permission = require("../middlewares/permission.middleware");

const router = Router();
router.get("/", permission("view_role"), roleController.getAll);
router.get("/:id", permission("view_role"), roleController.getById);
router.post("/", permission("create_role"), roleController.create);
router.put("/:id", permission("edit_role"), roleController.update);
router.delete("/:id", permission("delete_role"), roleController.delete);
module.exports = router;

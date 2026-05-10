const { Router } = require("express");
const userController = require("../controllers/user.controller");
const permission = require("../middlewares/permission.middleware");

const router = Router();

// define routes

router.get("/", permission("view_user"), userController.getAll);
router.get("/:id", permission("view_user"), userController.getById);
router.post("/", permission("create_user"), userController.create);
router.put("/:id", permission("edit_user"), userController.update);
router.delete("/:id", permission("delete_user"), userController.delete);

module.exports = router;

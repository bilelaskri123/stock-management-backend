const { Router } = require("express");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = Router();

// define routes

router.get("/", auth, userController.getAll);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;

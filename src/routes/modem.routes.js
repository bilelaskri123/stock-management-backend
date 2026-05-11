const { Router } = require("express");
const modemController = require("../controllers/modem.controller");

const router = Router();

router.get("/", modemController.getAll);
router.get("/:id", modemController.getById);
router.post("/", modemController.create);
router.put("/:id", modemController.update);
router.delete("/:id", modemController.delete);

module.exports = router;

const { Router } = require("express");
const supplierController = require("../controllers/supplier.controller");
const permission = require("../middlewares/permission.middleware");

const router = Router();

router.get("/", permission("view_supplier"), supplierController.getAll);
router.get("/:id", permission("view_supplier"), supplierController.getById);
router.post("/", permission("create_supplier"), supplierController.create);
router.put("/:id", permission("edit_supplier"), supplierController.update);
router.delete("/:id", permission("delete_supplier"), supplierController.delete);

module.exports = router;

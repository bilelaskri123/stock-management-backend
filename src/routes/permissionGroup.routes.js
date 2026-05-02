const { Router } = require("express");
const permissionGroupController = require("../controllers/permissionGroup.controller");

const router = Router();
router.get("/", permissionGroupController.findAllPermissionGroups);

module.exports = router;

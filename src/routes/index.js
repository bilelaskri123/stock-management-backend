const { Router } = require("express");
const userRoutes = require("./user.routes");
const permissionGroupRoutes = require("./permissionGroup.routes");

const router = Router();
router.use("/users", userRoutes);
router.use("/permission-groups", permissionGroupRoutes);
module.exports = router;

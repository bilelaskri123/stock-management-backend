const { Router } = require("express");
const userRoutes = require("./user.routes");
const permissionGroupRoutes = require("./permissionGroup.routes");
const roleRoutes = require("./role.routes");

const router = Router();
router.use("/users", userRoutes);
router.use("/permission-groups", permissionGroupRoutes);
router.use("/roles", roleRoutes);
module.exports = router;

const { Router } = require("express");
const userRoutes = require("./user.routes");
const permissionGroupRoutes = require("./permissionGroup.routes");
const roleRoutes = require("./role.routes");
const authRoutes = require("./auth.routes");
const warehouseRoutes = require("./warehouse.routes");

const router = Router();
router.use("/users", userRoutes);
router.use("/permission-groups", permissionGroupRoutes);
router.use("/roles", roleRoutes);
router.use("/auth", authRoutes);
router.use("/warehouses", warehouseRoutes);

module.exports = router;

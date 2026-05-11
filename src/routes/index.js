const { Router } = require("express");
const userRoutes = require("./user.routes");
const permissionGroupRoutes = require("./permissionGroup.routes");
const roleRoutes = require("./role.routes");
const authRoutes = require("./auth.routes");
const warehouseRoutes = require("./warehouse.routes");
const supplierRoutes = require("./supplier.routes");
const purchaseOrderRoutes = require("./purchaseOrder.routes");
const purchaseOrderHistoryRoutes = require("./purchaseOrderHistory.routes");
const modemRoutes = require("./modem.routes");

const router = Router();
router.use("/users", userRoutes);
router.use("/permission-groups", permissionGroupRoutes);
router.use("/roles", roleRoutes);
router.use("/auth", authRoutes);
router.use("/warehouses", warehouseRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/purchase-orders", purchaseOrderRoutes);
router.use("/purchase-order-history", purchaseOrderHistoryRoutes);
router.use("/modems", modemRoutes);

module.exports = router;

const warehouseService = require("../services/warehouse.service");
const {
  createWarehouseSchema,
  updateWarehouseSchema,
} = require("../validators/warehouse.validator");

class WarehouseController {
  async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;
      const warehouses = await warehouseService.getAllWarehouses({
        page,
        limit,
        search,
      });
      res.status(200).json({ success: true, warehouses });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const warehouseId = req.params.id;
      const warehouse = await warehouseService.getWarehouseById(warehouseId);
      res.status(200).json({ success: true, warehouse });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // use parseSafe to avoid throwing errors and handle them gracefully.
      const { success, error, data } = createWarehouseSchema.safeParse(
        req.body,
      );
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const newWarehouse = await warehouseService.createWarehouse(data);
      res.status(201).json({ success: true, warehouse: newWarehouse });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const warehouseId = req.params.id;

      const { success, error, data } = updateWarehouseSchema.safeParse(
        req.body,
      );
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const updatedWarehouse = await warehouseService.updateWarehouse(
        warehouseId,
        data,
      );
      res.status(200).json({ success: true, warehouse: updatedWarehouse });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const warehouseId = req.params.id;
      await warehouseService.deleteWarehouse(warehouseId);
      res
        .status(200)
        .json({ success: true, message: "Warehouse deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WarehouseController();

const warehouseRepository = require("../repositories/warehouse.repository");
const { AppError } = require("../utils/AppError");

class WarehouseService {
  async getAllWarehouses(query) {
    return await warehouseRepository.findAll(query);
  }

  async getWarehouseById(warehouseId) {
    const warehouse = await warehouseRepository.findById(warehouseId);
    if (!warehouse) {
      throw new AppError("Warehouse not found", 404);
    }
    return warehouse;
  }

  async createWarehouse(warehouseData) {
    return await warehouseRepository.create(warehouseData);
  }

  async updateWarehouse(warehouseId, warehouseData) {
    const warehouse = await warehouseRepository.findById(warehouseId);
    if (!warehouse) {
      throw new AppError("Warehouse not found", 404);
    }

    return await warehouseRepository.update(warehouseId, warehouseData);
  }

  async deleteWarehouse(warehouseId) {
    const deleted = await warehouseRepository.delete(warehouseId);
    if (!deleted) {
      throw new AppError("Warehouse not found", 404);
    }
    return true;
  }
}

module.exports = new WarehouseService();

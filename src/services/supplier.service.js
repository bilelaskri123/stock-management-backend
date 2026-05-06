const supplierRepository = require("../repositories/supplier.repository");
const { AppError } = require("../utils/AppError");

class SupplierService {
  async getAllSuppliers(query) {
    return await supplierRepository.findAll(query);
  }

  async getSupplierById(supplierId) {
    const supplier = await supplierRepository.findById(supplierId);
    if (!supplier) {
      throw new AppError("Supplier not found", 404);
    }
    return supplier;
  }

  async createSupplier(supplierData) {
    return await supplierRepository.create(supplierData);
  }

  async updateSupplier(supplierId, supplierData) {
    const supplier = await supplierRepository.findById(supplierId);
    if (!supplier) {
      throw new AppError("Supplier not found", 404);
    }

    return await supplierRepository.update(supplierId, supplierData);
  }

  async deleteSupplier(supplierId) {
    const deleted = await supplierRepository.delete(supplierId);
    if (!deleted) {
      throw new AppError("Supplier not found", 404);
    }
    return true;
  }
}

module.exports = new SupplierService();

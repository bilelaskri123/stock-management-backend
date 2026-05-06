const supplierService = require("../services/supplier.service");
const {
  createSupplierSchema,
  updateSupplierSchema,
} = require("../validators/supplier.validator");

class SupplierController {
  async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;
      const suppliers = await supplierService.getAllSuppliers({
        page,
        limit,
        search,
      });
      res.status(200).json({ success: true, suppliers });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const supplierId = req.params.id;
      const supplier = await supplierService.getSupplierById(supplierId);
      res.status(200).json({ success: true, supplier });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // use parseSafe to avoid throwing errors and handle them gracefully.
      const { success, error, data } = createSupplierSchema.safeParse(req.body);
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const newSupplier = await supplierService.createSupplier(data);
      res.status(201).json({ success: true, supplier: newSupplier });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const supplierId = req.params.id;
      const { success, error, data } = updateSupplierSchema.safeParse(req.body);
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const updatedSupplier = await supplierService.updateSupplier(
        supplierId,
        data,
      );
      res.status(200).json({ success: true, supplier: updatedSupplier });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const supplierId = req.params.id;
      await supplierService.deleteSupplier(supplierId);
      res
        .status(200)
        .json({ success: true, message: "Supplier deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SupplierController();

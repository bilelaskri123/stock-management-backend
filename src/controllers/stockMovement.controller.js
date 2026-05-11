const stockMovementService = require("../services/stockMovement.service");
const {
  createStockMovementSchema,
  updateStockMovementSchema,
} = require("../validators/stockMovement.validator");

class StockMovementController {
  async getAll(req, res, next) {
    try {
      const { page, limit, modemId } = req.query;
      const stockMovements = await stockMovementService.getAllStockMovements({
        page,
        limit,
        modemId,
      });
      res.status(200).json({ success: true, stockMovements });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const stockMovementId = req.params.id;
      const stockMovement =
        await stockMovementService.getStockMovementById(stockMovementId);
      res.status(200).json({ success: true, stockMovement });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { success, error, data } = createStockMovementSchema.safeParse(
        req.body,
      );
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const newStockMovement =
        await stockMovementService.createStockMovement(data);
      res.status(201).json({ success: true, stockMovement: newStockMovement });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const stockMovementId = req.params.id;
      const { success, error, data } = updateStockMovementSchema.safeParse(
        req.body,
      );
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }
      const updatedStockMovement =
        await stockMovementService.updateStockMovement(stockMovementId, data);
      res
        .status(200)
        .json({ success: true, stockMovement: updatedStockMovement });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const stockMovementId = req.params.id;
      await stockMovementService.deleteStockMovement(stockMovementId);
      res.status(200).json({
        success: true,
        message: "Stock Movement deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StockMovementController();

const { z } = require("zod");

const createPurchaseOrderSchema = z.object({
  quantity_ordered: z.number().positive(),
  supplier_id: z.number(),
});

const updatePurchaseOrderSchema = z.object({
  quantity_ordered: z.number().positive(),
  supplier_id: z.number(),
});

module.exports = {
  createPurchaseOrderSchema,
  updatePurchaseOrderSchema,
};

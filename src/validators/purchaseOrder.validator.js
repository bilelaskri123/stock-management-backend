const { z } = require("zod");

const createPurchaseOrderSchema = z.object({
  quantity_ordered: z.number().min(0),
  SupplierId: z.number(),
  quantity_received: z.number().min(0).optional(),
  status: z
    .enum(["created", "partial delivered", "completely delivered"])
    .optional(),
});

const updatePurchaseOrderSchema = createPurchaseOrderSchema.partial();

module.exports = {
  createPurchaseOrderSchema,
  updatePurchaseOrderSchema,
};

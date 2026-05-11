const { z } = require("zod");

const createPurchaseOrderSchema = z.object({
  modem_id: z.number().min(0),
  from_warehouse_id: z.number().min(0),
  to_warehouse_id: z.number().min(0),
});

const updatePurchaseOrderSchema = createPurchaseOrderSchema.partial();

module.exports = {
  createPurchaseOrderSchema,
  updatePurchaseOrderSchema,
};

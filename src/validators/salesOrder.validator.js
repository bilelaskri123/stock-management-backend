const { z } = require("zod");

const createSalesOrderSchema = z.object({
  client_tel_adsl: z.number().min(0),
  client_cin: z.number(),
  modem_sn: z.number().min(0).optional(),
});

const updateSalesOrderSchema = createPurchaseOrderSchema.partial();

module.exports = {
  createSalesOrderSchema,
  updateSalesOrderSchema,
};

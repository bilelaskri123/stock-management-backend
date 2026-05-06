const { z } = require("zod");

const createSupplierSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().min(8),
  address: z.string().min(2).max(250),
});

const updateSupplierSchema = createSupplierSchema.partial();

module.exports = {
  createSupplierSchema,
  updateSupplierSchema,
};

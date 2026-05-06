const { z } = require("zod");

const createWarehouseSchema = z.object({
  name: z.string().min(2).max(50),
  address: z.string().min(2).max(250),
  type: z.enum(["physique", "logic"]),
});

const updateWarehouseSchema = createWarehouseSchema.partial();

module.exports = {
  createWarehouseSchema,
  updateWarehouseSchema,
};

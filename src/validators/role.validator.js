const { z } = require("zod");

const createRoleSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(200).optional(),
  permissionIds: z
    .array(z.number())
    .nonempty("At least one permission must be selected"),
});

const updateRoleSchema = createRoleSchema.partial();

module.exports = {
  createRoleSchema,
  updateRoleSchema,
};

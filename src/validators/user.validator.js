const { z } = require("zod");

const createUserSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  RoleId: z.number(),
  isEnabled: z.boolean().optional(),
});

const updateUserSchema = createUserSchema.partial().omit({ password: true });

module.exports = {
  createUserSchema,
  updateUserSchema,
};

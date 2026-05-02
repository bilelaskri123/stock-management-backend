const { z } = require("zod");

const createUserSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.number().optional(),
  isEnabled: z.boolean().optional(),
});

const updateUserSchema = createUserSchema.partial().omit({ password: true });

module.exports = {
  createUserSchema,
  updateUserSchema,
};

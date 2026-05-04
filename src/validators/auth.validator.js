const { z } = require("zod");

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

module.exports = { authSchema };

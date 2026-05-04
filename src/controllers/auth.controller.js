const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const { authSchema } = require("../validators/auth.validator");

class AuthController {
  async login(req, res, next) {
    try {
      const { success, error, data } = authSchema.safeParse(req.body);
      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, error: message });
      }

      const { email, password } = req.body;

      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();

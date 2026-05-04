const authService = require("../services/auth.service");
const userService = require("../services/user.service");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // Validate input using zod library (use parseSafe to avoid throwing errors and handle them gracefully)
      // don't use validate because it didn't work with zod, use parseSafe instead
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

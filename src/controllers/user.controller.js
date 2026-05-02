const userService = require("../services/user.service");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validators/user.validator");

class UserController {
  async getAll(req, res, next) {
    try {
      const { page, limit, search } = req.query;
      const users = await userService.getAllUsers({ page, limit, search });
      res.status(200).json({ success: true, users });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { error, value } = createUserSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, error: error.details[0].message });
      }
      const newUser = await userService.createUser(value);
      res.status(201).json({ success: true, user: newUser });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const userId = req.params.id;
      const { error, value } = updateUserSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, error: error.details[0].message });
      }
      const updatedUser = await userService.updateUser(userId, value);
      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const userId = req.params.id;
      await userService.deleteUser(userId);
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();

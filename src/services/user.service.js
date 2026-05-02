const userRepository = require("../repositories/user.repository");
const userData = require("../static/data/user.data.json");
const { AppError } = require("../utils/AppError");

class UserService {
  async initializeDefaultUser() {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (!existingUser) {
      const createdUser = await userRepository.create(userData);
      console.log("Default user has been initialized.");
    }
  }

  async getAllUsers(query) {
    return await userRepository.findAll(query);
  }

  async getUserById(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async createUser(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }
    return await userRepository.create(userData);
  }

  async updateUser(userId, userData) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if (userData.email && userData.email !== user.email) {
      const existingUser = await userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new AppError("Email already in use", 409);
      }
    }
    return await userRepository.update(userId, userData);
  }

  async deleteUser(userId) {
    const deleted = await userRepository.delete(userId);
    if (!deleted) {
      throw new AppError("User not found", 404);
    }
    return true;
  }
}

module.exports = new UserService();

const userRepository = require("../repositories/user.repository");
const roleRepository = require("../repositories/role.repository");
const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/AppError");
class AuthService {
  // Implement authentication logic here (e.g., login, logout, token generation)
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }
    // Here you would typically verify the password and generate a token
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const role = await roleRepository.findById(user.RoleId);
    const permissions = role.Permissions.map((permission) => permission.key);

    // generate token (e.g., JWT) and return it along with user info
    const token = this.generateToken(user);

    return { message: "Login successful", user, token, permissions };
  }

  // Generate JWT token (if needed, can be implemented here or in a separate auth service)
  generateToken(user) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
    return token;
  }

  // Verify token
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (err) {
      throw new AppError("Invalid token", 401);
    }
  }
}

module.exports = new AuthService();

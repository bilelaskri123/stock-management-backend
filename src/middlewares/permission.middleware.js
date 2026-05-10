const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");
const roleRepository = require("../repositories/role.repository");

module.exports = (permission) => {
  return async (req, res, next) => {
    try {
      console.log(permission);
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ error: "Access denied. No token provided." });
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userRepository.findById(decodedToken.id);
      const role = await roleRepository.findById(user.RoleId);
      const permissions = role.Permissions.map((permission) => permission.key);
      if (!permissions.includes(permission)) {
        return res.status(403).json({ error: "unauthorized" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ error: "auth failed" });
    }
  };
};

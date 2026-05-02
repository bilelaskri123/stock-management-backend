const { Op } = require("sequelize");
const User = require("../models/User");

class UserRepository {
  async findAll({ page = 1, limit = 10, search = "" }) {
    const offset = (page - 1) * limit;
    const where = search
      ? {
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${search}%` } },
            { lastName: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};
    const { count, rows } = await User.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    return {
      total: count,
      data: rows,
      page,
      totalPages: Math.ceil(count / limit),
    };
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, userData) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return await user.update(userData);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return true;
  }

  async existsByEmail(email) {
    const count = await User.count({ where: { email } });
    return count > 0;
  }
}

module.exports = new UserRepository();

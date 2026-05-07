const Role = require("../models/Role");
class RoleRepository {
  async findAll() {
    return await Role.findAll();
  }

  async findById(id) {
    return await Role.findByPk(id);
  }

  async create(roleData) {
    return await Role.create(roleData);
  }

  async update(id, roleData) {
    const role = await Role.findByPk(id);
    if (!role) {
      throw new Error("Role not found");
    }
    return await role.update(roleData);
  }

  async delete(id) {
    const role = await Role.findByPk(id);
    if (!role) {
      return false;
    }
    await role.destroy();
    return true;
  }
}

module.exports = new RoleRepository();

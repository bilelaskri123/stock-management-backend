const { Op } = require("sequelize");
const Permission = require("../models/Permission");

class PermissionRepository {
  async findOrCreate(permissionData) {
    const [permission, created] = await Permission.findOrCreate({
      where: { key: permissionData.key },
      defaults: {
        name: permissionData.name,
        PermissionGroupId: permissionData.permissionGroupId,
      },
    });
    return { permission, created };
  }

  async findAll() {
    return await Permission.findAll();
  }

  async findById(id) {
    return await Permission.findByPk(id);
  }

  async findByIds(ids) {
    return await Permission.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
  }
}

module.exports = new PermissionRepository();

const PermissionGroup = require("../models/PermissionGroup");
const Permission = require("../models/Permission");

class PermissionGroupRepository {
  async findAll() {
    return await PermissionGroup.findAll({
      include: {
        model: Permission,
      },
    });
  }

  async findOrCreate(groupData) {
    const [group, created] = await PermissionGroup.findOrCreate({
      where: { key: groupData.key },
      defaults: {
        name: groupData.name,
      },
    });
    return { group, created };
  }
}

module.exports = new PermissionGroupRepository();

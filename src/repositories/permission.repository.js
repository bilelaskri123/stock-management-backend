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
}

module.exports = new PermissionRepository();

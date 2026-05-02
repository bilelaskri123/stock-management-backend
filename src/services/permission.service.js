const { AppError } = require("../utils/AppError");
const permissionRepository = require("../repositories/permission.repository");
const permissionGroupRepository = require("../repositories/permissionGroup.repository");
const permissionData = require("../static/data/permission.data.json");

class PermissionService {
  async seedPermissions() {
    try {
      const permissionGroups = await permissionGroupRepository.findAll();
      for (const permData of permissionData) {
        const group = permissionGroups.find((g) => g.key === permData.groupKey);
        if (!group) {
          console.warn(
            `Permission group not found for key: ${permData.permissionGroupKey}`,
          );
          continue; // Skip this permission if its group is not found
        }
        const permissionData = {
          key: permData.key,
          name: permData.name,
          permissionGroupId: group.id,
        };
        const { permission, created } =
          await permissionRepository.findOrCreate(permissionData);
        if (created) {
          console.log(`Permission created: ${permission.name}`);
        }
      }
    } catch (error) {
      console.log("Error seeding permissions:", error);
    }
  }
}

module.exports = new PermissionService();

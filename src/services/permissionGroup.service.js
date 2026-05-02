const permissionGroupData = require("../static/data/permissionGroup.data.json");
const permissionGroupRepository = require("../repositories/permissionGroup.repository");

class PermissionGroupService {
  async getAllPermissionGroups() {
    return await permissionGroupRepository.findAll();
  }

  async seedPermissionGroups() {
    try {
      for (const groupData of permissionGroupData) {
        const { group, created } =
          await permissionGroupRepository.findOrCreate(groupData);
        if (created) {
          console.log(`Permission group created: ${group.name}`);
        }
      }
    } catch (error) {
      console.error("Error seeding permission groups:", error);
    }
  }
}

module.exports = new PermissionGroupService();

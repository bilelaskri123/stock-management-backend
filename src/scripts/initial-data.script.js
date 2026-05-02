const permissionGroupService = require("../services/permissionGroup.service");
const permissionService = require("../services/permission.service");
const roleService = require("../services/role.service");
const userService = require("../services/user.service");
const { connectToDB } = require("../config/db");

async function initializeData() {
  try {
    await connectToDB();
    await permissionGroupService.seedPermissionGroups();
    await permissionService.seedPermissions();
    await roleService.initializeRoles();
    await userService.initializeDefaultUser();
    console.log("Initial data seeding completed.");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
}

// Run the initialization when this script is executed directly
if (require.main === module) {
  initializeData();
}

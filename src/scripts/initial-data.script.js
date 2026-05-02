const permissionGroupService = require("../services/permissionGroup.service");
const permissionService = require("../services/permission.service");
const { connectToDB } = require("../config/db");

async function initializeData() {
  try {
    await connectToDB();
    await permissionGroupService.seedPermissionGroups();
    await permissionService.seedPermissions();
    console.log("Initial data seeding completed.");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
}

// Run the initialization when this script is executed directly
if (require.main === module) {
  initializeData();
}

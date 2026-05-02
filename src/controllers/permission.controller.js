const Permission = require("../models/Permission");
const permissionData = require("../static/data/permission.data.json");

// Seed permissions from JSON data
// This function can be called from a setup script or during application initialization
// this script created by AI check it later to make sure it works fine and does not create duplicates in the database
async function seedPermissions() {
  try {
    for (const permData of permissionData) {
      const [perm, created] = await Permission.findOrCreate({
        where: { key: permData.key },
        defaults: {
          name: permData.name,
          permissionGroupKey: permData.permissionGroupKey,
        },
      });
      if (created) {
        console.log(`Permission created: ${perm.name}`);
      }
    }
  } catch (error) {
    console.error("Error seeding permissions:", error);
  }
}

async function findAllPermissions(req, res) {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    console.error("Error fetching permissions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  seedPermissions,
  findAllPermissions,
};

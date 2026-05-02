const PermissionGroupService = require("../services/permissionGroup.service");

class PermissionGroupController {
  async findAllPermissionGroups(req, res, next) {
    try {
      const groups = await PermissionGroupService.getAllPermissionGroups();
      res.status(200).json({ success: true, groups });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PermissionGroupController();

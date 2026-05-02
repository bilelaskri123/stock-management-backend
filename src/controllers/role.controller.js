const roleService = require("../services/role.service");
const {
  createRoleSchema,
  updateRoleSchema,
} = require("../validators/role.validator");

class RoleController {
  async getAll(req, res, next) {
    try {
      const roles = await roleService.getAllRoles();
      res.status(200).json({ success: true, roles });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const roleId = req.params.id;
      const role = await roleService.getRoleById(roleId);
      res.status(200).json({ success: true, role });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const roleData = req.body;
      const { error, value } = createRoleSchema.validate(roleData);
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }
      const newRole = await roleService.createRole(value);
      res.status(201).json({ success: true, role: newRole });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const roleId = req.params.id;
      const roleData = req.body;
      const { error, value } = updateRoleSchema.validate(roleData);
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      const updatedRole = await roleService.updateRole(roleId, value);
      res.status(200).json({ success: true, role: updatedRole });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const roleId = req.params.id;
      await roleService.deleteRole(roleId);
      res
        .status(200)
        .json({ success: true, message: "Role deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoleController();

const roleService = require("../services/role.service");
const {
  createRoleSchema,
  updateRoleSchema,
} = require("../validators/role.validator");
const { z } = require("zod");

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
      const { success, error, data } = createRoleSchema.safeParse(roleData);

      if (!success) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, message: message });
      }
      const newRole = await roleService.createRole(data);
      res.status(201).json({ success: true, role: newRole });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const roleId = req.params.id;
      const roleData = req.body;
      const { success, error, data } = updateRoleSchema.safeParse(roleData);

      if (error) {
        const message = `${error.issues[0].path[0]} ${error.issues[0].message}`;
        return res.status(400).json({ success: false, message: message });
      }

      const updatedRole = await roleService.updateRole(roleId, data);
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

const roleData = require("../static/data/role.data.json");
const roleRepository = require("../repositories/role.repository");
const permissionRepository = require("../repositories/permission.repository");
const { AppError } = require("../utils/AppError");

class RoleService {
  async initializeRoles() {
    const existingRoles = await roleRepository.findAll();
    if (existingRoles.length === 0) {
      const permissions = await permissionRepository.findAll();
      for (const role of roleData) {
        const createdRole = await roleRepository.create(role);
        // Assign all permissions to the default role
        await createdRole.setPermissions(permissions);
      }
      console.log("Default roles have been initialized.");
    } else {
      console.log("Roles already exist. Skipping initialization.");
    }
  }

  async getAllRoles() {
    return await roleRepository.findAll();
  }

  async getRoleById(roleId) {
    const role = await roleRepository.findById(roleId);
    if (!role) {
      throw new AppError("Role not found", 404);
    }
    return role;
  }

  async createRole(roleData) {
    const createdRole = await roleRepository.create(roleData);
    // Assign permissions to the role if provided
    if (roleData.permissionIds) {
      const permissions = await permissionRepository.findByIds(
        roleData.permissionIds,
      );
      await createdRole.setPermissions(permissions);
    }
    return createdRole;
  }

  async updateRole(roleId, roleData) {
    const role = await roleRepository.findById(roleId);
    if (!role) {
      throw new AppError("Role not found", 404);
    }
    const updatedRole = await roleRepository.update(roleId, roleData);
    // Update permissions if provided
    if (roleData.permissionIds) {
      const permissions = await permissionRepository.findByIds(
        roleData.permissionIds,
      );
      await updatedRole.setPermissions(permissions);
    }
    return updatedRole;
  }

  async deleteRole(roleId) {
    const deleted = await roleRepository.delete(roleId);
    if (!deleted) {
      throw new AppError("Role not found", 404);
    }
    return true;
  }
}

module.exports = new RoleService();

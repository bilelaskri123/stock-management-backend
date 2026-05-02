const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Permission = require("./Permission");

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    paranoid: true,
    timestamps: true,
  },
);

// Define association with Permission through RolePermission
Role.belongsToMany(Permission, {
  through: "role_permissions",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

Permission.belongsToMany(Role, {
  through: "role_permissions",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

Role.sync({ alter: true });

module.exports = Role;

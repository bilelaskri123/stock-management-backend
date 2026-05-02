const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const PermissionGroup = require("./PermissionGroup");
class Permission extends Model {}

Permission.init(
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
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "permissions",
    paranoid: true,
    timestamps: true,
  },
);

// Define association with PermissionGroup
PermissionGroup.hasMany(Permission, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

Permission.belongsTo(PermissionGroup, {});

module.exports = Permission;

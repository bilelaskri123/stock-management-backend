const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

class PermissionGroup extends Model {}

PermissionGroup.init(
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
    modelName: "PermissionGroup",
    tableName: "permission_groups",
    paranoid: true, // Enable soft deletes
    timestamps: true, // Enable createdAt and updatedAt
    underscored: true,
  },
);

module.exports = PermissionGroup;

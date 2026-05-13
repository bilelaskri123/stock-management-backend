const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

class ResetPassword extends Model {}

ResetPassword.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isExpired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "ResetPassword",
    tableName: "reset_passwords",
    paranoid: true,
    timestamps: true,
    underscored: true,
  },
);

// Define association with User
User.hasMany(ResetPassword, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});
ResetPassword.belongsTo(User, {});

module.exports = ResetPassword;

const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../config/db");
const Role = require("./Role");

const saltRounds = 10;

class User extends Model {
  // Instance method - never expose password in responses
  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }

  // Instance method - compare plain password with hashed password
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    paranoid: true,
    timestamps: true,
    underscored: true,
  },
);

// Hash password before saving
User.addHook("beforeSave", async (user) => {
  if (user.password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
});

User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Define association with Role
Role.hasMany(User, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

User.belongsTo(Role);

module.exports = User;

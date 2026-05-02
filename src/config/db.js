const { Sequelize } = require("sequelize");
const { ensureDatabaseExists } = require("./create-db");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

async function connectToDB() {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();
    await sequelize.sync(); // Sync models to the database
    console.log(
      "Connection to the database has been established successfully.",
    );
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

module.exports = { sequelize, connectToDB };

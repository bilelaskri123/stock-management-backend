const { Sequelize, QueryTypes } = require("sequelize");

async function ensureDatabaseExists() {
  const DB_NAME = "postgres"; // Connect to default 'postgres' DB to check for existence of target DB
  const DB_USER = process.env.DB_USER || "postgres";
  const DB_PASS = process.env.DB_PASSWORD || "password";
  const DB_HOST = process.env.DB_HOST || "localhost";
  const DB_PORT = process.env.DB_PORT || 5432;
  const TARGET_DB_NAME = process.env.DB_NAME || "stock_management";

  const adminSequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  });

  try {
    // 2. Check if the target DB exists
    const result = await adminSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = :dbName`,
      { replacements: { dbName: TARGET_DB_NAME }, type: QueryTypes.SELECT },
    );

    // 3. Create it if it doesn't exist
    if (result.length === 0) {
      await adminSequelize.query(`CREATE DATABASE "${TARGET_DB_NAME}"`);
      console.log(`✅ Database "${TARGET_DB_NAME}" created.`);
    } else {
      console.log(`ℹ️  Database "${TARGET_DB_NAME}" already exists.`);
    }
  } finally {
    await adminSequelize.close();
  }
}

module.exports = { ensureDatabaseExists };

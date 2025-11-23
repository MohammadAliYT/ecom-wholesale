import { pool } from "../config/db";

async function seed() {
  try {
    console.log("⚠️  Dropping existing users table (if any)...");
    await pool.query(`DROP TABLE IF EXISTS users`);

    console.log("🛠️  Creating users table...");
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(150) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Users table created.");

    console.log("🌱 Inserting test user...");
    await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING;`,
      ["Test User", "test@example.com", "123456"]
    );
    console.log("✅ Test user inserted.");
  } catch (err: any) {
    console.error("❌ Error seeding database:", err.message);
  } finally {
    await pool.end();
    console.log("🔒 Connection closed.");
    process.exit(0); // ✅ ensures Node exits after seeding
  }
}

seed();

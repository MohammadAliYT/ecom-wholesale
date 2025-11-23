import { pool } from "../config/db";
import bcrypt from "bcrypt";
import { userQueries } from "./queries/userQueries";

export const seedUsers = async () => {
  try {
    console.log("🌱 Seeding default users...");

    const email = "admin@example.com";
    const existingUser = await pool.query(userQueries.checkUserExists, [email]);

    if (existingUser.rows.length > 0) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Get role_id for super_admin
    const roleResult = await pool.query(
      `SELECT id FROM roles WHERE name = 'super_admin';`
    );
    const roleId = roleResult.rows[0]?.id;

    if (!roleId) {
      throw new Error(
        "❌ Super admin role not found. Please seed roles first."
      );
    }

    await pool.query(userQueries.insertUser, [
      "Super Admin",
      email,
      hashedPassword,
      roleId,
    ]);

    console.log("✅ Admin user created successfully!");
  } catch (error: any) {
    console.error("❌ Error seeding users:", error.message);
    throw error;
  }
};

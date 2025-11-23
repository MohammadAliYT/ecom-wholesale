import { pool } from "../config/db";
import { roleQueries } from "./queries/roleQueries";

export const seedRoles = async () => {
  try {
    console.log("🌱 Seeding roles...");
    await pool.query(roleQueries.insertRoles);
    console.log("✅ Roles seeded successfully!");
  } catch (error: any) {
    console.error("❌ Error seeding roles:", error.message);
    throw error;
  }
};

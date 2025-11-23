import { pool } from "../config/db";
import { seedRoles } from "./seedRoles";
import { seedUsers } from "./seedUsers";

(async () => {
  console.log("Starting database seed...");

  try {
    await seedRoles(); // must come first
    await seedUsers(); // depends on roles
    console.log("All seeds completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await pool.end();
    console.log("Connection closed.");
    process.exit(0);
  }
})();

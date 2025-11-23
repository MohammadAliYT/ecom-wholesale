import { pool } from "../src/config/db";
import { execSync } from "child_process";
import { readFileSync, readdirSync } from "fs";
import dotenv from "dotenv";
import { join, resolve } from "path";

dotenv.config();

const MIGRATIONS_DIR = resolve(__dirname, "../migrations");

function runMigrations() {
  const migrationFiles = readdirSync(MIGRATIONS_DIR).sort();
  migrationFiles.forEach((file) => {
    const filePath = join(MIGRATIONS_DIR, file);
    console.log(`Running migration: ${filePath}`);

    execSync(
      `PGPASSWORD=${process.env.PGPASSWORD} psql -h ${process.env.PGHOST} -p ${process.env.PGPORT} -U ${process.env.PGUSER} -d ${process.env.PGDATABASE} -f ${filePath}`,
      { stdio: "inherit" }
    );
  });

  console.log("All migrations executed successfully!");
}

runMigrations();

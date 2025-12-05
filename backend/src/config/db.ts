import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let pool: Pool;

if (process.env.DATABASE_URL) {
  console.log("Using DATABASE_URL for Postgres");
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Render needs this
  });
} else {
  console.log("Using local Docker Postgres via PG* env vars");
  pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
  });
}

pool
  .connect()
  .then(() => console.log("Connected to Postgres"))
  .catch((err) => console.error("Database connection error", err));

export { pool };

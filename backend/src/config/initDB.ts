import { pool } from "./db";

export const initDB = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Connected to Postgres at:", result.rows[0].now);
  } catch (err) {
    console.error("Error connecting to database:", err);
    throw err;
  }
};

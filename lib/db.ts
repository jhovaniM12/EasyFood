import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

// Single shared SQL client — avoids creating a new connection on every request
export const sql = neon(process.env.DATABASE_URL);

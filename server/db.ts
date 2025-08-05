import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configuration pour Supabase PostgreSQL
const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require', // Supabase nécessite SSL
  max: 10, // Limite de connexions
});

export const db = drizzle(sql, { schema });

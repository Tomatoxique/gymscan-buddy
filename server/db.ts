import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "@shared/schema";

// Charger les variables d'environnement depuis Replit
if (typeof process !== 'undefined' && process.env.REPL_ID) {
  // Dans l'environnement Replit, les variables sont automatiquement disponibles
  // mais on s'assure qu'elles sont bien chargées
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Please check your Replit environment variables.",
  );
}

// Configuration pour Supabase PostgreSQL
const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require', // Supabase nécessite SSL
  max: 10, // Limite de connexions
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

export const db = drizzle(sql, { schema });

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// DATABASE_URL bo'lmasa, MemStorage ishlatiladi, shuning uchun xato tashlash shart emas
let pool: pg.Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
} else {
  console.warn("⚠️  DATABASE_URL topilmadi. MemStorage ishlatiladi.");
}

export { pool, db };

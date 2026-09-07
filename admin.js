const { Pool } = require("pg");

const DATABASE_URL = process.env.DATABASE_URL || "";
const pool = DATABASE_URL ? new Pool({ connectionString: DATABASE_URL }) : null;

let tableReady = false;
let tablePromise = null;

function isConfigured() {
  return !!pool;
}

async function ensureUsersTable() {
  if (!pool) return false;
  if (tableReady) return true;
  if (!tablePromise) {
    tablePromise = pool
      .query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        google_id TEXT UNIQUE NOT NULL,
        email TEXT NOT NULL,
        name TEXT,
        picture TEXT,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_login TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`)
      .then(() => {
        tableReady = true;
        return true;
      })
      .catch((err) => {
        tablePromise = null;
        console.error("[admin] failed to ensure users table:", err.message);
        return false;
      });
  }
  return tablePromise;
}

async function upsertUser(user) {
  if (!pool || !user || !user.id) return;
  if (!(await ensureUsersTable())) return;
  await pool.query(
    `INSERT INTO users (google_id, email, name, picture, role, last_login)
     VALUES ($1, $2, $3, $4, $5, NOW())
     ON CONFLICT (google_id) DO UPDATE
       SET email = EXCLUDED.email,
           name = EXCLUDED.name,
           picture = EXCLUDED.picture,
           role = EXCLUDED.role,
           last_login = NOW()`,
    [user.id, user.email || "", user.name || "", user.picture || "", user.role || "user"]
  );
}

async function listUsers() {
  if (!(await ensureUsersTable())) return null;
  const { rows } = await pool.query(
    `SELECT google_id, email, name, picture, role, created_at, last_login
     FROM users ORDER BY created_at ASC`
  );
  return rows;
}

module.exports = { isConfigured, ensureUsersTable, upsertUser, listUsers };

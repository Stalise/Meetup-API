import pg from 'pg';

const pool = new pg.Pool({
  user: process.env.PG_USER,
  password: String(process.env.PG_PASSWORD),
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
});

export default pool;

import pg from 'pg';

const pool = new pg.Pool({
  user: 'postgres',
  password: process.env.PG_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'meetup',
});

export default pool;

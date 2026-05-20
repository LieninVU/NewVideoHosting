import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    max: process.env.PG_POOL_MAX,
});

pool.on('connect', () => {
    console.log('connected to database');
});

pool.on('error', (err) => {
    console.error('PostgreSQL client error', err);
    process.exit(-1);
});

export default pool;
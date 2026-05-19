const { Pool } = require('pg');
requre('dotenv').config();


const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    max: process.env.PG_POOL_MAX,
})


pool.on('connect', () => {
    console.log('conneced to database');
})

pool.on('error', (err) => {
    console.error('postgre client error', err);
    process.exit(-1);
})

module.exports =  pool;
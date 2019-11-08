const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'inventory_manager',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('pool connected to database');
});

pool.on('error', () => {
    console.log('error connecting pool to database');
});

module.exports = pool;
const pg = require('pg');

if (process.env.DATABASE_URL) {
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');
    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true,
        max: 10,
        idleTimeoutMillis: 30000,
    } || {
            database: 'sample_database_name',
            host: 'localhost',
            port: 5432,
            max: 10,
            idleTimeoutMillis: 30000
        }
}

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('pool connected to database');
});

pool.on('error', () => {
    console.log('error connecting pool to database');
    process.exit(-1);
});

module.exports = pool;
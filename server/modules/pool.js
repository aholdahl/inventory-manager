const pg = require('pg');

const url = require('url');
let config = {};
if (process.env.DATABASE_URL) {
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');
    //production build in Heroku:
    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true,
        max: 10,
        idleTimeoutMillis: 30000,
    };
} else {
    //running on local computer:
    config = {
        host: 'localhost',
        port: 5432,
        database: 'inventory_manager',
        max: 10,
        idleTimeoutMillis: 30000,
    };
}

const pool = new pg.Pool(config);


module.exports = pool;
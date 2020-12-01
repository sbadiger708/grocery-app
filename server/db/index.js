const { Pool } = require('pg');

const pool = new Pool({
    "host": process.env.PGHOST,
    "port": process.env.PGPORT,
    "database": process.env.PGDATABASE,
    "password": process.env.PGPASSWORD,
    "name": process.env.PGUSER,
    "user": process.env.PGUSER,
    "connector": "postgresql",
    "ssl": false
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};
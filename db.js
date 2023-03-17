const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "mir",
    host: "localhost",
    port: 5432,
    database: "search_films"
})


module.exports = pool;
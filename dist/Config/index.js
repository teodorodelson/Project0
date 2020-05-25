"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: "localhost",
    port: 5432,
    database: "Project0",
    user: "postgres",
    password: "admin123"
});

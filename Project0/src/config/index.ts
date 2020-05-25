import {Pool ,Client} from 'pg'

export const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "Project0",
    user: "postgres",
    password: "admin123",
})



import {Pool ,Client} from 'pg'

export const pool = new Pool({
    host: "mystudentdb.c5gcnplnccyz.us-west-1.rds.amazonaws.com",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "adminadmin",
})



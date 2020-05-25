import { Router } from 'express';
import { pool } from '../config/index';
export const CoursesRouter = Router();
import fs from 'fs';




CoursesRouter.get('/getallCourses', async (req, res, next) => {

    fs.appendFile('logs.txt', `\nA request has been made to ${req.url} with the method of + ${req.method} ` + Date.now().toString(), function (err) {
        if (err) throw err;
    });
    let client = await pool.connect();
    const result = await client.query(`SELECT * FROM courses;`)
    if(result.rows[0] === undefined){
        res.send('No data found');
    }else{
        res.send(result.rows);
    }
    client && client.release();

    res.end();
});



CoursesRouter.get('/getCourses/:id', async (req, res, next) => {

    fs.appendFile('logs.txt', `\nA request has been made to ${req.url} with the method of + ${req.method} ` + Date.now().toString(), function (err) {
        if (err) throw err;
    });
    let client = await pool.connect();
    const output = req.params.id;
    console.log('Input made: ' +output);
    const result = await client.query(`SELECT * FROM courses WHERE course_accro = '${output}';`)

    if(result.rows[0] === undefined){
        res.send('No data found');
    }else{
        res.send(result.rows);
    }

    client && client.release();

    res.end();
});



CoursesRouter.get('/getCoursesByDescription/:desc', async (req, res, next) => {

    fs.appendFile('logs.txt', `\nA request has been made to ${req.url} with the method of + ${req.method} ` + Date.now().toString(), function (err) {
        if (err) throw err;
    });

    let client :any;
    const output = req.params.desc;
    console.log('User input: '+output);
    client = await pool.connect();
    const result = await client.query(`SELECT * FROM courses WHERE course_description = '${output}';`);
    
    if(result.rows[0] === undefined){
        res.send('No data found');
    }else{
        res.send(result.rows);
    }

    client && client.release(); 

    res.end();
});



CoursesRouter.post('/addcourse', async (req: any, res: any) => {
    fs.appendFile('logs.txt', `\nA request has been made to ${req.url} with the method of + ${req.method} ` + Date.now().toString(), function (err) {
        if (err) throw err;    });
    let client;
    try {
        if (req.session && req.session.user !== undefined) {
            if (req.session.role === 'Admin') {
                console.log(req.session)
                client = await pool.connect();
                const course_title: string = req.body.course_title;
                const course_description: string = req.body.courseDescription;
                const units: number = req.body.units;
                const result = await client.query(`INSERT INTO courses(course_accro, course_description, units) VALUES('${course_title}','${course_description}',${units});`)
                res.send('Course has been successfully added.');
            }else {
                res.status(403);
                res.send('Unauthorized Access');
                res.end();
            }
        } else {
            res.status(403);
            res.send('Unauthorized Access');
            res.end();
        }

    } catch (err) {
        console.log(err);
        res.send('Failed to push data to database.');
        res.end('Failed to push data into the database.');

    } finally {
        client && client.release();
    }
})



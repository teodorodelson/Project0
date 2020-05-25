import { Router } from 'express';
import { pool } from '../config/index';
export const TranscriptRouter = Router();
import fs from 'fs';

TranscriptRouter.get('/studDashboard', async (req, res, next) => {
    fs.appendFile('logs.txt', `\nA request has been made to ${req.url} with the method of + ${req.method} ` + Date.now().toString(), function (err) {
        if (err) throw err;
    });
    let client = await pool.connect();
    try {
        if (req.session && req.session.user !== undefined) {
            if (req.session.role === 'Student') {
                console.log(req.session);
                console.log('Welcome to your dashbaord');
                const name_holder = req.session.user;
                const result = client.query(`SELECT id, username, email, lname, fname, join_date, contact FROM user_accounts WHERE username = '${name_holder}';`);
                res.send((await result).rows);
            } else {
                res.status(403);
                res.send('Unauthorized Access');
            }
        } else {
            res.status(403);
            res.send('Unauthorized Access');
        }
    } catch (err) {
        console.log(err);
        res.end('Failed to retrieve information from the database');
    } finally {
        client && client.release();
        res.end();
    }
});


TranscriptRouter.patch('/changeContact', async (req, res, next) => {
    fs.appendFile('logs.txt', `\nA request has been made to ${req.url} with the method of + ${req.method} ` + Date.now().toString(), function (err) {
        if (err) throw err;
    });
    let client = await pool.connect();
    try {
        if (req.session && req.session.user !== undefined) {
            if (req.session.role === 'Student') {
                console.log(req.session);
                const name_holder = req.session.user;
                const new_contact = req.body.new_contact;
                console.log('contact info successfully changed');
                client.query(`UPDATE public.user_accounts SET  contact='${new_contact}'WHERE username = '${name_holder}';`)
                res.redirect('/studDashboard');
            } else {
                res.status(403);
                res.send('Unauthorized Access');
            }
        } else {
            res.status(403);
            res.send('Unauthorized Access');
        }
    } catch (err) {
        console.log(err);
        res.end('Failed to retrieve information from the database');
    } finally {
        client && client.release();
        res.end();
    }
});

TranscriptRouter.get('/records', async (req, res, next) => {
    fs.appendFile('logs.txt', `\nA request has been made to ${req.url} with the method of + ${req.method} ` + Date.now().toString(), function (err) {
        if (err) throw err;
    });
    let client = await pool.connect();
    try {
        if (req.session && req.session.user !== undefined) {
            if (req.session.role === 'Student') {
                const name_holder = req.session.user;
                const result = await client.query(`SELECT course_name, course_accro FROM user_course where username = '${name_holder}';`);
                res.send(result.rows);
            } else {
                res.status(403);
                res.send('Unauthorized Access');
            }
        } else {
            res.send('Unauthorized Access');
            res.status(403);
        }
    } catch (err) {
        console.log(err);
        res.end('Failed to retrieve information from the database');
    } finally {
        client && client.release();
        
    }
});

TranscriptRouter.patch('/changePassword', async (req, res, next) => {
    fs.appendFile('logs.txt', `\nA request has been made to ${req.url} with the method of + ${req.method} ` + Date.now().toString(), function (err) {
        if (err) throw err;
    });
    let client = await pool.connect();
    try {
        if (req.session && req.session.user !== undefined) {
            if (req.session.role === 'Student') {
                console.log(req.session);
                const name_holder = req.session.user;
                const new_password = req.body.new_password;
                console.log('Password successfully changed');
                client.query(`UPDATE public.user_accounts SET password='${new_password}'WHERE username = '${name_holder}';`)
                res.redirect('/studDashboard');
            } else {
                res.status(403);
                res.send('Unauthorized Access');
            }
        } else {
            res.status(403);
            res.send('Unauthorized Access');
        }
    } catch (err) {
        console.log(err);
        res.end('Failed to retrieve information from the database');
    } finally {
        client && client.release();
        res.end();
    }
});
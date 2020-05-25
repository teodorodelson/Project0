import express from 'express';
import { pool } from './config/index';
import bodyParser from 'body-parser';
import { sessionMiddleware } from './middleware/sessions_middle';
import { loginRouter } from '../src/Routes/LoginRouter';
import {GetUsers} from '../src/Routes/GetUsers';
import {CoursesRouter} from '../src/Routes/CoursesRouter';
import {TranscriptRouter} from '../src/Routes/Transcript';

export const app = express();
app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use(loginRouter);
app.use(GetUsers);
app.use(CoursesRouter);
app.use(TranscriptRouter);
// app.use(express.json);

app.use('/logout', loginRouter);
app.use('/login', loginRouter);
app.use('/getallAccounts', GetUsers);
app.use('/getAccountById', GetUsers);
app.use('/register', GetUsers);
app.use('/getAccountByEmail', GetUsers);
app.use('/getCourses', CoursesRouter);
app.use('/addcourse', CoursesRouter);
app.use('/getallCourses', CoursesRouter);
app.use('/getCoursesByDescription', CoursesRouter);
app.use('/studDashboard', TranscriptRouter);
app.use('/changeContact', TranscriptRouter);
app.use('/records', TranscriptRouter);


if (process.env.NODE_ENV !== 'test') { 
app.listen(3000, () => {
    console.log(`Server  is listening on port 3000`);
}) 
};

app.get('/', (req, res) => {
    res.send("Welcome to School Portal jejejeje");
})



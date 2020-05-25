"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var sessions_middle_1 = require("./middleware/sessions_middle");
var LoginRouter_1 = require("../dist/Routes/LoginRouter");
var GetUsers_1 = require("../dist/Routes/GetUsers");
var CoursesRouter_1 = require("../dist/Routes/CoursesRouter");
var Transcript_1 = require("../dist/Routes/Transcript");
var fs = require('fs');
const app = express_1();
app.use(body_parser_1.json());
app.use(sessions_middle_1);
app.use(LoginRouter_1);
app.use(GetUsers_1);
app.use(CoursesRouter_1);
app.use(Transcript_1);
//app.use(express.json);
app.use('/logout', LoginRouter_1);
app.use('/login', LoginRouter_1);
app.use('/getallAccounts', GetUsers_1);
app.use('/getAccountById', GetUsers_1);
app.use('/register', GetUsers_1);
app.use('/getAccountByEmail', GetUsers_1);
app.use('/getCourses', CoursesRouter_1);
app.use('/addcourse', CoursesRouter_1);
app.use('/getallCourses', CoursesRouter_1);
app.use('/getCoursesByDescription', CoursesRouter_1);
app.use('/studDashboard', Transcript_1);
app.use('/changeContact', Transcript_1);
app.use('/records', Transcript_1);
app.listen(3000, function () {
    console.log("Server  is listening on port 3000");
});
app.get('/', function (req, res) {
    res.send("Welcome to School Portal");
});

module.exports = app;
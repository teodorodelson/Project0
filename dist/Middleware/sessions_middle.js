"use strict";
exports.__esModule = true;
var express_session_1 = require("express-session");
//thi is the object that we will use to configure our session middleware
var sessionConfig = {
    secret: 'onetwothree',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
    ephemeral: true
};
// we can call app.use() in index.ts with this object to enable the use of sessions
var sessionMiddleware = express_session_1(sessionConfig);

module.exports = sessionMiddleware;

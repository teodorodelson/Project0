import session from 'express-session';

//thi is the object that we will use to configure our session middleware
const sessionConfig = {
    secret:'onetwothree',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 600000},
    ephemeral: true,
}

// we can call app.use() in index.ts with this object to enable the use of sessions
export const sessionMiddleware = session(sessionConfig); 
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const maxSessionAge = 86400000;

module.exports = session({
    cookie: { maxAge: maxSessionAge },
    store: new MemoryStore({
      checkPeriod: maxSessionAge
    }),
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'default session store secret'
});

const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const maxSessionAge = 1000 * 60 * 15; // 15 minutes

module.exports = session({
    cookie: { maxAge: maxSessionAge },
    store: new MemoryStore({
      checkPeriod: maxSessionAge / 10
    }),
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'default session store secret'
});

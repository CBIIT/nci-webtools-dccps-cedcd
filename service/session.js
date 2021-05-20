const settings = require('../config/cedcd.settings')
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const timeoutMinutes = Number(settings.sessionTimeoutMinutes || 120);
const maxSessionAge = timeoutMinutes * 60 * 1000; // convert minutes to ms
const production = process.env.NODE_ENV !== 'development';

module.exports = session({
    cookie: { 
      maxAge: maxSessionAge,
      secure: production,
    },
    store: new MemoryStore({
      checkPeriod: maxSessionAge / 10
    }),
    resave: false,
    rolling: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'default session store secret'
});

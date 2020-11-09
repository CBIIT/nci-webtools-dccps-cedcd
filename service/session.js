var session = require('express-session');
var MemoryStore = require('memorystore')(session);

module.exports = session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    secret: process.env.SESSION_SECRET || 'default session store secret'
});

import cedcd_settings from "../config/cedcd_settings.js";
import session from "express-session";
import memorystore from "memorystore";
const MemoryStore = memorystore(session);
const timeoutMinutes = Number(cedcd_settings.sessionTimeoutMinutes || 15);
const maxSessionAge = timeoutMinutes * 60 * 1000; // convert minutes to ms
const production = process.env.NODE_ENV||'dev' !== 'dev';

export default session({
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
    secret: cedcd_settings.oauth2_client_id || 'default session store secret'
});


import cedcd_settings from "../config/cedcd_settings.js";
import session from "express-session";
import memorystore from "memorystore";
const MemoryStore = memorystore(session);
const production = (process.env.ENV||'dev') !== 'dev';

export default session({
    cookie: { 
      maxAge: +cedcd_settings.maxSessionAge,
      secure: production,
    },
    store: new MemoryStore({
      checkPeriod: +cedcd_settings.maxSessionAge / 10
    }),
    resave: false,
    rolling: false,
    saveUninitialized: true,
    secret: cedcd_settings.oauth2_client_id || 'default session store secret'
});


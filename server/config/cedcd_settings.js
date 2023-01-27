'use strict';
import dotenv from "dotenv";
dotenv.config();

const cedcd_settings = {
    mysql:{
        connectionLimit: process.env.MYSQL_CONNECTIONLIMIT||100,
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT||3306,
        user:  process.env.MYSQL_USER ||'root',
        password: process.env.MYSQL_PASSWORD||'',
        db: process.env.MYSQL_DB||'cedcd'
    },

    logDir: process.env.LOG_DIR||'deploy/log',
    file_path: process.env.FILE_PATH||'deploy/data',

    oauth2_client_id: process.env.OAUTH2_CLIENT_ID, 
    oauth2_secret: process.env.OAUTH2_CLIENT_SECRET,
    oauth2_base_url: process.env.OAUTH2_BASE_URL,
    oauth2_redirect_uri: process.env.OAUTH2_REDIRECT_URI,
   
    sessionTimeoutMinutes:60,
    maxSessionAge:process.env.SESSION_MAX_AGE||360000, // convert minutes to ms

    mail:{
        host: process.env.EMAIL_SMTP_HOST||'mailfwd.nih.gov',
        port: process.env.EMAIL_SMTP_PORT||25,
        from: process.env.EMAIL_SMTP_FROM||'cedcdWebAdmin@nih.gov',
        to:process.env.EMAIL_SMTP_TO||"chao.zhang3@nih.gov",
        "tls":{
            // do not fail on invalid certs
            "rejectUnauthorized": false
        },
        logger:true,
        debug:true,
    },
    log_level:process.env.LOGGER_LEVEL||'debug',
    env: process.env.ENV||'dev',
};

export default cedcd_settings;

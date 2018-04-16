'use strict';

var express = require('express');
var session = require('express-session');
var config = require('./index');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var path = require('path');
var morgan = require('morgan');
var fs = require('fs');
var rfs = require('rotating-file-stream');
var fileUpload = require('express-fileupload');
 

module.exports = function(app){

	let env = config.env?config.env:"dev";

    app.use(compression());
    app.use(bodyParser.urlencoded({
        limit: '4mb', // 100kb default is too small
        extended: false
    }));
    app.use(bodyParser.json({
        limit: '4mb' // 100kb default is too small
    }));
    app.use(fileUpload());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session({secret: 'cedcd token', cookie: {maxAge: config.maxAge}, resave: true, saveUninitialized: true }));

    app.use(express.static(path.join(config.root, 'client/www')));
    
    if ('dev' === env) {
        app.use(morgan('dev'));
    }
    else if('prod' === env || 'test' === env){
        let logDirectory = config.logDir;

        // ensure log directory exists
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

        // create a rotating write stream
        var accessLogStream = rfs('access.log', {
          interval: '1d', // rotate daily
          path: logDirectory
        })

        morgan.format('log-format', ':remote-addr - - [:date[clf]] ":method :url HTTP/:http-version" :status ":referrer" ":user-agent"');
        // setup the logger
        app.use(morgan('log-format', {stream: accessLogStream}));
    }

};

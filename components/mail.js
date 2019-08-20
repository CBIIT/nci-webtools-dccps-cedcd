/**
 * mail component
 */

'use strict';

var config = require('../config');
var logger = require('./logger');
const nodeMailer = require('nodemailer');


var sendMail = function(from, to, subject, text, html, next){
	const transporter = nodeMailer.createTransport(config.mail);
	let mailOptions = {
	  from: from, // sender address
	  to: to, // list of receivers
	  subject: subject, // Subject line
	  text: text, // plain text body
	  html: html // html body
	};
	return transporter.sendMail(mailOptions);

	/*
	transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          logger.error(error);
          next();
      }
      else{
      	logger.info('Message %s sent: %s', info.messageId, info.response);
      	next(info);
      }
	});
	*/
};

module.exports = {
	sendMail
};
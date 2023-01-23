/**
 * mail component
 */

'use strict';

import config from "../config/index.js";
import logger from "./logger.js" ;
import nodeMailer from "nodemailer";


export async function sendMail(from, to, subject, text, html, next)  {
	const transporter = nodeMailer.createTransport(config.mail);
	// logger.debug(html)
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

/**
 * general utilities
 */

'use strict';
var config = require('../config');
var moment = require('moment');
var logger = require('./logger');
var fs = require('fs');
var crypto = require('crypto');
var MD5 = require('md5');

function file(name) {
    return fs.createWriteStream(__dirname + '/' + name);
}

/**
 * id rules:
 * timestamp in milliseconds (last 9 digits) + MMDDYY + random number from 0 to 9 
*/
var generateId = function(){
	let result = "";
	let ts = Date.now();
	let ds = moment().format('MMDDYY');
	let rd = Math.floor(Math.random() * 10);
	result = "" + ts;
	result = result.substr(4);
	logger.debug(result);

	result += ds + rd;
	return result;
};


//get timestamp in seconds
var getTimestamp = function(){
	return Math.floor(Date.now() / 1000);
};

module.exports = {
	generateId,
	getTimestamp
};
/**
 * local cache
 */

'use strict';

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

var getValue = function(sid){
	let value = myCache.get(sid);
	return value;
};

var setValue = function(key, value, ttl, next){
	myCache.set(key, value, ttl);
	if(next){
		next();
	}
	
};

var del = function(key, next){
	myCache.del(key);
	if(next){
		next();
	}
};

module.exports = {
	getValue,
	setValue,
	del
};
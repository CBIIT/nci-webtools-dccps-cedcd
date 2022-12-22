/**
 * local cache
 */

'use strict';

import NodeCache from  "node-cache";
const myCache = new NodeCache();

export function getValue(sid){
	let value = myCache.get(sid);
	return value;
};

export function setValue(key, value, ttl, next){
	if(ttl == -1){
		myCache.set(key, value);
	}
	else{
		myCache.set(key, value, ttl);
	}
	
	if(next){
		next();
	}
	
};

export function del(key, next){
	myCache.del(key);
	if(next){
		next();
	}
};

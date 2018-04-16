/**
 * client for mysql
 */

'use strict';

var logger = require('./logger');
const mysql = require('mysql');

var pool = null;

var connect = function(config, next){
	pool = mysql.createPool({
	    connectionLimit : config.connectionLimit, 
	    host     : config.host,
	    user     : config.user,
	    password : config.password,
	    database : config.db,
	    debug    :  false
	});
	if(pool){
		next(1);
	}
	else{
		next(null);
	}
};


var getConnection = function(next){
	pool.getConnection(function(err, connection){
		if(err){
          logger.error(err);
          next([]);
        }

        next(connection);
	});
};

var query = function(sql, next){
	pool.getConnection(function(err,connection){
        if(err){
          logger.error(err);
          next([]);
        }

        logger.debug('sql:' + sql);
        connection.query(sql,function(err_1, results, fields){
            connection.release();
            if(err_1){
	          logger.error(err_1);
	          next([]);
	        }
	        else{
	        	next(results);
	        }           
        });

  	});
};

var queryWithLimit = function(sql, sql_count, paging, next){
	pool.getConnection(function(err,connection){
        if(err){
          logger.error(err);
          next([]);
        }

        logger.debug('sql_count:' + sql_count);
        connection.query(sql_count, function(err_0, results_0, fields_0){
        	if(err_0){
        		logger.error(err_0);
        		next([], 0);
        	}
        	else{
        		let total = results_0[0].count;
        		if(total == 0){
        			next([], 0);
        		}
        		else{
        			let start = (paging.page - 1) * paging.pageSize;
	        		let offset = paging.pageSize;
	        		sql = sql + " limit " + start + "," + offset;
	        		logger.debug('sql:' + sql);
	        		connection.query(sql,function(err_1, results_1, fields_1){
			            connection.release();
			            if(err_1){
				          logger.error(err_1);
				          next([], 0);
				        }
				        else{
				        	next(results_1, total);
				        }           
			        });
        		}
        		
        	}
        	
        });
        

  	});
};

var execute = function(sql, next){
	pool.getConnection(function(err,connection){
        if(err){
          logger.error(err);
          next(null);
        }

        logger.debug('sql:' + sql);
        connection.query(sql,function(err_1, results, fields){
            connection.release();
            if(err_1){
	          logger.error(err_1);
	          next(null);
	        }
	        else{
	        	next(results);
	        }           
        });
  	});
};

var callProcedure = function(func, params, next){
	pool.getConnection(function(err,connection){
        if(err){
          logger.error(err);
          next(null);
        }

        let sql = "CALL "+func+"(";
        params.forEach(function(p){
        	let t = typeof p;
          if(t === "string"){
            sql += "'"+p+"',";
          }
          else if(t === "number"){
            sql += ""+p+",";
          }
          else{
            sql += "'"+p+"',";
          }
        });
        sql = sql.substring(0, sql.length -1);
        sql += ")";
        logger.debug('sql:' + sql);
        connection.query(sql,function(err_1, rows){
            connection.release();
            if(err_1){
	          logger.error(err_1);
	          next(null);
	        }
	        else{
            next(rows);
	        }           
        });
  	});
};

var close = function(){
	if(pool){
		pool.end();
	}
};

module.exports = {
	connect,
	getConnection,
	query,
	queryWithLimit,
	execute,
	callProcedure,
	close
};
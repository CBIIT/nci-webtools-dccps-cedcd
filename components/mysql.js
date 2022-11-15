/**
 * client for mysql
 */

'use strict';

var logger = require('./logger');
const mysql = require('mysql');
const { promisify } = require('util');

var pool = null;

var getConnectionPool = function(config){
	pool = mysql.createPool({
		connectionLimit : config.connectionLimit, 
		connectTimeout: config.connectTimeout || (1000 * 60 * 20),
		acquireTimeout: config.acquireTimeout || (1000 * 60 * 20),
	    host     : config.host,
      	port     : config.port,
	    user     : config.user,
	    password : config.password,
		database : config.db,
		multipleStatements: true,
	    debug    :  false
	});

	pool.on('connection', function (connection) {
		console.log('mysql Connection %d is connected', connection.threadId);
	   });
	   
    pool.on('acquire', function (connection) {
		console.log('mysql Connection %d acquired', connection.threadId);
	  });

	  pool.on('enqueue', function () {
		console.log('mysql Waiting for available connection slot');
	  });  
	  
	return pool;
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

var getConnectionAsync = () => new Promise((resolve, reject) => {
	pool.getConnection((error, connection) => {
		if (error) reject(error);
		else resolve(connection);
	})
});

var queryAsync = (connection, sql, values) => new Promise((resolve, reject) => {
	connection.query({sql, values}, (error, results, fields) => {
		if (error) reject(error);
		else resolve({results, fields});
	});
})

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

var callJsonProcedure = function(func, params, next){
	pool.getConnection(function(err,connection){
        if(err){
          logger.error(err);
          next(null);
		}

/*
		let esql = "CALL "+func+"(";
        params.forEach(function(p){
              let t = typeof p;
          if(t === "string"){
            p = p.replace(/'/g,"''");
            esql += "'"+p+"',";
          }
          else if(t === "number"){
            esql += ""+p+",";
          }
          else{
            esql += "'"+p+"',";
          }
        });
       
        if(params.length > 0){
          esql = esql.substring(0, esql.length -1);
        }
        esql += ")";
        logger.debug('esql: ' + esql);
*/

		logger.debug(`call ${func} `)
		const placeholders = params.map(_ => '?').join(',');
		const sql = `call ?? (${placeholders})`;
		logger.debug('sql: ' + sql);
		logger.debug('func: ' + func);
		logger.debug('params: ' + params);
        connection.query(sql, [func, ...params], function(err_1, rows){
            connection.release();
            if(err_1){
	          logger.error(err_1);
	          next(null);
	        }
	        else{
            next(rows);
	        }           
        })
	})
}

var callProcedure = function(func, params, next){
	pool.getConnection(function(err,connection){
        if(err){
          logger.error(err);
          next(null);
        }
		const placeholders = params.map(_ => '?').join(',');
		const sql = `call ?? (${placeholders})`;
		logger.debug('sql: ' + sql);
		logger.debug('func: ' + func);
		logger.debug('params: ' + params);
        connection.query(sql, [func, ...params], function(err_1, rows){
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

function checkConnection(connection) {
	return new Promise((resolve, reject) => {
		connection.query('select 1', (error, results) => {
			if (error) reject(error);
			else resolve(true);
		});
	})
}

function deferUntilConnected(connection) {
	return new Promise((resolve, reject) => {
		let interval = 1;
		tryConnection();
		async function tryConnection() {
			try {
				if (await checkConnection(connection)) {
					resolve(connection);
				}
			} catch (e) {
				console.log('Waiting for connection...');
				interval *= 1.5;
				setTimeout(tryConnection, 1000 * 10 * interval)
			}
		}
	});
}

async function upsert({connection, table, record}) {
	for (let key in record)
		if (record[key] === undefined)
			delete record[key];

	if (!connection) connection = pool;
	const query = promisify(connection.query).bind(connection);
	const escape = connection.escapeId.bind(connection);

	const validColumns = (await query(
		`SELECT COLUMN_NAME FROM information_schema.COLUMNS where TABLE_NAME = ?`,
		table
	)).map(e => e.COLUMN_NAME);
	
	if (record.id) {
		// when upserting, columns without default values must be provided
		const [existingRecord] = await query(
			`SELECT * FROM ?? WHERE id = ?`,
			[table, record.id]
		);
		record = {...existingRecord, ...record};
	}

	const columns = Object.keys(record).filter(column => validColumns.includes(column));
	const values = columns.map(column => record[column]);
	const valuePlaceholders = columns.map(_ => '?').join(',');
	const valueAssignments = validColumns.map(column => 
		`${escape(column)} = COALESCE(VALUES(${escape(column)}), ${escape(column)}) `
	).join(',');



	// if upserting, ensure that a unique key exists for the specified columns
	// and that non-null values do not exist in this unique key
	return await query(
		`INSERT INTO ?? (??) VALUES (${valuePlaceholders})
		ON DUPLICATE KEY UPDATE ${valueAssignments}`, 
		[table, columns, ...values]
	);
}

module.exports = {
	pool,
	getConnectionPool,
	getConnection,
	query,
	queryWithLimit,
	execute,
	callProcedure,
	callJsonProcedure,
	close,
	getConnectionAsync,
	queryAsync,
	deferUntilConnected,
	upsert
};
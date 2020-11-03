var express = require('express');
var router = express.Router();
var mysql = require('../components/mysql');
var cache = require('../components/cache');
var config = require('../config');
var logger = require('../components/logger');

const { join } = require('lodash');

router.post('/admincohortlist', function (req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let func = "select_admin_cohortlist";
	let params = [];
	//form filter into Strings

	if (filter.cohortstatus.length > 0) {
		params.push(filter.cohortstatus.toString());
	}
	else {
		params.push("");
	}

	if (filter.cohortSearch) {
		params.push(filter.cohortSearch);
	}
	else {
		params.push("");
	}

	if (orderBy) {
		params.push(orderBy.column);
		params.push(orderBy.order);
	}
	else {
		params.push("");
		params.push("");
	}

	if (paging && paging.page != 0) {
		params.push((paging.page - 1) * paging.pageSize);
		params.push(paging.pageSize);
	}
	else {
		params.push(-1);
		params.push(-1);
	}

	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let dt = {};
			dt.list = results[0];
			dt.total = results[1][0].total;
			res.json({ status: 200, data: dt });
		}
		else {
			res.json({ status: 200, data: { list: [], total: 0 } });
		}
	});
});

module.exports = router;
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


router.post('/adminuserlist', function (req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let func = "select_all_users";
	let params = [];
	//form filter into Strings

	if (filter.userNameSearch) {
		params.push(filter.userNameSearch);
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

router.post('/getUserProfile/:id', function (req, res) {
	let id = req.params.id
	let func = 'select_user_profile'
	let params = []
	params.push(id)
	mysql.callProcedure(func, params, function (result) {
		logger.debug(result)
		const userProfile = {}

		userProfile.info = result[0]
		userProfile.result = result[1]
		userProfile.emailList = result[2]


		if (userProfile && userProfile.info)
			res.json({ status: 200, data: userProfile })
		else
			res.json({ status: 500, message: 'failed to load data' })
	})
})

router.post('/updateUserProfile/:id', function (req, res) {
	let func = 'update_user_profile'
	let body = JSON.stringify(req.body)
	let params = []
	params.push(req.params.id)
	params.push(body)
	logger.debug(body)

	mysql.callJsonProcedure(func, params, function (result) {
		logger.debug(result)
		if (result && result[0] && result[0][0].rowAffacted > 0) {

			res.json({ status: 200, message: 'update successful' })
		}
		else
			res.json({ status: 500, message: 'update failed' })
	})

});

module.exports = router;
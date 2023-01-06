// the API routes for Chorhot Admin functions { manage cohorts, users}
// protected for logged in Admins only
// APIS /api/managecohort/-
// POST:
//  - admincohortlist 
//  - adminuserlist 
//  - getUserProfile/:id, 
//  - updateUserProfile/:id 
// GET:
//  - cohortActivityLog/:abbreviation 
//
import Router from "express-promise-router";
import * as mysql from "../components/mysql.js";
import logger from "../components/logger.js";


const router = Router();
router.use((request, response, next) => {
	const { session } = request;
	if (!session.user || !/SystemAdmin/.test(session.user.role)) {
		response.status(400).json('Unauthorized').end();
	} else {
		next();
	}
});

router.post('/admincohortlist', function (req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let func = "select_admin_cohortlist";
	let params = [];
	//form filter into Strings

	if (filter.cohortStatus.length > 0) {
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
		userProfile.cohortList = result[3]

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


router.get('/cohortActivityLog/:abbreviation', async function (request, response) {
	const { app, params } = request;
    const { mysql } = app.locals;
	const { abbreviation } = params;
	
	try {
        const result = await mysql.query(
			`select
				activity,
				notes,
				c.create_time,
				concat_ws(', ', last_name, first_name) as user_display_name
			from cohort_activity_log c
			join user u on c.user_id = u.id
			where cohort_id in (select id from cohort where acronym = ?)
			order by create_time desc`, 
			abbreviation
		);

        if (result) {
			response.json(result);
        } else {
            throw new Error('SQL Exception');
		}
		
    } catch (e) {
        logger.debug(e);
        response.status(500).json('Could not fetch activity log')
    }
});

export default router;
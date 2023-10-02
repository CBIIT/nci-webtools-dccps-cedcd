// the API routes for Cohorts related functions in published pages
// API /api/cohort/-
// POST:
// - sendUserEmail, list, published_list, owners, add
// - lookup, select, advancedSelect
// - enrollment, cancer, specimen,
// - details/?
// GET:
// - :id
//
import Router from "express-promise-router";
import * as mysql  from "../components/mysql.js";
import * as cache  from "../components/cache.js";
import config  from "../config/index.js";
import logger  from "../components/logger.js";
import basicInfoController  from "../service/details/basicInfoController.js";
import baselineController  from "../service/details/baselineController.js";
import followupController  from "../service/details/followupController.js";
import cancerController  from "../service/details/cancerController.js";
import mortalityController  from "../service/details/mortalityController.js";
import linkagesController  from "../service/details/linkagesController.js";
import specimenController  from "../service/details/specimenController.js";
import * as mail from "../components/mail.js";
import fs  from "fs";
import path  from "path";

const router = Router();

async function readTemplate(filePath, data) {
	const template = await fs.promises.readFile(path.resolve(filePath));
	console.log(template)

	// replace {tokens} with data values or removes them if not found
	return String(template).replace(
		/{[^{}]+}/g,
		key => data[key.replace(/[{}]+/g, '')] || ''
	);
}

router.post('/sendUserEmail', async function (req, res, next) {
   // get template path 
   const dirname = path.normalize(config.root + '/service');

	try {
		await mail.sendMail(
			config.mail.from,
			req.body.email,
			req.body.topic,
			'',
			await readTemplate(dirname + req.body.template, req.body.templateData),
		);
		res.json({ status: 200, data: 'sent' });
	} catch (e) {
		logger.debug(e)
		res.json({ status: 200, data: 'failed' });
	}
})


router.post('/list', function (req, res) {
	let body = req.body;
	//let searchText = body.searchText || "";
	let func = "select_all_cohort";
	let params = [];

	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let dt = {};
			dt.list = results[0];
			dt.total = dt.list.length;
			res.json({ status: 200, data: dt });
		}
		else {
			res.json({ status: 200, data: { list: [], total: 0 } });
		}
	});
});

router.post('/edit_list', function (req, res) {
	let body = req.body;
	//let searchText = body.searchText || "";
	let func = "select_all_cohort_edit";
	let params = [];

	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let dt = {};
			dt.list = results[0];
			dt.total = dt.list.length;
			res.json({ status: 200, data: dt });
		}
		else {
			res.json({ status: 200, data: { list: [], total: 0 } });
		}
	});
});


router.post('/published_list', function (req, res) {
	let body = req.body;
	//let searchText = body.searchText || "";
	let func = "select_cohort_list";
	let params = [];

	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let dt = {};
			dt.list = results[0];
			dt.total = dt.list.length;
			res.json({ status: 200, data: dt });
		}
		else {
			res.json({ status: 200, data: { list: [], total: 0 } });
		}
	});
});

router.post('/owners', function (req, res) {

	let func = 'select_cohort_owner';
	let params = [];

	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let dt = {};
			dt.list = results[0];
			dt.total = dt.list.length;
			res.json({ status: 200, data: dt });
		}
		else {
			res.json({ status: 200, data: { list: [], total: 0 } });
		}
	})
});

router.post('/add', function (req, res) {

	let func = 'insert_new_cohort'
	let body = JSON.stringify(req.body)
	let params = []
	params.push(body)

	mysql.callJsonProcedure(func, params, function (result) {

		if (result && result[0] && result[0][0].success === 1)
			res.json({ status: 200, message: 'update successful' })
		else
			res.json({ status: 500, message: 'update failed' })
	})
});

router.post('/update', function(req, res) {

	let func = 'update_cohort'
	let body = JSON.stringify(req.body)
	let params = []
	params.push(body)

	mysql.callJsonProcedure(func, params, function (result) {

		if (result && result[0] && result[0][0].success === 1)
			res.json({ status: 200, message: 'update successful' })
		else
			res.json({ status: 500, message: 'update failed' })
	})
})

router.post('/lookup', function (req, res) {
	let body = req.body;
	let category = body.category || "";
	let info = cache.getValue("lookup:" + category);

	res.json({ status: 200, data: { list: info } });

});

router.post('/select', function (req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let func = "select_cohort";
	let params = [];
	//form filter into Strings

	if (filter.participant.gender.length > 0) {
		params.push(filter.participant.gender.toString());
	}
	else {
		params.push("");
	}

	if (filter.participant.age.length > 0) {
		params.push(filter.participant.age.toString());
	}
	else {
		params.push("");
	}

	if (filter.study.state.length > 0) {
		let state_columns = [];
		filter.study.state.forEach(function (ss) {
			state_columns.push(config.eligible_disease_state[ss]);
		});
		params.push(state_columns.toString());
	}
	else {
		params.push("");
	}

	if (filter.participant.race.length > 0) {
		params.push(filter.participant.race.toString());
	}
	else {
		params.push("");
	}

	if (filter.participant.ethnicity.length > 0) {
		params.push(filter.participant.ethnicity.toString());
	}
	else {
		params.push("");
	}

	if(filter.participant.type.length > 0) {
		params.push(filter.participant.type.toString())
	}
	else{
		params.push("")
	}

	if (filter.collect.data.length > 0) {
		params.push(filter.collect.data.toString());
	}
	else {
		params.push("");
	}

	if (filter.collect.specimen.length > 0) {
		/*  changed in 2021 use dtabase view to match selections
				let specimen_columns = [];
				filter.collect.specimen.forEach(function (cs) {
					specimen_columns.push(config.collected_specimen[cs]);
				});
		*/
		params.push(filter.collect.specimen.toString());
	}
	else {
		params.push("");
	}

	if (filter.collect.cancer.length > 0) {
		params.push(filter.collect.cancer.toString());
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

router.post('/advancedSelect', function (req, res) {
	let body = req.body;
	let advancedFilter = body.advancedFilter || {};
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let advancedCondition = body.advancedCondition || "";
	let func = "select_advanced_cohort";
	let params = [];
	//form filter into Strings

	if (advancedFilter.gender.length > 0) {
		params.push(advancedFilter.gender.toString());
	}
	else {
		params.push("");
	}

	if (advancedFilter.age.length > 0) {
		params.push(advancedFilter.age.toString());
	}
	else {
		params.push("");
	}

	if (advancedFilter.state.length > 0) {
		let state_columns = [];
		advancedFilter.state.forEach(function (ss) {
			state_columns.push(config.eligible_disease_state[ss]);
		});
		params.push(state_columns.toString());
	}
	else {
		params.push("");
	}

	if (advancedFilter.race.length > 0) {
		params.push(advancedFilter.race.toString());
	}
	else {
		params.push("");
	}

	if (advancedFilter.ethnicity.length > 0) {
		params.push(advancedFilter.ethnicity.toString());
	}
	else {
		params.push("");
	}

	if (advancedFilter.type.length > 0) {
		params.push(advancedFilter.type.toString());
	}
	else {
		params.push("");
	}

	if (advancedFilter.data.length > 0) {
		params.push(advancedFilter.data.toString());
	}
	else {
		params.push("");
	}

	if (advancedFilter.specimen.length > 0) {
		params.push(advancedFilter.specimen.toString());
	}
	else {
		params.push("");
	}

	if (advancedFilter.cancer.length > 0) {
		params.push(advancedFilter.cancer.toString());
	}
	else {
		params.push("");
	}

	advancedFilter.booleanOperationBetweenField = advancedCondition == 'AND' ? Array(8).fill('AND') : Array(8).fill('OR')
	params.push(advancedFilter.booleanOperationBetweenField.toString())
	/*
	if(advancedFilter.booleanOperationBetweenField.length > 0){
		params.push(advancedFilter.booleanOperationBetweenField.toString());
	}
	else{
		params.push("");
	}
	*/
	if (advancedFilter.booleanOperationWithInField.length > 0) {
		params.push(advancedFilter.booleanOperationWithInField.toString());
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

router.post('/enrollment', function (req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let func = "select_enrollment_counts";
	let params = [];
	//form filter into Strings

	if (filter.gender.length > 0) {
		params.push(filter.gender.toString());
	}
	else {
		params.push("");
	}

	if (filter.race.length > 0) {
		params.push(filter.race.toString());
	}
	else {
		params.push("");
	}

	if (filter.ethnicity.length > 0) {
		params.push(filter.ethnicity.toString());
	}
	else {
		params.push("");
	}

	if (filter.cohort.length > 0) {
		params.push(filter.cohort.toString());
	}
	else {
		params.push("");
	}
	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let dt = {};
			let cache = {};
			dt.list = [];
			dt.cohorts = [];
			let cohorts = [];
			let list = results[0];
			list.forEach(function (l) {

				if (cache[l.u_id] == null) {
					cache[l.u_id] = {};
					cache[l.u_id].c0 = l.gender;
					cache[l.u_id].c1 = l.ethnicity;
					cache[l.u_id].c2 = l.race;
					cache[l.u_id].total = 0;
				}
				if (cohorts.indexOf(l.cohort_id) == -1) {
					cohorts.push(l.cohort_id);
					dt.cohorts.push({
						cohort_id: l.cohort_id,
						cohort_name: l.cohort_name,
						cohort_acronym: l.cohort_acronym
					});

				}
				let tmp = cache[l.u_id];
				let count = 0;
				if (l.enrollment_counts == -1) {
					tmp["c_" + l.cohort_id] = "N/P";
					count = 0;
				}
				else {
					tmp["c_" + l.cohort_id] = l.enrollment_counts;
					count = l.enrollment_counts;
				}

				tmp.total += count;
			});

			for (const key in cache) {
				dt.list.push(cache[key]);
			}

			res.json({ status: 200, data: dt });
		}
		else {
			res.json({ status: 200, data: { list: [] } });
		}
	});
});

router.post('/cancer', function (req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let func = "select_cancer_counts";
	let params = [];
	//form filter into Strings
	if (filter.gender.length > 0) {
		params.push(filter.gender.toString());
	}
	else {
		params.push("");
	}

	if (filter.race.length > 0) {
		params.push(filter.race.toString());
	}
	else {
		params.push("");
	}

	if (filter.ethnicity.length > 0) {
		params.push(filter.ethnicity.toString());
	}
	else {
		params.push("");
	}

	if (filter.cancer.length > 0) {
		params.push(filter.cancer.toString());
	}
	else {
		params.push("");
	}

	if (filter.cohort.length > 0) {
		params.push(filter.cohort.toString());
	}
	else {
		params.push("");
	}

	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let dt = {};
			let tempcache = {};
			dt.list = [];
			dt.cohorts = [];
			dt.cancers = [];
			let cohorts = [];
			let cancers = [];
			let list = results[0];
			let genders = cache.getValue("lookup:gender").filter((e) =>e.id !=3);
			let races = cache.getValue("lookup:race");
			let ethnicities = cache.getValue("lookup:ethnicity");
			let allcancers = cache.getValue("lookup:cancer").filter((e) => e.id !=29);
	
			genders.map((e) => {
				if(e.id != 4) e.gender+='s'
			})
			races = races.map(x => (x.race === "More Than One Race" || x.race === "Unknown or Not Reported") ? 
			{ ...x, race: ('Z' + x.race) } : x).sort((a, b) => a.race.localeCompare(b.race))
			.map(x => (x.race === "ZMore Than One Race" || x.race === "ZUnknown or Not Reported") ? 
			{ ...x, race: x.race.slice(1) } : x);

			allcancers.push({id: 0, cancer: "All Cancer Types"})

			allcancers = allcancers.map(x => (x.cancer === "All Other Cancers") ? 
			{ ...x, cancer: ('Z' + x.cancer) } : x).sort((a, b) => a.cancer.localeCompare(b.cancer))
			.map(x => (x.cancer === "ZAll Other Cancers") ? { ...x, cancer: x.cancer.slice(1) } : x);

			allcancers.filter((e) => filter.cancer.length === 0 ||
			filter.cancer.length === allcancers.length -1 || filter.cancer.includes(e.id)).forEach(function (ac) {
				genders.filter((e) => filter.gender.length !== 1 || filter.gender.includes(e.id)).forEach(function (ge) {
					ethnicities.filter((e) => filter.ethnicity.length === 0 || filter.ethnicity.includes(e.id)).forEach(function (et) {
						races.filter((e) => filter.race.length === 0 || filter.race.includes(e.id)).forEach(function (ra) {
							let u_id = ge.id + '_' + et.id + '_' + ra.id + '_' + ac.id
							if (tempcache[u_id] == null) {
								tempcache[u_id] = {};
								tempcache[u_id].cancer = ac.cancer;
								tempcache[u_id].c0 = ge.gender;
								tempcache[u_id].c1 = et.ethnicity;
								tempcache[u_id].c2 = ra.race;
								tempcache[u_id].total = 0;
							}
						})
					})
				})
			})

			list.forEach(function (l) {
				
				if (cancers.indexOf(l.cancer_id) == -1) {
					cancers.push(l.cancer_id);
					dt.cancers.push(l.cancer);				
				}

				if (tempcache[l.u_id] == null) {
					tempcache[l.u_id] = {};
					tempcache[l.u_id].cancer = l.cancer;
					tempcache[l.u_id].c0 = l.gender;
					tempcache[l.u_id].c1 = l.ethnicity;
					tempcache[l.u_id].c2 = l.race;
					tempcache[l.u_id].total = 0;
				}
				if (cohorts.indexOf(l.cohort_id) == -1) {
					cohorts.push(l.cohort_id);
					dt.cohorts.push({
						cohort_id: l.cohort_id,
						cohort_name: l.cohort_name,
						cohort_acronym: l.cohort_acronym
					});

				}
				let tmp = tempcache[l.u_id];
				let count = 0;
				if (l.cancer_counts == -1) {
					tmp["c_" + l.cohort_id] = "N/P";
					count = 0;
				}
				else {
					tmp["c_" + l.cohort_id] = l.cancer_counts;
					count = l.cancer_counts;
				}

				tmp.total += count;
			});

			for (const key in tempcache) {
				dt.list.push(tempcache[key]);
			}

			res.json({ status: 200, data: dt });
		}
		else {
			res.json({ status: 200, data: { list: [] } });
		}
	});
});

router.post('/specimen', function (req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let func = "select_specimen_counts";
	let params = [];
	//form filter into Strings

	if (filter.specimen.length > 0) {
		params.push(filter.specimen.toString());
	}
	else {
		params.push("");
	}

	if (filter.cancer.length > 0) {
		params.push(filter.cancer.toString());
	}
	else {
		params.push("");
	}

	if (filter.cohort.length > 0) {
		params.push(filter.cohort.toString());
	}
	else {
		params.push("");
	}

	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let dt = {};
			let cache = {};
			dt.list = [];
			dt.cohorts = [];
			let cohorts = [];
			let list = results[0];
			list.forEach(function (l) {

				if (cache[l.u_id] == null) {
					cache[l.u_id] = {};
					cache[l.u_id].c1 = l.specimen;
					cache[l.u_id].c2 = l.cancer;
				}
				if (cohorts.indexOf(l.cohort_id) == -1) {
					cohorts.push(l.cohort_id);
					dt.cohorts.push({
						cohort_id: l.cohort_id,
						cohort_name: l.cohort_name,
						cohort_acronym: l.cohort_acronym
					});

				}
				let tmp = cache[l.u_id];
				if (l.specimens_counts == -1) {
					tmp["c_" + l.cohort_id] = "N/P";
				}
				else {
					tmp["c_" + l.cohort_id] = l.specimens_counts;
				}
			});

			for (const key in cache) {
				dt.list.push(cache[key]);
			}

			res.json({ status: 200, data: dt });
		}
		else {
			res.json({ status: 200, data: { list: [] } });
		}
	});
});

router.get('/:id', function (req, res) {
	let id = req.params.id;
	let info = cache.getValue("cohort:" + id);
	//if (info == undefined) {
	let func = "select_cohort_description";
	let params = [id];
	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let basic = results[0][0];
			info = {};
			info.cohort_id = basic.cohort_id;
			info.cohort_name = basic.cohort_name;
			info.cohort_acronym = basic.cohort_acronym;
			info.update_time = basic.update_time;
			info.procedure_files = [];
			let persons = results[2];
			info.pis = [];
			persons.forEach(function (p) {
				if (p.name) {
					if (p.category_id == 3) {
						let tmp = {};
						tmp.id = p.id;
						tmp.name = p.name;
						tmp.institution = p.institution;
						info.pis.push(tmp);
					}
					else if (p.category_id in [1, 4]) {
						info.collab_name = p.name;
						info.collab_position = p.position;
						info.collab_phone = p.phone;
						info.collab_email = p.email;
					}
				}
			});

			/*
			if(basic.same_as_a3a == 1){
				info.collab_name = basic.completed_by_name;
				info.collab_position = basic.completed_by_position;
				info.collab_phone = basic.completed_by_phone;
				info.collab_email = basic.completed_by_email;
			}
			else if(basic.same_as_a3b == 1){
				info.collab_name = basic.contact_name;
				info.collab_position = basic.contact_position;
				info.collab_phone = basic.contact_phone;
				info.collab_email = basic.contact_email;
			}
			else{
				info.collab_name = basic.collab_contact_name;
				info.collab_position = basic.collab_contact_position;
				info.collab_phone = basic.collab_contact_phone;
				info.collab_email = basic.collab_contact_email;
			}
			*/

			info.cohort_web_site = basic.cohort_web_site;
			info.cohort_description = basic.cohort_description;
			info.request_procedures_web_url = "";
			if ([0, 1].includes(basic.request_procedures_none)) {
				if (basic.request_procedures_none === 1) {
					info.request_procedures_web_url = results[1].find(f => f.attachment_type === 0 && f.category === 5 && f.status === 1) ? results[1].find(f => f.attachment_type === 0 && f.category === 5 && f.status === 1).website : '';
				}
				else {
					results[1].forEach(f => {
						if (f.attachment_type === 1 && f.category === 5 && f.status === 1 && f.filename)
							info.procedure_files.push(f.filename)
					});

				}
			}

			info.attachments = {};
			logger.debug(results[1])
			let attachs = results[1].filter(f => f.category !== 5)
			logger.debug(attachs)
			let tmp = [[], [], []];
			attachs.forEach(function (attach) {
				let idx = attach.category > 0 ? 1 : attach.category;
				let content = attach.attachment_type == 1 ? attach.filename.trim() : attach.website.trim();
				if (tmp[idx].indexOf(content) > -1) {
					return;
				}
				else {
					tmp[idx].push(content);
				}
				if (attach.category == 0) {
					//cohort questionnaires
					if (info.attachments.questionnaires == undefined) {
						info.attachments.questionnaires = [];
					}
					info.attachments.questionnaires.push({
						type: attach.attachment_type,
						url: attach.attachment_type == 1 ? './api/download/' + attach.filename : attach.website,
						name: attach.filename
					});
				}
				/*else if (attach.category == 0) {
					//study protocol
					if (info.attachments.protocols == undefined) {
						info.attachments.protocols = [];
					}
					info.attachments.protocols.push({
						type: attach.attachment_type,
						url: attach.attachment_type == 1 ? './api/download/' + attach.filename : attach.website,
						name: attach.filename
					});
				}*/
				else {
					//policies
					if (info.attachments.policies == undefined) {
						info.attachments.policies = [];
					}
					info.attachments.policies.push({
						type: attach.attachment_type,
						url: attach.attachment_type == 1 ? './api/download/' + attach.filename : attach.website,
						name: attach.filename
					});
				}
			});
			//cache.setValue("cohort:" + id, info, config.cohort_ttl);
		}
		res.json({ status: 200, data: info });
	});
	/*}
	else {
		logger.debug("get from cache <cohort:" + id + ">");
		res.json({
			status: 200,
			data: info
		});
	}*/

});

router.post('/details/basicInfo', basicInfoController);
router.post('/details/baseline', baselineController);
router.post('/details/followup', followupController);
router.post('/details/cancer', cancerController);
router.post('/details/mortality', mortalityController);
router.post('/details/linkages', linkagesController);
router.post('/details/specimen', specimenController);

export default router;
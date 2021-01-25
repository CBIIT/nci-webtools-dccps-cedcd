var EnrollmentFunctions = require('./EnrollmentFunctions');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var ejs = require('ejs');
var config = require('../config');
var mysql = require('../components/mysql');
var cache = require('../components/cache');
var path = require('path');
var moment = require('moment');
var mail = require('../components/mail');
const XlsxPopulate = require('xlsx-populate');

router.get('/', function (req, res, next) {
	res.json({ status: 200, data: 'Welcome to CEDCD API Center.' });
});

router.post('/contact/add', function (req, res, next) {
	//save to mysql and sent email to admin
	let body = req.body;
	let firstname = body.firstname || "";
	let lastname = body.lastname || "";
	let organization = body.organization || "";
	let phone = body.phone || "";
	let email = body.email || "";
	let topic = parseInt(body.topic || "1");
	let message = body.message || "";
	let func = "insert_contact_us";
	let params = [firstname, lastname, organization, phone, email, topic, message];
	mysql.callProcedure(func, params, async function (results) {
		if (results && results[0] && results[0].length > 0) {
			let value = {};
			value.firstname = firstname;
			value.lastname = lastname;
			value.organization = organization;
			value.phone = phone;
			value.email = email;
			value.topic = config.topic[topic];
			value.message = message;
			let message_text = ejs.render(config.email_contact, value);

			try {
				await mail.sendMail(config.mail.from, config.mail.to, "CEDCD Website Contact Us Message", "", message_text);
				message_text = ejs.render(config.email_contact_recieved, {});
				await mail.sendMail(config.mail.from, email, "CEDCD Website Recieved Email Message", "", message_text);
				res.json({ status: 200, data: 'sent' });

			} catch (e) {
				res.json({ status: 200, data: 'failed' });
			}

			/*
			mail.sendMail(config.mail.from,config.mail.to,"CEDCD Website Contact Us Message", "", message_text, function(data){
				if(data){
					message_text = ejs.render(config.email_contact_recieved,{});
					mail.sendMail(config.mail.from,email,"CEDCD Website Recieved Email Message", "", message_text, function(data_1){
						if(data_1){
							res.json({status:200,data:'sent'});
						}
						else{
							res.json({status:200,data:'failed'});
						}
					});
				}
				else{
					res.json({status:200,data:'failed'});
				}
				
			});*/
		}
		else {
			res.json({ status: 200, data: 'failed' });
		}
	});

});

router.get('/download/:acronym/:filename', function (req, res, next) {
	let filename = req.params.filename;
	let filePath = path.format({
		dir: config.file_path + '/' + req.params.acronym,
		base: filename
	});
	fs.readFile(filePath, function (err, data) {
		res.contentType("application/pdf");
		res.send(data);
	});
});



router.post('/export/home', function (req, res) {
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "cohortselect_" + ds + ".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Cohort_Selection"] = {};
	let website = "";
	if (config.env == 'prod') {
		website = "cedcd.nci.nih.gov";
	}
	else {
		website = "cedcd-" + config.env + ".nci.nih.gov";
	}
	data.list["Cohort_Selection"].header = [["Cohort Data Export Generated from the CEDCD Website (" + website + ")"],
	["Table Name:", "Cohort Selection"],
	["Export Date:", dt],
	[],
	[]];
	let body = req.body;
	let searchText = body.searchText || "";
	if (searchText == "") {
		data.list["Criteria"].header = [["Search Text:"]
		];
	}
	else {
		data.list["Criteria"].header = [["Search Text:", searchText]
		];
	}

	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let func = "cohort_published";
	let params = [searchText];
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
			results[0].forEach(function (entry) {
				entry.update_time = moment(entry.update_time).format("MM/DD/YYYY");
			});
			data.list["Cohort_Selection"].rows = results[0];
		}
		else {
			data.list["Cohort_Selection"].rows = [];
		}
		res.json({ status: 200, data: data });
	});

});

router.post('/export/select', function (req, res) {
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "cohortselect_" + ds + ".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Cohort_Selection"] = {};
	let website = "";
	if (config.env == 'prod') {
		website = "cedcd.nci.nih.gov";
	}
	else {
		website = "cedcd-" + config.env + ".nci.nih.gov";
	}
	data.list["Cohort_Selection"].header = [["Cohort Data Export Generated from the CEDCD Website (" + website + ")"],
	["Table Name:", "Cohort Selection"],
	["Export Date:", dt],
	[],
	[]];

	let body = req.body;
	let filter = body.filter || {};
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let func = "cohort_select";
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

	if (filter.collect.data.length > 0) {
		params.push(filter.collect.data.toString());
	}
	else {
		params.push("");
	}

	if (filter.collect.specimen.length > 0) {

		let specimen_columns = [];
		filter.collect.specimen.forEach(function (cs) {
			specimen_columns.push(config.collected_specimen[cs]);
		});
		params.push(specimen_columns.toString());
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

	data.list["Criteria"].header = [];
	if (filter.participant.gender.length !== 0 || filter.participant.race.length !== 0 || filter.participant.ethnicity.length !== 0 || filter.participant.age.length !== 0) {
		data.list["Criteria"].header.push(["[Type of participant]"]);
		if (filter.participant.gender.length !== 0) {
			let genders = cache.getValue("lookup:gender");
			let dict = {};
			genders.forEach(function (g) {
				dict[g.id] = g.gender;
			});
			data.list["Criteria"].header.push(["Gender:"]);
			filter.participant.gender.forEach(function (g) {
				data.list["Criteria"].header.push([" - " + dict[g]]);
			});
		}
		if (filter.participant.race.length !== 0) {
			let races = cache.getValue("lookup:race");
			let dict = {};
			races.forEach(function (r) {
				dict[r.id] = r.race;
			});
			data.list["Criteria"].header.push(["Race:"]);
			filter.participant.race.forEach(function (r) {
				data.list["Criteria"].header.push([" - " + dict[r]]);
			});
		}
		if (filter.participant.ethnicity.length !== 0) {
			let ethnicities = cache.getValue("lookup:ethnicity");
			let dict = {};
			ethnicities.forEach(function (eth) {
				dict[eth.id] = eth.ethnicity;
			});
			data.list["Criteria"].header.push(["Ethnicity:"]);
			filter.participant.ethnicity.forEach(function (e) {
				data.list["Criteria"].header.push([" - " + dict[e]]);
			});
		}
		if (filter.participant.age.length !== 0) {
			data.list["Criteria"].header.push(["Age:"]);
			filter.participant.age.forEach(function (a) {
				data.list["Criteria"].header.push([" - " + a]);
			});
		}
	}
	if (filter.collect.data.length !== 0 || filter.collect.specimen.length !== 0 || filter.collect.cancer.length !== 0) {
		data.list["Criteria"].header.push(["[Data and Specimens Collected]"]);
		if (filter.collect.data.length !== 0) {
			let categories = cache.getValue("lookup:data_category");
			let dict = {};
			categories.forEach(function (d) {
				dict[d.id] = d.data_category + (d.sub_category ? ": " + d.sub_category : "");
			});
			data.list["Criteria"].header.push(["Data Collected:"]);
			filter.collect.data.forEach(function (d) {
				data.list["Criteria"].header.push([" - " + dict[d]]);
			});
		}
		if (filter.collect.specimen.length !== 0) {
			data.list["Criteria"].header.push(["Specimens Collected:"]);
			filter.collect.specimen.forEach(function (s) {
				data.list["Criteria"].header.push([" - " + s]);
			});
		}
		if (filter.collect.cancer.length !== 0) {
			let cancers = cache.getValue("lookup:cancer");
			let dict = {};
			cancers.forEach(function (c) {
				dict[c.id] = c.cancer;
			});
			data.list["Criteria"].header.push(["Cancers Collected:"]);
			filter.collect.cancer.forEach(function (c) {
				data.list["Criteria"].header.push([" - " + dict[c]]);
			});
		}
	}
	if (filter.study.state.length !== 0) {
		data.list["Criteria"].header.push(["[Study Design]"]);
		data.list["Criteria"].header.push(["Eligible Disease State:"]);
		filter.study.state.forEach(function (s) {
			data.list["Criteria"].header.push([" - " + s]);
		});
	}

	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			results[0].forEach(function (entry) {
				entry.update_time = moment(entry.update_time).format("MM/DD/YYYY");
			});
			data.list["Cohort_Selection"].rows = results[0];
		}
		else {
			data.list["Cohort_Selection"].rows = [];
		}
		res.json({ status: 200, data: data });
	});
});

router.post('/export/advancedSelect', function (req, res) {
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "cohortselect_" + ds + ".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Cohort_Selection"] = {};
	let website = "";
	if (config.env == 'prod') {
		website = "cedcd.nci.nih.gov";
	}
	else {
		website = "cedcd-" + config.env + ".nci.nih.gov";
	}
	data.list["Cohort_Selection"].header = [["Cohort Data Export Generated from the CEDCD Website (" + website + ")"],
	["Table Name:", "Cohort Selection"],
	["Export Date:", dt],
	[],
	[]];


	let body = req.body;
	let advancedFilter = body.advancedFilter || {};
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
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

	if (advancedFilter.data.length > 0) {
		params.push(advancedFilter.data.toString());
	}
	else {
		params.push("");
	}

	if (advancedFilter.specimen.length > 0) {

		let specimen_columns = [];
		advancedFilter.specimen.forEach(function (cs) {
			specimen_columns.push(config.collected_specimen[cs]);
		});
		params.push(specimen_columns.toString());
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

	if (advancedFilter.booleanOperationBetweenField.length > 0) {
		params.push(advancedFilter.booleanOperationBetweenField.toString());
	}
	else {
		params.push("");
	}

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

	data.list["Criteria"].header = [];
	if (advancedFilter.gender.length !== 0 || advancedFilter.race.length !== 0 || advancedFilter.ethnicity.length !== 0 || advancedFilter.age.length !== 0) {
		data.list["Criteria"].header.push(["[Type of participant]"]);
		if (advancedFilter.gender.length !== 0) {
			let genders = cache.getValue("lookup:gender");
			let dict = {};
			genders.forEach(function (g) {
				dict[g.id] = g.gender;
			});
			let str = [];
			str.push(advancedFilter.booleanOperationBetweenField[0]);
			str.push("Gender");
			str.push("=");

			let tmp = [];
			advancedFilter.gender.forEach(function (g) {
				tmp.push(dict[g]);
			});
			str.push(tmp.join(" OR "));
			data.list["Criteria"].header.push(str);
		}
		if (advancedFilter.race.length !== 0) {
			let races = cache.getValue("lookup:race");
			let dict = {};
			races.forEach(function (r) {
				dict[r.id] = r.race;
			});
			let str = [];
			str.push(advancedFilter.booleanOperationBetweenField[3]);
			str.push("Race");
			str.push("=");
			let tmp = [];

			advancedFilter.race.forEach(function (r) {
				//data.list["Criteria"].header.push([" - "+dict[r]]);
				tmp.push(dict[r]);
			});
			str.push(tmp.join(" OR "));
			data.list["Criteria"].header.push(str);
		}
		if (advancedFilter.ethnicity.length !== 0) {
			let ethnicities = cache.getValue("lookup:ethnicity");
			let dict = {};
			ethnicities.forEach(function (eth) {
				dict[eth.id] = eth.ethnicity;
			});

			let str = [];
			str.push(advancedFilter.booleanOperationBetweenField[4]);
			str.push("Ethnicity");
			str.push("=");
			let tmp = [];

			advancedFilter.ethnicity.forEach(function (e) {
				//data.list["Criteria"].header.push([" - "+dict[r]]);
				tmp.push(dict[e]);
			});
			str.push(tmp.join(" OR "));
			data.list["Criteria"].header.push(str);
		}
		if (advancedFilter.age.length !== 0) {
			let str = [];
			str.push(advancedFilter.booleanOperationBetweenField[1]);
			str.push("Age");
			str.push("=");
			let tmp = [];

			advancedFilter.age.forEach(function (a) {
				tmp.push(a);
			});
			str.push(tmp.join(" OR "));
			data.list["Criteria"].header.push(str);
		}
	}
	if (advancedFilter.data.length !== 0 || advancedFilter.specimen.length !== 0 || advancedFilter.cancer.length !== 0) {
		data.list["Criteria"].header.push(["[Data and Specimens Collected]"]);
		if (advancedFilter.data.length !== 0) {
			let categories = cache.getValue("lookup:data_category");
			let dict = {};
			categories.forEach(function (d) {
				dict[d.id] = d.data_category + (d.sub_category ? ": " + d.sub_category : "");
			});

			let str = [];
			str.push(advancedFilter.booleanOperationBetweenField[5]);
			str.push("Data Collected");
			str.push("=");
			let tmp = [];

			advancedFilter.data.forEach(function (d) {
				tmp.push(dict[d]);
			});
			str.push(tmp.join(" " + advancedFilter.booleanOperationWithInField[5] + " "));
			data.list["Criteria"].header.push(str);
		}
		if (advancedFilter.specimen.length !== 0) {
			let str = [];
			str.push(advancedFilter.booleanOperationBetweenField[6]);
			str.push("Specimens Collected");
			str.push("=");
			let tmp = [];

			advancedFilter.specimen.forEach(function (s) {
				tmp.push(s);
			});
			str.push(tmp.join(" " + advancedFilter.booleanOperationWithInField[6] + " "));
			data.list["Criteria"].header.push(str);
		}
		if (advancedFilter.cancer.length !== 0) {
			let cancers = cache.getValue("lookup:cancer");
			let dict = {};
			cancers.forEach(function (c) {
				dict[c.id] = c.cancer;
			});
			let str = [];
			str.push(advancedFilter.booleanOperationBetweenField[7]);
			str.push("Cancers Collected");
			str.push("=");
			let tmp = [];

			advancedFilter.cancer.forEach(function (c) {
				tmp.push(dict[c]);
			});
			str.push(tmp.join(" " + advancedFilter.booleanOperationWithInField[7] + " "));
			data.list["Criteria"].header.push(str);
		}
	}
	if (advancedFilter.state.length !== 0) {
		data.list["Criteria"].header.push(["[Study Design]"]);
		let str = [];
		str.push(advancedFilter.booleanOperationBetweenField[3]);
		str.push("Eligible Disease State");
		str.push("=");
		let tmp = [];

		advancedFilter.state.forEach(function (s) {
			tmp.push(s);
		});
		str.push(tmp.join(" OR "));
		data.list["Criteria"].header.push(str);
	}

	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			results[0].forEach(function (entry) {
				entry.update_time = moment(entry.update_time).format("MM/DD/YYYY");
			});
			data.list["Cohort_Selection"].rows = results[0];
		}
		else {
			data.list["Cohort_Selection"].rows = [];
		}
		res.json({ status: 200, data: data });
	});
});


router.post('/export/enrollment', function (req, res) {
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "enrollment_" + ds + ".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Enrollment_Counts"] = {};
	let website = "";
	if (config.env == 'prod') {
		website = "cedcd.nci.nih.gov";
	}
	else {
		website = "cedcd-" + config.env + ".nci.nih.gov";
	}
	data.list["Enrollment_Counts"].header = [["Cohort Data Export Generated from the CEDCD Website (" + website + ")"],
	["Table Name:", "Enrollment Counts"],
	["Export Date:", dt],
	[],
	[]];
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
			let lcache = {};
			let cohorts = [];
			let list = results[0];
			let male_rows = [];
			let female_rows = [];
			let unknown_rows = [];
			list.forEach(function (l) {

				if (lcache[l.u_id] == null) {
					lcache[l.u_id] = {};
					lcache[l.u_id].gender = l.gender;
					lcache[l.u_id].Ethnicity = l.ethnicity;
					lcache[l.u_id].Race = l.race;
					lcache[l.u_id].total = 0;
				}
				if (cohorts.indexOf(l.cohort_acronym) == -1) {
					cohorts.push(l.cohort_acronym);
				}
				let tmp = lcache[l.u_id];
				let count = 0;
				if (l.enrollment_counts == -1) {
					tmp[l.cohort_acronym] = "N/P";
					count = 0;
				}
				else {
					tmp[l.cohort_acronym] = l.enrollment_counts;
					count = l.enrollment_counts;
				}

				tmp.total += count;
			});

			for (key in lcache) {
				let dict = lcache[key];
				if (dict.gender === "Male") {
					male_rows.push(dict);
				}
				else if (dict.gender === "Female") {
					female_rows.push(dict);
				}
				else {
					unknown_rows.push(dict);
				}
			}

			data.list["Enrollment_Counts"].sections = [];
			if (male_rows.length > 0) {
				let tmp = {};
				tmp.header = [["Enrollment: Males"]];
				tmp.rows = male_rows;
				data.list["Enrollment_Counts"].sections.push(tmp);
			}
			if (female_rows.length > 0) {
				let tmp = {};
				tmp.header = [["Enrollment: Females"]];
				tmp.rows = female_rows;
				data.list["Enrollment_Counts"].sections.push(tmp);
			}
			if (unknown_rows.length > 0) {
				let tmp = {};
				tmp.header = [["Enrollment: Unknown"]];
				tmp.rows = unknown_rows;
				data.list["Enrollment_Counts"].sections.push(tmp);
			}

			data.list["Criteria"].header = [];
			if (filter.gender.length !== 0) {
				let genders = cache.getValue("lookup:gender");
				let dict = {};
				genders.forEach(function (g) {
					dict[g.id] = g.gender;
				});
				data.list["Criteria"].header.push(["Gender:"]);
				filter.gender.forEach(function (g) {
					data.list["Criteria"].header.push([" - " + dict[g]]);
				});
			}
			if (filter.race.length !== 0) {
				let races = cache.getValue("lookup:race");
				let dict = {};
				races.forEach(function (r) {
					dict[r.id] = r.race;
				});
				data.list["Criteria"].header.push(["Race:"]);
				filter.race.forEach(function (r) {
					data.list["Criteria"].header.push([" - " + dict[r]]);
				});
			}
			if (filter.ethnicity.length !== 0) {
				let ethnicities = cache.getValue("lookup:ethnicity");
				let dict = {};
				ethnicities.forEach(function (e) {
					dict[e.id] = e.ethnicity;
				});
				data.list["Criteria"].header.push(["Ethnicity:"]);
				filter.ethnicity.forEach(function (e) {
					data.list["Criteria"].header.push([" - " + dict[e]]);
				});
			}
			if (filter.cohort.length !== 0) {
				data.list["Criteria"].header.push(["Cohorts:"]);
				cohorts.forEach(function (c) {
					data.list["Criteria"].header.push([" - " + c]);
				});
			}
		}
		else {
			data.list["Enrollment_Counts"].sections = [];
			data.list["Criteria"].header = [
				["Gender:"],
				["Race:"],
				["Ethnicity:"],
				["Cohorts:"]
			];
		}
		res.json({ status: 200, data: data });
	});
});

router.post('/export/cancer', function (req, res) {
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "cancer_" + ds + ".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Cancer_Counts"] = {};
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

	let website = "";
	if (config.env == 'prod') {
		website = "cedcd.nci.nih.gov";
	}
	else {
		website = "cedcd-" + config.env + ".nci.nih.gov";
	}
	data.list["Cancer_Counts"].header = [["Cohort Data Export Generated from the CEDCD Website (" + website + ")"],
	["Table Name:", "Cancer Counts"],
	["Export Date:", dt]];
	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let dt = [];
			let list = results[0];
			let lcache = {};
			let cohorts = [];
			list.forEach(function (l) {

				if (lcache[l.u_id] == null) {
					lcache[l.u_id] = {};
					lcache[l.u_id].Cancer = l.cancer;
					lcache[l.u_id].Gender = l.gender;
				}
				if (cohorts.indexOf(l.cohort_acronym) == -1) {
					cohorts.push(l.cohort_acronym);
				}
				let tmp = cache[l.u_id];
				if (l.cancer_counts == -1) {
					tmp[l.cohort_acronym] = "N/P";
				}
				else {
					tmp[l.cohort_acronym] = l.cancer_counts;
				}
			});

			for (key in lcache) {
				dt.push(lcache[key]);
			}

			data.list["Cancer_Counts"].rows = dt;

			data.list["Cancer_Counts"].header.push([]);
			data.list["Cancer_Counts"].header.push([]);
			data.list["Criteria"].header = [];
			if (filter.gender.length !== 0) {
				let genders = cache.getValue("lookup:gender");
				let dict = {};
				genders.forEach(function (g) {
					dict[g.id] = g.gender;
				});
				data.list["Criteria"].header.push(["Gender:"]);
				filter.gender.forEach(function (g) {
					data.list["Criteria"].header.push([" - " + g]);
				});
			}
			if (filter.cancer.length !== 0) {
				let cancers = cache.getValue("lookup:cancer");
				let dict = {};
				cancers.forEach(function (c) {
					dict[c.id] = c.cancer;
				});
				data.list["Criteria"].header.push(["Cancer Type:"]);
				filter.cancer.forEach(function (c) {
					data.list["Criteria"].header.push([" - " + dict[c]]);
				});
			}
			if (filter.cohort.length !== 0) {
				data.list["Criteria"].header.push(["Cohorts:"]);
				cohorts.forEach(function (c) {
					data.list["Criteria"].header.push([" - " + c]);
				});
			}
		}
		else {
			data.list["Cancer_Counts"].rows = [];
			data.list["Cancer_Counts"].header.push([]);
			data.list["Cancer_Counts"].header.push([]);
			data.list["Criteria"].header = [["Gender:"],
			["Cancer Type:"],
			["Cohorts:"]
			];
		}
		res.json({ status: 200, data: data });
	});

});

router.post('/export/biospecimen', function (req, res) {
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "biospecimen_" + ds + ".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Biospecimen_Counts"] = {};
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

	let website = "";
	if (config.env == 'prod') {
		website = "cedcd.nci.nih.gov";
	}
	else {
		website = "cedcd-" + config.env + ".nci.nih.gov";
	}
	data.list["Biospecimen_Counts"].header = [["Cohort Data Export Generated from the CEDCD Website (" + website + ")"],
	["Table Name:", "Biospecimen Counts"],
	["Export Date:", dt]];
	mysql.callProcedure(func, params, function (results) {
		if (results && results[0] && results[0].length > 0) {
			let dt = [];
			let list = results[0];
			let lcache = {};
			let cohorts = [];
			list.forEach(function (l) {

				if (lcache[l.u_id] == null) {
					lcache[l.u_id] = {};
					lcache[l.u_id].Cancer = l.cancer;
					lcache[l.u_id]["Specimens Type"] = l.specimen;
				}
				if (cohorts.indexOf(l.cohort_acronym) == -1) {
					cohorts.push(l.cohort_acronym);
				}
				let tmp = cache[l.u_id];
				if (l.specimens_counts == -1) {
					tmp[l.cohort_acronym] = "N/P";
				}
				else {
					tmp[l.cohort_acronym] = l.specimens_counts;
				}
			});

			for (key in lcache) {
				dt.push(lcache[key]);
			}

			data.list["Biospecimen_Counts"].rows = dt;

			data.list["Biospecimen_Counts"].header.push([]);
			data.list["Biospecimen_Counts"].header.push([]);
			data.list["Criteria"].header = [];
			if (filter.specimen.length !== 0) {
				data.list["Criteria"].header.push(["Specimen Type:"]);
				filter.specimen.forEach(function (s) {
					data.list["Criteria"].header.push([" - " + s]);
				});
			}
			if (filter.cancer.length !== 0) {
				data.list["Criteria"].header.push(["Cancer Type:"]);
				filter.cancer.forEach(function (c) {
					data.list["Criteria"].header.push([" - " + c]);
				});
			}
			if (filter.cohort.length !== 0) {
				data.list["Criteria"].header.push(["Cohorts:"]);
				cohorts.forEach(function (c) {
					data.list["Criteria"].header.push([" - " + c]);
				});
			}
		}
		else {
			data.list["Biospecimen_Counts"].rows = [];
			data.list["Biospecimen_Counts"].header.push([]);
			data.list["Biospecimen_Counts"].header.push([]);
			data.list["Criteria"].header = [["Specimen Type:"],
			["Cancer Type:"],
			["Cohorts:"]
			];
		}
		res.json({ status: 200, data: data });
	});

});

module.exports = router;
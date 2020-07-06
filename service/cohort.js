var EnrollmentFunctions = require('./EnrollmentFunctions');
var express = require('express');
var router = express.Router();
var mysql = require('../components/mysql');
var cache = require('../components/cache');
var config = require('../config');
var logger = require('../components/logger');
var basicInfoController = require('./details/basicInfoController');
var baselineController = require('./details/baselineController');
var followupController = require('./details/followupController');
var cancerController = require('./details/cancerController');
var mortalityController = require('./details/mortalityController');
var linkagesController = require('./details/linkagesController');
var specimenController = require('./details/specimenController');

router.post('/list', function(req, res) {
	let body = req.body;
	//let searchText = body.searchText || "";
	let func = "cohort_list";
	let params = [];

	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			let dt = {};
			dt.list = results[0];
			dt.total = dt.list.length;
			res.json({status:200, data:dt});
		}
		else{
			res.json({status:200, data:{list:[],total:0}});
		}
	});
});



router.post('/lookup', function(req, res) {
	let body = req.body;
	let category = body.category || "";
	let info = cache.getValue("lookup:"+category);
	
	res.json({status:200, data:{list: info}});
	
});

router.post('/select', function(req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let func = "cohort_select";
	let params = [];
	//form filter into Strings
	
	if(filter.participant.gender.length > 0){
		params.push(filter.participant.gender.toString());
	}
	else{
		params.push("");
	}

	if(filter.participant.race.length > 0){
		params.push(filter.participant.race.toString());
	}
	else{
		params.push("");
	}

	if(filter.participant.ethnicity.length > 0){
		params.push(filter.participant.ethnicity.toString());
	}
	else{
		params.push("");
	}

	if(filter.participant.age.length > 0){
		params.push(filter.participant.age.toString());
	}
	else{
		params.push("");
	}

	if(filter.study.state.length > 0){
		let state_columns = [];
		filter.study.state.forEach(function(ss){
			state_columns.push(config.eligible_disease_state[ss]);
		});
		params.push(state_columns.toString());
	}
	else{
		params.push("");
	}

	if(filter.collect.data.length > 0){
		params.push(filter.collect.data.toString());
	}
	else{
		params.push("");
	}

	if(filter.collect.specimen.length > 0){

		let specimen_columns = [];
		filter.collect.specimen.forEach(function(cs){
			specimen_columns.push(config.collected_specimen[cs]);
		});
		params.push(specimen_columns.toString());
	}
	else{
		params.push("");
	}

	if(filter.collect.cancer.length > 0){
		params.push(filter.collect.cancer.toString());
	}
	else{
		params.push("");
	}
	
	if(orderBy){
		params.push(orderBy.column);
		params.push(orderBy.order);
	}
	else{
		params.push("");
		params.push("");
	}

	if(paging && paging.page != 0){
		params.push((paging.page-1) * paging.pageSize);
		params.push(paging.pageSize);
	}
	else{
		params.push(-1);
		params.push(-1);
	}

	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			let dt = {};
			dt.list = results[0];
			dt.total = results[1][0].total;
			res.json({status:200, data:dt});
		}
		else{
			res.json({status:200, data:{list:[],total:0}});
		}
	});
});

router.post('/advancedSelect', function(req, res) {
	let body = req.body;
	let selectionList = body.selectionList || {};
	let items = body.items || {};
	let booleanStates = body.booleanStates || {};
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let func = "cohort_select";
	let params = [];
	let first = true;
	
	//Begin the sql string builder
	let sql = 'select sql_calc_found_rows cohort_id,cohort_name, cohort_acronym,cohort_web_site,update_time,race_total_total from cohort_summary where 1=1 ';
	
	//For each item in the list, of selected values, add something to the sql query
	for(let i = 0; i < selectionList.length; i++){

		let currItem = items[i];
		let currState = booleanStates[i];
		if(first == true){
			currState = "AND"
		}
		
		let currSelection = selectionList[i];

		//For eligible_gender, 
		//1 = male
		//2 = female
		//0 = male AND female
		//Gender, Race, and Ethnicity all use the getEnrollmentInfo which basically gathers together the different combinations of the races, genders, and ethinicities given
		if(currItem == "Gender"){
			let toAdd = "";
			if(currSelection.includes("Male")){
				if(currSelection.includes("Female")){
					toAdd += " eligible_gender in (0,1,2) ";
				}
				else{
					toAdd += " eligible_gender in (0,2) ";
				}
			}
			else if(currSelection.includes("Female")){
				toAdd += "eligible_gender in (0,1) ";
			}
			else{
				toAdd += "";
			}
			enrollmentInfo = EnrollmentFunctions.getEnrollmentInfo(currSelection,[],[]);
			let tempString = "";
			for(let a = 0; a < enrollmentInfo.length; a++){
				tempString += " " + enrollmentInfo[a] + " > 0 ";
				if(a != enrollmentInfo.length - 1){
					tempString += " or ";
				}
			}
			if(tempString != "" && toAdd != ""){
				sql += " " + currState + " (" + toAdd + " and (" + tempString + ")) ";
				first = false;
			}
			else if(tempString == "" && toAdd != ""){
				sql += " " + currState + " ( " + toAdd + ") ";
				first = false;
			}
			else if(tempString != "" && toAdd == ""){
				sql += " " + currState + " (" + tempString + ") "
				first = false;
			}
		}
		else if(currItem == "Race"){
			enrollmentInfo = EnrollmentFunctions.getEnrollmentInfo([],currSelection,[]);
			let tempString = "";
			for(let a = 0; a < enrollmentInfo.length; a++){
				tempString += " " + enrollmentInfo[a] + " > 0 ";
				if(a != enrollmentInfo.length - 1){
					tempString += " or ";
				}
			}
			if(tempString != ""){
				sql += " " + currState + " (" + tempString + ") "
				first = false;
			}

		}
		else if(currItem == "Ethnicity"){
			enrollmentInfo = EnrollmentFunctions.getEnrollmentInfo([],[],currSelection);
			let tempString = "";
			for(let a = 0; a < enrollmentInfo.length; a++){
				tempString += " " + enrollmentInfo[a] + " > 0 ";
				if(a != enrollmentInfo.length - 1){
					tempString += " or ";
				}
			}
			if(tempString != ""){
				sql += " " + currState + " (" + tempString + ") "
				first = false;
			}

		}

		//Basically keeps reading in age selections and adds them to the sql query depending on what values are given
		else if(currItem == "Age"){
			let tempString = "";
			for(let a = 0; a < currSelection.length; a++){
				let curr = currSelection[a]; 
				if(curr == "0-14"){
					tempString += " enrollment_age_min <= 14 ";
				}
				else if(curr == "15-19"){
					tempString += " ((enrollment_age_min >= 15 and enrollment_age_min <= 19) or (enrollment_age_max >= 15 and enrollment_age_max <= 19) or (enrollment_age_min <= 15 and enrollment_age_max >= 19)) ";
				}
				else if(curr == "20-24"){
					tempString += " ((enrollment_age_min >= 20 and enrollment_age_min <= 24) or (enrollment_age_max >= 20 and enrollment_age_max <= 24) or (enrollment_age_min <= 20 and enrollment_age_max >= 24)) ";
				}
				else if(curr == "25-29"){
					tempString += " ((enrollment_age_min >= 25 and enrollment_age_min <= 29) or (enrollment_age_max >= 25 and enrollment_age_max <= 29) or (enrollment_age_min <= 25 and enrollment_age_max >= 29)) ";
				}
				else if(curr == "30-34"){
					tempString += " ((enrollment_age_min >= 30 and enrollment_age_min <= 34) or (enrollment_age_max >= 30 and enrollment_age_max <= 34) or (enrollment_age_min <= 30 and enrollment_age_max >= 34)) ";
				}
				else if(curr == "35-39"){
					tempString += " ((enrollment_age_min >= 35 and enrollment_age_min <= 39) or (enrollment_age_max >= 35 and enrollment_age_max <= 39) or (enrollment_age_min <= 35 and enrollment_age_max >= 39)) ";
				}
				else if(curr == "40-44"){
					tempString += " ((enrollment_age_min >= 40 and enrollment_age_min <= 44) or (enrollment_age_max >= 40 and enrollment_age_max <= 44) or (enrollment_age_min <= 40 and enrollment_age_max >= 44)) ";
				}
				else if(curr == "45-49"){
					tempString += " ((enrollment_age_min >= 45 and enrollment_age_min <= 49) or (enrollment_age_max >= 45 and enrollment_age_max <= 49) or (enrollment_age_min <= 45 and enrollment_age_max >= 49)) ";
				}
				else if(curr == "50-54"){
					tempString += " ((enrollment_age_min >= 50 and enrollment_age_min <= 54) or (enrollment_age_max >= 50 and enrollment_age_max <= 54) or (enrollment_age_min <= 50 and enrollment_age_max >= 54)) ";
				}
				else if(curr == "55-59"){
					tempString += " ((enrollment_age_min >= 55 and enrollment_age_min <= 59) or (enrollment_age_max >= 55 and enrollment_age_max <= 59) or (enrollment_age_min <= 55 and enrollment_age_max >= 59)) ";
				}
				else if(curr == "60-64"){
					tempString += " ((enrollment_age_min >= 60 and enrollment_age_min <= 64) or (enrollment_age_max >= 60 and enrollment_age_max <= 64) or (enrollment_age_min <= 60 and enrollment_age_max >= 64)) ";
				}
				else if(curr == "65-69"){
					tempString += " ((enrollment_age_min >= 65 and enrollment_age_min <= 69) or (enrollment_age_max >= 65 and enrollment_age_max <= 69) or (enrollment_age_min <= 65 and enrollment_age_max >= 69)) ";
				}
				else if(curr == "70-74"){
					tempString += " ((enrollment_age_min >= 70 and enrollment_age_min <= 74) or (enrollment_age_max >= 70 and enrollment_age_max <= 74) or (enrollment_age_min <= 70 and enrollment_age_max >= 74)) ";
				}
				else if(curr == "75-79"){
					tempString += " ((enrollment_age_min >= 75 and enrollment_age_min <= 79) or (enrollment_age_max >= 75 and enrollment_age_max <= 79) or (enrollment_age_min <= 75 and enrollment_age_max >= 79)) ";
				}
				else if(curr == "80-85+"){
					tempString += " (enrollment_age_min >= 80) "
				}
				else{
					tempString += "";
				}
				if(a != currSelection.length - 1){
					tempString += " or ";
				}

			}
			if(tempString != ""){
				sql += " " + currState + " (" + tempString + ") ";
				first = false;
			}
			

		}

		//Adds both male or female to the search query
		else if(currItem == "Cancers"){
			let tempString = "";
			for(let a = 0; a < currSelection.length; a++){
				let cancerType = config.cancer[currSelection[a]];
				tempString += " ci_" + cancerType + "_male > 0 ";
				tempString += " or ci_" + cancerType + "_female > 0 ";
				if(a != currSelection.length - 1){
					tempString += " or ";
				}
			}
			if(tempString != ""){
				sql += " " + currState + " (" + tempString + ") ";
				first = false;
			}
		}

		//Just adds all of the selected categories selected to the query
		else if(currItem == "Categories"){
			let tempString = "";
			for(let a = 0; a < currSelection.length; a++){
				let dataType = config.collected_data[currSelection[a]];
				let data = dataType.split(",");
				for(let b = 0; b < data.length; b++){
					tempString += " " + data[b] + " = 1 ";
					if(a != currSelection.length - 1 || b != data.length-1){
						tempString += " or ";
					}
				}
			}
			if(tempString != ""){
				sql += " " + currState + " (" + tempString + ") ";
				first = false;
			}
			
		}
		
		//Adds all of the selected biospecimens to the query
		else if(currItem == "Biospecimen"){
			let tempString = "";
			for(let a = 0; a < currSelection.length; a++){
				let specimenType = config.collected_specimen[currSelection[a]];
				let specimen = specimenType.split(",");
				for(let b = 0; b < specimen.length; b++){
					tempString += " " + specimen[b] + " = 1 ";
					if(a != currSelection.length - 1 || b != specimen.length-1){
						tempString += " or ";
					}
				}
				
			}
			if(tempString != ""){
				sql += " " + currState + " (" + tempString + ") ";
				first = false;
			}
			
		}

		//Adds all of the selected states to the query
		else if(currItem == "State"){
			let tempString = "";
			for(let a = 0; a < currSelection.length; a++){
				tempString += " " + config.eligible_disease_state[currSelection[a]] + " ";
				if(a != currSelection.length - 1){
					tempString += ", "
				}
			}
			if(tempString != ""){
				sql += " " + currState + " eligible_disease in (" + tempString + ") ";
				first = false;
			}
		}

	}

	//Adds the order by part to the sql query
	let orderString = "";

	if(orderBy){

		orderString += " order by " + orderBy.column + " " + orderBy.order, " ";

	}
	else{
		
		orderString += " order by cohort_name asc "

	}

	//Sends what page we are on and how large the pages are supposed to be
	let pagingString = "";
	let pIndex = (paging.page-1) * paging.pageSize
	if(paging && paging.page != 0){
		pagingString += " limit " + pIndex + " , " + paging.pageSize + " ";
	}
	else{
		pagingString += "";
	}

	sql += " " + orderString + " " + pagingString + " ";

	sql += ';'
	params = [];
	params.push(sql);
	logger.debug(sql);
	func = "advanced_cohort_select";

	//Calls the advanced_cohort_select procedures - just runs the query given
	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			let dt = {};
			dt.list = results[0];
			dt.total = results[1][0].total;
			res.json({status:200, data:dt});
		}
		else{
			res.json({status:200, data:{list:[],total:0}});
		}
	});
});

router.post('/enrollment', function(req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let func = "select_enrollment_counts";
	let params = [];
	//form filter into Strings

	if(filter.gender.length > 0){
		params.push(filter.gender.toString());
	}
	else{
		params.push("");
	}

	if(filter.race.length > 0){
		params.push(filter.race.toString());
	}
	else{
		params.push("");
	}

	if(filter.ethnicity.length > 0){
		params.push(filter.ethnicity.toString());
	}
	else{
		params.push("");
	}

	if(filter.cohort.length > 0){
		params.push(filter.cohort.toString());
	}
	else{
		params.push("");
	}
	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			let dt = {};
			let cache = {};
			dt.list = [];
			dt.cohorts = [];
			let cohorts = [];
			let list = results[0];
			list.forEach(function(l){

				if(cache[l.u_id] == null){
					cache[l.u_id] = {};
					cache[l.u_id].c0 = l.gender;
					cache[l.u_id].c1 = l.ethnicity;
					cache[l.u_id].c2 = l.race;
					cache[l.u_id].total = 0;
				}
				if(cohorts.indexOf(l.cohort_id) == -1){
					cohorts.push(l.cohort_id);
					dt.cohorts.push({
						cohort_id:l.cohort_id,
						cohort_name: l.cohort_name,
						cohort_acronym:l.cohort_acronym
					});

				}
				let tmp = cache[l.u_id];
				let count = 0;
				if(l.enrollment_counts == -1){
					tmp["c_"+l.cohort_id] = "N/P";
					count = 0;
				}
				else{
					tmp["c_"+l.cohort_id] = l.enrollment_counts;
					count = l.enrollment_counts;
				}
				
				tmp.total += count;
			});

			for(key in cache){
				dt.list.push(cache[key]);
			}
			
			res.json({status:200, data:dt});
		}
		else{
			res.json({status:200, data:{list:[]}});
		}
	});
});

router.post('/cancer', function(req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let func = "select_cancer_counts";
	let params = [];
	//form filter into Strings
	if(filter.gender.length > 0){
		params.push(filter.gender.toString());
	}
	else{
		params.push("");
	}

	

	if(filter.cancer.length > 0){
		params.push(filter.cancer.toString());
	}
	else{
		params.push("");
	}

	if(filter.cohort.length > 0){
		params.push(filter.cohort.toString());
	}
	else{
		params.push("");
	}

	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			let dt = {};
			let cache = {};
			dt.list = [];
			dt.cohorts = [];
			let cohorts = [];
			let list = results[0];
			list.forEach(function(l){

				if(cache[l.u_id] == null){
					cache[l.u_id] = {};
					cache[l.u_id].c1 = l.cancer;
					cache[l.u_id].c2 = l.gender;
				}
				if(cohorts.indexOf(l.cohort_id) == -1){
					cohorts.push(l.cohort_id);
					dt.cohorts.push({
						cohort_id:l.cohort_id,
						cohort_name: l.cohort_name,
						cohort_acronym:l.cohort_acronym
					});

				}
				let tmp = cache[l.u_id];
				if(l.cancer_counts == -1){
					tmp["c_"+l.cohort_id] = "N/P";
				}
				else{
					tmp["c_"+l.cohort_id] = l.cancer_counts;
				}
			});

			for(key in cache){
				dt.list.push(cache[key]);
			}
			
			res.json({status:200, data:dt});
		}
		else{
			res.json({status:200, data:{list:[]}});
		}
	});
});

router.post('/specimen', function(req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let func = "select_specimen_counts";
	let params = [];
	//form filter into Strings
	
	if(filter.specimen.length > 0){
		params.push(filter.specimen.toString());
	}
	else{
		params.push("");
	}

	

	if(filter.cancer.length > 0){
		params.push(filter.cancer.toString());
	}
	else{
		params.push("");
	}

	if(filter.cohort.length > 0){
		params.push(filter.cohort.toString());
	}
	else{
		params.push("");
	}

	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			let dt = {};
			let cache = {};
			dt.list = [];
			dt.cohorts = [];
			cohorts = [];
			let list = results[0];
			list.forEach(function(l){

				if(cache[l.u_id] == null){
					cache[l.u_id] = {};
					cache[l.u_id].c1 = l.specimen;
					cache[l.u_id].c2 = l.cancer;
				}
				if(cohorts.indexOf(l.cohort_id) == -1){
					cohorts.push(l.cohort_id);
					dt.cohorts.push({
						cohort_id:l.cohort_id,
						cohort_name: l.cohort_name,
						cohort_acronym:l.cohort_acronym
					});

				}
				let tmp = cache[l.u_id];
				if(l.specimens_counts == -1){
					tmp["c_"+l.cohort_id] = "N/P";
				}
				else{
					tmp["c_"+l.cohort_id] = l.specimens_counts;
				}
			});

			for(key in cache){
				dt.list.push(cache[key]);
			}
			
			res.json({status:200, data:dt});
		}
		else{
			res.json({status:200, data:{list:[]}});
		}
	});
});

router.get('/:id', function(req, res){
	let id = req.params.id;
	let info = cache.getValue("cohort:"+id);
	if(info == undefined){
		let func = "cohort_description";
		let params = [id];
		mysql.callProcedure(func,params,function(results){
			if(results && results[0] && results[0].length > 0){
				let basic = results[0][0];
				info = {};
				info.cohort_id = id;
				info.cohort_name = basic.cohort_name;
				info.cohort_acronym = basic.cohort_acronym;
				info.update_time = basic.update_time;

				let persons = results[2];
				info.pis = [];
				persons.forEach(function(p){
					if(p.category_id == 3){
						let tmp = {};
						tmp.id = p.id;
						tmp.name = p.name;
						tmp.institution = p.institution;
						info.pis.push(tmp);
					}
					else if(p.category_id == 4){
						info.collab_name = p.name;
						info.collab_position = p.position;
						info.collab_phone = p.phone;
						info.collab_email = p.email;
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
				if(basic.request_procedures_web == 1){
					info.request_procedures_web_url = basic.request_procedures_web_url;
				}
				info.attachments = {};
				let attachs = results[1];
				let tmp = [[],[],[]];
				attachs.forEach(function(attach){
					let idx = attach.category >1? 2: attach.category;
					let content = attach.attachment_type == 1 ? attach.filename.trim() : attach.website.trim();
					if(tmp[idx].indexOf(content) > -1){
						return;
					}
					else{
						tmp[idx].push(content);
					}
					if(attach.category == 1){
						//cohort questionnaires
						if(info.attachments.questionnaires == undefined){
							info.attachments.questionnaires = [];
						}
						info.attachments.questionnaires.push({
							type:attach.attachment_type,
							url:attach.attachment_type == 1 ? './api/download/'+attach.filename : attach.website,
							name:attach.filename
						});
					}
					else if(attach.category == 0){
						//study protocol
						if(info.attachments.protocols == undefined){
							info.attachments.protocols = [];
						}
						info.attachments.protocols.push({
							type:attach.attachment_type,
							url:attach.attachment_type == 1 ? './api/download/'+attach.filename : attach.website,
							name:attach.filename
						});
					}
					else{
						//policies
						if(info.attachments.policies == undefined){
							info.attachments.policies = [];
						}
						info.attachments.policies.push({
							type:attach.attachment_type,
							url:attach.attachment_type == 1 ? './api/download/'+attach.filename : attach.website,
							name:attach.filename
						});
					}
				});
				cache.setValue("cohort:"+id, info, config.cohort_ttl);
			}
			res.json({status:200, data:info});
		});
	}
	else{
		logger.debug("get from cache <cohort:"+id+">");
		res.json({
			status:200,
			data:info
		});
	}
	
});

router.post('/details/basicInfo', basicInfoController.run);
router.post('/details/baseline', baselineController.run);
router.post('/details/followup', followupController.run);
router.post('/details/cancer', cancerController.run);
router.post('/details/mortality', mortalityController.run);
router.post('/details/linkages', linkagesController.run);
router.post('/details/specimen', specimenController.run);

module.exports = router;
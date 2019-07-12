var TestingFunctions = require('./TestingFunctions');
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
	let searchText = body.searchText || "";
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let func = "cohort_published";
	let params = [searchText];
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

router.post('/select', function(req, res) {
	let body = req.body;
	let filter = body.filter || {};
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let func = "cohort_select";
	let params = [];
	//form filter into Strings
	let gender;
	let race;
	let ethnicity;
	
	gender = filter.participant.gender;
	//-1:[], 2:["Male"], 1:["Female"], 0: ["Male","Female"] 
	if(gender.indexOf("Female") > -1 && gender.indexOf("Male") > -1){
		params.push(0);
	}
	else if(gender.indexOf("Female") == -1 && gender.indexOf("Male") > -1){
		params.push(2);
	}
	else if(gender.indexOf("Female") > -1 && gender.indexOf("Male") == -1){
		params.push(1);
	}
	else{
		params.push(-1)
	}
	race = filter.participant.race;
	ethnicity = filter.participant.ethnicity;
	let column_info = [];
	let ethnicity_len = ethnicity.length;
	let race_len = race.length;
	let gender_len = gender.length;
	if(ethnicity_len !== 0 || race_len !== 0 || gender_len !== 0){
		if(ethnicity_len === config.ethnicity.length && race_len === config.race.length && gender_len === config.gender.length){
			column_info.push("race_total_total");
		}
		else{
			if(race_len === config.race.length || race_len === 0){
				let prefix = "race_total_";
				if(ethnicity_len === config.ethnicity.length || ethnicity_len === 0){
					ethnicity = Object.keys(config.ethnicity);
				}
				else if(gender_len === config.gender.length || gender_len === 0){
					gender = Object.keys(config.gender);
				}
				else{
					
				}
				//go through the rest of the two arrays
				ethnicity.forEach(function(eth){
					gender.forEach(function(g){
						column_info.push(prefix + config.ethnicity[eth] + "_" + config.gender[g]);
					});
				});
			}
			else{
				if((ethnicity_len === config.ethnicity.length || ethnicity_len === 0) && 
					(gender_len === config.gender.length || gender_len === 0)){
					let surfix = "_total";
					race.forEach(function(r){
						column_info.push("race_"+config.race[r]+surfix);
					});
				}
				else if((ethnicity_len === config.ethnicity.length || ethnicity_len === 0) && 
					!(gender_len === config.gender.length || gender_len === 0)){
					ethnicity = Object.keys(config.ethnicity);
					race.forEach(function(r){
						ethnicity.forEach(function(eth){
							gender.forEach(function(g){
								column_info.push("race_" + config.race[r] + "_" + config.ethnicity[eth] + "_" + config.gender[g]);
							});
						});
					});
				}
				else if(!(ethnicity_len === config.ethnicity.length || ethnicity_len === 0) && 
					(gender_len === config.gender.length || gender_len === 0)){
					gender = Object.keys(config.gender);
					race.forEach(function(r){
						ethnicity.forEach(function(eth){
							gender.forEach(function(g){
								column_info.push("race_" + config.race[r] + "_" + config.ethnicity[eth] + "_" + config.gender[g]);
							});
						});
					});
				}
				else{
					//go through all the columns and filter out the applied ones
					race.forEach(function(r){
						ethnicity.forEach(function(eth){
							gender.forEach(function(g){
								column_info.push("race_" + config.race[r] + "_" + config.ethnicity[eth] + "_" + config.gender[g]);
							});
						});
					});
				}
			}
		}
		params.push(column_info.toString());
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
	
	if(filter.collect.cancer.length > 0){
		let cancer_column = [];
		let category = params[0];
		filter.collect.cancer.forEach(function(cc){
			if(category == -1 || category == 2){
				cancer_column.push("ci_"+config.cancer[cc]+"_male");
				cancer_column.push("ci_"+config.cancer[cc]+"_female");
			}
			else if(category == 0){
				cancer_column.push("ci_"+config.cancer[cc]+"_male");
			}
			else{
				cancer_column.push("ci_"+config.cancer[cc]+"_female");
			}
		});
		params.push(cancer_column.toString());
	}
	else{
		params.push("");
	}
	if(filter.collect.data.length > 0){
		let data_columns = [];
		filter.collect.data.forEach(function(cd){
			data_columns.push(config.collected_data[cd]);
		});
		params.push(data_columns.toString());
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

router.post('/testSelect', function(req, res) {
	let body = req.body;
	let selectionList = body.selectionList || {};
	let items = body.items || {};
	let booleanStates = body.booleanStates || {};
	let orderBy = body.orderBy || {};
	let paging = body.paging || {};
	let func = "cohort_select";
	let params = [];
	let first = true;
	//form filter into Strings

	
	let sql = 'select sql_calc_found_rows cohort_id,cohort_name, cohort_acronym,cohort_web_site,update_time,race_total_total from cohort_summary where 1=1 ';
	for(let i = 0; i < selectionList.length; i++){

		let currItem = items[i];
		let currState = booleanStates[i];
		if(first == true){
			currState = "AND"
		}
		
		let currSelection = selectionList[i];
		if(currItem == "Gender"){
			let toAdd = "";
			if(currSelection.includes("Male")){
				if(currSelection.includes("Female")){
					toAdd += " eligible_gender = 0 ";
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
			enrollmentInfo = TestingFunctions.getEnrollmentStuff(currSelection,[],[]);
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
			enrollmentInfo = TestingFunctions.getEnrollmentStuff([],currSelection,[]);
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
			enrollmentInfo = TestingFunctions.getEnrollmentStuff([],[],currSelection);
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

	let orderString = "";

	if(orderBy){

		orderString += " order by " + orderBy.column + " " + orderBy.order, " ";

	}
	else{
		
		orderString += " order by cohort_name asc "

	}

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
	func = "advanced_cohort_select";
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
	let func = "cohort_enrollment_count";
	let params = [];
	//form filter into Strings
	
	let gender;
	let race;
	let ethnicity;
	
	gender = filter.gender;
	if(gender.length == 0){
		gender = ["Male", "Female", "Other/Unknown"];
	}

	//-1:[], 2:["Male"], 1:["Female"], 0: ["Male","Female"] 
	race = filter.race;
	ethnicity = filter.ethnicity;

	if(ethnicity.length == 0){
		ethnicity = ["Hispanic/Latino",
		"Non-Hispanic/Latino",
		"Other/Unknown"];
	}

	if(race.length == 0){
		race = [
			"American Indian / Alaska Native",
			"Asian",
			"Black or African-American",
			"Native Hawaiian or Other Pacific Islander",
			"White",
			"Other/Unknown",
			"More than one race"
		];
	}

	if(filter.cohort == []){
		filter.cohort = [ 52,
			16,
			39,
			13,
			76,
			60,
			17,
			59,
			53,
			72,
			73,
			74,
			70,
			78,
			18,
			64,
			20,
			66,
			56,
			71,
			68,
			15,
			61,
			22,
			51,
			47,
			46,
			23,
			24,
			40,
			41,
			42,
			43,
			69,
			25,
			26,
			27,
			54,
			44,
			28,
			45,
			50,
			29,
			30,
			77,
			67,
			31,
			62,
			65,
			49,
			55,
			57,
			75,
			32,
			58,
			33,
			63,
			14,
			48,
			38,
			34 ];
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
			dt.list = [];
			dt.cohorts = [];
			let list = results[0];
			//parse enrollment data
			gender.forEach(function(g){
				ethnicity.forEach(function(eth){
					race.forEach(function(r){
						let column = "race_" + config.race[r] + "_" + config.ethnicity[eth] + "_" + config.gender[g];
						let tmp = {};
						let total = 0;
						tmp.c0 = g;
						tmp.c1 = eth;
						tmp.c2 = r;
						list.forEach(function(l){
							let v = l[column];
							let count = 0;
							if(l[column] == -1){
								v = "N/P";
							}
							else{
								count = l[column];
							}
							tmp["c_"+l.cohort_id] = v;
							total += count;
						});
						tmp.total = total;
						dt.list.push(tmp);
					});
				});
			});
			list.forEach(function(l){
				dt.cohorts.push({
					cohort_id:l.cohort_id,
					cohort_name:l.cohort_name,
					cohort_acronym:l.cohort_acronym
				});
			});
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
	let func = "cohort_cancer_count";
	let params = [];
	//form filter into Strings
	let gender;
	let cancer;
	
	gender = filter.gender;
	//-1:[], 2:["Male"], 1:["Female"], 0: ["Male","Female"] 
	cancer = filter.cancer;

	if(gender.length == 0){
		gender = ["Male", "Female", "Other/Unknown"];
	}
	if(cancer.length == 0){
		cancer = [
			"Bladder",
			"Bone",
			"Brain",
			"Breast",
			"Cervix",
			"Colon",
			"Corpus, body of uterus",
			"Esophagus",
			"Gall bladder and extrahepatic bile duct",
			"Kidney and other unspecified urinary organs including renal pelvis, ureter, urethra",
			"Leukemia",
			"Liver and intrahepatic bile ducts",
			"Lymphoma (HL and NHL)",
			"Melanoma (excluding genital organs)",
			"Myeloma",
			"Oropharyngeal",
			"Ovary, fallopian tube, broad ligament",
			"Pancreas",
			"Prostate",
			"Rectum and anus",
			"Small intestine",
			"Stomach",
			"Thyroid",
			"Trachea, bronchus, and lung",
			"All Other Cancers"
		];
	}


	if(filter.cohort == []){
		filter.cohort = [ 52,
			16,
			39,
			13,
			76,
			60,
			17,
			59,
			53,
			72,
			73,
			74,
			70,
			78,
			18,
			64,
			20,
			66,
			56,
			71,
			68,
			15,
			61,
			22,
			51,
			47,
			46,
			23,
			24,
			40,
			41,
			42,
			43,
			69,
			25,
			26,
			27,
			54,
			44,
			28,
			45,
			50,
			29,
			30,
			77,
			67,
			31,
			62,
			65,
			49,
			55,
			57,
			75,
			32,
			58,
			33,
			63,
			14,
			48,
			38,
			34 ];
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
			dt.list = [];
			dt.cohorts = [];
			let list = results[0];
			//parse cancer data
			cancer.forEach(function(c){
				gender.forEach(function(g){
					let column = "ci_" + config.cancer[c] + "_" + g.toLowerCase();
					let tmp = {};
					tmp.c1 = c;
					tmp.c2 = g;
					list.forEach(function(l){
						let v = l[column];
						if(l[column] == undefined || l[column] == -1){
							v = "N/P";
						}
						tmp["c_"+l.cohort_id] = v;
					});
					dt.list.push(tmp);
				});
			});
			list.forEach(function(l){
				dt.cohorts.push({
					cohort_id:l.cohort_id,
					cohort_name:l.cohort_name,
					cohort_acronym:l.cohort_acronym
				});
			});
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
	let func = "cohort_specimen_count";
	let params = [];
	//form filter into Strings
	let specimen;
	let cancer;
	
	specimen = filter.specimen;
	//-1:[], 2:["Male"], 1:["Female"], 0: ["Male","Female"] 
	cancer = filter.cancer;

	if(filter.cohort.length > 0){
		params.push(filter.cohort.toString());
	}
	else{
		params.push("");
	}
	
	if(specimen.length == 0){
		specimen = [
			"Buffy Coat and/or Lymphocytes",
			"Feces",
			"Saliva and/or Buccal",
			"Serum and/or Plasma",
			"Tumor Tissue: Fresh/Frozen",
			"Tumor Tissue: FFPE",
			"Urine"
		];
	}
	if(cancer.length == 0){
		cancer = [
			"Bladder",
			"Bone",
			"Brain",
			"Breast",
			"Cervix",
			"Colon",
			"Corpus, body of uterus",
			"Esophagus",
			"Gall bladder and extrahepatic bile duct",
			"Kidney and other unspecified urinary organs including renal pelvis, ureter, urethra",
			"Leukemia",
			"Liver and intrahepatic bile ducts",
			"Lymphoma (HL and NHL)",
			"Melanoma (excluding genital organs)",
			"Myeloma",
			"Oropharyngeal",
			"Ovary, fallopian tube, broad ligament",
			"Pancreas",
			"Prostate",
			"Rectum and anus",
			"Small intestine",
			"Stomach",
			"Thyroid",
			"Trachea, bronchus, and lung",
			"All Other Cancers",
			"No Cancer"
		];
	}

	if(filter.cohort.length == 0){
		filter.cohort = [ 52,
			16,
			39,
			13,
			76,
			60,
			17,
			59,
			53,
			72,
			73,
			74,
			70,
			78,
			18,
			64,
			20,
			66,
			56,
			71,
			68,
			15,
			61,
			22,
			51,
			47,
			46,
			23,
			24,
			40,
			41,
			42,
			43,
			69,
			25,
			26,
			27,
			54,
			44,
			28,
			45,
			50,
			29,
			30,
			77,
			67,
			31,
			62,
			65,
			49,
			55,
			57,
			75,
			32,
			58,
			33,
			63,
			14,
			48,
			38,
			34 ];
	}
	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			let dt = {};
			dt.list = [];
			dt.cohorts = [];
			let list = results[0];
			//parse specimen data
			cancer.forEach(function(c){
				specimen.forEach(function(s){
					let column = "bio_" + config.cancer[c] + "_" + config.specimen[s];
					let tmp = {};
					tmp.c1 = s;
					tmp.c2 = c;
					list.forEach(function(l){
						let v = l[column];
						if(l[column] == -1 || l[column] == null){
							v = "N/P";
						}
						tmp["c_"+l.cohort_id] = v;
					});
					dt.list.push(tmp);
				});
			});
			list.forEach(function(l){
				dt.cohorts.push({
					cohort_id:l.cohort_id,
					cohort_name:l.cohort_name,
					cohort_acronym:l.cohort_acronym
				});
			});
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
		let func = "cohort_info";
		let params = [id];
		mysql.callProcedure(func,params,function(results){
			if(results && results[0] && results[0].length > 0){
				let basic = results[0][0];
				info = {};
				info.cohort_id = id;
				info.cohort_name = basic.cohort_name;
				info.cohort_acronym = basic.cohort_acronym;
				info.update_time = basic.update_time;
				info.collab_name = basic.collab_contact_name;
				info.collab_position = basic.collab_contact_position;
				info.collab_phone = basic.collab_contact_phone;
				info.collab_email = basic.collab_contact_email;
				// if(info.collab_name == null || info.collab_name.trim() == ""){
				// 	if(basic.contact_name == null || basic.contact_name.trim() == ""){
				// 		info.collab_name = basic.completed_by_name;
				// 		info.collab_position = basic.completed_by_position;
				// 		info.collab_phone = basic.completed_by_phone;
				// 		info.collab_email = basic.completed_by_email;
				// 	}
				// 	else{
				// 		info.collab_name = basic.contact_name;
				// 		info.collab_position = basic.contact_position;
				// 		info.collab_phone = basic.contact_phone;
				// 		info.collab_email = basic.contact_email;
				// 	}
				// }
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
				info.pi_name_1 = basic.pi_name_1;
				info.pi_name_2 = basic.pi_name_2;
				info.pi_name_3 = basic.pi_name_3;
				info.pi_name_4 = basic.pi_name_4;
				info.pi_name_5 = basic.pi_name_5;
				info.pi_name_6 = basic.pi_name_6;
				info.pi_institution_1 = basic.pi_institution_1;
				info.pi_institution_2 = basic.pi_institution_2;
				info.pi_institution_3 = basic.pi_institution_3;
				info.pi_institution_4 = basic.pi_institution_4;
				info.pi_institution_5 = basic.pi_institution_5;
				info.pi_institution_6 = basic.pi_institution_6;
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
var EnrollmentFunctions = require('./EnrollmentFunctions');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var ejs = require('ejs');
var config = require('../config');
var mysql = require('../components/mysql');
var path = require('path');
var moment = require('moment');
var mail = require('../components/mail');
const XlsxPopulate = require('xlsx-populate');

router.get('/', function(req, res, next) {
	res.json({status:200,data:'Welcome to CEDCD API Center.'});
});

router.post('/contact/add', function(req, res, next){
	//save to mysql and sent email to admin
	let body = req.body;
	let firstname = body.firstname || "";
	let lastname = body.lastname || "";
	let organization = body.organization || "";
	let phone = body.phone || "";
	let email = body.email || "";
	let topic = parseInt(body.topic || "1");
	let message = body.message || "";
	let func = "contact_us";
	let params = [firstname,lastname,organization,phone,email,topic,message];
	mysql.callProcedure(func,params, async function(results){
		if(results && results[0] && results[0].length > 0){
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
				await mail.sendMail(config.mail.from,config.mail.to,"CEDCD Website Contact Us Message", "", message_text);
				message_text = ejs.render(config.email_contact_recieved,{});
				await mail.sendMail(config.mail.from,email,"CEDCD Website Recieved Email Message", "", message_text);
				res.json({status:200,data:'sent'});
				
			} catch (e) {
				res.json({status:200,data:'failed'});
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
		else{
			res.json({status:200,data:'failed'});
		}		
	});
	
});

router.get('/download/:filename', function(req, res, next) {
	let filename = req.params.filename;
	let filePath = path.format({
		dir: config.file_path,
		base: filename
	});
    fs.readFile(filePath, function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

router.post('/export/home', function(req, res){
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "cohortselect_"+ds+".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Cohort_Selection"] = {};
	let website="";
	if(config.env == 'prod'){
		website = "cedcd.nci.nih.gov";
	}
	else{
		website = "cedcd-"+config.env+".nci.nih.gov";
	}
	data.list["Cohort_Selection"].header = [["Cohort Data Export Generated from the CEDCD Website ("+website+")"],
							["Table Name:","Cohort Selection"],
							["Export Date:",dt],
							[],
							[]];
	let body = req.body;
	let searchText = body.searchText || "";
	if(searchText == ""){
		data.list["Criteria"].header = [["Search Text:"]
							];
	}
	else{
		data.list["Criteria"].header = [["Search Text:",searchText]
							];
	}
	
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
			results[0].forEach(function(entry){
				entry.update_time = moment(entry.update_time).format("MM/DD/YYYY");
			});
			data.list["Cohort_Selection"].rows = results[0];
		}
		else{
			data.list["Cohort_Selection"].rows = [];
		}
		res.json({status:200, data:data});
	});
	
});

router.post('/export/select', function(req, res){
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "cohortselect_"+ds+".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Cohort_Selection"] = {};
	let website="";
	if(config.env == 'prod'){
		website = "cedcd.nci.nih.gov";
	}
	else{
		website = "cedcd-"+config.env+".nci.nih.gov";
	}
	data.list["Cohort_Selection"].header = [["Cohort Data Export Generated from the CEDCD Website ("+website+")"],
							["Table Name:","Cohort Selection"],
							["Export Date:",dt],
							[],
							[]];
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
	data.list["Criteria"].header = [];
	if(filter.participant.gender.length !== 0 || filter.participant.race.length !== 0 || filter.participant.ethnicity.length !== 0 || filter.participant.age.length !== 0){
		data.list["Criteria"].header.push(["[Type of participant]"]);
		if(filter.participant.gender.length !== 0){
			data.list["Criteria"].header.push(["Gender:"]);
			filter.participant.gender.forEach(function(g){
				data.list["Criteria"].header.push([" - "+g]);
			});
		}
		if(filter.participant.race.length !== 0){
			data.list["Criteria"].header.push(["Race:"]);
			filter.participant.race.forEach(function(r){
				data.list["Criteria"].header.push([" - "+r]);
			});
		}
		if(filter.participant.ethnicity.length !== 0){
			data.list["Criteria"].header.push(["Ethnicity:"]);
			filter.participant.ethnicity.forEach(function(e){
				data.list["Criteria"].header.push([" - "+e]);
			});
		}
		if(filter.participant.age.length !== 0){
			data.list["Criteria"].header.push(["Age:"]);
			filter.participant.age.forEach(function(a){
				data.list["Criteria"].header.push([" - "+a]);
			});
		}
	}
	if(filter.collect.data.length !== 0 || filter.collect.specimen.length !== 0 || filter.collect.cancer.length !== 0){
		data.list["Criteria"].header.push(["[Data and Specimens Collected]"]);
		if(filter.collect.data.length !== 0){
			data.list["Criteria"].header.push(["Data Collected:"]);
			filter.collect.data.forEach(function(d){
				data.list["Criteria"].header.push([" - "+d]);
			});
		}
		if(filter.collect.specimen.length !== 0){
			data.list["Criteria"].header.push(["Specimens Collected:"]);
			filter.collect.specimen.forEach(function(s){
				data.list["Criteria"].header.push([" - "+s]);
			});
		}
		if(filter.collect.cancer.length !== 0){
			data.list["Criteria"].header.push(["Cancers Collected:"]);
			filter.collect.cancer.forEach(function(c){
				data.list["Criteria"].header.push([" - "+c]);
			});
		}
	}
	if(filter.study.state.length !== 0){
		data.list["Criteria"].header.push(["[Study Design]"]);
		data.list["Criteria"].header.push(["Eligible Disease State:"]);
		filter.study.state.forEach(function(s){
			data.list["Criteria"].header.push([" - "+s]);
		});
	}
	
	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			results[0].forEach(function(entry){
				entry.update_time = moment(entry.update_time).format("MM/DD/YYYY");
			});
			data.list["Cohort_Selection"].rows = results[0];
		}
		else{
			data.list["Cohort_Selection"].rows = [];
		}
		res.json({status:200, data:data});
	});
});

router.post('/export/advancedSelect', function(req, res){
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "cohortselect_"+ds+".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Cohort_Selection"] = {};
	let website="";
	if(config.env == 'prod'){
		website = "cedcd.nci.nih.gov";
	}
	else{
		website = "cedcd-"+config.env+".nci.nih.gov";
	}
	data.list["Cohort_Selection"].header = [["Cohort Data Export Generated from the CEDCD Website ("+website+")"],
							["Table Name:","Cohort Selection"],
							["Export Date:",dt],
							[],
							[]];
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
	
	let selectionList = body.selectionList || {};
	let items = body.items || {};
	let booleanStates = body.booleanStates || {};
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
	data.list["Criteria"].header = [];
	first = true;
	for(let i = 0; i < selectionList.length; i++){

		if(items[i] != "Select"){
			if(first == true){
				first = false;
				data.list["Criteria"].header.push(["Search Criteria Used:"])
			}
			else{
				data.list["Criteria"].header.push([booleanStates[i]]);
			}
			data.list["Criteria"].header.push([items[i] + ":"]);
			for(let a = 0; a < selectionList[i].length; a++){
				data.list["Criteria"].header.push([" - " + selectionList[i][a]])
			}
		}
		

	}
	
	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			results[0].forEach(function(entry){
				entry.update_time = moment(entry.update_time).format("MM/DD/YYYY");
			});
			data.list["Cohort_Selection"].rows = results[0];
		}
		else{
			data.list["Cohort_Selection"].rows = [];
		}
		res.json({status:200, data:data});
	});
});


router.post('/export/enrollment', function(req, res){
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "enrollment_"+ds+".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Enrollment_Counts"] = {};
	let website="";
	if(config.env == 'prod'){
		website = "cedcd.nci.nih.gov";
	}
	else{
		website = "cedcd-"+config.env+".nci.nih.gov";
	}
	data.list["Enrollment_Counts"].header = [["Cohort Data Export Generated from the CEDCD Website ("+website+")"],
							["Table Name:","Enrollment Counts"],
							["Export Date:",dt],
							[],
							[]];
	let body = req.body;
	let filter = body.filter || {};
	let func = "cohort_enrollment_count";
	let params = [];
	//form filter into Strings
	let gender;
	let race;
	let ethnicity;
	
	gender = filter.gender;
	//-1:[], 2:["Male"], 1:["Female"], 0: ["Male","Female"] 
	race = filter.race;
	ethnicity = filter.ethnicity;

	if(filter.cohort.length > 0){
		params.push(filter.cohort.toString());
	}
	else{
		params.push("");
	}
	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			let list = results[0];
			//parse enrollment data
			let male_rows = [];
			let female_rows = [];
			let unknown_rows = [];
			race.forEach(function(r){
				ethnicity.forEach(function(eth){
					gender.forEach(function(g){
						let column = "race_" + config.race[r] + "_" + config.ethnicity[eth] + "_" + config.gender[g];
						let tmp = {};
						let total = 0;
						tmp.Ethnicity = eth;
						tmp.Race = r;
						list.forEach(function(l){
							let v = l[column];
							let count = 0;
							if(l[column] == -1){
								v = "N/P";
							}
							else{
								count = l[column];
							}
							tmp[l.cohort_acronym] = v;
							total += count;
						});
						tmp.total = total;
						if(g === "Male"){
							male_rows.push(tmp);
						}
						else if(g === "Female"){
							female_rows.push(tmp);
						}
						else{
							unknown_rows.push(tmp);
						}
					});
				});
			});
			data.list["Enrollment_Counts"].sections = [];
			if(male_rows.length > 0){
				let tmp = {};
				tmp.header = [["Enrollment: Males"]];
				tmp.rows = male_rows;
				data.list["Enrollment_Counts"].sections.push(tmp);
			}
			if(female_rows.length > 0){
				let tmp = {};
				tmp.header = [["Enrollment: Females"]];
				tmp.rows = female_rows;
				data.list["Enrollment_Counts"].sections.push(tmp);
			}
			if(unknown_rows.length > 0){
				let tmp = {};
				tmp.header = [["Enrollment: Unknown"]];
				tmp.rows = unknown_rows;
				data.list["Enrollment_Counts"].sections.push(tmp);
			}
			let cohorts = [];
			list.forEach(function(l){
				cohorts.push(l.cohort_acronym);
			});
			data.list["Criteria"].header = [];
			if(filter.gender.length !== 0){
				data.list["Criteria"].header.push(["Gender:"]);
				filter.gender.forEach(function(g){
					data.list["Criteria"].header.push([" - "+g]);
				});
			}
			if(filter.race.length !== 0){
				data.list["Criteria"].header.push(["Race:"]);
				filter.race.forEach(function(r){
					data.list["Criteria"].header.push([" - "+r]);
				});
			}
			if(filter.ethnicity.length !== 0){
				data.list["Criteria"].header.push(["Ethnicity:"]);
				filter.ethnicity.forEach(function(e){
					data.list["Criteria"].header.push([" - "+e]);
				});
			}
			if(filter.cohort.length !== 0){
				data.list["Criteria"].header.push(["Cohorts:"]);
				cohorts.forEach(function(c){
					data.list["Criteria"].header.push([" - "+c]);
				});
			}
		}
		else{
			data.list["Enrollment_Counts"].sections = [];
			data.list["Criteria"].header = [
							["Gender:"],
							["Race:"],
							["Ethnicity:"],
							["Cohorts:"]
							];
		}
		res.json({status:200, data:data});
	});
	
});

router.post('/export/cancer', function(req, res){
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "cancer_"+ds+".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Cancer_Counts"] = {};
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

	if(filter.cohort.length > 0){
		params.push(filter.cohort.toString());
	}
	else{
		params.push("");
	}
	let website="";
	if(config.env == 'prod'){
		website = "cedcd.nci.nih.gov";
	}
	else{
		website = "cedcd-"+config.env+".nci.nih.gov";
	}
	data.list["Cancer_Counts"].header = [["Cohort Data Export Generated from the CEDCD Website ("+website+")"],
							["Table Name:","Cancer Counts"],
							["Export Date:",dt]];
	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			let dt = [];
			let list = results[0];
			//parse cancer data
			cancer.forEach(function(c){
				gender.forEach(function(g){
					let column = "ci_" + config.cancer[c] + "_" + g.toLowerCase();
					let tmp = {};
					tmp.Cancer = c;
					tmp.Gender = g;
					list.forEach(function(l){
						let v = l[column];
						if(l[column] == undefined || l[column] == -1){
							v = "N/P";
						}
						tmp[l.cohort_acronym] = v;
					});
					dt.push(tmp);
				});
			});
			data.list["Cancer_Counts"].rows = dt;
			let cohorts = [];
			list.forEach(function(l){
				cohorts.push(l.cohort_acronym);
			});
			data.list["Cancer_Counts"].header.push([]);
			data.list["Cancer_Counts"].header.push([]);
			data.list["Criteria"].header = [];
			if(filter.gender.length !== 0){
				data.list["Criteria"].header.push(["Gender:"]);
				filter.gender.forEach(function(g){
					data.list["Criteria"].header.push([" - "+g]);
				});
			}
			if(filter.cancer.length !== 0){
				data.list["Criteria"].header.push(["Cancer Type:"]);
				filter.cancer.forEach(function(c){
					data.list["Criteria"].header.push([" - "+c]);
				});
			}
			if(filter.cohort.length !== 0){
				data.list["Criteria"].header.push(["Cohorts:"]);
				cohorts.forEach(function(c){
					data.list["Criteria"].header.push([" - "+c]);
				});
			}
		}
		else{
			data.list["Cancer_Counts"].rows = [];
			data.list["Cancer_Counts"].header.push([]);
			data.list["Cancer_Counts"].header.push([]);
			data.list["Criteria"].header = [["Gender:"],
							["Cancer Type:"],
							["Cohorts:"]
							];
		}
		res.json({status:200, data:data});
	});
	
});

router.post('/export/biospecimen', function(req, res){
	const ds = moment().format('YYYYMMDD');
	const dt = moment().format('MM/DD/YYYY');
	const filename = "biospecimen_"+ds+".xlsx";
	const data = {};
	data.filename = filename;
	data.list = {};
	data.list["Criteria"] = {};
	data.list["Biospecimen_Counts"] = {};
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
	let website="";
	if(config.env == 'prod'){
		website = "cedcd.nci.nih.gov";
	}
	else{
		website = "cedcd-"+config.env+".nci.nih.gov";
	}
	data.list["Biospecimen_Counts"].header = [["Cohort Data Export Generated from the CEDCD Website ("+website+")"],
							["Table Name:","Biospecimen Counts"],
							["Export Date:",dt]];
	mysql.callProcedure(func,params,function(results){
		if(results && results[0] && results[0].length > 0){
			let dt = [];
			let list = results[0];
			//parse specimen data
			specimen.forEach(function(s){
				cancer.forEach(function(c){
					let column = "bio_" + config.cancer[c] + "_" + config.specimen[s];
					let tmp = {};
					tmp["Specimens Type"] = s;
					tmp.Cancer = c;
					list.forEach(function(l){
						let v = l[column];
						if(l[column] == -1 || l[column] == null){
							v = "N/P";
						}
						tmp[l.cohort_acronym] = v;
					});
					dt.push(tmp);
				});
			});
			data.list["Biospecimen_Counts"].rows = dt;
			let cohorts = [];
			list.forEach(function(l){
				cohorts.push(l.cohort_acronym);
			});
			data.list["Biospecimen_Counts"].header.push([]);
			data.list["Biospecimen_Counts"].header.push([]);
			data.list["Criteria"].header = [];
			if(filter.specimen.length !== 0){
				data.list["Criteria"].header.push(["Specimen Type:"]);
				filter.specimen.forEach(function(s){
					data.list["Criteria"].header.push([" - "+s]);
				});
			}
			if(filter.cancer.length !== 0){
				data.list["Criteria"].header.push(["Cancer Type:"]);
				filter.cancer.forEach(function(c){
					data.list["Criteria"].header.push([" - "+c]);
				});
			}
			if(filter.cohort.length !== 0){
				data.list["Criteria"].header.push(["Cohorts:"]);
				cohorts.forEach(function(c){
					data.list["Criteria"].header.push([" - "+c]);
				});
			}
		}
		else{
			data.list["Biospecimen_Counts"].rows = [];
			data.list["Biospecimen_Counts"].header.push([]);
			data.list["Biospecimen_Counts"].header.push([]);
			data.list["Criteria"].header = [["Specimen Type:"],
							["Cancer Type:"],
							["Cohorts:"]
							];
		}
		res.json({status:200, data:data});
	});
	
});

module.exports = router;
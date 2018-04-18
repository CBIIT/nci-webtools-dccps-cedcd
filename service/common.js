var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../config');
var mysql = require('../components/mysql');
var path = require('path');
var moment = require('moment');
const XlsxPopulate = require('xlsx-populate');

router.get('/', function(req, res, next) {
	res.json({status:200,data:'Welcome to CEDCD API Center.'});
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
	data.list["Cohort_Selection"] = {};
	data.list["Cohort_Selection"].header = [["Cohort Data Export Generated from the CEDCD Website (cedcd.nci.nih.gov)"],
							["Table Name:","Cohort Selection"],
							["Export Date:",dt],
							[],
							[]];
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
	data.list["Cohort_Selection"] = {};
	data.list["Cohort_Selection"].header = [["Cohort Data Export Generated from the CEDCD Website (cedcd.nci.nih.gov)"],
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
	data.list["Enrollment_Counts"] = {};
	data.list["Enrollment_Counts"].header = [["Cohort Data Export Generated from the CEDCD Website (cedcd.nci.nih.gov)"],
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
		}
		else{
			data.list["Enrollment_Counts"].sections = [];
		}
		res.json({status:200, data:data});
	});
	
});

module.exports = router;
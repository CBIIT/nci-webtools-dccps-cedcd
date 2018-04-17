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

module.exports = router;
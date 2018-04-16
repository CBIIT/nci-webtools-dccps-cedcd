var mysql = require('../../components/mysql');

exports.run = function(req, res){
	let body = req.body;
	let cohorts = body.cohorts || [];

	let func = "cohort_linkages_technology";
	let params = [];

	if(cohorts.length > 0){
		params.push(cohorts.toString());
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
			dt.list.push({
		  		type:"block",
		  		name:"Linkages to External Databases",
		  		rows:2
		  	});
		  	let values = [{
		  		name:"Linked Cohort Data to Other Existing Databases",
		  		title:"Did cohort link to database such as Center for Medicare and Medicaid Services or the Surveillance, Epidemiology and End Results (SEER) database?",
		  		column:"dlh_linked_to_existing_databases"
		  	},{
		  		name:"Linked Cohort Data to Other Existing Databases Specified",
		  		text:true,
		  		column:"dlh_linked_to_existing_databases_specify"
		  	}];
		  	values.forEach(function(vl){
		  		let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if(vl.title){
					tmp.title = vl.title;
				}
				list.forEach(function(l){
					let v = l[vl.column];
					if(vl.text){
						v = (v == ""?"N/A":v);
					}
					else if(v == -1){
						v = "N/P";
					}
					else{
						v = v?"Yes":"No";
					}
					tmp["c_"+l.cohort_id] = v;
				});
				dt.list.push(tmp);
		  	});
		  	dt.list.push({
		  		type:"block",
		  		name:"Participation in Data Harmonization Activities",
		  		rows:7
		  	});
		  	values = [{
		  		name:"Cohort Participated in Previous Cross-cohort Data Harmonization",
		  		title:"Has the cohort participated in any cross-cohort collaborative projects in which data were harmonized?",
		  		column:"dlh_harmonization_projects"
		  	},{
		  		name:"Cohort Participated in Previous Cross-cohort Data Harmonization Specified",
		  		column:"dlh_harmonization_projects_specify",
		  		text:true
		  	},
		  	{
		  		name:"Cohort Deposited Data in an NIH Sponsored Data Repository",
		  		rows:4,
		  		column:"dlh_nih_repository"
		  	},{
		  		name:"CEDR",
		  		parent_pos:-1,
		  		column:"dlh_nih_cedr"
		  	},{
		  		name:"dbGaP",
		  		parent_pos:-2,
		  		column:"dlh_nih_dbgap"
		  	},{
		  		name:"BioLINCC",
		  		parent_pos:-3,
		  		column:"dlh_nih_biolincc"
		  	},{
		  		name:"Other",
		  		parent_pos:-4,
		  		column:"dlh_nih_other"
		  	}];
		  	values.forEach(function(vl){
		  		let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if(vl.title){
					tmp.title = vl.title;
				}
				if(vl.rows){
					tmp.rows = vl.rows;
				}
				if(vl.parent_pos){
					tmp.parent_pos = vl.parent_pos;
				}
				list.forEach(function(l){
					let v = l[vl.column];
					if(vl.text){
						v = (v == ""?"N/A":v);
					}
					else if(v == -1){
						v = "N/P";
					}
					else{
						v = v?"Yes":"No";
					}
					tmp["c_"+l.cohort_id] = v;
				});
				
				dt.list.push(tmp);
		  	});
		  	dt.list.push({
		  		type:"block",
		  		name:"Technology Use",
		  		rows:4
		  	});
		  	values = [{
		  		name:"Adopted Use of Mobile Devices",
		  		title:"Has the cohort adopted the use of mobile devices (i.e., tablet computers, personal digital assistants, etc.) for the collection and/or measurement of demographic or lifestyle factors, environmental exposures, and/or other types information?",
		  		column:"tech_use_of_mobile"
		  	},{
		  		name:"Mobile Technology Use Described",
		  		column:"tech_use_of_mobile_describe",
		  		text:true
		  	},{
		  		name:"Adopted Use of Cloud-based Approaches for the Collection, Management, or Distribution of Study Data",
		  		title:"Cloud computing refers to storing data on the internet. Has the cohort adopted the use of cloud-based approaches for the collection, management, or distribution of study data?",
		  		column:"tech_use_of_cloud"
		  	},{
		  		name:"Cloud-based Technology Use Described",
		  		column:"tech_use_of_cloud_describe",
		  		text:true
		  	}];
		  	values.forEach(function(vl){
		  		let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if(vl.title){
					tmp.title = vl.title;
				}
				list.forEach(function(l){
					let v = l[vl.column];
					if(vl.text){
						v = (v == ""?"N/A":v);
					}
					else if(v == -1){
						v = "N/P";
					}
					else{
						v = v?"Yes":"No";
					}
					tmp["c_"+l.cohort_id] = v;
				});
				
				dt.list.push(tmp);
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
}
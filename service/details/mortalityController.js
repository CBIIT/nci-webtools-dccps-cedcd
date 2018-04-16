var mysql = require('../../components/mysql');

exports.run = function(req, res){
	let body = req.body;
	let cohorts = body.cohorts || [];

	let func = "cohort_mortality";
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
		  		name:"Mortality",
		  		rows:10
		  	});
		  	values = [{
		  		name:"Number of Deaths from Most Recent Mortality Follow-up",
		  		text:true,
		  		column:"mort_number_of_deaths"
		  	},{
		  		name:"Death Confirmed by NDI Linkage",
		  		column:"mort_death_confirmed_by_ndi_linkage"
		  	},{
		  		name:"Death Confirmed by State Death Certificate",
		  		column:"mort_death_confirmed_by_death_certificate"
		  	},{
		  		name:"Death Confirmed by Other Source Specified",
		  		column:"mort_death_confirmed_by_other",
		  		specify:true,
		  		column_specify:"mort_death_confirmed_by_other_specify"
		  	},{
		  		name:"Date of Death for Most Subjects Collected",
		  		column:"mort_have_date_of_death"
		  	},{
		  		name:"Cause of Death Collected",
		  		column:"mort_have_cause_of_death"
		  	},{
		  		name:"Cause of Death Coding: ICD-9",
		  		column:"mort_death_code_used_icd9"
		  	},{
		  		name:"Cause of Death Coding: ICD-10",
		  		column:"mort_death_code_used_icd10"
		  	},{
		  		name:"Cause of Death Coding: Not Coded",
		  		column:"mort_death_not_coded"
		  	},{
		  		name:"Cause of Death Coding: Other Specified",
		  		column:"mort_death_code_used_other",
		  		specify:true,
		  		column_specify:"mort_death_code_used_other_specify"
		  	}];
		  	values.forEach(function(vl){
		  		let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if(vl.title){
					tmp.title = vl.title;
				}
				if(vl.specify){
					list.forEach(function(l){
						let v = l[vl.column];
						if(v == 0){
							v = "N/A";
						}
						else{
							v = l[vl.column_specify];
						}
						tmp["c_"+l.cohort_id] = v;
					});
				}
				else{
					list.forEach(function(l){
						let v = l[vl.column];
						if(vl.text){
						}
						else if(v == -1){
							v = "N/P";
						}
						else{
							v = v?"Yes":"No";
						}
						tmp["c_"+l.cohort_id] = v;
					});
				}
				
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
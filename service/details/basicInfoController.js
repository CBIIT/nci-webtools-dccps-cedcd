var mysql = require('../../components/mysql');

exports.run = function(req, res) {
	let body = req.body;
	let cohorts = body.cohorts || [];

	let func = "cohort_basic_info";
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
		  		name:"Eligibility Criteria",
		  		rows:4
		  	});
		  	let tmp = {};
			tmp.type = "data";
			tmp.name = "Gender";
			list.forEach(function(l){
				let v = l["eligible_gender"];
				if( v == 0){
					v = "Both";
				}
				else if(v == 1){
					v = "Female";
				}
				else if(v == 2){
					v = "Male";
				}
				else{
					v = "N/P";
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Disease State";
			list.forEach(function(l){
				let v = l["eligible_disease"];
				if(v == 0){
					v = "Cancer Survivor";
				}
				else if(v == 1){
					v = "Generally Healthy";
				}
				else if(v == 2){
					v = "Other";
				}
				else{
					v = "N/P";
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Cancer Survivors: Specified Cancer Site";
			list.forEach(function(l){
				let v = l["eligible_disease_cancer_specify"];
				if(v === ""){
					v = (l["eligible_disease_state"] == -1 ? "N/P":"N/A");
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Other Disease State, Specify";
			list.forEach(function(l){
				let v = l["eligible_disease_other_specify"];
				if(v === ""){
					v = (l["eligible_disease_state"] == -1 ? "N/P":"N/A");
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
		  	dt.list.push({
		  		type:"block",
		  		name:"Enrollment",
		  		rows:6
		  	});
  			tmp = {};
			tmp.type = "data";
			tmp.name = "Year Enrollment Started";
			list.forEach(function(l){
				tmp["c_"+l.cohort_id] = l["enrollment_year_start"];
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Year Enrollment Ended";
			list.forEach(function(l){
				tmp["c_"+l.cohort_id] = l["enrollment_year_end"];
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Minimum Age at Enrollment";
			list.forEach(function(l){
				tmp["c_"+l.cohort_id] = l["enrollment_age_min"];
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Maximum Age at Enrollment";
			list.forEach(function(l){
				tmp["c_"+l.cohort_id] = l["enrollment_age_max"];
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Median Age";
			list.forEach(function(l){
				let v = (l["enrollment_age_median"] == -1 ? "N/P":l["enrollment_age_median"]);
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Mean Age";
			list.forEach(function(l){
				let v = (l["enrollment_age_mean"] == -1 ? "N/P":l["enrollment_age_mean"]);
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
		  	dt.list.push({
		  		type:"block",
		  		name:"Data Collection Methods/Timing",
		  		rows:12
		  	});
			tmp = {};
			tmp.type = "data";
			tmp.name = "Frequency of Questionnaire Data Collection";
			list.forEach(function(l){
				tmp["c_"+l.cohort_id] = l["time_interval"];
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Most Recent Year Questionnaire Data Collected";
			list.forEach(function(l){
				tmp["c_"+l.cohort_id] = l["most_recent_year"];
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Questionnaire Collection Method: In Person";
			list.forEach(function(l){
				let v = l["data_collected_in_person"];
				if(v == -1){
					v = "N/P";
				}
				else{
					v = v?"Yes":"No";
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Questionnaire Collection Method: Phone";
			list.forEach(function(l){
				let v = l["data_collected_phone"];
				if(v == -1){
					v = "N/P";
				}
				else{
					v = v?"Yes":"No";
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Questionnaire Collection Method: Paper";
			list.forEach(function(l){
				let v = l["data_collected_paper"];
				if(v == -1){
					v = "N/P";
				}
				else{
					v = v?"Yes":"No";
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Questionnaire Collection Method: Electronic/Web Based";
			list.forEach(function(l){
				let v = l["data_collected_web"];
				if(v == -1){
					v = "N/P";
				}
				else{
					v = v?"Yes":"No";
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Questionnaire Collection Method Other Specified";
			list.forEach(function(l){
				let v = l["data_collected_other_specify"];
				if(v == ""){
					v = "No";
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Other Tools used for Exposure Data Collection";
			list.forEach(function(l){
				let v = l["other_tools"];
				if(v == -1){
					v = "N/P";
				}
				else{
					v = v?"Yes":"No";
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Other Tools used for Exposure Data Collection Other Specified";
			list.forEach(function(l){
				let v = l["other_tools_specify"];
				if(v == ""){
					if(l["other_tools"] == 0){
						v = "N/A";
					}
					else if(l["other_tools"] == 1){
						v="N/P";
					}
					else{
						v = "N/P";
					}
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Most Recent Year of Cancer Ascertainment";
			list.forEach(function(l){
				let v = l["ci_confirmed_cancer_year"];
				if(v == -1){
					v = "N/P";
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "data";
			tmp.name = "Most Recent Year of Mortality Follow-up";
			list.forEach(function(l){
				let v = l["mort_year_mortality_followup"];
				if(v == -1){
					v = "N/P";
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);
			tmp = {};
			tmp.type = "array";
			tmp.name = "Restrictions on Participating in Collaborative Projects";
			list.forEach(function(l){
				let v = [];
				if(l["restrictions_none"]){
					v.push("None");
				}
				if(l["restrictions_require_collaboration"]){
					v.push("Require Collaboration with Cohort Investigators");
				}
				if(l["restrictions_require_irb"]){
					v.push("Require IRB Approvals");
				}
				if(l["restrictions_require_agreement"]){
					v.push("Require Data Use Agreements and/or Material Transfer Agreement");
				}
				if(l["restrictions_on_genetic_use"]){
					v.push("Restrictions in the Consent Related to Genetic Use");
				}
				if(l["restrictions_on_linking"]){
					v.push("Restrictions in the Consent Related to Linking to Other Databases");
				}
				if(l["restrictions_on_commercial_use"]){
					v.push("Restriction on Commercial Use");
				}
				if(l["restrictions_other"]){
					v.push("Other, Specified");
				}
				if(v.length == 0){
					v.push("N/P");
				}
				tmp["c_"+l.cohort_id] = v;
			});
			dt.list.push(tmp);

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
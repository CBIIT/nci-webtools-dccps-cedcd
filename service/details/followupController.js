var mysql = require('../../components/mysql');

exports.run = function(req, res){
	let body = req.body;
	let cohorts = body.cohorts || [];

	let func = "cohort_baseline_data";
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
		  		name:"Demographic Information",
		  		rows:7
		  	});
		  	let values = [{
		  		name:"Socio-economic status (e.g., income)",
		  		column:"mdc_income_followup"
		  	},{
		  		name:"Education Level",
		  		column:"mdc_education_followup"
		  	},{
		  		name:"Marital Status",
		  		column:"mdc_marital_status_followup"
		  	},{
		  		name:"Language/Country of Origin",
		  		column:"mdc_language_origin_followup"
		  	},{
		  		name:"Employment Status",
		  		column:"mdc_employment_followup"
		  	},{
		  		name:"Geocoding Information",
		  		title:"Geographic coordinates of location of interest",
		  		column:"mdc_residential_infomation_followup"
		  	},{
		  		name:"Health Insurance Status",
		  		column:"mdc_health_insurance_followup"
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
					if(v == -1){
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
		  		name:"Lifestyle Information",
		  		rows:12
		  	});
		  	values = [{
		  		name:"Anthropometry",
		  		title:"Body measurements such as height, weight, or body mass index",
		  		column:"mdc_anthropometry_followup"
		  	},{
		  		name:"Cigarette Smoking",
		  		column:"mdc_cigarette_followup"
		  	},{
		  		name:"Use of Cigars",
		  		column:"mdc_other_tobacco_cigars_followup"
		  	},{
		  		name:"Use of Pipes",
		  		column:"mdc_other_tobacco_pipes_followup"
		  	},{
		  		name:"Use of Chewing Tobacco",
		  		column:"mdc_other_tobacco_chewing_followup"
		  	},{
		  		name:"Use of E-Cigarettes",
		  		column:"mdc_other_tobacco_ecigarette_followup"
		  	},{
		  		name:"Use of Other Tobacco Products Specified",
		  		column:"mdc_other_tobacco_other_followup",
		  		specify:true,
		  		column_specify:"mdc_other_tobacco_other_specify_followup"
		  	},{
		  		name:"Alcohol Consumption",
		  		column:"mdc_alcohol_followup"
		  	},{
		  		name:"Dietary Intake",
		  		column:"mdc_dietary_intake_followup"
		  	},{
		  		name:"Dietary Supplement Use",
		  		column:"mdc_dietary_supplement_followup"
		  	},{
		  		name:"Physical Activity",
		  		column:"mdc_physical_activity_followup"
		  	},{
		  		name:"Sleep Habits",
		  		column:"mdc_sleep_habits_followup"
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
							v = "No";
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
						if(v == -1){
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
		  	dt.list.push({
		  		type:"block",
		  		name:"Health Information",
		  		rows:14
		  	});
		  	values = [{
		  		name:"Self-Reported Health",
		  		column:"mdc_self_reported_health_followup"
		  	},{
		  		name:"Reproductive History",
		  		column:"mdc_reproductive_history_followup"
		  	},{
		  		name:"Quality of Life",
		  		column:"mdc_quality_of_life_followup"
		  	},{
		  		name:"Social Support",
		  		column:"mdc_social_support_followup"
		  	},{
		  		name:"Cognitive Function",
		  		column:"mdc_cognitive_function_followup"
		  	},{
		  		name:"Depression",
		  		column:"mdc_depression_followup"
		  	},{
		  		name:"Other Psychosocial Variables",
		  		column:"mdc_other_psychosocial_followup"
		  	},{
		  		name:"Fatigue",
		  		column:"mdc_fatigue_followup"
		  	},{
		  		name:"Complementary and Alternative Medicine",
		  		column:"mdc_alternative_medicine_followup"
		  	},{
		  		name:"Prescription Medication Use (not-related to cancer treatment)",
		  		column:"mdc_prescription_drug_use_followup"
		  	},{
		  		name:"Non-prescription Medication Use (not-related to cancer treatment)",
		  		column:"mdc_nonprescription_drug_use_followup"
		  	},{
		  		name:"Family History of Cancer",
		  		column:"mdc_family_hsitory_of_cancer_followup"
		  	},{
		  		name:"Family History of Cancer with Pedigrees",
		  		column:"mdc_family_hsitory_of_cancer_pedigrees_followup"
		  	},{
		  		name:"Environmental or Occupational Exposures",
		  		title:"Such as air contanminants/quality, occupational exposures and history, water source",
		  		column:"mdc_environment_followup"
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
					if(v == -1){
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
		  		name:"Co-Morbid Conditions",
		  		rows:7
		  	});
		  	values = [{
		  		name:"Diabetes",
		  		column:"mdc_diabetes_followup"
		  	},{
		  		name:"Stroke",
		  		column:"mdc_stroke_followup"
		  	},{
		  		name:"COPD and/or Emphysema",
		  		column:"mdc_copd_followup"
		  	},{
		  		name:"Cardiovascular Disease",
		  		column:"mdc_cardiovascular_disease_followup"
		  	},{
		  		name:"Osteoporosis",
		  		column:"mdc_osteoporosis_followup"
		  	},{
		  		name:"Mental Health",
		  		column:"mdc_mental_health_followup"
		  	},{
		  		name:"Cognitive Decline",
		  		column:"mdc_cognitive_decline_followup"
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
					if(v == -1){
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
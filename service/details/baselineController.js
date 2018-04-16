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
		  		column:"mdc_income_baseline"
		  	},{
		  		name:"Education Level",
		  		column:"mdc_education_baseline"
		  	},{
		  		name:"Marital Status",
		  		column:"mdc_marital_status_baseline"
		  	},{
		  		name:"Language/Country of Origin",
		  		column:"mdc_language_origin_baseline"
		  	},{
		  		name:"Employment Status",
		  		column:"mdc_employment_baseline"
		  	},{
		  		name:"Geocoding Information",
		  		title:"Geographic coordinates of location of interest",
		  		column:"mdc_residential_infomation_baseline"
		  	},{
		  		name:"Health Insurance Status",
		  		column:"mdc_health_insurance_baseline"
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
		  		column:"mdc_anthropometry_baseline"
		  	},{
		  		name:"Cigarette Smoking",
		  		column:"mdc_cigarette_baseline"
		  	},{
		  		name:"Use of Cigars",
		  		column:"mdc_other_tobacco_cigars_baseline"
		  	},{
		  		name:"Use of Pipes",
		  		column:"mdc_other_tobacco_pipes_baseline"
		  	},{
		  		name:"Use of Chewing Tobacco",
		  		column:"mdc_other_tobacco_chewing_baseline"
		  	},{
		  		name:"Use of E-Cigarettes",
		  		column:"mdc_other_tobacco_ecigarette_baseline"
		  	},{
		  		name:"Use of Other Tobacco Products Specified",
		  		column:"mdc_other_tobacco_other_baseline",
		  		specify:true,
		  		column_specify:"mdc_other_tobacco_other_specify_baseline"
		  	},{
		  		name:"Alcohol Consumption",
		  		column:"mdc_alcohol_baseline"
		  	},{
		  		name:"Dietary Intake",
		  		column:"mdc_dietary_intake_baseline"
		  	},{
		  		name:"Dietary Supplement Use",
		  		column:"mdc_dietary_supplement_baseline"
		  	},{
		  		name:"Physical Activity",
		  		column:"mdc_physical_activity_baseline"
		  	},{
		  		name:"Sleep Habits",
		  		column:"mdc_sleep_habits_baseline"
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
		  		column:"mdc_self_reported_health_baseline"
		  	},{
		  		name:"Reproductive History",
		  		column:"mdc_reproductive_history_baseline"
		  	},{
		  		name:"Quality of Life",
		  		column:"mdc_quality_of_life_baseline"
		  	},{
		  		name:"Social Support",
		  		column:"mdc_social_support_baseline"
		  	},{
		  		name:"Cognitive Function",
		  		column:"mdc_cognitive_function_baseline"
		  	},{
		  		name:"Depression",
		  		column:"mdc_depression_baseline"
		  	},{
		  		name:"Other Psychosocial Variables",
		  		column:"mdc_other_psychosocial_baseline"
		  	},{
		  		name:"Fatigue",
		  		column:"mdc_fatigue_baseline"
		  	},{
		  		name:"Complementary and Alternative Medicine",
		  		column:"mdc_alternative_medicine_baseline"
		  	},{
		  		name:"Prescription Medication Use (not-related to cancer treatment)",
		  		column:"mdc_prescription_drug_use_baseline"
		  	},{
		  		name:"Non-prescription Medication Use (not-related to cancer treatment)",
		  		column:"mdc_nonprescription_drug_use_baseline"
		  	},{
		  		name:"Family History of Cancer",
		  		column:"mdc_family_hsitory_of_cancer_baseline"
		  	},{
		  		name:"Family History of Cancer with Pedigrees",
		  		column:"mdc_family_hsitory_of_cancer_pedigrees_baseline"
		  	},{
		  		name:"Environmental or Occupational Exposures",
		  		title:"Such as air contanminants/quality, occupational exposures and history, water source",
		  		column:"mdc_environment_baseline"
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
		  		column:"mdc_diabetes_baseline"
		  	},{
		  		name:"Stroke",
		  		column:"mdc_stroke_baseline"
		  	},{
		  		name:"COPD and/or Emphysema",
		  		column:"mdc_copd_baseline"
		  	},{
		  		name:"Cardiovascular Disease",
		  		column:"mdc_cardiovascular_disease_baseline"
		  	},{
		  		name:"Osteoporosis",
		  		column:"mdc_osteoporosis_baseline"
		  	},{
		  		name:"Mental Health",
		  		column:"mdc_mental_health_baseline"
		  	},{
		  		name:"Cognitive Decline",
		  		column:"mdc_cognitive_decline_baseline"
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
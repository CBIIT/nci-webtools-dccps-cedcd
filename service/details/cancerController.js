var mysql = require('../../components/mysql');

exports.run = function(req, res){
	let body = req.body;
	let cohorts = body.cohorts || [];

	let func = "cohort_cancer_info";
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
		  		name:"Cancer Ascertainment Source",
		  		rows:6
		  	});
		  	let values = [{
		  		name:"Self Reported",
		  		column:"ci_ascertained_self_reporting"
		  	},{
		  		name:"Tumor Registry",
		  		column:"ci_ascertained_tumor_registry"
		  	},{
		  		name:"Medical Records Review",
		  		column:"ci_ascertained_medical_records"
		  	},{
		  		name:"Cancer Ascertainment Source Other Specified",
		  		column:"ci_ascertained_other",
		  		specify:true,
		  		column_specify:"ci_ascertained_other_specify"
		  	},{
		  		name:"Ascertained Recurrent Cancers",
		  		column:"ci_cancer_recurrence"
		  	},{
		  		name:"Ascertained Second Primary Cancers",
		  		column:"ci_second_primary_diagnosis"
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
							v = v?v:"N/P";
						}
						tmp["c_"+l.cohort_id] = v;
					});
				}
				else{
					list.forEach(function(l){
						let v = l[vl.column];
						if(v == -1){
							v = "N/A";
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
		  		name:"Cancer Treatment",
		  		rows:13
		  	});
		  	values = [{
		  		name:"Cancer Treatment Data Collected",
		  		rows:12,
		  		column:"ci_cancer_treatment_data"
		  	},{
		  		name:"Surgery",
		  		parent_pos:-1,
		  		column:"ci_treatment_data_surgery"
		  	},{
		  		name:"Radiation",
		  		parent_pos:-2,
		  		column:"ci_treatment_data_radiation"
		  	},{
		  		name:"Chemotherapy",
		  		parent_pos:-3,
		  		column:"ci_treatment_data_chemotherapy"
		  	},{
		  		name:"Hormonal Therapy",
		  		parent_pos:-4,
		  		column:"ci_treatment_data_hormonal_therapy"
		  	},{
		  		name:"Bone Marrow/Stem Cell Transplant",
		  		parent_pos:-5,
		  		column:"ci_treatment_data_bone_stem_cell"
		  	},{
		  		name:"Other Type of Treatment Specified",
		  		parent_pos:-6,
		  		column:"ci_treatment_data_other",
		  		specify:true,
		  		column_specify:"ci_treatment_data_other_specify"
		  	},{
		  		name:"Treatment Data from Administrative Claims",
		  		parent_pos:-7,
		  		column:"ci_data_source_admin_claims"
		  	},{
		  		name:"Treatment Data from Electronic Medical Records",
		  		parent_pos:-8,
		  		column:"ci_data_source_electronic_records"
		  	},{
		  		name:"Treatment Data from Medical Chart Abstraction",
		  		parent_pos:-9,
		  		column:"ci_data_source_chart_abstraction"
		  	},{
		  		name:"Treatment Data from Patient-reported Questionnaire",
		  		parent_pos:-10,
		  		column:"ci_data_source_patient_reported"
		  	},{
		  		name:"Treatment Data from Other Data Source Specified",
		  		parent_pos:-11,
		  		column:"ci_data_source_other",
		  		specify:true,
		  		column_specify:"ci_data_source_other_specify"
		  	},
		  	{
		  		name:"Possible to Collect Treatment Information",
		  		parent_pos:-12,
		  		column:"ci_collect_other_information"
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
				if(vl.specify){
					list.forEach(function(l){
						let v = l[vl.column];
						if(v == 0){
							v = "N/A";
						}
						else{
							v = l[vl.column_specify];
							v = v?v:"N/P";
						}
						tmp["c_"+l.cohort_id] = v;
					});
				}
				else{
					list.forEach(function(l){
						let v = l[vl.column];
						if(v == -1){
							v = "N/A";
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
		  		name:"Tumor Information",
		  		rows:6
		  	});
		  	values = [{
		  		name:"Cancer Staging Data Collected",
		  		column:"ci_cancer_staging_data"
		  	},{
		  		name:"Tumor Grade Data Collected",
		  		column:"ci_tumor_grade_data"
		  	},{
		  		name:"Tumor Genetic Markers Data Collected",
		  		column:"ci_tumor_genetic_markers_data",
		  		specify:true,
		  		column_specify:"ci_tumor_genetic_markers_data_describe"
		  	},{
		  		name:"Cancer Cases Histologically Confirmed",
		  		column:"ci_histologically_confirmed",
		  		values:["All","Some","None"]
		  	},{
		  		name:"Cancer Subtyping: Histological",
		  		column:"ci_cancer_subtype_histological"
		  	},{
		  		name:"Cancer Subtyping: Molecular",
		  		column:"ci_cancer_subtype_molecular"
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
							v = v?v:"N/P";
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
							if(l[vl.values]){
								v = l[vl.values][v];
							}
							else{
								v = v?"Yes":"No";
							}
						}
						tmp["c_"+l.cohort_id] = v;
					});
				}
				
				dt.list.push(tmp);
		  	});
		  	dt.list.push({
		  		type:"block",
		  		name:"Cancer Related Conditions",
		  		rows:4
		  	});
		  	values = [{
		  		name:"Acute Treatment-Related Toxicity",
		  		column:"mdc_acute_treatment_toxicity"
		  	},{
		  		name:"Late Effects of Treatment",
		  		column:"mdc_late_effects_of_treatment"
		  	},{
		  		name:"Symptoms Management",
		  		column:"mdc_symptoms_management"
		  	},{
		  		name:"Other Cancer Related Conditions Specified",
		  		column:"mdc_other_cancer_condition",
		  		specify:true,
		  		column_specify:"mdc_other_cancer_condition_specify"
		  	}];
		  	values.forEach(function(vl){
		  		let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
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
var mysql = require('../../components/mysql');

exports.run = function(req, res){
	let body = req.body;
	let cohorts = body.cohorts || [];

	let func = "cohort_specimen_overview";
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
		  		name:"Blood",
		  		rows:10
		  	});
		  	let values = [{
		  		name:"Collected Blood Specimens at Baseline",
		  		column:"bio_blood_baseline",
		  		rows:4
		  	},{
		  		name:"Serum and/or Plasma",
		  		column:"bio_blood_baseline_serum",
		  		parent_pos:-1
		  	},{
		  		name:"Plasma",
		  		column:"bio_blood_baseline_plasma",
		  		parent_pos:-2
		  	},{
		  		name:"Buffy Coat",
		  		column:"bio_blood_baseline_buffy_coat",
		  		parent_pos:-3
		  	},{
		  		name:"Other Blood Derivatives",
		  		column:"bio_blood_baseline_other_derivative",
		  		parent_pos:-4
		  	},{
		  		name:"Collected Blood Specimens at Other Time Points",
		  		column:"bio_blood_other_time",
		  		rows:4
		  	},{
		  		name:"Serum and/or Plasma",
		  		column:"bio_blood_other_time_serum",
		  		parent_pos:-1
		  	},{
		  		name:"Plasma",
		  		column:"bio_blood_other_time_plasma",
		  		parent_pos:-2
		  	},{
		  		name:"Buffy Coat",
		  		column:"bio_blood_other_time_buffy_coat",
		  		parent_pos:-3
		  	},{
		  		name:"Other Blood Derivatives",
		  		column:"bio_blood_other_time_other_derivative",
		  		parent_pos:-4
		  	}];
		  	values.forEach(function(vl){
		  		let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
				if(vl.parent_pos){
					tmp.parent_pos = vl.parent_pos;
				}
				if(vl.rows){
					tmp.rows = vl.rows;
				}
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
				dt.list.push(tmp);
		  	});
			dt.list.push({
		  		type:"block",
		  		name:"Buccal/Saliva",
		  		rows:2
		  	});
		  	values = [{
		  		name:"Collected Buccal/Saliva Specimens at Baseline",
		  		column:"bio_buccal_saliva_baseline"
		  	},{
		  		name:"Collected Buccal/Saliva Specimens at Other Time Points",
		  		column:"bio_buccal_saliva_other_time"
		  	}];
		  	values.forEach(function(vl){
		  		let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
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
		  		name:"Tumor Tissue",
		  		rows:3
		  	});
		  	values = [{
		  		name:"Collected Tumor Tissue (include tumor and/or normal) at Baseline",
		  		column:"bio_tissue_baseline"
		  	},{
		  		name:"Collected Tumor Tissue (include tumor and/or normal) at Other Time Points",
		  		column:"bio_tissue_other_time"
		  	},
		  	{
		  		name:"If Not Collecting Tumor Tissue, Collected Info on Where Blocks are Stored",
		  		column:"bio_tumor_block_info"
		  	}];
		  	values.forEach(function(vl){
		  		let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
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
		  		name:"Genomic Data",
		  		rows:5
		  	});
		  	values = [{
		  		name:"Genotyping Data (SNP)",
		  		column:"bio_genotyping_data"
		  	},{
		  		name:"Sequencing Data - Exome",
		  		column:"bio_sequencing_data_exome"
		  	},{
		  		name:"Sequencing Data - Whole Genome",
		  		column:"bio_sequencing_data_whole_genome"
		  	},{
		  		name:"Epigenetic or Metabolic Markers",
		  		column:"bio_epigenetic_or_metabolic_markers"
		  	},{
		  		name:"Other \"omic\" data",
		  		column:"bio_other_omics_data"
		  	}];
		  	values.forEach(function(vl){
		  		let tmp = {};
				tmp.type = "data";
				tmp.name = vl.name;
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
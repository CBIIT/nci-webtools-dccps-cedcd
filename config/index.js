/**
 * general configuration
 */

'use strict';

var path = require('path');
var _ = require('lodash');
var argv = require('minimist')(process.argv.slice(2));

var all = {
	
	// Root path of server
    root: path.normalize(__dirname + '/..'),

	//cookie max age in millseconds
	maxAge: 3600000,

	//time to live for cohort information
	cohort_ttl: 24 * 60 * 60,

	port: argv.p || 9221,

	gender:{
		"Female":"females",
		"Male":"males",
		"Unknown":"unknown"
	},
	race:{
		"American Indian / Alaska Native":"ai",
		"Asian":"asian",
		"Black or African-American":"black",
		"Native Hawaiian or Other Pacific Islander":"pi",
		"White":"white",
		"Other/Unknown":"unknown",
		"More than one race":"multiple"
	},
	ethnicity:{
		"Hispanic":"hispanic",
		"Non-Hispanic":"nonhispanic",
		"Unknown":"unknown"
	},
	collected_data:{
		"Alcohol Consumption":"mdc_alcohol_baseline,mdc_alcohol_followup",
		"Anthropometry":"mdc_anthropometry_baseline,mdc_anthropometry_followup",
		"Cancer Treatment":"ci_cancer_treatment_data",
		"Cigarette Smoking":"mdc_cigarette_baseline,mdc_cigarette_followup",
		"Cognitive Function":"mdc_cognitive_function_baseline,mdc_cognitive_function_followup",
		"Complementary and Alternative Medicine":"mdc_alternative_medicine_baseline,mdc_alternative_medicine_followup",
		"Depression":"mdc_depression_baseline,mdc_depression_followup",
		"Dietary Intake":"mdc_dietary_intake_baseline,mdc_dietary_intake_followup",
		"Dietary Supplement Use":"mdc_dietary_supplement_baseline,mdc_dietary_intake_followup",
		"Education Level":"mdc_education_baseline,mdc_education_followup",
		"Employment Status":"mdc_employment_baseline,mdc_employment_followup",
		"Environmental or Occupational Exposures":"mdc_environment_baseline,mdc_environment_followup",
		"Fatigue":"mdc_fatigue_baseline,mdc_fatigue_followup",
		"Genetic Information":"bio_genotyping_data,bio_sequencing_data_exome,bio_sequencing_data_whole_genome,bio_epigenetic_or_metabolic_markers",
		"Health Insurance Status":"mdc_health_insurance_baseline,mdc_health_insurance_followup",
		"Language/Country of Origin":"mdc_language_origin_baseline,mdc_language_origin_followup",
		"Marital Status":"mdc_marital_status_baseline,mdc_marital_status_followup",
		"Non-Prescription Medication":"mdc_nonprescription_drug_use_baseline,mdc_nonprescription_drug_use_followup",
		"Omics Data":"bio_other_omics_data",
		"Other Psychosocial Variables":"mdc_other_psychosocial_baseline,mdc_other_psychosocial_followup",
		"Other Tobacco Products":"mdc_other_tobacco_cigars_baseline,mdc_other_tobacco_cigars_followup,mdc_other_tobacco_pipes_baseline,mdc_other_tobacco_pipes_followup,mdc_other_tobacco_chewing_baseline,mdc_other_tobacco_chewing_followup,mdc_other_tobacco_ecigarette_baseline,mdc_other_tobacco_ecigarette_followup,mdc_other_tobacco_other_baseline,mdc_other_tobacco_other_followup",
		"Physical Activity":"mdc_physical_activity_baseline,mdc_physical_activity_followup",
		"Prescription Medication Use":"mdc_prescription_drug_use_baseline,mdc_prescription_drug_use_followup",
		"Quality of Life":"mdc_quality_of_life_baseline,mdc_quality_of_life_followup",
		"Reproductive History":"mdc_reproductive_history_baseline,mdc_reproductive_history_followup",
		"Residential Information":"mdc_residential_infomation_baseline,mdc_residential_infomation_followup",
		"Self-Reported Health":"mdc_self_reported_health_baseline,mdc_self_reported_health_followup",
		"Sleeping Habits":"mdc_sleep_habits_baseline,mdc_sleep_habits_followup",
		"Social Support":"mdc_social_support_baseline,mdc_social_support_followup",
		"Socio-Economic Status":"mdc_income_baseline,mdc_income_followup"
	},
	collected_specimen:{
		"Blood":"bio_blood_baseline,bio_blood_other_time",
		"Buccal/Saliva":"bio_buccal_saliva_baseline,bio_buccal_saliva_other_time",
		"Tissue (includes tumor and/or normal)":"bio_tissue_baseline,bio_tissue_other_time"
	},
	cancer:{
		"Oropharyngeal":"oropharyngeal",
		"Esophagus":"esophagus",
		"Stomach":"stomach",
		"Small intestine":"small_intestine",
		"Colon":"colon",
		"Rectum and anus":"rectum",
		"Liver and intrahepatic bile ducts":"liver",
		"Gall bladder and extrahepatic bile duct":"gall_bladder",
		"Pancreas":"pancreas",
		"Trachea, bronchus, and lung":"lung",	
		"Bone":"bone",
		"Melanoma (excluding genital organs)":"melanoma",
		"Breast":"breast",
		"Cervix":"cervix",
		"Corpus, body of uterus":"corpus",
		"Ovary, fallopian tube, broad ligament":"ovary",	
		"Prostate":"prostate",	
		"Bladder":"bladder",
		"Kidney and other unspecified urinary organs including renal pelvis, ureter, urethra":"kidney",
		"Brain":"brain",
		"Thyroid":"thyroid",
		"Lymphoma (HL and NHL)":"lymphoma",	
		"Myeloma":"myeloma",
		"Leukemia":"leukemia",
		"No Cancer":"no_cancer",
		"All Other Cancers":"all_other_cancers"
	},
	eligible_disease_state:{
		"Cancer Survivors Only":0,
		"Generally Healthy, No Previous Cancer Diagnosis":1,
		"Other":2
	},
	specimen:{
		"Buffy Coat and/or Lymphocytes":"buffy",
		"Feces":"feces",
		"Saliva and/or Buccal":"saliva",
		"Serum and/or Plasma":"serum",
		"Tumor Tissue: Fresh/Frozen":"tumor_tissue_1",
		"Tumor Tissue: FFPE":"tumor_tissue_2",
		"Urine":"urine"
	}

};

module.exports = _.merge(all, require('./project.settings.js'));
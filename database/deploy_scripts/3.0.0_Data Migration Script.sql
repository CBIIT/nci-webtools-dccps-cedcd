/*
* CEDCD migration script move data from older ver to new ver DB (based on new questionnaire  v8 in 2020)
*  assume old ver DB schema name is  : cedcd 
*  create Tables and initial LookUp data is populated in lookup tables
*/

/*
*  Migration Store-procedure list
* 1. Migrate_cancer_counts
* 2. Migrate_enrollment_counts
* 3. Migrate_major_content
* 4. Migrate_person
* 5. Migrate_specimens_counts
*
*/
/* 
CREATE PROCEDUREs
*/
DELIMITER //

DROP PROCEDURE IF EXISTS `Migrate_cancer_counts` //

CREATE PROCEDURE `Migrate_cancer_counts`()
BEGIN
	-- Bladder
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),2,ci_bladder_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),1,ci_bladder_female
	from cedcd_old.cohort_cancer;

	-- Bone
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),2,ci_bone_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),1,ci_bone_female
	from cedcd_old.cohort_cancer;

	-- Brain
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),2,ci_brain_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),1,ci_brain_female
	from cedcd_old.cohort_cancer;

	-- Breast
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Invasive Breast Cancer"),2,ci_breast_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Invasive Breast Cancer"),1,ci_breast_female
	from cedcd_old.cohort_cancer;

	-- Carcinoma

	-- Cervix
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix (Squamous cell carcinoma, Adenocarcinoma)"),2,ci_cervix_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix (Squamous cell carcinoma, Adenocarcinoma)"),1,ci_cervix_female
	from cedcd_old.cohort_cancer;

	-- Colon
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),2,ci_colon_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),1,ci_colon_female
	from cedcd_old.cohort_cancer;

	-- Corpus, body of uterus
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),2,ci_corpus_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),1,ci_corpus_female
	from cedcd_old.cohort_cancer;

	-- Esophagus
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),2,ci_esophagus_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),1,ci_esophagus_female
	from cedcd_old.cohort_cancer;

	-- Gall bladder and extrahepatic bile ducts
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile ducts"),2,ci_gall_bladder_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile ducts"),1,ci_gall_bladder_female
	from cedcd_old.cohort_cancer;

	-- Kidney and other unspecified urinary organs
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),2,ci_kidney_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),1,ci_kidney_female
	from cedcd_old.cohort_cancer;

	-- Leukemia
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),2,ci_leukemia_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),1,ci_leukemia_female
	from cedcd_old.cohort_cancer;

	-- Liver and intrahepatic bile ducts
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),2,ci_liver_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),1,ci_liver_female
	from cedcd_old.cohort_cancer;

	-- Hodgkin Lymphoma
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),2,ci_lymphoma_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),1,ci_lymphoma_female
	from cedcd_old.cohort_cancer;

	-- Melanoma (excluding mucosal sites)
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding mucosal sites)"),2,ci_melanoma_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding mucosal sites)"),1,ci_melanoma_female
	from cedcd_old.cohort_cancer;

	-- Myeloma
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),2,ci_myeloma_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),1,ci_myeloma_female
	from cedcd_old.cohort_cancer;

	-- Non-Hodgkin Lymphoma
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),2,ci_lymphoma_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),1,ci_lymphoma_female
	from cedcd_old.cohort_cancer;

	-- Oropharyngeal
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),2,ci_oropharyngeal_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),1,ci_oropharyngeal_female
	from cedcd_old.cohort_cancer;

	-- Ovary, fallopian tube, broad ligament
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),2,ci_ovary_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),1,ci_ovary_female
	from cedcd_old.cohort_cancer;

	-- Pancreas
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),2,ci_pancreas_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),1,ci_pancreas_female
	from cedcd_old.cohort_cancer;

	-- Prostate
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),2,ci_prostate_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),1,ci_prostate_female
	from cedcd_old.cohort_cancer;

	-- Rectum and anus
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),2,ci_rectum_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),1,ci_rectum_female
	from cedcd_old.cohort_cancer;

	-- Small intestine
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),2,ci_small_intestine_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),1,ci_small_intestine_female
	from cedcd_old.cohort_cancer;

	-- Stomach
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),2,ci_stomach_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),1,ci_stomach_female
	from cedcd_old.cohort_cancer;

	-- Thyroid
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),2,ci_thyroid_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),1,ci_thyroid_female
	from cedcd_old.cohort_cancer;

	-- Lung and bronchus
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Lung and bronchus"),2,ci_lung_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Lung and bronchus"),1,ci_lung_female
	from cedcd_old.cohort_cancer;

	-- All Other Cancers
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),2,ci_all_other_cancers_male
	from cedcd_old.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),1,ci_all_other_cancers_female
	from cedcd_old.cohort_cancer;
END //


DROP PROCEDURE IF EXISTS `Migrate_enrollment_counts` //

CREATE PROCEDURE `Migrate_enrollment_counts`()
BEGIN
	set @i = 1;
	set @j = 1;
	set @k = 1;
    set @fs = 'race_ai_nonhispanic_females,race_ai_nonhispanic_males,race_ai_nonhispanic_unknown,
    race_ai_hispanic_females,race_ai_hispanic_males,race_ai_hispanic_unknown,
    race_ai_unknown_females,race_ai_unknown_males,race_ai_unknown_unknown,
    race_asian_nonhispanic_females,race_asian_nonhispanic_males,race_asian_nonhispanic_unknown,
    race_asian_hispanic_females,race_asian_hispanic_males,race_asian_hispanic_unknown,
    race_asian_unknown_females,race_asian_unknown_males,race_asian_unknown_unknown,
    race_pi_nonhispanic_females,race_pi_nonhispanic_males,race_pi_nonhispanic_unknown,
    race_pi_hispanic_females,race_pi_hispanic_males,race_pi_hispanic_unknown,
    race_pi_unknown_females,race_pi_unknown_males,race_pi_unknown_unknown,
    race_black_nonhispanic_females,race_black_nonhispanic_males,race_black_nonhispanic_unknown,
    race_black_hispanic_females,race_black_hispanic_males,race_black_hispanic_unknown,
    race_black_unknown_females,race_black_unknown_males,race_black_unknown_unknown,
    race_white_nonhispanic_females,race_white_nonhispanic_males,race_white_nonhispanic_unknown,
    race_white_hispanic_females,race_white_hispanic_males,race_white_hispanic_unknown,
    race_white_unknown_females,race_white_unknown_males,race_white_unknown_unknown,
    race_multiple_nonhispanic_females,race_multiple_nonhispanic_males,race_multiple_nonhispanic_unknown,
    race_multiple_hispanic_females,race_multiple_hispanic_males,race_multiple_hispanic_unknown,
    race_multiple_unknown_females,race_multiple_unknown_males,race_multiple_unknown_unknown,
    race_unknown_nonhispanic_females,race_unknown_nonhispanic_males,race_unknown_nonhispanic_unknown,
    race_unknown_hispanic_females,race_unknown_hispanic_males,race_unknown_hispanic_unknown,
    race_unknown_unknown_females,race_unknown_unknown_males,race_unknown_unknown_unknown,';
	while @i < 8 do
		set @j = 1;
		while @j < 4 do
			set @k = 1;
			while @k < 4 do
				set @field = SUBSTRING(@fs, 1,  LOCATE(',', @fs) -1);
                set @query = concat("insert into enrollment_count(cohort_id,race_id,ethnicity_id,gender_id,enrollment_counts) select cohort_id," , @i);
                set @query = concat(@query, ",");
                set @query = concat(@query, @j);
                set @query = concat(@query, ",");
                set @query = concat(@query, @k);
                set @query = concat(@query, ",");
                set @query = concat(@query, @field);
                set @query = concat(@query, " from cedcd_old.cohort_enrollment");
                
                PREPARE stmt FROM @query;
				EXECUTE stmt;
				DEALLOCATE PREPARE stmt;
				set @fs = SUBSTRING(@fs, LOCATE(',', @fs) + 1);
				set @k = @k + 1;
			end while;
			set @j = @j + 1;
		end while;
		set @i = @i + 1;
	end while;
END //


DROP PROCEDURE IF EXISTS `Migrate_major_content` //

CREATE PROCEDURE `Migrate_major_content`()
BEGIN
	-- 1-Socio-economic Status (e.g., income)
	insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,1,mdc_income_baseline,mdc_income_followup,"",""  
    from cedcd_old.cohort_major_content;
	-- 2-Education Level
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,2,mdc_education_baseline,mdc_education_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 3-Marital Status
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,3,mdc_marital_status_baseline,mdc_marital_status_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 4-Language/Country of Origin
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,4,mdc_language_origin_baseline,mdc_language_origin_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 5-Employment Status
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,5,mdc_employment_baseline,mdc_employment_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 6-Health Insurance Status
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,6,mdc_health_insurance_baseline,mdc_health_insurance_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 7-Anthropometry (e.g., weight, height, waist circumference)
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,7,mdc_anthropometry_baseline,mdc_anthropometry_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 8-Dietary Intake
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,8,mdc_dietary_intake_baseline,mdc_dietary_intake_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 9-Dietary Supplement Use
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,9,mdc_dietary_supplement_baseline,mdc_dietary_supplement_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 10-Complementary and Alternative Medicine
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,10,mdc_alternative_medicine_baseline,mdc_alternative_medicine_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 11-Prescription Medication Use (not related to cancer treatment)
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,11,mdc_prescription_drug_use_baseline,mdc_prescription_drug_use_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 12-Non-prescription Medication Use (not related to cancer treatment)
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,12,mdc_nonprescription_drug_use_baseline,mdc_nonprescription_drug_use_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 13-Alcohol Consumption
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,13,mdc_alcohol_baseline,mdc_alcohol_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 14-Cigarette Smoking
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,14,mdc_cigarette_baseline,mdc_cigarette_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 15-Use of Tobacco Products Other than Cigarettes
		-- 1-Cigars
        insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,15,mdc_other_tobacco_cigars_baseline,mdc_other_tobacco_cigars_followup,"","" 
		from cedcd_old.cohort_major_content;
		-- 2-Pipes
        insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,16,mdc_other_tobacco_pipes_baseline,mdc_other_tobacco_pipes_followup,"","" 
		from cedcd_old.cohort_major_content;
		-- 3-Chewing tobacco
        insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,17,mdc_other_tobacco_chewing_baseline,mdc_other_tobacco_chewing_followup,"","" 
		from cedcd_old.cohort_major_content;
		-- 4-E-Cigarettes
        insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,18,mdc_other_tobacco_ecigarette_baseline,mdc_other_tobacco_ecigarette_followup,"","" 
		from cedcd_old.cohort_major_content;
		-- 5-Other
		insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,19,mdc_other_tobacco_other_baseline,mdc_other_tobacco_other_followup,mdc_other_tobacco_other_specify_baseline,mdc_other_tobacco_other_specify_followup 
		from cedcd_old.cohort_major_content;
	-- 16-Physical Activity
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,20,mdc_physical_activity_baseline,mdc_physical_activity_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 17-Sleep Habits
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,21,mdc_sleep_habits_baseline,mdc_sleep_habits_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 18-Reproductive History
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,22,mdc_reproductive_history_baseline,mdc_reproductive_history_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 19-Self-Reported Health
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,23,mdc_self_reported_health_baseline,mdc_self_reported_health_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 20-Quality of Life 
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,24,mdc_quality_of_life_baseline,mdc_quality_of_life_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 21-Social Support
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,25,mdc_social_support_baseline,mdc_social_support_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 22-Cognitive Function
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,26,mdc_cognitive_function_baseline,mdc_cognitive_function_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 23-Depression
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,27,mdc_depression_baseline,mdc_depression_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 24-Other Psychosocial Variables
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,28,mdc_other_psychosocial_baseline,mdc_other_psychosocial_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 25-Fatigue
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,29,mdc_fatigue_baseline,mdc_fatigue_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 26-Family History of Cancer
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,30,mdc_family_hsitory_of_cancer_baseline,mdc_family_hsitory_of_cancer_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 27-Family History of Cancer with Pedigrees
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,31,mdc_family_hsitory_of_cancer_pedigrees_baseline,mdc_family_hsitory_of_cancer_pedigrees_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 28-Environmental or Occupational Exposures (e.g. air contaminants/quality, occupational exposures and history, water source)
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,32,mdc_environment_baseline,mdc_environment_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 29-Residential history Information (zip code, GIS) over time?
    insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,33,mdc_residential_infomation_baseline,mdc_residential_infomation_followup,"","" 
    from cedcd_old.cohort_major_content;
	-- 30-Other Medical Conditions
		-- 6-Diabetes
        insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,34,mdc_diabetes_baseline,mdc_diabetes_followup,"","" 
		from cedcd_old.cohort_major_content;
		-- 7-Stroke
        insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,35,mdc_stroke_baseline,mdc_stroke_followup,"","" 
		from cedcd_old.cohort_major_content;
		-- 8-COPD and/or Emphysema
        insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,36,mdc_copd_baseline,mdc_copd_followup,"","" 
		from cedcd_old.cohort_major_content;
		-- 9-Cardiovascular Disease
        insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,37,mdc_cardiovascular_disease_baseline,mdc_cardiovascular_disease_followup,"","" 
		from cedcd_old.cohort_major_content;
		-- 10-Osteoporosis
        insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,38,mdc_osteoporosis_baseline,mdc_osteoporosis_followup,"","" 
		from cedcd_old.cohort_major_content;
		-- 11-Mental Health
        insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,39,mdc_mental_health_baseline,mdc_mental_health_followup,"","" 
		from cedcd_old.cohort_major_content;
		-- 12-Cognitive Decline
        insert into major_content(cohort_id,category_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,40,mdc_cognitive_decline_baseline,mdc_cognitive_decline_followup,"","" 
		from cedcd_old.cohort_major_content;
END //


DROP PROCEDURE IF EXISTS `Migrate_person` //

CREATE PROCEDURE `Migrate_person`()
BEGIN
	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,1,completed_by_name,completed_by_position,'',completed_by_phone,completed_by_email
	from cedcd_old.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,2,contact_name,contact_position,'',contact_phone,contact_email
	from cedcd_old.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_1,
	'',
	pi_institution_1,
	'',
	pi_email_1
	from cedcd_old.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_2,
	'',
	pi_institution_2,
	'',
	pi_email_2
	from cedcd_old.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_3,
	'',
	pi_institution_3,
	'',
	pi_email_3
	from cedcd_old.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_4,
	'',
	pi_institution_4,
	'',
	pi_email_4
	from cedcd_old.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_5,
	'',
	pi_institution_5,
	'',
	pi_email_5
	from cedcd_old.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_6,
	'',
	pi_institution_6,
	'',
	pi_email_6
	from cedcd_old.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,4,
	collab_contact_name,
	collab_contact_position,
	'',
	collab_contact_phone,
	collab_contact_email
	from cedcd_old.cohort_basic;
END //

DROP PROCEDURE IF EXISTS `Migrate_specimens_counts` //

CREATE PROCEDURE `Migrate_specimens_counts`()
BEGIN
	-- Bladder
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),1,bio_bladder_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),2,bio_bladder_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),3,bio_bladder_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),4,bio_bladder_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),5,bio_bladder_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),6,bio_bladder_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),7,bio_bladder_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Bone
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),1,bio_bone_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),2,bio_bone_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),3,bio_bone_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),4,bio_bone_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),5,bio_bone_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),6,bio_bone_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),7,bio_bone_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Brain
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),1,bio_brain_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),2,bio_brain_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),3,bio_brain_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),4,bio_brain_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),5,bio_brain_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),6,bio_brain_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),7,bio_brain_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Breast
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Invasive Breast Cancer"),1,bio_breast_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Invasive Breast Cancer"),2,bio_breast_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Invasive Breast Cancer"),3,bio_breast_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Invasive Breast Cancer"),4,bio_breast_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Invasive Breast Cancer"),5,bio_breast_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Invasive Breast Cancer"),6,bio_breast_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Invasive Breast Cancer"),7,bio_breast_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Carcinoma

	-- Cervix
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix (Squamous cell carcinoma, Adenocarcinoma)"),1,bio_cervix_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix (Squamous cell carcinoma, Adenocarcinoma)"),2,bio_cervix_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix (Squamous cell carcinoma, Adenocarcinoma)"),3,bio_cervix_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix (Squamous cell carcinoma, Adenocarcinoma)"),4,bio_cervix_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix (Squamous cell carcinoma, Adenocarcinoma)"),5,bio_cervix_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix (Squamous cell carcinoma, Adenocarcinoma)"),6,bio_cervix_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix (Squamous cell carcinoma, Adenocarcinoma)"),7,bio_cervix_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Colon
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),1,bio_colon_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),2,bio_colon_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),3,bio_colon_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),4,bio_colon_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),5,bio_colon_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),6,bio_colon_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),7,bio_colon_tumor_tissue_2
	from cedcd_old.cohort_specimens;
    
	-- Corpus, body of uterus
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),1,bio_corpus_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),2,bio_corpus_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),3,bio_corpus_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),4,bio_corpus_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),5,bio_corpus_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),6,bio_corpus_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),7,bio_corpus_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Esophagus
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),1,bio_esophagus_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),2,bio_esophagus_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),3,bio_esophagus_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),4,bio_esophagus_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),5,bio_esophagus_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),6,bio_esophagus_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),7,bio_esophagus_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Gall bladder and extrahepatic bile ducts
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile ducts"),1,bio_gall_bladder_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile ducts"),2,bio_gall_bladder_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile ducts"),3,bio_gall_bladder_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile ducts"),4,bio_gall_bladder_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile ducts"),5,bio_gall_bladder_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile ducts"),6,bio_gall_bladder_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile ducts"),7,bio_gall_bladder_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Kidney and other unspecified urinary organs
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),1,bio_kidney_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),2,bio_kidney_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),3,bio_kidney_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),4,bio_kidney_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),5,bio_kidney_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),6,bio_kidney_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),7,bio_kidney_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Leukemia
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),1,bio_leukemia_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),2,bio_leukemia_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),3,bio_leukemia_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),4,bio_leukemia_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),5,bio_leukemia_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),6,bio_leukemia_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),7,bio_leukemia_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Liver and intrahepatic bile ducts
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),1,bio_liver_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),2,bio_liver_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),3,bio_liver_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),4,bio_liver_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),5,bio_liver_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),6,bio_liver_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),7,bio_liver_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Hodgkin Lymphoma
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),1,bio_lymphoma_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),2,bio_lymphoma_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),3,bio_lymphoma_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),4,bio_lymphoma_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),5,bio_lymphoma_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),6,bio_lymphoma_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),7,bio_lymphoma_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Melanoma (excluding mucosal sites)
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding mucosal sites)"),1,bio_melanoma_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding mucosal sites)"),2,bio_melanoma_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding mucosal sites)"),3,bio_melanoma_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding mucosal sites)"),4,bio_melanoma_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding mucosal sites)"),5,bio_melanoma_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding mucosal sites)"),6,bio_melanoma_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding mucosal sites)"),7,bio_melanoma_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Myeloma
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),1,bio_myeloma_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),2,bio_myeloma_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),3,bio_myeloma_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),4,bio_myeloma_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),5,bio_myeloma_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),6,bio_myeloma_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),7,bio_myeloma_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Non-Hodgkin Lymphoma
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),1,bio_lymphoma_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),2,bio_lymphoma_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),3,bio_lymphoma_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),4,bio_lymphoma_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),5,bio_lymphoma_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),6,bio_lymphoma_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),7,bio_lymphoma_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Oropharyngeal
    insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),1,bio_oropharyngeal_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),2,bio_oropharyngeal_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),3,bio_oropharyngeal_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),4,bio_oropharyngeal_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),5,bio_oropharyngeal_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),6,bio_oropharyngeal_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),7,bio_oropharyngeal_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Ovary, fallopian tube, broad ligament
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),1,bio_ovary_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),2,bio_ovary_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),3,bio_ovary_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),4,bio_ovary_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),5,bio_ovary_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),6,bio_ovary_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),7,bio_ovary_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Pancreas
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),1,bio_pancreas_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),2,bio_pancreas_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),3,bio_pancreas_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),4,bio_pancreas_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),5,bio_pancreas_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),6,bio_pancreas_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),7,bio_pancreas_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Prostate
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),1,bio_prostate_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),2,bio_prostate_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),3,bio_prostate_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),4,bio_prostate_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),5,bio_prostate_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),6,bio_prostate_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),7,bio_prostate_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Rectum and anus
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),1,bio_rectum_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),2,bio_rectum_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),3,bio_rectum_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),4,bio_rectum_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),5,bio_rectum_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),6,bio_rectum_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),7,bio_rectum_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Small intestine
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),1,bio_small_intestine_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),2,bio_small_intestine_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),3,bio_small_intestine_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),4,bio_small_intestine_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),5,bio_small_intestine_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),6,bio_small_intestine_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),7,bio_small_intestine_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Stomach
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),1,bio_stomach_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),2,bio_stomach_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),3,bio_stomach_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),4,bio_stomach_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),5,bio_stomach_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),6,bio_stomach_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),7,bio_stomach_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Thyroid
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),1,bio_thyroid_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),2,bio_thyroid_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),3,bio_thyroid_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),4,bio_thyroid_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),5,bio_thyroid_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),6,bio_thyroid_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),7,bio_thyroid_tumor_tissue_2
	from cedcd_old.cohort_specimens;

	-- Lung and bronchus
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Lung and bronchus"),1,bio_lung_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Lung and bronchus"),2,bio_lung_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Lung and bronchus"),3,bio_lung_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Lung and bronchus"),4,bio_lung_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Lung and bronchus"),5,bio_lung_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Lung and bronchus"),6,bio_lung_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Lung and bronchus"),7,bio_lung_tumor_tissue_2
	from cedcd_old.cohort_specimens;
    
	-- All Other Cancers
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),1,bio_all_other_cancers_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),2,bio_all_other_cancers_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),3,bio_all_other_cancers_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),4,bio_all_other_cancers_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),5,bio_all_other_cancers_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),6,bio_all_other_cancers_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),7,bio_all_other_cancers_tumor_tissue_2
	from cedcd_old.cohort_specimens;
    
    -- No Cancer
    insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),1,bio_no_cancer_serum
	from cedcd_old.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),2,bio_no_cancer_buffy
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),3,bio_no_cancer_saliva
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),4,bio_no_cancer_urine
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),5,bio_no_cancer_feces
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),6,bio_no_cancer_tumor_tissue_1
	from cedcd_old.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),7,bio_no_cancer_tumor_tissue_2
	from cedcd_old.cohort_specimens;

END //

DROP PROCEDURE IF EXISTS `Migrate_specimens_collected` //

CREATE PROCEDURE `Migrate_specimens_collected`()
BEGIN
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_baseline"),bio_blood_baseline
	from cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_baseline_serum"),bio_blood_baseline_serum
	from cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_baseline_plasma"),bio_blood_baseline_plasma
	from cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_baseline_buffy_coat"),bio_blood_baseline_buffy_coat
	from cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_baseline_other_derivative"),bio_blood_baseline_other_derivative
	from cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_other_time"),bio_blood_other_time
	from cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_other_time_serum"),bio_blood_other_time_serum
	from cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_other_time_plasma"),bio_blood_other_time_plasma
	from cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_other_time_buffy_coat"),bio_blood_other_time_buffy_coat
	from cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_other_time_other_derivative"),bio_blood_other_time_other_derivative
	from cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_buccal_saliva_baseline"),bio_buccal_saliva_baseline
	from cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_buccal_saliva_other_time"),bio_buccal_saliva_other_time
	from cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_tissue_baseline"),bio_tissue_baseline
	from cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_tissue_other_time"),bio_tissue_other_time
	from cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_tumor_block_info"),bio_tumor_block_info
	from cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_genotyping_data"),bio_genotyping_data
	from cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_sequencing_data_exome"),bio_sequencing_data_exome
	from cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_sequencing_data_whole_genome"),bio_sequencing_data_whole_genome
	from cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_epigenetic_or_metabolic_markers"),bio_epigenetic_or_metabolic_markers
	from cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_other_omics_data"),bio_other_omics_data
	from cedcd_old.cohort_specimens;

END //

DELIMITER ;

/*
Generate data for major table cohort from old cedcd schema
*/
insert into cohort (id, name, acronym, create_by, status, cohort_last_update_date, submit_by, publish_by, publish_time,document_ver,create_time, update_time)
select cohort_id, cohort_name, cohort_acronym, 1, 'published',update_time, 1, 1, update_time, '4.0', create_time,update_time
from cedcd_old.cohort_basic;

/*
Migrate data from table cohort_basic to cohort_basic
*/
insert into cohort_basic (
id,
cohort_id,
cohort_name,
cohort_acronym,
cohort_web_site,
clarification_contact,
cohort_description,
eligible_gender_id,
eligible_disease,
eligible_disease_cancer_specify,
eligible_disease_other_specify,
enrollment_total,
enrollment_year_start,
enrollment_year_end,
enrollment_ongoing,
enrollment_target,
enrollment_year_complete,
enrollment_age_min,
enrollment_age_max,
enrollment_age_median,
enrollment_age_mean,
time_interval,
most_recent_year,
data_collected_in_person,
data_collected_phone,
data_collected_paper,
data_collected_web,
data_collected_other,
data_collected_other_specify,
other_tools,
other_tools_specify,
restrictions,
restrictions_other_specify,
status,
create_time,
update_time
)
select cohort_id,cohort_id,
cohort_name,
cohort_acronym,
cohort_web_site,
clarification_contact,
cohort_description,
case when eligible_gender = 0 then 4
             when eligible_gender = 1 then 1
             when eligible_gender = 2 then 2
             else 3
             end,
eligible_disease,
eligible_disease_cancer_specify,
eligible_disease_other_specify,
enrollment_total,
enrollment_year_start,
enrollment_year_end,
enrollment_ongoing,
enrollment_target,
enrollment_year_complete,
enrollment_age_min,
enrollment_age_max,
enrollment_age_median,
enrollment_age_mean,
time_interval,
most_recent_year,
data_collected_in_person,
data_collected_phone,
data_collected_paper,
data_collected_web,
data_collected_other,
data_collected_other_specify,
other_tools,
other_tools_specify,
CONCAT(restrictions_none,'_',restrictions_require_collaboration,'_',
restrictions_require_irb,'_',restrictions_require_agreement,'_',
restrictions_on_genetic_use,'_',restrictions_on_linking,'_',restrictions_on_commercial_use,'_',restrictions_other),
restrictions_other_specify,
status,
create_time,
update_time
from cedcd_old.cohort_basic;

/*
Migrate data from table cohort_attachment to cohort_attachment_new
* new schema attachment changed to name cohort_document, accoridng to new questionnaire (v8.1)
* from orginal data, category 0 and 1 would be considered as questionnaire category (0)
*/
insert into cohort_document (
id,
cohort_id,
attachment_type,
category,
filename,
website,
status,
create_time
)
select attachment_id,
cohort_id,
attachment_type,
(case when category < 2 then 0 else category -1 end) category,
filename,
website,
status,
create_time
from cedcd_old.cohort_attachment;

/*
Migrate data from table cohort_basic to cohort_contact
*/
CALL Migrate_person();

/*
Migrate data from table cohort_cancer to cohort_cancer_info
*/
insert into cancer_info (
cohort_id,
ci_confirmed_cancer_year,
ci_ascertained_self_reporting,
ci_ascertained_tumor_registry,
ci_ascertained_medical_records,
ci_ascertained_other,
ci_ascertained_other_specify,
ci_cancer_recurrence,
ci_second_primary_diagnosis,
ci_cancer_treatment_data,
ci_treatment_data_surgery,
ci_treatment_data_radiation,
ci_treatment_data_chemotherapy,
ci_treatment_data_hormonal_therapy,
ci_treatment_data_bone_stem_cell,
ci_treatment_data_other,
ci_treatment_data_other_specify,
ci_data_source_admin_claims,
ci_data_source_electronic_records,
ci_data_source_chart_abstraction,
ci_data_source_patient_reported,
ci_data_source_other,
ci_data_source_other_specify,
ci_collect_other_information,
ci_cancer_staging_data,
ci_tumor_grade_data,
ci_tumor_genetic_markers_data,
ci_tumor_genetic_markers_data_describe,
ci_histologically_confirmed,
ci_cancer_subtype_histological,
ci_cancer_subtype_molecular,
mdc_acute_treatment_toxicity,
mdc_late_effects_of_treatment,
mdc_symptoms_management,
mdc_other_cancer_condition,
mdc_other_cancer_condition_specify,
create_time,
update_time
)
select cc.cohort_id,
cc.ci_confirmed_cancer_year,
cc.ci_ascertained_self_reporting,
cc.ci_ascertained_tumor_registry,
cc.ci_ascertained_medical_records,
cc.ci_ascertained_other,
cc.ci_ascertained_other_specify,
cc.ci_cancer_recurrence,
cc.ci_second_primary_diagnosis,
cc.ci_cancer_treatment_data,
cc.ci_treatment_data_surgery,
cc.ci_treatment_data_radiation,
cc.ci_treatment_data_chemotherapy,
cc.ci_treatment_data_hormonal_therapy,
cc.ci_treatment_data_bone_stem_cell,
cc.ci_treatment_data_other,
cc.ci_treatment_data_other_specify,
cc.ci_data_source_admin_claims,
cc.ci_data_source_electronic_records,
cc.ci_data_source_chart_abstraction,
cc.ci_data_source_patient_reported,
cc.ci_data_source_other,
cc.ci_data_source_other_specify,
cc.ci_collect_other_information,
cc.ci_cancer_staging_data,
cc.ci_tumor_grade_data,
cc.ci_tumor_genetic_markers_data,
cc.ci_tumor_genetic_markers_data_describe,
cc.ci_histologically_confirmed,
cc.ci_cancer_subtype_histological,
cc.ci_cancer_subtype_molecular,
cmc.mdc_acute_treatment_toxicity,
cmc.mdc_late_effects_of_treatment,
cmc.mdc_symptoms_management,
cmc.mdc_other_cancer_condition,
cmc.mdc_other_cancer_condition_specify,
cc.create_time,
cc.update_time
from cedcd_old.cohort_cancer cc , cedcd_old.cohort_major_content cmc
where cc.cohort_id = cmc.cohort_id;

/*
Migrate data from table cohort_cancer to cohort_cancer_counts
*/

CALL Migrate_cancer_counts();

/*
Migrate data from table cohort_dlh to cohort_dlh_new
*/
insert into dlh (
cohort_id,
dlh_linked_to_existing_databases,
dlh_linked_to_existing_databases_specify,
dlh_harmonization_projects,
dlh_harmonization_projects_specify,
dlh_nih_repository,
dlh_nih_cedr,
dlh_nih_dbgap,
dlh_nih_biolincc,
dlh_nih_other,
create_time,
update_time
)
select cohort_id,
dlh_linked_to_existing_databases,
dlh_linked_to_existing_databases_specify,
dlh_harmonization_projects,
dlh_harmonization_projects_specify,
dlh_nih_repository,
dlh_nih_cedr,
dlh_nih_dbgap,
dlh_nih_biolincc,
dlh_nih_other,
create_time,
update_time
from cedcd_old.cohort_dlh;

/*  update dlh request_proecedure data from cohort_basic */

UPDATE dlh a
INNER JOIN cedcd_old.cohort_basic b ON a.cohort_id = b.cohort_id
SET a.dlh_procedure_online = IF(b.request_procedures_pdf = 1 OR request_procedures_web =1 , 1 ,0),
a.dlh_procedure_website = b.request_procedures_web,
a.dlh_procedure_url = b.request_procedures_web_url,
a.dlh_procedure_attached = b.request_procedures_pdf
where a.cohort_id > 1;


/*
Migrate data from table cohort_enrollment to cohort_enrollment_counts
*/
CALL Migrate_enrollment_counts();

/*
Migrate data from table cohort_major_content to cohort_major_content_new
*/
CALL Migrate_major_content();

/*
Migrate data from table cohort_mortality to cohort_mortality_new
*/
insert into mortality (
cohort_id,
mort_year_mortality_followup,
mort_death_confirmed_by_ndi_linkage,
mort_death_confirmed_by_death_certificate,
mort_death_confirmed_by_other,
mort_death_confirmed_by_other_specify,
mort_have_date_of_death,
mort_have_cause_of_death,
mort_death_code_used_icd9,
mort_death_code_used_icd10,
mort_death_not_coded,
mort_death_code_used_other,
mort_death_code_used_other_specify,
mort_number_of_deaths,
create_time,
update_time
)
select cohort_id,
mort_year_mortality_followup,
mort_death_confirmed_by_ndi_linkage,
mort_death_confirmed_by_death_certificate,
mort_death_confirmed_by_other,
mort_death_confirmed_by_other_specify,
mort_have_date_of_death,
mort_have_cause_of_death,
mort_death_code_used_icd9,
mort_death_code_used_icd10,
mort_death_not_coded,
mort_death_code_used_other,
mort_death_code_used_other_specify,
mort_number_of_deaths,
create_time,
update_time
from cedcd_old.cohort_mortality;

/*
Migrate data from table cohort_specimens to cohort_specimens_new
*/
insert into specimen (
cohort_id
)
select cohort_id
from cedcd_old.cohort_specimens;

/*
Migrate data from table contact to contact
*/

insert into contact select * from cedcd_old.contact;

/*
Migrate data from table cohort_specimens to cohort_specimens_counts
*/
CALL Migrate_specimens_counts();

CALL Migrate_specimens_collected();

/*
Migrate data from table cohort_technology to technology
*/
insert into technology (
  id,
  cohort_id,
  tech_use_of_mobile,
  tech_use_of_mobile_describe,
  tech_use_of_cloud,
  tech_use_of_cloud_describe
)
select technology_id,
  cohort_id,
  tech_use_of_mobile,
  tech_use_of_mobile_describe,
  tech_use_of_cloud,
  tech_use_of_cloud_describe
from cedcd_old.cohort_technology;

/*
*  update published cohort status 
*/

DROP PROCEDURE IF EXISTS `update_cohort_published_status`;

DELIMITER //

CREATE PROCEDURE `update_cohort_published_status`()
BEGIN
  DECLARE bDone INT;

  DECLARE var1 INT;    -- or approriate type
 
  DECLARE curs CURSOR FOR  SELECT id FROM cohort WHERE status ='published'; 
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET bDone = 1;

  OPEN curs;

  SET bDone = 0;
  REPEAT
    FETCH curs INTO var1;
    
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'A', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'B', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'C', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'D', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'E', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'F', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'G', 'complete')
    on duplicate key update status  = 'complete';
    
  UNTIL bDone END REPEAT;

  CLOSE curs;
  
END //

DELIMITER ;

call update_cohort_published_status();

DROP PROCEDURE IF EXISTS `update_cohort_published_status`;


/*
 update cancer info year info 
*/

 update cancer_info set ci_confirmed_cancer_date = MAKEDATE(ci_confirmed_cancer_year, 1) 
 where ci_confirmed_cancer_date is null and ci_confirmed_cancer_year is not null and cohort_id > 0;

 update cancer_count set case_type_id = 2 where case_type_id is null;

 -- attachment_type ( 1.  file ,  0 -url)
-- category (0 questionnaires
-- 1. protocol
-- 2. data sharing policy
-- 3 bio sharing policy
-- 4. publiication policy )


/* ***************************************************************************/
/*  Insert existing published cohorts into activity log                      */
/* ***************************************************************************/
INSERT INTO cohort_activity_log (cohort_id, user_id, activity, notes, create_time, update_time)
SELECT * FROM
(SELECT id, 1 AS user_id, status, 'Migrated from Westat Database', 
	publish_time AS create_time, publish_time AS update_time FROM cohort where status = 'published') AS tmp
    WHERE (SELECT count(1) FROM cohort_activity_log) <1;


-- ====== End of Migration script =========
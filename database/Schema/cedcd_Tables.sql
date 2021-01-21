-- MySQL Distrib 8
--
--   Database: cedcd
-- ------------------------------------------------------
-- Server version	8.0
-- revised according to questionnarire v6 in 2020 =====
--  the order is not strictly alphabetical order, 
--  it is considering relationship constraints
-- 

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(200) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `access_level` varchar(20) NOT NULL COMMENT 'SystemAdmin, CohortAdmin, CohortOwner',
  `session_id` varchar(50) DEFAULT NULL,
  `active_status` varchar(5) DEFAULT NULL COMMENT 'Y, N',
  `last_login` datetime DEFAULT NULL,
  `lock_date` datetime DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   UNIQUE KEY `user_user_name_uindex` (`user_name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `lu_cancer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `icd9` varchar(20) NOT NULL,
  `icd10` varchar(20) NOT NULL,
  `cancer` varchar(50) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `lu_case_type` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `case_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `lu_cohort_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohortstatus` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `lu_data_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(250) NOT NULL,
  `sub_category` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `lu_ethnicity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ethnicity` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `lu_gender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `lu_person_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `lu_race` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `race` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `lu_specimen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `specimen` varchar(100) NOT NULL,
  `sub_category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `cohort` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `acronym` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `submit_by` int(11) DEFAULT NULL,
  `publish_by` int(11) DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `cohort_last_update_date` timestamp DEFAULT NULL,
  `publish_time` timestamp DEFAULT NULL,
  `document_ver` varchar(45) NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cohort_create_id` (`create_by`),
  KEY `cohort_publish_id` (`publish_by`),
  KEY `cohort_submit_id` (`submit_by`),
  KEY `cohort_acronym_index` (`acronym`),
  CONSTRAINT `cohort_create_id` FOREIGN KEY (`create_by`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cohort_submit_id` FOREIGN KEY (`submit_by`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cohort_publish_id` FOREIGN KEY (`publish_by`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `cohort_basic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `cohort_name` varchar(500) DEFAULT NULL,
  `cohort_acronym` varchar(100) DEFAULT NULL,
  `cohort_web_site` varchar(200) DEFAULT NULL,
  `date_completed` datetime DEFAULT NULL,
  `clarification_contact` int(1) DEFAULT NULL,
  `sameAsSomeone` int(1) DEFAULT NULL,
  `cohort_description` varchar(5000) DEFAULT NULL,
  `eligible_gender_id` int(11) DEFAULT NULL COMMENT '0-All\n1-Female\n2-Male\n3-Unknown',
  `eligible_disease` int(1) DEFAULT NULL,
  -- hasCancerSite
  `eligible_disease_cancer_specify` varchar(100) DEFAULT NULL,
  `eligible_disease_other_specify` varchar(100) DEFAULT NULL,
  `enrollment_total` int(10) DEFAULT NULL,
  `enrollment_year_start` int(4) DEFAULT NULL,
  `enrollment_year_end` int(4) DEFAULT NULL,
  `enrollment_ongoing` int(1) DEFAULT NULL,
  `enrollment_target` int(10) DEFAULT NULL,
  `enrollment_year_complete` int(4) DEFAULT NULL,
  `enrollment_age_min` int(3) DEFAULT NULL,
  `enrollment_age_max` int(3) DEFAULT NULL,
  `enrollment_age_median` int(3) DEFAULT NULL,
  `enrollment_age_mean` int(3) DEFAULT NULL,
  `current_age_min` int(3) DEFAULT NULL,
  `current_age_max` int(3) DEFAULT NULL,
  `current_age_median` int(3) DEFAULT NULL,
  `current_age_mean` int(3) DEFAULT NULL,
  `time_interval` varchar(200) DEFAULT NULL,
  `most_recent_year` int(4) DEFAULT NULL,
  `data_collected_in_person` int(1) DEFAULT NULL,
  `data_collected_phone` int(1) DEFAULT NULL,
  `data_collected_paper` int(1) DEFAULT NULL,
  `data_collected_web` int(1) DEFAULT NULL,
  `data_collected_other` int(1) DEFAULT NULL,
  `data_collected_other_specify` varchar(200) DEFAULT NULL,
  `other_tools` int(1) DEFAULT NULL,
  `other_tools_specify` varchar(200) DEFAULT NULL,
  `restrictions` varchar(500) DEFAULT NULL,
  `restrictions_other_specify` varchar(200) DEFAULT NULL,
  `strategy_routine`  INT(1) DEFAULT NULL,
  `strategy_mailing`  INT(1) DEFAULT NULL,
  `strategy_aggregate_study`  INT(1) DEFAULT NULL,
  `strategy_individual_study`  INT(1) DEFAULT NULL,
  `strategy_committees` int DEFAULT NULL,
  `strategy_invitation`  INT(1) DEFAULT NULL,
  `strategy_participant_input` INT DEFAULT NULL,
  `strategy_other`  INT(1) DEFAULT NULL,
  `strategy_other_specify` varchar(200) DEFAULT NULL,
  `enrollment_most_recent_date` datetime DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '0-''draft'' 1-''under review'' 2-''published''',
  PRIMARY KEY (`id`),
  KEY `cohort_gender_id_idx` (`cohort_id`, `eligible_gender_id`),
  KEY `cohort_gender_id_idx_idx` (`eligible_gender_id`),
  KEY `cohort_basic_id` (`cohort_id`),
  CONSTRAINT `cohort_basic_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cohort_gender_id_idx` FOREIGN KEY (`eligible_gender_id`) REFERENCES `lu_gender` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `cohort_document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `attachment_type` int(1) NOT NULL,
  `category` int(2) NOT NULL,
  `filename` varchar(100) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `attachment_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `attachment_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort_basic` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `cancer_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `cancer_id` int(11) NOT NULL,
  `gender_id` int(11) NOT NULL COMMENT '0-Both 1-Female 2-Male 3-Unknown',
  `case_type_id` int(4),
  `cancer_counts` int(10) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cancer_count_pk` (`cohort_id`,`cancer_id`,`gender_id`,`case_type_id`),
  KEY `cancer_count_cancer_id_idx` (`cancer_id`),
  KEY `cancer_count_gender_id_idx` (`gender_id`),
  KEY `cancer_count_cohort_id` (`cohort_id`),
  KEY `cc_case_type_id` (`case_type_id`),
  CONSTRAINT `cancer_count_cancer_id` FOREIGN KEY (`cancer_id`) REFERENCES `lu_cancer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cc_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cc_case_type_id` FOREIGN KEY (`case_type_id`) REFERENCES `lu_case_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cc_gender_id` FOREIGN KEY (`gender_id`) REFERENCES `lu_gender` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `cancer_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL UNIQUE,
  `ci_confirmed_cancer_year` int(4) DEFAULT NULL,
  `ci_confirmed_cancer_date` DATE DEFAULT NULL,
  `ci_ascertained_self_reporting` int(1) DEFAULT NULL,
  `ci_ascertained_tumor_registry` int(1) DEFAULT NULL,
  `ci_ascertained_medical_records` int(1) DEFAULT NULL,
  `ci_ascertained_other` int(1) DEFAULT NULL,
  `ci_ascertained_other_specify` varchar(300) DEFAULT NULL,
  `ci_cancer_recurrence` int(1) DEFAULT NULL,
  `ci_second_primary_diagnosis` int(1) DEFAULT NULL,
  `ci_cancer_treatment_data` int(1) DEFAULT NULL,
  `ci_treatment_data_surgery` int(1) DEFAULT NULL,
  `ci_treatment_data_radiation` int(1) DEFAULT NULL,
  `ci_treatment_data_chemotherapy` int(1) DEFAULT NULL,
  `ci_treatment_data_hormonal_therapy` int(1) DEFAULT NULL,
  `ci_treatment_data_bone_stem_cell` int(1) DEFAULT NULL,
  `ci_treatment_data_other` int(1) DEFAULT NULL,
  `ci_treatment_data_other_specify` varchar(200) DEFAULT NULL,
  `ci_data_source_admin_claims` int(1) DEFAULT NULL,
  `ci_data_source_electronic_records` int(1) DEFAULT NULL,
  `ci_data_source_chart_abstraction` int(1) DEFAULT NULL,
  `ci_data_source_patient_reported` int(1) DEFAULT NULL,
  `ci_data_source_other` int(1) DEFAULT NULL,
  `ci_data_source_other_specify` varchar(200) DEFAULT NULL,
  `ci_collect_other_information` int(1) DEFAULT NULL,
  `ci_cancer_staging_data` int(1) DEFAULT NULL,
  `ci_tumor_grade_data` int(1) DEFAULT NULL,
  `ci_tumor_genetic_markers_data` int(1) DEFAULT NULL,
  `ci_tumor_genetic_markers_data_describe` varchar(200) DEFAULT NULL,
  `ci_histologically_confirmed` int(1) DEFAULT NULL,
  `ci_cancer_subtype_histological` int(1) DEFAULT NULL,
  `ci_cancer_subtype_molecular` int(1) DEFAULT NULL,
  `mdc_acute_treatment_toxicity` int(1) DEFAULT NULL,
  `mdc_late_effects_of_treatment` int(1) DEFAULT NULL,
  `mdc_symptoms_management` int(1) DEFAULT NULL,
  `mdc_other_cancer_condition` int(1) DEFAULT NULL,
  `mdc_other_cancer_condition_specify` varchar(200) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cancer_info_cohort_id_uindex` (`cohort_id`),
  KEY `cancer_info_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `cancer_info_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `organization` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `topic` int(3) NOT NULL,
  `message` varchar(2000) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `dlh` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `dlh_linked_to_existing_databases` int(1) DEFAULT NULL,
  `dlh_linked_to_existing_databases_specify` varchar(500) DEFAULT NULL,
  `dlh_harmonization_projects` int(1) DEFAULT NULL,
  `dlh_harmonization_projects_specify` varchar(500) DEFAULT NULL,
  `dlh_nih_repository` int(1) DEFAULT NULL,
  `dlh_nih_cedr` int(1) DEFAULT NULL,
  `dlh_nih_dbgap` int(1) DEFAULT NULL,
  `dlh_nih_biolincc` int(1) DEFAULT NULL,
  `dlh_nih_other` int(1) DEFAULT NULL,
  `dlh_procedure_online` int(1) DEFAULT NULL,
  `dlh_procedure_website` int(1) DEFAULT NULL,
  `dlh_procedure_url` varchar(200) DEFAULT NULL,
  `dlh_procedure_attached` varchar(200) DEFAULT NULL,
  `dlh_procedure_enclave` int(1) DEFAULT NULL,
  `dlh_enclave_location` varchar(200) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `dlh_new_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `dlh_new_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `enrollment_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `race_id` int(11) NOT NULL,
  `ethnicity_id` int(11) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `enrollment_counts` int(10) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `enrollment_count_cohort_id_idx` (`cohort_id`),
  KEY `enrollment_count_race_id_idx` (`race_id`),
  KEY `enrollment_count_ethnicity_id_idx` (`ethnicity_id`),
  KEY `enrollment_count_gender_id_idx` (`gender_id`),
  CONSTRAINT `enrollment_count_cohort_id_idx` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `enrollment_count_ethnicity_id` FOREIGN KEY (`ethnicity_id`) REFERENCES `lu_ethnicity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `enrollment_count_gender_id` FOREIGN KEY (`gender_id`) REFERENCES `lu_gender` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `enrollment_count_race_id` FOREIGN KEY (`race_id`) REFERENCES `lu_race` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `major_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL COMMENT '1-Socio-economic Status (e.g., income)\n2-Education Level\n3-Marital Status\n4-Language/Country of Origin \n5-Employment Status \n6-Health Insurance Status\n7-Anthropometry (e.g., weight, height, waist circumference)\n8-Dietary Intake\n9-Dietary Supplement Use\n10-Complementary and Alternative Medicine\n11-Prescription Medication Use (not related to cancer treatment)\n12-Non-prescription Medication Use (not related to cancer treatment)\n13-Alcohol Consumption\n14-Cigarette Smoking\n15-Use of Tobacco Products Other than Cigarettes\n16-Physical Activity\n17-Sleep Habits\n18-Reproductive History\n19-Self-Reported Health\n20-Quality of Life \n21-Social Support\n22-Cognitive Function\n23-Depression\n24-Other Psychosocial Variables\n25-Fatigue\n26-Family History of Cancer\n27-Family History of Cancer with Pedigrees\n28-Environmental or Occupational Exposures (e.g. air contaminants/quality, occupational exposures and history, water source)\n29-Residential history Information (zip code, GIS) over time?\n30-Other Medical Conditions\n',
  `baseline` int(1) DEFAULT NULL,
  `followup` int(1) DEFAULT NULL,
  `other_specify_baseline` varchar(200) DEFAULT NULL,
  `other_specify_followup` varchar(200) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `major_content_new_cohort_id_idx` (`cohort_id`),
  KEY `major_content_domain_id_idx_idx` (`category_id`),
  CONSTRAINT `major_content_new_cohort_id_idx` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `mc_domain_id` FOREIGN KEY (`category_id`) REFERENCES `lu_data_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `mortality` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `mort_year_mortality_followup` int(4) DEFAULT NULL,
  `mort_death_confirmed_by_ndi_linkage` int(1) DEFAULT NULL,
  `mort_death_confirmed_by_death_certificate` int(1) DEFAULT NULL,
  `mort_death_confirmed_by_other` int(1) DEFAULT NULL,
  `mort_death_confirmed_by_other_specify` varchar(200) DEFAULT NULL,
  `mort_have_date_of_death` int(1) DEFAULT NULL,
  `mort_have_cause_of_death` int(1) DEFAULT NULL,
  `mort_death_code_used_icd9` int(1) DEFAULT NULL,
  `mort_death_code_used_icd10` int(1) DEFAULT NULL,
  `mort_death_not_coded` int(1) DEFAULT NULL,
  `mort_death_code_used_other` int(1) DEFAULT NULL,
  `mort_death_code_used_other_specify` varchar(200) DEFAULT NULL,
  `mort_number_of_deaths` int(10) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `mortality_new_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `mortality_new_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `institution` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `country_code` varchar(10) NULL DEFAULT '+1',
  `email` varchar(100) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `person_cohort_id_idx` (`cohort_id`),
  KEY `person_category_id_idx` (`category_id`),
  CONSTRAINT `person_category_id` FOREIGN KEY (`category_id`) REFERENCES `lu_person_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `person_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort_basic` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `specimen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `bio_other_baseline_specify` varchar(200) DEFAULT NULL,
  `bio_other_other_time_specify` varchar(200) DEFAULT NULL,
  `bio_meta_outcomes_other_study_specify` varchar(200)DEFAULT NULL,
  `bio_member_in_study` int(10) DEFAULT NULL,
  `bio_labs_used_for_analysis` varchar(200) DEFAULT NULL,
  `bio_analytical_platform` varchar(200) DEFAULT NULL,
  `bio_separation_platform` varchar(200) DEFAULT NULL,
  `bio_number_metabolites_measured` int(10) DEFAULT NULL,
  `bio_year_samples_sent` int(5) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `specimen_new_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `specimen_new_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `specimen_collected_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cohort_id` int NOT NULL,
  `specimen_id` int NOT NULL,
  `collected_yn` int DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `specimen_collected__cohort_id_idx` (`cohort_id`),
  KEY `specimen_collected_type_idx` (`specimen_id`),
  CONSTRAINT `specimen_collected__cohort_id_idx` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`),
  CONSTRAINT `specimen_collected_type_idx` FOREIGN KEY (`specimen_id`) REFERENCES `lu_specimen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1324 DEFAULT CHARSET=utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `specimen_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `cancer_id` int(11) DEFAULT NULL,
  `specimen_id` int(11) NOT NULL COMMENT '1-Serum and/or Plasma\n2-Buffy Coat and/or Lymphocytes\n3-Saliva and/or Buccal\n4-Urine\n5-Feces\n6-Tumor Tissue Fresh/Frozen\n7-Tumor Tissue FFPE',
  `specimens_counts` int(10) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `specimen_count_cohort_id_idx` (`cohort_id`),
  KEY `specimen_count_cancer_id_idx_idx` (`cancer_id`),
  KEY `specimen_count_specimen_id_idx_idx` (`specimen_id`),
  CONSTRAINT `specimen_count_cancer_id_idx` FOREIGN KEY (`cancer_id`) REFERENCES `lu_cancer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `specimen_count_cohort_id_idx` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `specimen_count_specimen_id_idx` FOREIGN KEY (`specimen_id`) REFERENCES `lu_specimen` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `technology` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `tech_use_of_mobile` int(1) DEFAULT NULL,
  `tech_use_of_mobile_describe` varchar(300) DEFAULT NULL,
  `tech_use_of_cloud` int(1) DEFAULT NULL,
  `tech_use_of_cloud_describe` varchar(300) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `technology_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `technology_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort_basic` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `cohort_activity_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `activity` varchar(50) NOT NULL,
  `notes` varchar(2000),
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cohort_logs_chhort_id` (`cohort_id`),
  KEY `cohort_logs_user_id` (`user_id`),
  CONSTRAINT `cohort_logs_chhort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cohort_logs_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `cohort_user_mapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cohort_acronym` varchar(100) NOT NULL,
  `user_id` int NOT NULL,
  `active` varchar(10) NOT NULL DEFAULT 'Y',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cohort_acronym`,`user_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `cohort_user_user_id` (`user_id`),
  CONSTRAINT `cohort_user_mapping_cohort_acronym_fk` FOREIGN KEY (`cohort_acronym`) REFERENCES `cohort` (`acronym`),
  CONSTRAINT `cohort_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `cohort_page_mapping` (
  `page_code` varchar(2) NOT NULL,
  `page_info` varchar(50) NOT NULL,
  PRIMARY KEY (`page_code`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE IF NOT  EXISTS `cohort_edit_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `page_code` varchar(2) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cohort_edit_unique_page` (`cohort_id`, `page_code`),
  KEY `cohort_edit_chhort_id` (`cohort_id`),
  CONSTRAINT `cohort_edit_chhort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS  `mapping_old_file_Id_To_New` (
  `cohort_id` int NOT NULL,
  `old_file_id` int NOT NULL,
  `new_file_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF  NOT EXISTS `mapping_old_PI_Id_To_New` (
  `cohort_id` int NOT NULL,
  `old_PI_Id` int NOT NULL,
  `new_PI_Id` int NOT NULL,
  PRIMARY KEY (`new_PI_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ======== end table definations ===============
-- ==== insert pre-defined data ======
/*
 Generate data for lookup table cohort_page_mapping
 */
insert into cohort_page_mapping values('A', 'cohort basic');
insert into cohort_page_mapping values('B', 'enrollment counts');
insert into cohort_page_mapping values('C', 'major content domains');
insert into cohort_page_mapping values('D', 'cancer info');
insert into cohort_page_mapping values('E', 'mortality');
insert into cohort_page_mapping values('F', 'data linkage and harmonization');
insert into cohort_page_mapping values('G', 'specimens collected');

/*
Generate data for lookup table lu_cohort_status
*/
insert into lu_cohort_status values (1,"New");
insert into lu_cohort_status values (2, "Draft");
insert into lu_cohort_status values (3,"Submitted");
insert into lu_cohort_status values (4,"In Review");
insert into lu_cohort_status values (5,"Published");
insert into lu_cohort_status values (6,"Rejected");

/*
 Generate data for lookup table lu_gender
 */
insert into lu_gender(id, gender) values (1, "Female");
insert into lu_gender(id, gender) values (2, "Male");
insert into lu_gender(id, gender) values (3, "Unknown");
insert into lu_gender(id, gender) values (4, "All");  /* changed Both to All according to Questionnaire v8.1 */

/*
 Generate data for lookup table lu_cast_type
 */
insert into lu_case_type(id, case_type) values (1, "incident");
insert into lu_case_type(id, case_type) values (2, "prevalent");

/*
 Generate data for lookup table lu_cancer
 */
insert into lu_cancer(id,icd9, icd10, cancer)
values (1,"", "", "All Other Cancers"),
  (2,"141-149", "C00-C14", "Oropharyngeal"),
  (3,"150", "C15", "Esophagus"),
  (4,"151", "C16", "Stomach"),
  (5,"152", "C17", "Small intestine"),
  (6,"153", "C18", "Colon"),
  (7,"154", "C19-C21", "Rectum and anus"),
  (8,"155", "C22", "Liver and intrahepatic bile ducts"),
  (9,"156","C23, C24","Gall bladder and extrahepatic bile ducts"),
  (10,"157", "C25", "Pancreas"),
  (11,"162", "C34", "Lung and bronchus"),
  (12,"170", "C40,C41", "Bone"),
  (13,"172", "C43", "Melanoma (excluding mucosal sites)"),
  (14,"174-175", "C50", "Invasive Breast Cancer"),
  (15,"233","D05.1","Ductal carcinoma in situ of breast"),
  (16,"180","C53","Cervix (Squamous cell carcinoma, Adenocarcinoma)"),
  (17,"233","D06.1","Cervical carcinoma in situ (CIN II/III, CIS, AIS)"),
  (18,"182", "C54", "Corpus, body of uterus"),
  (19,"183","C56","Ovary, fallopian tube, broad ligament"),
  (20,"185", "C61", "Prostate"),
  (21,"188", "C67", "Bladder"),
  (22,"189","C64-C66, C68","Kidney and other unspecified urinary organs"),
  (23,"191", "C71", "Brain"),
  (24,"193", "C73", "Thyroid"),
  (25,"201", "C81", "Hodgkin Lymphoma"),
  (26,"200, 202", "C82-C85", "Non-Hodgkin Lymphoma"),
  (27,"203", "C90", "Myeloma"),
  (28,"204-208", "C91-95", "Leukemia"),
  (29,"", "", "No Cancer");

/*
 Generate data for lookup table lu_data_category
 */
insert into lu_data_category(id, category, sub_category) values (1, "Socio-economic Status","");
insert into lu_data_category(id, category, sub_category) values (2, "Education Level","");
insert into lu_data_category(id, category, sub_category) values (3, "Marital Status","");
insert into lu_data_category(id, category, sub_category) values (4, "Language/Country of Origin","");
insert into lu_data_category(id, category, sub_category) values (5, "Employment Status","");
insert into lu_data_category(id, category, sub_category) values (6, "Health Insurance Status","");
insert into lu_data_category(id, category, sub_category) values (7, "Anthropometry","");
insert into lu_data_category(id, category, sub_category) values (8, "Dietary Intake","");
insert into lu_data_category(id, category, sub_category) values (9, "Dietary Supplement Use","");
insert into lu_data_category(id, category, sub_category) values (10, "Complementary and Alternative Medicine","");
insert into lu_data_category(id, category, sub_category) values (11, "Prescription Medication Use","");
insert into lu_data_category(id, category, sub_category) values (12, "Non-prescription Medication","");
insert into lu_data_category(id, category, sub_category) values (13, "Alcohol Consumption","");
insert into lu_data_category(id, category, sub_category) values (14, "Cigarette Smoking","");
insert into lu_data_category(id, category, sub_category) values (15, "Other Tobacco Products","Cigars");
insert into lu_data_category(id, category, sub_category) values (16, "Other Tobacco Products","Pipes");
insert into lu_data_category(id, category, sub_category) values (17, "Other Tobacco Products","Chewing tobacco");
insert into lu_data_category(id, category, sub_category) values (18, "Other Tobacco Products","E-Cigarettes");
insert into lu_data_category(id, category, sub_category) values (19, "Other Tobacco Products","Other");
insert into lu_data_category(id, category, sub_category) values (20, "Physical Activity","");
insert into lu_data_category(id, category, sub_category) values (21, "Sleep Habits","");
insert into lu_data_category(id, category, sub_category) values (22, "Reproductive History","");
insert into lu_data_category(id, category, sub_category) values (23, "Self-Reported Health","");
insert into lu_data_category(id, category, sub_category) values (24, "Quality of Life",""); 
insert into lu_data_category(id, category, sub_category) values (25, "Social Support","");
insert into lu_data_category(id, category, sub_category) values (26, "Cognitive Function","");
insert into lu_data_category(id, category, sub_category) values (27, "Depression","");
insert into lu_data_category(id, category, sub_category) values (28, "Other Psychosocial Variables","");
insert into lu_data_category(id, category, sub_category) values (29, "Fatigue","");
insert into lu_data_category(id, category, sub_category) values (30, "Family History of Cancer","Family History of Cancer");
insert into lu_data_category(id, category, sub_category) values (31, "Family History of Cancer","Family History of Cancer with Pedigrees");
insert into lu_data_category(id, category, sub_category) values (32, "Environmental or Occupational Exposures","");
insert into lu_data_category(id, category, sub_category) values (33, "Residential Information","");
insert into lu_data_category(id, category, sub_category) values (34, "Other Medical Conditions","Diabetes");
insert into lu_data_category(id, category, sub_category) values (35, "Other Medical Conditions","Stroke");
insert into lu_data_category(id, category, sub_category) values (36, "Other Medical Conditions","COPD and/or Emphysema");
insert into lu_data_category(id, category, sub_category) values (37, "Other Medical Conditions","Cardiovascular Disease");
insert into lu_data_category(id, category, sub_category) values (38, "Other Medical Conditions","Osteoporosis");
insert into lu_data_category(id, category, sub_category) values (39, "Other Medical Conditions","Mental Health");
insert into lu_data_category(id, category, sub_category) values (40, "Other Medical Conditions","Cognitive Decline");
insert into lu_data_category(id, category, sub_category) values (41, "Physical function measures","");
insert into lu_data_category(id, category, sub_category) values (99, "Cancer Treatment","");

/*
 Generate data for lookup table lu_specimen
 */
insert into lu_specimen(id, specimen) values (1, "Serum and/or Plasma");
insert into lu_specimen(id, specimen) values (2, "Buffy Coat and/or Lymphocytes");
insert into lu_specimen(id, specimen) values (3, "Saliva and/or Buccal");
insert into lu_specimen(id, specimen) values (4, "Urine");
insert into lu_specimen(id, specimen) values (5, "Feces");
insert into lu_specimen(id, specimen) values (6, "Tumor Tissue Fresh/Frozen");
insert into lu_specimen(id, specimen) values (7, "Tumor Tissue FFPE");

/*
* add for specimen data collected category
*/
insert into lu_specimen(id, specimen, sub_category) 
values (11,"Blood","bio_blood_baseline"),
(12,"Blood","bio_blood_baseline_serum"),
(13,"Blood","bio_blood_baseline_plasma"),
(14,"Blood","bio_blood_baseline_buffy_coat"),
(15,"Blood","bio_blood_baseline_other_derivative"),
(16,"Blood","bio_blood_other_time"),
(17,"Blood","bio_blood_other_time_serum"),
(18,"Blood","bio_blood_other_time_plasma"),
(19,"Blood","bio_blood_other_time_buffy_coat"),
(20,"Blood","bio_blood_other_time_other_derivative"),
(21,"Buccal/Saliva","bio_buccal_saliva_baseline"),
(22,"Buccal/Saliva","bio_buccal_saliva_other_time"),
(23,"Tissue (includes tumor and/or normal)","bio_tissue_baseline"),
(24,"Tissue (includes tumor and/or normal)","bio_tissue_other_time"),
(25,"Urine","bio_urine_baseline"),
(26,"Urine","bio_urine_other_time"),
(27,"Feces","bio_feces_baseline"),
(28,"Feces","bio_feces_other_time"),
(29,"Other","bio_other_baseline"),
(30,"Other","bio_other_other_time"),
(31,"Repeated_Sample","bio_repeated_sample_same_individual"),
(32,"Tumor_Block","bio_tumor_block_info"),
(33,"Genetic Information","bio_genotyping_data"),
(34,"Genetic Information","bio_sequencing_data_exome"),
(35,"Genetic Information","bio_sequencing_data_whole_genome"),
(36,"Genetic Information","bio_epigenetic_or_metabolic_markers"),
(37,"Omics","bio_other_omics_data"),
(38,"Transcriptomics","bio_transcriptomics_data"),
(39,"Microbiome","bio_microbiome_data"),
(40,"Metabolomic","bio_metabolomic_data"),
(41,"Metabolomic","bio_meta_fasting_sample"),
(42,"Metabolomic","bio_meta_outcomes_in_cancer_study"),
(43,"Metabolomic","bio_meta_outcomes_in_cvd_study"),
(44,"Metabolomic","bio_meta_outcomes_in_diabetes_study"),
(45,"Metabolomic","bio_meta_outcomes_in_other_study"),
(46,"Metabolomic","bio_member_of_metabolomics_studies");


/*
 Generate data for lookup table lu_race
 */
insert into lu_race(id, race) values (1, "American Indian/Alaska Native");
insert into lu_race(id, race) values (2, "Asian");
insert into lu_race(id, race) values (3, "Native Hawaiian or Other Pacific Islander");
insert into lu_race(id, race) values (4, "Black or African American");
insert into lu_race(id, race) values (5, "White");
insert into lu_race(id, race) values (6, "More Than One Race");
insert into lu_race(id, race) values (7, "Unknown or Not Reported");

/*
 Generate data for lookup table lu_ethnicity
 */
insert into lu_ethnicity(id, ethnicity) values (1, "Not Hispanic or Latino");
insert into lu_ethnicity(id, ethnicity) values (2, "Hispanic or Latino");
insert into lu_ethnicity(id, ethnicity) values (3, "Unknown/Not Reported Ethnicity");

/*
 Generate data for lookup table lu_person_category
 */
insert into lu_person_category(id, category) values (1, "Person who completed the form");
insert into lu_person_category(id, category) values (2, "Contact Person for clarification of the form");
insert into lu_person_category(id, category) values (3, "Cohort Principal Investigator");
insert into lu_person_category(id, category) values (4, "Person to contact if an investigator is interested");

/*
Generate default users 
*/
insert into user(id, user_name,first_name,last_name, access_level,active_status, email, create_time,update_time) 
values
(1,"admin","System","Admin","SystemAdmin","Y","kai-ling.chen@nih.gov",now(),now()),
(2,"chenkai","Kailing","Chen","SystemAdmin","Y","kai-ling.chen@nih.gov",now(),now());


-- ======== end table data ===============
-- MySQL Distrib 5.7.29
--
--   Database: cedcd
-- ------------------------------------------------------
-- Server version	5.1.73
-- revised according to questionnarire v6 in 2020 =====
--  the order is not strictly alphabetical order, 
--  it is considering relationship constraints
-- 
DROP TABLE IF EXISTS `lu_cancer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `lu_cancer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `icd9` varchar(20) NOT NULL,
  `icd10` varchar(20) NOT NULL,
  `cancer` varchar(50) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `lu_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `lu_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `lu_domain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `lu_domain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(500) NOT NULL,
  `sub_domain` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `lu_ethnicity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `lu_ethnicity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ethnicity` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `lu_gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `lu_gender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `lu_race`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `lu_race` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `race` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `lu_specimen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `lu_specimen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `specimen` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `lu_case_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `lu_case_type` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `case_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `cohort`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `cohort` (
  `cohort_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `acronym` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `publish_by` varchar(100) DEFAULT NULL,
  `create_by` varchar(100) DEFAULT NULL,
  `publish_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`cohort_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `cohort_basic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `cohort_basic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `cohort_name` varchar(500) DEFAULT NULL,
  `cohort_acronym` varchar(100) DEFAULT NULL,
  `cohort_web_site` varchar(200) DEFAULT NULL,
  `clarification_contact` int(1) DEFAULT NULL,
  `request_procedures_web` int(1) DEFAULT NULL,
  `request_procedures_web_url` varchar(300) DEFAULT NULL,
  `request_procedures_pdf` int(1) DEFAULT NULL,
  `request_procedures_none` int(1) DEFAULT NULL,
  `sameAsSomeone` int(1) DEFAULT NULL,
  `cohort_description` varchar(5000) DEFAULT NULL,
  `gender_id` int(11) DEFAULT NULL COMMENT '0-Both\n1-Female\n2-Male\n3-Unknown',
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
  `strategy_routine` bit DEFAULT NULL,
  `strategy_mailing` bit DEFAULT NULL,
  `strategy_aggregate_study` bit DEFAULT NULL,
  `strategy_individual_study` bit DEFAULT NULL,
  `strategy_invitation` bit DEFAULT NULL,
  `strategy_other` bit DEFAULT NULL,
  `strategy_other_specify` varchar(200) DEFAULT NULL,
  `questionnaire_file_attached` bit DEFAULT NULL,
  `main_cohort_file_attached` bit DEFAULT NULL,
  `data_file_attached` bit DEFAULT NULL,
  `specimen_file_attached` bit DEFAULT NULL,
  `publication_file_attached` bit DEFAULT NULL,
  `questionnaire_url` varchar(100) DEFAULT NULL,
  `main_cohort_url` varchar(100) DEFAULT NULL,
  `data_url` varchar(100) NULL,
  `specimen_url` varchar(100) NULL,
  `publication_url` varchar(100) NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '0-''draft'' 1-''under review'' 2-''published''',
  PRIMARY KEY (`id`),
  KEY `cohort_gender_id_idx` (`cohort_id`, `gender_id`),
  KEY `cohort_gender_id_idx_idx` (`gender_id`),
  KEY `cohort_basic_id` (`cohort_id`),
  CONSTRAINT `cohort_basic_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cohort_gender_id_idx` FOREIGN KEY (`gender_id`) REFERENCES `lu_gender` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `attachment_type` int(1) NOT NULL,
  `category` int(2) NOT NULL,
  `filename` varchar(100) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `attachment_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `attachment_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort_basic` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `cancer_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `cancer_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `cancer_id` int(11) NOT NULL,
  `gender_id` int(11) NOT NULL COMMENT '0-Both 1-Female 2-Male 3-Unknown',
  `case_type_id` int(4),
  `cancer_counts` int(10) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `cancer_count_cancer_id_idx` (`cancer_id`),
  KEY `cancer_count_gender_id_idx` (`gender_id`),
  KEY `cancer_count_cohort_id` (`cohort_id`),
  CONSTRAINT `cancer_count_cancer_id` FOREIGN KEY (`cancer_id`) REFERENCES `lu_cancer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cc_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cc_case_type_id` FOREIGN KEY (`case_type_id`) REFERENCES `lu_case_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cc_gender_id` FOREIGN KEY (`gender_id`) REFERENCES `lu_gender` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `cancer_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `cancer_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `ci_confirmed_cancer_year` int(4) DEFAULT NULL,
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
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `cancer_info_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `cancer_info_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `organization` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `topic` int(3) NOT NULL,
  `message` varchar(2000) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `dlh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `dlh` (
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
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `dlh_new_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `dlh_new_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `enrollment_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `enrollment_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `race_id` int(11) NOT NULL,
  `ethnicity_id` int(11) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `enrollment_counts` int(10) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `enrollment_count_cohort_id_idx` (`cohort_id`),
  KEY `enrollment_count_race_id_idx` (`race_id`),
  KEY `enrollment_count_ethnicity_id_idx` (`ethnicity_id`),
  KEY `enrollment_count_gender_id_idx` (`gender_id`),
  CONSTRAINT `enrollment_count_cohort_id_idx` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `enrollment_count_ethnicity_id` FOREIGN KEY (`ethnicity_id`) REFERENCES `lu_ethnicity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `enrollment_count_gender_id` FOREIGN KEY (`gender_id`) REFERENCES `lu_gender` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `enrollment_count_race_id` FOREIGN KEY (`race_id`) REFERENCES `lu_race` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `major_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `major_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `domain_id` int(11) NOT NULL COMMENT '1-Socio-economic Status (e.g., income)\n2-Education Level\n3-Marital Status\n4-Language/Country of Origin \n5-Employment Status \n6-Health Insurance Status\n7-Anthropometry (e.g., weight, height, waist circumference)\n8-Dietary Intake\n9-Dietary Supplement Use\n10-Complementary and Alternative Medicine\n11-Prescription Medication Use (not related to cancer treatment)\n12-Non-prescription Medication Use (not related to cancer treatment)\n13-Alcohol Consumption\n14-Cigarette Smoking\n15-Use of Tobacco Products Other than Cigarettes\n16-Physical Activity\n17-Sleep Habits\n18-Reproductive History\n19-Self-Reported Health\n20-Quality of Life \n21-Social Support\n22-Cognitive Function\n23-Depression\n24-Other Psychosocial Variables\n25-Fatigue\n26-Family History of Cancer\n27-Family History of Cancer with Pedigrees\n28-Environmental or Occupational Exposures (e.g. air contaminants/quality, occupational exposures and history, water source)\n29-Residential history Information (zip code, GIS) over time?\n30-Other Medical Conditions\n',
  `baseline` int(1) NOT NULL,
  `followup` int(1) NOT NULL,
  `other_specify_baseline` varchar(200) DEFAULT NULL,
  `other_specify_followup` varchar(200) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `major_content_new_cohort_id_idx` (`cohort_id`),
  KEY `major_content_domain_id_idx_idx` (`domain_id`),
  CONSTRAINT `major_content_new_cohort_id_idx` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `mc_domain_id` FOREIGN KEY (`domain_id`) REFERENCES `lu_domain` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `mortality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `mortality` (
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
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `mortality_new_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `mortality_new_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `institution` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `person_cohort_id_idx` (`cohort_id`),
  KEY `person_category_id_idx` (`category_id`),
  CONSTRAINT `person_category_id` FOREIGN KEY (`category_id`) REFERENCES `lu_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `person_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort_basic` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `specimen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `specimen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `bio_blood_baseline` int(1) DEFAULT NULL,
  `bio_blood_baseline_serum` int(1) DEFAULT NULL,
  `bio_blood_baseline_plasma` int(1) DEFAULT NULL,
  `bio_blood_baseline_buffy_coat` int(1) DEFAULT NULL,
  `bio_blood_baseline_other_derivative` int(1) DEFAULT NULL,
  `bio_blood_other_time` int(1) DEFAULT NULL,
  `bio_blood_other_time_serum` int(1) DEFAULT NULL,
  `bio_blood_other_time_plasma` int(1) DEFAULT NULL,
  `bio_blood_other_time_buffy_coat` int(1) DEFAULT NULL,
  `bio_blood_other_time_other_derivative` int(1) DEFAULT NULL,
  `bio_buccal_saliva_baseline` int(1) DEFAULT NULL,
  `bio_buccal_saliva_other_time` int(1) DEFAULT NULL,
  `bio_tissue_baseline` int(1) DEFAULT NULL,
  `bio_tissue_other_time` int(1) DEFAULT NULL,
  `bio_tumor_block_info` int(1) DEFAULT NULL,
  `bio_genotyping_data` int(1) DEFAULT NULL,
  `bio_sequencing_data_exome` int(1) DEFAULT NULL,
  `bio_sequencing_data_whole_genome` int(1) DEFAULT NULL,
  `bio_epigenetic_or_metabolic_markers` int(1) DEFAULT NULL,
  `bio_other_omics_data` int(1) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `specimen_new_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `specimen_new_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `specimen_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `specimen_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `cancer_id` int(11) DEFAULT NULL,
  `specimen_id` int(11) NOT NULL COMMENT '1-Serum and/or Plasma\n2-Buffy Coat and/or Lymphocytes\n3-Saliva and/or Buccal\n4-Urine\n5-Feces\n6-Tumor Tissue Fresh/Frozen\n7-Tumor Tissue FFPE',
  `specimens_counts` int(10) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `specimen_count_cohort_id_idx` (`cohort_id`),
  KEY `specimen_count_cancer_id_idx_idx` (`cancer_id`),
  KEY `specimen_count_specimen_id_idx_idx` (`specimen_id`),
  CONSTRAINT `specimen_count_cancer_id_idx` FOREIGN KEY (`cancer_id`) REFERENCES `lu_cancer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `specimen_count_cohort_id_idx` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `specimen_count_specimen_id_idx` FOREIGN KEY (`specimen_id`) REFERENCES `lu_specimen` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `technology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `technology` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `tech_use_of_mobile` int(1) DEFAULT NULL,
  `tech_use_of_mobile_describe` varchar(300) DEFAULT NULL,
  `tech_use_of_cloud` int(1) DEFAULT NULL,
  `tech_use_of_cloud_describe` varchar(300) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `technology_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `technology_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort_basic` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `access_level` varchar(20) NOT NULL COMMENT 'SystemAdmin, CohortAdmin, CohortOwner',
  `session_id` varchar(50) DEFAULT NULL,
  `active_status` varchar(5) DEFAULT NULL COMMENT 'Y, N',
  `last_login` datetime DEFAULT NULL,
  `lock_date` datetime DEFAULT NULL,
  `password_date` datetime DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `salt` varchar(50) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `cohort_activity_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `cohort_activity_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `cohort_user_id` int(11) NOT NULL,
  `activitiy` varchar(50) NOT NULL,
  `notes` varchar(250),
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cohort_logs_chhort_id` (`cohort_id`),
  KEY `cohort_logs_user_id` (`cohort_user_id`),
  CONSTRAINT `cohort_logs_chhort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort_master` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cohort_logs_user_id` FOREIGN KEY (`cohort_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `cohort_user_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `cohort_user_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `cohort_user_id` int(11) NOT NULL,
  `active` varchar(10) NOT NULL DEFAULT 'yes',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `cohort_user_chhort_id` (`cohort_id`),
  KEY `cohort_user_user_id` (`cohort_user_id`),
  CONSTRAINT `cohort_user_chhort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cohort_user_user_id` FOREIGN KEY (`cohort_user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `cohort_page_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `cohort_page_mapping` (
  `page_code` varchar(2) NOT NULL,
  `page_info` varchar(50) NOT NULL,
  PRIMARY KEY (`page_code`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
DROP TABLE IF EXISTS `cohort_edit_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `cohort_edit_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `page_code` varchar(2) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cohort_edit_unique_page` (`cohort_id`, `page_code`),
  KEY `cohort_edit_chhort_id` (`cohort_id`),
  CONSTRAINT `cohort_edit_chhort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;
-- ======== end table definations ===============
-- ==== insert pre-defined data ======
/*
 Generate data for lookup table cohort_page_mapping
 */
insert into cohort_page_mapping
values('A', 'cohort basic');
insert into cohort_page_mapping
values('B', 'enrollment counts');
insert into cohort_page_mapping
values('C', 'major content domains');
insert into cohort_page_mapping
values('D', 'cancer info');
insert into cohort_page_mapping
values('E', 'mortality');
insert into cohort_page_mapping
values('F', 'data linkage and harmonization');
insert into cohort_page_mapping
values('G', 'specimens collected');
/*
 Generate data for lookup table lu_gender
 */
insert into lu_gender(gender)
values ("Female");
insert into lu_gender(gender)
values ("Male");
insert into lu_gender(gender)
values ("Unknown");
insert into lu_gender(gender)
values ("Both");
/*
 Generate data for lookup table lu_cast_type
 */
insert into lu_case_type(case_type)
values ("incident");
insert into lu_case_type(case_type)
values ("prevalent");
/*
 Generate data for lookup table lu_cancer
 */
insert into lu_cancer(icd9, icd10, cancer)
values ("", "", "All Other Cancers"),
  ("188", "C67", "Bladder"),
  ("170", "C40", "Bone"),
  ("191", "C71", "Brain"),
  ("174-175", "C50", "Breast"),
  ("233", "D05", "Carcinoma"),
  ("180", "C53", "Cervix"),
  ("153", "C18", "Colon"),
  ("182", "C54", "Corpus, body of uterus"),
  ("150", "C15", "Esophagus"),
  (
    "156",
    "C23, C24",
    "Gall bladder and extrahepatic bile duct"
  ),
  (
    "189",
    "C64-C66, C68",
    "Kidney and other unspecified urinary organs"
  ),
  ("204-208", "C91-95", "Leukemia"),
  ("155", "C22", "Liver and intrahepatic bile ducts"),
  ("201", "C81-84", "Hodgkin Lymphoma"),
  (
    "172",
    "C43",
    "Melanoma (excluding genital organs)"
  ),
  ("203", "C90", "Myeloma"),
  ("200, 202", "C85", "Non-Hodgkin Lymphoma"),
  ("141-149", "C00-C14", "Oropharyngeal"),
  (
    "183",
    "C56",
    "Ovary, fallopian tube, broad ligament"
  ),
  ("157", "C25", "Pancreas"),
  ("185", "C61", "Prostate"),
  ("154", "C19-C21", "Rectum and anus"),
  ("152", "C17", "Small intestine"),
  ("151", "C16", "Stomach"),
  ("193", "C73", "Thyroid"),
  ("162", "C34", "Trachea, bronchus, and lung"),
  ("", "", "No Cancer");
/*
 Generate data for lookup table lu_domain
 */
insert into lu_domain(domain, sub_domain)
values ("Socio-economic Status (e.g., income)", "");
insert into lu_domain(domain, sub_domain)
values ("Education Level", "");
insert into lu_domain(domain, sub_domain)
values ("Marital Status", "");
insert into lu_domain(domain, sub_domain)
values ("Language/Country of Origin", "");
insert into lu_domain(domain, sub_domain)
values ("Employment Status", "");
insert into lu_domain(domain, sub_domain)
values ("Health Insurance Status", "");
insert into lu_domain(domain, sub_domain)
values (
    "Anthropometry (e.g., weight, height, waist circumference)",
    ""
  );
insert into lu_domain(domain, sub_domain)
values ("Dietary Intake", "");
insert into lu_domain(domain, sub_domain)
values ("Dietary Supplement Use", "");
insert into lu_domain(domain, sub_domain)
values ("Complementary and Alternative Medicine", "");
insert into lu_domain(domain, sub_domain)
values (
    "Prescription Medication Use (not related to cancer treatment)",
    ""
  );
insert into lu_domain(domain, sub_domain)
values (
    "Non-prescription Medication Use (not related to cancer treatment)",
    ""
  );
insert into lu_domain(domain, sub_domain)
values ("Alcohol Consumption", "");
insert into lu_domain(domain, sub_domain)
values ("Cigarette Smoking", "");
insert into lu_domain(domain, sub_domain)
values (
    "Use of Tobacco Products Other than Cigarettes",
    "Cigars"
  );
insert into lu_domain(domain, sub_domain)
values (
    "Use of Tobacco Products Other than Cigarettes",
    "Pipes"
  );
insert into lu_domain(domain, sub_domain)
values (
    "Use of Tobacco Products Other than Cigarettes",
    "Chewing tobacco"
  );
insert into lu_domain(domain, sub_domain)
values (
    "Use of Tobacco Products Other than Cigarettes",
    "E-Cigarettes"
  );
insert into lu_domain(domain, sub_domain)
values (
    "Use of Tobacco Products Other than Cigarettes",
    "Other"
  );
insert into lu_domain(domain, sub_domain)
values ("Physical Activity", "");
insert into lu_domain(domain, sub_domain)
values ("Sleep Habits", "");
insert into lu_domain(domain, sub_domain)
values ("Reproductive History", "");
insert into lu_domain(domain, sub_domain)
values ("Self-Reported Health", "");
insert into lu_domain(domain, sub_domain)
values ("Quality of Life", "");
insert into lu_domain(domain, sub_domain)
values ("Social Support", "");
insert into lu_domain(domain, sub_domain)
values ("Cognitive Function", "");
insert into lu_domain(domain, sub_domain)
values ("Depression", "");
insert into lu_domain(domain, sub_domain)
values ("Other Psychosocial Variables", "");
insert into lu_domain(domain, sub_domain)
values ("Fatigue", "");
insert into lu_domain(domain, sub_domain)
values ("Family History of Cancer", "");
insert into lu_domain(domain, sub_domain)
values ("Family History of Cancer with Pedigrees", "");
insert into lu_domain(domain, sub_domain)
values (
    "Environmental or Occupational Exposures (e.g. air contaminants/quality, occupational exposures and history, water source)",
    ""
  );
insert into lu_domain(domain, sub_domain)
values (
    "Residential history Information (zip code, GIS) over time?",
    ""
  );
insert into lu_domain(domain, sub_domain)
values ("Other Medical Conditions", "Diabetes");
insert into lu_domain(domain, sub_domain)
values ("Other Medical Conditions", "Stroke");
insert into lu_domain(domain, sub_domain)
values (
    "Other Medical Conditions",
    "COPD and/or Emphysema"
  );
insert into lu_domain(domain, sub_domain)
values (
    "Other Medical Conditions",
    "Cardiovascular Disease"
  );
insert into lu_domain(domain, sub_domain)
values ("Other Medical Conditions", "Osteoporosis");
insert into lu_domain(domain, sub_domain)
values ("Other Medical Conditions", "Mental Health");
insert into lu_domain(domain, sub_domain)
values ("Other Medical Conditions", "Cognitive Decline");
/*
 Generate data for lookup table lu_specimen
 */
insert into lu_specimen(specimen)
values ("Serum and/or Plasma");
insert into lu_specimen(specimen)
values ("Buffy Coat and/or Lymphocytes");
insert into lu_specimen(specimen)
values ("Saliva and/or Buccal");
insert into lu_specimen(specimen)
values ("Urine");
insert into lu_specimen(specimen)
values ("Feces");
insert into lu_specimen(specimen)
values ("Tumor Tissue Fresh/Frozen");
insert into lu_specimen(specimen)
values ("Tumor Tissue FFPE");
/*
 Generate data for lookup table lu_race
 */
insert into lu_race(race)
values ("American Indian/Alaska Native");
insert into lu_race(race)
values ("Asian");
insert into lu_race(race)
values ("Native Hawaiian or Other Pacific Islander");
insert into lu_race(race)
values ("Black or African American");
insert into lu_race(race)
values ("White");
insert into lu_race(race)
values ("More Than One Race");
insert into lu_race(race)
values ("Unknown or Not Reported");
/*
 Generate data for lookup table lu_ethnicity
 */
insert into lu_ethnicity(ethnicity)
values ("Not Hispanic or Latino");
insert into lu_ethnicity(ethnicity)
values ("Hispanic or Latino");
insert into lu_ethnicity(ethnicity)
values ("Unknown/Not Reported Ethnicity");
/*
 Generate data for lookup table lu_category
 */
insert into lu_category(category)
values ("Person who completed the form");
insert into lu_category(category)
values ("Contact Person for clarification of the form");
insert into lu_category(category)
values ("Cohort Principal Investigator");
insert into lu_category(category)
values (
    "Person to contact if an investigator is interested"
  );
/*
 Generate default users 
 */
insert into user(
    last_name,
    first_name,
    access_level,
    active_status,
    email
  )
values (
    'Chen',
    'Kailing',
    'SystemAdmin',
    'Y',
    'kai-ling.chen@nih.gov'
  );
insert into user(
    last_name,
    first_name,
    access_level,
    active_status,
    email
  )
values (
    'Zhao',
    'Joe',
    'SystemAdmin',
    'Y',
    'joe.zhao@nih.gov'
  );
insert into user(
    last_name,
    first_name,
    access_level,
    active_status,
    email
  )
values (
    'Zhang',
    'Chao',
    'SystemAdmin',
    'Y',
    'chao.zhang3@nih.gov'
  );
insert into user(
    last_name,
    first_name,
    access_level,
    active_status,
    email
  )
values (
    'Elena',
    'Joanne',
    'CohortAdmin',
    'Y',
    'kai-ling.chen@nih.gov'
  );
insert into user(
    last_name,
    first_name,
    access_level,
    active_status,
    email
  )
values (
    'Rogers',
    'Scott',
    'CohortAdmin',
    'Y',
    'rogerssc@mail.nih.gov'
  );
insert into user(
    last_name,
    first_name,
    access_level,
    active_status,
    email
  )
values (
    'Pottinger',
    'Camille',
    'CohortAdmin',
    'Y',
    'camille.pottinger@nih.gov'
  );
-- ======== end table data ===============
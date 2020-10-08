SET FOREIGN_KEY_CHECKS = 0;

/*
*   convert table name in singular style 
*   drop tables with name confusions
*
*/

DROP TABLE IF EXISTS `lu_cancers`;
DROP TABLE IF EXISTS `lu_domainss`;
DROP TABLE IF EXISTS `cedcd_new`.`lu_specimens`;
DROP TABLE IF EXISTS `cedcd_new`.`cohorts`;
DROP TABLE IF EXISTS `cedcd_new`.`contacts`;
DROP TABLE IF EXISTS `cedcd_new`.`specimens`;
DROP TABLE IF EXISTS `cedcd_new`.`cancer_counts`;
DROP TABLE IF EXISTS `cedcd_new`.`enrollment_counts`;
DROP TABLE IF EXISTS `cedcd_new`.`specimens_counts`;

DROP TABLE IF EXISTS `lu_cancer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lu_cancer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `icd9` varchar(20) NOT NULL,
  `icd10` varchar(20) NOT NULL,
  `cancer` varchar(50) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `lu_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lu_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `lu_domain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lu_domain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(500) NOT NULL,
  `sub_domain` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `lu_ethnicity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lu_ethnicity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ethnicity` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `lu_gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lu_gender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `lu_race`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lu_race` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `race` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `lu_specimen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lu_specimen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `specimen` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cohort`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cohort` (
  `cohort_id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_name` varchar(500) NOT NULL,
  `cohort_acronym` varchar(100) NOT NULL,
  `cohort_admin` varchar(100) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`cohort_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `cohort_basic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `cohort_description` varchar(5000) DEFAULT NULL,
  `gender_id` int(11) DEFAULT NULL COMMENT '0-Both\n1-Female\n2-Male\n3-Unknown',
  `eligible_disease` int(1) DEFAULT NULL,
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
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '0-''draft'' 1-''under review'' 2-''published''',
  PRIMARY KEY (`id`),
  KEY `cohort_gender_id_idx` (`cohort_id`,`gender_id`),
  KEY `cohort_gender_id_idx_idx` (`gender_id`),
  KEY `cohort_basic_id` (`cohort_id`),
  CONSTRAINT `cohort_basic_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cohort_gender_id_idx` FOREIGN KEY (`gender_id`) REFERENCES `lu_gender` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cancer_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cancer_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `cancer_id` int(11) NOT NULL,
  `gender_id` int(11) NOT NULL COMMENT '0-Both 1-Female 2-Male 3-Unknown',
  `cancer_counts` int(10) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `cancer_count_cancer_id_idx` (`cancer_id`),
  KEY `cancer_count_gender_id_idx` (`gender_id`),
  KEY `cancer_count_cohort_id` (`cohort_id`),
  CONSTRAINT `cancer_count_cancer_id` FOREIGN KEY (`cancer_id`) REFERENCES `lu_cancer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cc_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cc_gender_id` FOREIGN KEY (`gender_id`) REFERENCES `lu_gender` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cancer_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `dlh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `enrollment_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `major_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `mortality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `specimen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `specimen_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `technology`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  CONSTRAINT `technology_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`cohort_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cohort_activity_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cohort_user_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


SET FOREIGN_KEY_CHECKS = 1;
/* 
CREATE DEFINER=`cedcd_admin`@`%` PROCEDUREs
*/
DELIMITER ;;
DROP PROCEDURE IF EXISTS `advanced_cohort_select`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `advanced_cohort_select`(in gender text, in age_info varchar(100), in study_population text,
									in race text, in ethnicity text, 
									in domain text,in collected_specimen varchar(200),in cancer text,
                                    in booleanOperationBetweenField text, in booleanOperationWithInField text,
                                    in columnName varchar(40), in columnOrder varchar(10),
									in pageIndex int, in pageSize int)
BEGIN
	declare tmp text default '';
    declare v text default ''; 
	declare i int default 0;
    declare tmp_count int default 0; 
    
    set @and_query = "";
    set @or_query = "";
    
    set @gender_query = "";
    if gender != "" then
		if locate("4", gender) <= 0 and (locate("1", gender) > 0 or locate("2", gender) > 0) then
			set gender = concat(gender, ",4");
		end if;
		set @gender_query = concat("cs.gender_id in (",gender,") ");
		set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',1)),',',1));
		if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @gender_query);
		else
			set @or_query = concat(@or_query, " or ", @gender_query);
		end if;
	end if;

    set i = 0;
    set @age_query = "";
    if age_info != "" then
		set tmp_count = 1+length(age_info) - length(replace(age_info,',','')); 
		while i < tmp_count
		do
			set i=i+1;
            set v = reverse(substring_index(reverse(substring_index(age_info,',',i)),',',1));
            if v = "0-14" then
				set @age_query = concat(@age_query,"cs.enrollment_age_min <= 14");
            elseif v ="15-19" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 15 and cs.enrollment_age_min <= 19) or (cs.enrollment_age_max >= 15 and cs.enrollment_age_max <= 19) or (cs.enrollment_age_min <= 15 and cs.enrollment_age_max >= 19))");
            elseif v = "20-24" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 20 and cs.enrollment_age_min <= 24) or (cs.enrollment_age_max >= 20 and cs.enrollment_age_max <= 24) or (cs.enrollment_age_min <= 20 and cs.enrollment_age_max >= 24))");
			elseif v = "25-29" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 25 and cs.enrollment_age_min <= 29) or (cs.enrollment_age_max >= 25 and cs.enrollment_age_max <= 29) or (cs.enrollment_age_min <= 25 and cs.enrollment_age_max >= 29))");
            elseif v = "30-34" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 30 and cs.enrollment_age_min <= 34) or (cs.enrollment_age_max >= 30 and cs.enrollment_age_max <= 34) or (cs.enrollment_age_min <= 30 and cs.enrollment_age_max >= 34))");
			elseif v = "35-39" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 35 and cs.enrollment_age_min <= 39) or (cs.enrollment_age_max >= 35 and cs.enrollment_age_max <= 39) or (cs.enrollment_age_min <= 35 and cs.enrollment_age_max >= 39))");
			elseif v = "40-44" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 40 and cs.enrollment_age_min <= 44) or (cs.enrollment_age_max >= 40 and cs.enrollment_age_max <= 44) or (cs.enrollment_age_min <= 40 and cs.enrollment_age_max >= 44))");
			elseif v = "45-49" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 45 and cs.enrollment_age_min <= 49) or (cs.enrollment_age_max >= 45 and cs.enrollment_age_max <= 49) or (cs.enrollment_age_min <= 45 and cs.enrollment_age_max >= 49))");
			elseif v = "50-54" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 50 and cs.enrollment_age_min <= 54) or (cs.enrollment_age_max >= 50 and cs.enrollment_age_max <= 54) or (cs.enrollment_age_min <= 50 and cs.enrollment_age_max >= 54))");
			elseif v = "55-59" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 55 and cs.enrollment_age_min <= 59) or (cs.enrollment_age_max >= 55 and cs.enrollment_age_max <= 59) or (cs.enrollment_age_min <= 55 and cs.enrollment_age_max >= 59))");
			elseif v = "60-64" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 60 and cs.enrollment_age_min <= 64) or (cs.enrollment_age_max >= 60 and cs.enrollment_age_max <= 64) or (cs.enrollment_age_min <= 60 and cs.enrollment_age_max >= 64))");
			elseif v = "65-69" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 65 and cs.enrollment_age_min <= 69) or (cs.enrollment_age_max >= 65 and cs.enrollment_age_max <= 69) or (cs.enrollment_age_min <= 65 and cs.enrollment_age_max >= 69))");
			elseif v = "70-74" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 70 and cs.enrollment_age_min <= 74) or (cs.enrollment_age_max >= 70 and cs.enrollment_age_max <= 74) or (cs.enrollment_age_min <= 70 and cs.enrollment_age_max >= 74))");
			elseif v = "75-79" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 75 and cs.enrollment_age_min <= 79) or (cs.enrollment_age_max >= 75 and cs.enrollment_age_max <= 79) or (cs.enrollment_age_min <= 75 and cs.enrollment_age_max >= 79))");
			elseif v = "80-85+" then
				set @age_query = concat(@age_query,"cs.enrollment_age_max >= 80");
			else
				set @age_query = "";
            end if;
			if i < tmp_count then
				set @age_query = concat(@age_query," or ");
            end if;
		end while;
        
		set @age_query = concat("(",@age_query,") ");
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',2)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @age_query);
		else
			set @or_query = concat(@or_query, " or ", @age_query);
        end if;
    end if;
    
    set @study_query = "";
    if study_population != "" then
		set @study_query = concat("cs.eligible_disease in (",study_population,") ");
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',3)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @study_query);
		else
			set @or_query = concat(@or_query, " or ", @study_query);
        end if;
    end if;
    
    set @enrollment_race_query = "";
    if race != "" then
		set @enrollment_race_query = concat("cs.cohort_id in (select distinct cohort_id from enrollment_count where race_id in (",race,") and enrollment_counts > 0)");
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',4)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @enrollment_race_query);
		else
			set @or_query = concat(@or_query, " or ", @enrollment_race_query);
        end if;
    end if;
    
    set @enrollment_ethnicity_query = "";
    if ethnicity != "" then
		set @enrollment_ethnicity_query = concat("cs.cohort_id in (select distinct cohort_id from enrollment_count where ethnicity_id in (",ethnicity,") and enrollment_counts > 0)");
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',5)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @enrollment_ethnicity_query);
		else
			set @or_query = concat(@or_query, " or ", @enrollment_ethnicity_query);
        end if;
    end if;
    
    set @major_content_query = "";
    if domain != "" then
		set @major_content_query = concat("cs.cohort_id in (select cohort_id from major_content where domain_id in (",domain,") ", " and (baseline=1 or followup = 1) group by cohort_id ");
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',6)),',',1));
        if tmp = "AND" then
			set @len = LENGTH(domain) - LENGTH(REPLACE(domain, ',', '')) + 1;
			set @major_content_query = concat(@major_content_query, " having sum(1) >= ", @len);
        end if;
        set @major_content_query = concat(@major_content_query, " )");
        
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',6)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @major_content_query);
		else
			set @or_query = concat(@or_query, " or ", @major_content_query);
        end if;
    end if;
    
    set @specimen_query = "";
    if collected_specimen != "" then
    
		set @operator = reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',7)),',',1));
        
		set tmp_count = 1+length(collected_specimen) - length(replace(collected_specimen,',','')); 
		while i < tmp_count
		do
			set i=i+1;
			set tmp = concat(tmp,reverse(substring_index(reverse(substring_index(collected_specimen,',',i)),',',1)),"=1");
            if i < tmp_count then
				set tmp = concat(tmp," ", @operator, " ");
            end if;
		end while;

		set @specimen_query = concat("and cs.cohort_id in (select cohort_id from specimen where 1=1 ", "and (",tmp,") )");
        
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',7)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @specimen_query);
		else
			set @or_query = concat(@or_query, " or ", @specimen_query);
        end if;
	end if;
        
        
	set @cancer_query = "";
    if cancer != "" then
		set tmp = reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',8)),',',1));
        if tmp = "OR" then
			set @cancer_query = concat("and cs.cohort_id in (select distinct cohort_id from cancer_count where cancer_id in (",cancer,") and cancer_counts > 0 ");
		elseif tmp = "AND" then
			set @len = LENGTH(cancer) - LENGTH(REPLACE(cancer, ',', '')) + 1;
			set @cancer_query = concat("and cs.cohort_id in (select t.cohort_id from ( select cohort_id, cancer_id from cancer_count where cancer_id in (",cancer,") and cancer_counts > 0 group by cohort_id, cancer_id ) as t group by t.cohort_id ");
			set @cancer_query = concat(@cancer_query, " having sum(1) >= ", @len);
        end if;
		set @cancer_query = concat(@cancer_query,") ");
        
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',8)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @cancer_query);
		else
			set @or_query = concat(@or_query, " or ", @cancer_query);
        end if;
    end if;
    
    set @query = "select sql_calc_found_rows cs.cohort_id as id,cs.cohort_name, cs.cohort_acronym,cs.cohort_web_site,cs.update_time,sum(ec.enrollment_counts) as enrollment_total FROM cohort_basic cs, enrollment_count ec WHERE cs.cohort_id = ec.cohort_id ";
    
    if @and_query = "" and @or_query = "" then
		set @query = concat(@query, " ");
    elseif @and_query != "" and @or_query = "" then
		set @query = concat(@query, @and_query);
    elseif @and_query = "" and @or_query != "" then
		set @or_query = SUBSTRING(@or_query, 5);
        set @query = concat(@query, " and (", @or_query, ")");
    else
		set @query = concat(@query, @and_query, @or_query);
    end if;
    
    set @groupBy = " group by cs.cohort_id ";
    
    if columnName != "" then
		set @orderBy = concat(" order by ",columnName," ",columnOrder," ");
	else
		set @orderBy = "order by cs.cohort_name asc";
    end if;
    
    if pageIndex > -1 then
		set @paging = concat(' limit ',pageIndex,',',pageSize,' ');
	else
		set @paging = "";
    end if;
    
    set @query = concat(@query, @groupBy, @orderBy, @paging);
	PREPARE stmt FROM @query;
	EXECUTE stmt;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt;
END ;;

DROP PROCEDURE IF EXISTS `cohort_baseline_data`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_baseline_data`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id,cs.cohort_name,cs.cohort_acronym,mc.domain_id, ld.domain, ld.sub_domain, mc.baseline, mc.other_specify_baseline from cohort_basic cs, major_content mc, lu_domain ld where cs.cohort_id = mc.cohort_id and mc.domain_id = ld.id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

DROP PROCEDURE IF EXISTS `cohort_basic_info`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_basic_info`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, " and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.*,lg.gender, ci.ci_confirmed_cancer_year,m.mort_year_mortality_followup from cohort_basic cs, cancer_info ci, mortality m, lu_gender lg where cs.cohort_id = ci.cohort_id and cs.cohort_id = m.cohort_id and cs.gender_id = lg.id",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

DROP PROCEDURE IF EXISTS `cohort_cancer_info`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_cancer_info`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,ci.* from cohort_basic cs, cancer_info ci where cs.cohort_id = ci.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

DROP PROCEDURE IF EXISTS `cohort_description`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_description`(in c_id int(11))
BEGIN
	select * from cohort_basic where cohort_id = c_id;
    select * from attachment where cohort_id = c_id;
    select * from person where cohort_id = c_id and category_id in (1,3,4);
END ;;
DROP PROCEDURE IF EXISTS `cohort_followup_data`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_followup_data`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id,cs.cohort_name,cs.cohort_acronym,mc.domain_id, ld.domain, ld.sub_domain, mc.followup, mc.other_specify_followup from cohort_basic cs, major_content mc, lu_domain ld where cs.cohort_id = mc.cohort_id and mc.domain_id = ld.id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

DROP PROCEDURE IF EXISTS `cohort_linkages_technology`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_linkages_technology`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,cd.*, ct.* from cohort_basic cs, dlh cd, technology ct where cs.cohort_id = cd.cohort_id and cs.cohort_id = ct.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

DROP PROCEDURE IF EXISTS `cohort_list`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_list`()
BEGIN
	select id, cohort_name, cohort_acronym from cohort_basic order by cohort_acronym;
END ;;

DROP PROCEDURE IF EXISTS `cohort_lookup`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_lookup`()
BEGIN
	select * from lu_gender;
    select * from lu_cancer;
    select * from lu_domain;
    select * from lu_ethnicity;
    select * from lu_race;
    select * from lu_specimen;
END ;;

DROP PROCEDURE IF EXISTS `cohort_mortality`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_mortality`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,cm.* from cohort_basic cs, mortality cm where cs.cohort_id = cm.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

DROP PROCEDURE IF EXISTS `cohort_select`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_select`(in gender text,in age_info varchar(100), in study_population text, 
									in race text, in ethnicity text, 
									in domain text,in collected_specimen varchar(200),in cancer text,
                                    in columnName varchar(40), in columnOrder varchar(10),
									in pageIndex int, in pageSize int)
BEGIN
	declare tmp text default '';
    declare v text default ''; 
	declare i int default 0;
    declare tmp_count int default 0; 
    
    set @enrollment_query = "";
    if race != "" || ethnicity != "" then
		set @enrollment_query = "and cs.cohort_id in (select cohort_id from enrollment_count where 1=1 ";
        
		if race != "" then
			set @enrollment_query = concat(@enrollment_query, "and race_id in (",race,") ");
		end if;
		
		if ethnicity != "" then
			set @enrollment_query = concat(@enrollment_query, "and ethnicity_id in (",ethnicity,") ");
		end if;
        set @enrollment_query = concat(@enrollment_query, "  and enrollment_counts > 0)");
	end if;
    
    set @major_content_query = "";
    if domain != "" then
		set @major_content_query = concat("and cs.cohort_id in (select distinct cohort_id from major_content where domain_id in (",domain,") ", " and (baseline=1 or followup = 1) )");
    end if;
    
    set @specimen_query = "";
    if collected_specimen != "" then
		set tmp_count = 1+length(collected_specimen) - length(replace(collected_specimen,',','')); 
		while i < tmp_count
		do
			set i=i+1;
			set tmp = concat(tmp,reverse(substring_index(reverse(substring_index(collected_specimen,',',i)),',',1)),"=1");
            if i < tmp_count then
				set tmp = concat(tmp," or ");
            end if;
		end while;

		set @specimen_query = concat("and cs.cohort_id in (select cohort_id from specimen where 1=1 ", "and (",tmp,") )");
	end if;
        
        
	set @cancer_query = "";
    if cancer != "" then
		set @cancer_query = concat("and cs.cohort_id in (select distinct cohort_id from cancer_count where cancer_id in (",cancer,") and cancer_counts > 0 ");
        
        set @cancer_query = concat(@cancer_query,") ");
    end if;
    
    set @cohort_query = "";
	if gender != "" then
		if locate("4", gender) <= 0 and (locate("1", gender) > 0 or locate("2", gender) > 0) then
			set gender = concat(gender, ",4");
		end if;
		set @cohort_query = concat(@cohort_query, "and cs.gender_id in (",gender,") ");
	end if;

	/*
    if gender != "" then
		set @cohort_query = concat(@cohort_query, "and cs.gender_id in (",gender,") ");
    end if;
	*/
    set tmp = '';
    set i = 0;
    if age_info != "" then
		set tmp_count = 1+length(age_info) - length(replace(age_info,',','')); 
		while i < tmp_count
		do
			set i=i+1;
            set v = reverse(substring_index(reverse(substring_index(age_info,',',i)),',',1));
            if v = "0-14" then
				set tmp = concat(tmp,"cs.enrollment_age_min <= 14");
            elseif v ="15-19" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 15 and cs.enrollment_age_min <= 19) or (cs.enrollment_age_max >= 15 and cs.enrollment_age_max <= 19) or (cs.enrollment_age_min <= 15 and cs.enrollment_age_max >= 19))");
            elseif v = "20-24" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 20 and cs.enrollment_age_min <= 24) or (cs.enrollment_age_max >= 20 and cs.enrollment_age_max <= 24) or (cs.enrollment_age_min <= 20 and cs.enrollment_age_max >= 24))");
			elseif v = "25-29" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 25 and cs.enrollment_age_min <= 29) or (cs.enrollment_age_max >= 25 and cs.enrollment_age_max <= 29) or (cs.enrollment_age_min <= 25 and cs.enrollment_age_max >= 29))");
            elseif v = "30-34" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 30 and cs.enrollment_age_min <= 34) or (cs.enrollment_age_max >= 30 and cs.enrollment_age_max <= 34) or (cs.enrollment_age_min <= 30 and cs.enrollment_age_max >= 34))");
			elseif v = "35-39" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 35 and cs.enrollment_age_min <= 39) or (cs.enrollment_age_max >= 35 and cs.enrollment_age_max <= 39) or (cs.enrollment_age_min <= 35 and cs.enrollment_age_max >= 39))");
			elseif v = "40-44" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 40 and cs.enrollment_age_min <= 44) or (cs.enrollment_age_max >= 40 and cs.enrollment_age_max <= 44) or (cs.enrollment_age_min <= 40 and cs.enrollment_age_max >= 44))");
			elseif v = "45-49" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 45 and cs.enrollment_age_min <= 49) or (cs.enrollment_age_max >= 45 and cs.enrollment_age_max <= 49) or (cs.enrollment_age_min <= 45 and cs.enrollment_age_max >= 49))");
			elseif v = "50-54" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 50 and cs.enrollment_age_min <= 54) or (cs.enrollment_age_max >= 50 and cs.enrollment_age_max <= 54) or (cs.enrollment_age_min <= 50 and cs.enrollment_age_max >= 54))");
			elseif v = "55-59" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 55 and cs.enrollment_age_min <= 59) or (cs.enrollment_age_max >= 55 and cs.enrollment_age_max <= 59) or (cs.enrollment_age_min <= 55 and cs.enrollment_age_max >= 59))");
			elseif v = "60-64" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 60 and cs.enrollment_age_min <= 64) or (cs.enrollment_age_max >= 60 and cs.enrollment_age_max <= 64) or (cs.enrollment_age_min <= 60 and cs.enrollment_age_max >= 64))");
			elseif v = "65-69" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 65 and cs.enrollment_age_min <= 69) or (cs.enrollment_age_max >= 65 and cs.enrollment_age_max <= 69) or (cs.enrollment_age_min <= 65 and cs.enrollment_age_max >= 69))");
			elseif v = "70-74" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 70 and cs.enrollment_age_min <= 74) or (cs.enrollment_age_max >= 70 and cs.enrollment_age_max <= 74) or (cs.enrollment_age_min <= 70 and cs.enrollment_age_max >= 74))");
			elseif v = "75-79" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 75 and cs.enrollment_age_min <= 79) or (cs.enrollment_age_max >= 75 and cs.enrollment_age_max <= 79) or (cs.enrollment_age_min <= 75 and cs.enrollment_age_max >= 79))");
			elseif v = "80-85+" then
				set tmp = concat(tmp,"cs.enrollment_age_max >= 80");
			else
				set tmp = "";
            end if;
			if i < tmp_count then
				set tmp = concat(tmp," or ");
            end if;
		end while;
        
		set @cohort_query = concat(@cohort_query, "and (",tmp,") ");
    end if;
    
    if study_population != "" then
		set @cohort_query = concat(@cohort_query, "and cs.eligible_disease in (",study_population,") ");
    end if;
    
    set @groupBy = " group by cs.cohort_id ";
    
    if columnName != "" then
		set @orderBy = concat(" order by ",columnName," ",columnOrder," ");
	else
		set @orderBy = "order by cs.cohort_name asc";
    end if;
    
    if pageIndex > -1 then
		set @paging = concat(' limit ',pageIndex,',',pageSize,' ');
	else
		set @paging = "";
    end if;
    
    set @query = concat("select sql_calc_found_rows cs.cohort_id as id,cs.cohort_name, cs.cohort_acronym,cs.cohort_web_site,cs.update_time,sum(ec.enrollment_counts) as enrollment_total FROM cohort_basic cs, enrollment_count ec WHERE cs.cohort_id = ec.cohort_id ",@enrollment_query,@major_content_query,@specimen_query,@cancer_query);
    set @query = concat(@query, @cohort_query,@groupBy, @orderBy, @paging);
	PREPARE stmt FROM @query;
	EXECUTE stmt;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt;
END ;;


DROP PROCEDURE IF EXISTS `cohort_specimen_overview`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_specimen_overview`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,s.* from cohort_basic cs, specimen s where cs.cohort_id = s.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

DROP PROCEDURE IF EXISTS `Migrate_cancer_counts`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `Migrate_cancer_counts`()
BEGIN
	-- Bladder
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),2,ci_bladder_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),1,ci_bladder_female
	from cedcd.cohort_cancer;

	-- Bone
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),2,ci_bone_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),1,ci_bone_female
	from cedcd.cohort_cancer;

	-- Brain
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),2,ci_brain_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),1,ci_brain_female
	from cedcd.cohort_cancer;

	-- Breast
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Breast"),2,ci_breast_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Breast"),1,ci_breast_female
	from cedcd.cohort_cancer;

	-- Carcinoma

	-- Cervix
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix"),2,ci_cervix_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix"),1,ci_cervix_female
	from cedcd.cohort_cancer;

	-- Colon
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),2,ci_colon_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),1,ci_colon_female
	from cedcd.cohort_cancer;

	-- Corpus, body of uterus
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),2,ci_corpus_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),1,ci_corpus_female
	from cedcd.cohort_cancer;

	-- Esophagus
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),2,ci_esophagus_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),1,ci_esophagus_female
	from cedcd.cohort_cancer;

	-- Gall bladder and extrahepatic bile duct
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile duct"),2,ci_gall_bladder_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile duct"),1,ci_gall_bladder_female
	from cedcd.cohort_cancer;

	-- Kidney and other unspecified urinary organs
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),2,ci_kidney_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),1,ci_kidney_female
	from cedcd.cohort_cancer;

	-- Leukemia
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),2,ci_leukemia_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),1,ci_leukemia_female
	from cedcd.cohort_cancer;

	-- Liver and intrahepatic bile ducts
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),2,ci_liver_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),1,ci_liver_female
	from cedcd.cohort_cancer;

	-- Hodgkin Lymphoma
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),2,ci_lymphoma_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),1,ci_lymphoma_female
	from cedcd.cohort_cancer;

	-- Melanoma (excluding genital organs)
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding genital organs)"),2,ci_melanoma_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding genital organs)"),1,ci_melanoma_female
	from cedcd.cohort_cancer;

	-- Myeloma
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),2,ci_myeloma_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),1,ci_myeloma_female
	from cedcd.cohort_cancer;

	-- Non-Hodgkin Lymphoma
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),2,ci_lymphoma_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),1,ci_lymphoma_female
	from cedcd.cohort_cancer;

	-- Oropharyngeal
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),2,ci_oropharyngeal_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),1,ci_oropharyngeal_female
	from cedcd.cohort_cancer;

	-- Ovary, fallopian tube, broad ligament
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),2,ci_ovary_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),1,ci_ovary_female
	from cedcd.cohort_cancer;

	-- Pancreas
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),2,ci_pancreas_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),1,ci_pancreas_female
	from cedcd.cohort_cancer;

	-- Prostate
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),2,ci_prostate_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),1,ci_prostate_female
	from cedcd.cohort_cancer;

	-- Rectum and anus
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),2,ci_rectum_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),1,ci_rectum_female
	from cedcd.cohort_cancer;

	-- Small intestine
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),2,ci_small_intestine_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),1,ci_small_intestine_female
	from cedcd.cohort_cancer;

	-- Stomach
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),2,ci_stomach_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),1,ci_stomach_female
	from cedcd.cohort_cancer;

	-- Thyroid
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),2,ci_thyroid_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),1,ci_thyroid_female
	from cedcd.cohort_cancer;

	-- Trachea, bronchus, and lung
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Trachea, bronchus, and lung"),2,ci_lung_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Trachea, bronchus, and lung"),1,ci_lung_female
	from cedcd.cohort_cancer;

	-- All Other Cancers
	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),2,ci_all_other_cancers_male
	from cedcd.cohort_cancer;

	insert into cancer_count (cohort_id,cancer_id,gender_id,cancer_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),1,ci_all_other_cancers_female
	from cedcd.cohort_cancer;
END ;;


DROP PROCEDURE IF EXISTS `Migrate_enrollment_counts`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `Migrate_enrollment_counts`()
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
                set @query = concat(@query, " from cedcd.cohort_enrollment");
                
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
END ;;


DROP PROCEDURE IF EXISTS `Migrate_major_content`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `Migrate_major_content`()
BEGIN
	-- 1-Socio-economic Status (e.g., income)
	insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,1,mdc_income_baseline,mdc_income_followup,"",""  
    from cedcd.cohort_major_content;
	-- 2-Education Level
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,2,mdc_education_baseline,mdc_education_followup,"","" 
    from cedcd.cohort_major_content;
	-- 3-Marital Status
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,3,mdc_marital_status_baseline,mdc_marital_status_followup,"","" 
    from cedcd.cohort_major_content;
	-- 4-Language/Country of Origin
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,4,mdc_language_origin_baseline,mdc_language_origin_followup,"","" 
    from cedcd.cohort_major_content;
	-- 5-Employment Status
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,5,mdc_employment_baseline,mdc_employment_followup,"","" 
    from cedcd.cohort_major_content;
	-- 6-Health Insurance Status
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,6,mdc_health_insurance_baseline,mdc_health_insurance_followup,"","" 
    from cedcd.cohort_major_content;
	-- 7-Anthropometry (e.g., weight, height, waist circumference)
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,7,mdc_anthropometry_baseline,mdc_anthropometry_followup,"","" 
    from cedcd.cohort_major_content;
	-- 8-Dietary Intake
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,8,mdc_dietary_intake_baseline,mdc_dietary_intake_followup,"","" 
    from cedcd.cohort_major_content;
	-- 9-Dietary Supplement Use
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,9,mdc_dietary_supplement_baseline,mdc_dietary_supplement_followup,"","" 
    from cedcd.cohort_major_content;
	-- 10-Complementary and Alternative Medicine
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,10,mdc_alternative_medicine_baseline,mdc_alternative_medicine_followup,"","" 
    from cedcd.cohort_major_content;
	-- 11-Prescription Medication Use (not related to cancer treatment)
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,11,mdc_prescription_drug_use_baseline,mdc_prescription_drug_use_followup,"","" 
    from cedcd.cohort_major_content;
	-- 12-Non-prescription Medication Use (not related to cancer treatment)
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,12,mdc_nonprescription_drug_use_baseline,mdc_nonprescription_drug_use_followup,"","" 
    from cedcd.cohort_major_content;
	-- 13-Alcohol Consumption
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,13,mdc_alcohol_baseline,mdc_alcohol_followup,"","" 
    from cedcd.cohort_major_content;
	-- 14-Cigarette Smoking
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,14,mdc_cigarette_baseline,mdc_cigarette_followup,"","" 
    from cedcd.cohort_major_content;
	-- 15-Use of Tobacco Products Other than Cigarettes
		-- 1-Cigars
        insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,15,mdc_other_tobacco_cigars_baseline,mdc_other_tobacco_cigars_followup,"","" 
		from cedcd.cohort_major_content;
		-- 2-Pipes
        insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,16,mdc_other_tobacco_pipes_baseline,mdc_other_tobacco_pipes_followup,"","" 
		from cedcd.cohort_major_content;
		-- 3-Chewing tobacco
        insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,17,mdc_other_tobacco_chewing_baseline,mdc_other_tobacco_chewing_followup,"","" 
		from cedcd.cohort_major_content;
		-- 4-E-Cigarettes
        insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,18,mdc_other_tobacco_ecigarette_baseline,mdc_other_tobacco_ecigarette_followup,"","" 
		from cedcd.cohort_major_content;
		-- 5-Other
		insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,19,mdc_other_tobacco_other_baseline,mdc_other_tobacco_other_followup,mdc_other_tobacco_other_specify_baseline,mdc_other_tobacco_other_specify_followup 
		from cedcd.cohort_major_content;
	-- 16-Physical Activity
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,20,mdc_physical_activity_baseline,mdc_physical_activity_followup,"","" 
    from cedcd.cohort_major_content;
	-- 17-Sleep Habits
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,21,mdc_sleep_habits_baseline,mdc_sleep_habits_followup,"","" 
    from cedcd.cohort_major_content;
	-- 18-Reproductive History
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,22,mdc_reproductive_history_baseline,mdc_reproductive_history_followup,"","" 
    from cedcd.cohort_major_content;
	-- 19-Self-Reported Health
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,23,mdc_self_reported_health_baseline,mdc_self_reported_health_followup,"","" 
    from cedcd.cohort_major_content;
	-- 20-Quality of Life 
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,24,mdc_quality_of_life_baseline,mdc_quality_of_life_followup,"","" 
    from cedcd.cohort_major_content;
	-- 21-Social Support
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,25,mdc_social_support_baseline,mdc_social_support_followup,"","" 
    from cedcd.cohort_major_content;
	-- 22-Cognitive Function
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,26,mdc_cognitive_function_baseline,mdc_cognitive_function_followup,"","" 
    from cedcd.cohort_major_content;
	-- 23-Depression
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,27,mdc_depression_baseline,mdc_depression_followup,"","" 
    from cedcd.cohort_major_content;
	-- 24-Other Psychosocial Variables
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,28,mdc_other_psychosocial_baseline,mdc_other_psychosocial_followup,"","" 
    from cedcd.cohort_major_content;
	-- 25-Fatigue
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,29,mdc_fatigue_baseline,mdc_fatigue_followup,"","" 
    from cedcd.cohort_major_content;
	-- 26-Family History of Cancer
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,30,mdc_family_hsitory_of_cancer_baseline,mdc_family_hsitory_of_cancer_followup,"","" 
    from cedcd.cohort_major_content;
	-- 27-Family History of Cancer with Pedigrees
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,31,mdc_family_hsitory_of_cancer_pedigrees_baseline,mdc_family_hsitory_of_cancer_pedigrees_followup,"","" 
    from cedcd.cohort_major_content;
	-- 28-Environmental or Occupational Exposures (e.g. air contaminants/quality, occupational exposures and history, water source)
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,32,mdc_environment_baseline,mdc_environment_followup,"","" 
    from cedcd.cohort_major_content;
	-- 29-Residential history Information (zip code, GIS) over time?
    insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
    select cohort_id,33,mdc_residential_infomation_baseline,mdc_residential_infomation_followup,"","" 
    from cedcd.cohort_major_content;
	-- 30-Other Medical Conditions
		-- 6-Diabetes
        insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,34,mdc_diabetes_baseline,mdc_diabetes_followup,"","" 
		from cedcd.cohort_major_content;
		-- 7-Stroke
        insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,35,mdc_stroke_baseline,mdc_stroke_followup,"","" 
		from cedcd.cohort_major_content;
		-- 8-COPD and/or Emphysema
        insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,36,mdc_copd_baseline,mdc_copd_followup,"","" 
		from cedcd.cohort_major_content;
		-- 9-Cardiovascular Disease
        insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,37,mdc_cardiovascular_disease_baseline,mdc_cardiovascular_disease_followup,"","" 
		from cedcd.cohort_major_content;
		-- 10-Osteoporosis
        insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,38,mdc_osteoporosis_baseline,mdc_osteoporosis_followup,"","" 
		from cedcd.cohort_major_content;
		-- 11-Mental Health
        insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,39,mdc_mental_health_baseline,mdc_mental_health_followup,"","" 
		from cedcd.cohort_major_content;
		-- 12-Cognitive Decline
        insert into major_content(cohort_id,domain_id,baseline,followup,other_specify_baseline,other_specify_followup) 
		select cohort_id,40,mdc_cognitive_decline_baseline,mdc_cognitive_decline_followup,"","" 
		from cedcd.cohort_major_content;
END ;;


DROP PROCEDURE IF EXISTS `Migrate_person`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `Migrate_person`()
BEGIN
	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,1,completed_by_name,completed_by_position,'',completed_by_phone,completed_by_email
	from cedcd.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,2,contact_name,contact_position,'',contact_phone,contact_email
	from cedcd.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_1,
	'',
	pi_institution_1,
	'',
	pi_email_1
	from cedcd.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_2,
	'',
	pi_institution_2,
	'',
	pi_email_2
	from cedcd.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_3,
	'',
	pi_institution_3,
	'',
	pi_email_3
	from cedcd.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_4,
	'',
	pi_institution_4,
	'',
	pi_email_4
	from cedcd.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_5,
	'',
	pi_institution_5,
	'',
	pi_email_5
	from cedcd.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,3,
	pi_name_6,
	'',
	pi_institution_6,
	'',
	pi_email_6
	from cedcd.cohort_basic;

	insert into person (cohort_id,category_id,name,position,institution,phone,email)
	select cohort_id,4,
	collab_contact_name,
	collab_contact_position,
	'',
	collab_contact_phone,
	collab_contact_email
	from cedcd.cohort_basic;
END ;;

DROP PROCEDURE IF EXISTS `Migrate_specimens_counts`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `Migrate_specimens_counts`()
BEGIN
	-- Bladder
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),1,bio_bladder_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),2,bio_bladder_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),3,bio_bladder_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),4,bio_bladder_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),5,bio_bladder_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),6,bio_bladder_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bladder"),7,bio_bladder_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Bone
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),1,bio_bone_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),2,bio_bone_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),3,bio_bone_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),4,bio_bone_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),5,bio_bone_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),6,bio_bone_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Bone"),7,bio_bone_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Brain
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),1,bio_brain_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),2,bio_brain_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),3,bio_brain_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),4,bio_brain_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),5,bio_brain_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),6,bio_brain_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Brain"),7,bio_brain_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Breast
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Breast"),1,bio_breast_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Breast"),2,bio_breast_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Breast"),3,bio_breast_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Breast"),4,bio_breast_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Breast"),5,bio_breast_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Breast"),6,bio_breast_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Breast"),7,bio_breast_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Carcinoma

	-- Cervix
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix"),1,bio_cervix_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix"),2,bio_cervix_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix"),3,bio_cervix_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix"),4,bio_cervix_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix"),5,bio_cervix_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix"),6,bio_cervix_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Cervix"),7,bio_cervix_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Colon
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),1,bio_colon_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),2,bio_colon_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),3,bio_colon_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),4,bio_colon_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),5,bio_colon_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),6,bio_colon_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Colon"),7,bio_colon_tumor_tissue_2
	from cedcd.cohort_specimens;
    
	-- Corpus, body of uterus
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),1,bio_corpus_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),2,bio_corpus_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),3,bio_corpus_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),4,bio_corpus_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),5,bio_corpus_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),6,bio_corpus_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Corpus, body of uterus"),7,bio_corpus_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Esophagus
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),1,bio_esophagus_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),2,bio_esophagus_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),3,bio_esophagus_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),4,bio_esophagus_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),5,bio_esophagus_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),6,bio_esophagus_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Esophagus"),7,bio_esophagus_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Gall bladder and extrahepatic bile duct
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile duct"),1,bio_gall_bladder_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile duct"),2,bio_gall_bladder_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile duct"),3,bio_gall_bladder_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile duct"),4,bio_gall_bladder_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile duct"),5,bio_gall_bladder_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile duct"),6,bio_gall_bladder_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Gall bladder and extrahepatic bile duct"),7,bio_gall_bladder_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Kidney and other unspecified urinary organs
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),1,bio_kidney_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),2,bio_kidney_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),3,bio_kidney_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),4,bio_kidney_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),5,bio_kidney_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),6,bio_kidney_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Kidney and other unspecified urinary organs"),7,bio_kidney_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Leukemia
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),1,bio_leukemia_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),2,bio_leukemia_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),3,bio_leukemia_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),4,bio_leukemia_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),5,bio_leukemia_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),6,bio_leukemia_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Leukemia"),7,bio_leukemia_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Liver and intrahepatic bile ducts
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),1,bio_liver_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),2,bio_liver_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),3,bio_liver_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),4,bio_liver_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),5,bio_liver_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),6,bio_liver_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Liver and intrahepatic bile ducts"),7,bio_liver_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Hodgkin Lymphoma
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),1,bio_lymphoma_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),2,bio_lymphoma_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),3,bio_lymphoma_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),4,bio_lymphoma_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),5,bio_lymphoma_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),6,bio_lymphoma_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Hodgkin Lymphoma"),7,bio_lymphoma_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Melanoma (excluding genital organs)
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding genital organs)"),1,bio_melanoma_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding genital organs)"),2,bio_melanoma_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding genital organs)"),3,bio_melanoma_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding genital organs)"),4,bio_melanoma_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding genital organs)"),5,bio_melanoma_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding genital organs)"),6,bio_melanoma_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Melanoma (excluding genital organs)"),7,bio_melanoma_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Myeloma
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),1,bio_myeloma_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),2,bio_myeloma_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),3,bio_myeloma_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),4,bio_myeloma_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),5,bio_myeloma_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),6,bio_myeloma_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Myeloma"),7,bio_myeloma_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Non-Hodgkin Lymphoma
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),1,bio_lymphoma_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),2,bio_lymphoma_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),3,bio_lymphoma_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),4,bio_lymphoma_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),5,bio_lymphoma_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),6,bio_lymphoma_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Non-Hodgkin Lymphoma"),7,bio_lymphoma_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Oropharyngeal
    insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),1,bio_oropharyngeal_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),2,bio_oropharyngeal_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),3,bio_oropharyngeal_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),4,bio_oropharyngeal_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),5,bio_oropharyngeal_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),6,bio_oropharyngeal_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Oropharyngeal"),7,bio_oropharyngeal_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Ovary, fallopian tube, broad ligament
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),1,bio_ovary_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),2,bio_ovary_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),3,bio_ovary_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),4,bio_ovary_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),5,bio_ovary_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),6,bio_ovary_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Ovary, fallopian tube, broad ligament"),7,bio_ovary_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Pancreas
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),1,bio_pancreas_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),2,bio_pancreas_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),3,bio_pancreas_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),4,bio_pancreas_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),5,bio_pancreas_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),6,bio_pancreas_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Pancreas"),7,bio_pancreas_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Prostate
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),1,bio_prostate_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),2,bio_prostate_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),3,bio_prostate_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),4,bio_prostate_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),5,bio_prostate_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),6,bio_prostate_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Prostate"),7,bio_prostate_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Rectum and anus
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),1,bio_rectum_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),2,bio_rectum_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),3,bio_rectum_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),4,bio_rectum_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),5,bio_rectum_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),6,bio_rectum_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Rectum and anus"),7,bio_rectum_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Small intestine
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),1,bio_small_intestine_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),2,bio_small_intestine_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),3,bio_small_intestine_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),4,bio_small_intestine_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),5,bio_small_intestine_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),6,bio_small_intestine_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Small intestine"),7,bio_small_intestine_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Stomach
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),1,bio_stomach_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),2,bio_stomach_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),3,bio_stomach_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),4,bio_stomach_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),5,bio_stomach_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),6,bio_stomach_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Stomach"),7,bio_stomach_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Thyroid
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),1,bio_thyroid_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),2,bio_thyroid_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),3,bio_thyroid_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),4,bio_thyroid_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),5,bio_thyroid_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),6,bio_thyroid_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Thyroid"),7,bio_thyroid_tumor_tissue_2
	from cedcd.cohort_specimens;

	-- Trachea, bronchus, and lung
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Trachea, bronchus, and lung"),1,bio_lung_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Trachea, bronchus, and lung"),2,bio_lung_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Trachea, bronchus, and lung"),3,bio_lung_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Trachea, bronchus, and lung"),4,bio_lung_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Trachea, bronchus, and lung"),5,bio_lung_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Trachea, bronchus, and lung"),6,bio_lung_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "Trachea, bronchus, and lung"),7,bio_lung_tumor_tissue_2
	from cedcd.cohort_specimens;
    
	-- All Other Cancers
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),1,bio_all_other_cancers_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),2,bio_all_other_cancers_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),3,bio_all_other_cancers_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),4,bio_all_other_cancers_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),5,bio_all_other_cancers_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),6,bio_all_other_cancers_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "All Other Cancers"),7,bio_all_other_cancers_tumor_tissue_2
	from cedcd.cohort_specimens;
    
    -- No Cancer
    insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),1,bio_no_cancer_serum
	from cedcd.cohort_specimens;

	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),2,bio_no_cancer_buffy
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),3,bio_no_cancer_saliva
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),4,bio_no_cancer_urine
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),5,bio_no_cancer_feces
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),6,bio_no_cancer_tumor_tissue_1
	from cedcd.cohort_specimens;
    
	insert into specimen_count (cohort_id,cancer_id,specimen_id,specimens_counts)
	select cohort_id,(select id from lu_cancer where cancer = "No Cancer"),7,bio_no_cancer_tumor_tissue_2
	from cedcd.cohort_specimens;

END ;;


DROP PROCEDURE IF EXISTS `select_cancer_counts`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `select_cancer_counts`(in gender text, in cancer text,in cohort text)
BEGIN
    set @queryString = "select cc.cohort_id, cs.cohort_name, cs.cohort_acronym,concat(cc.gender_id,'_',cc.cancer_id) as u_id, cc.gender_id, lg.gender, cc.cancer_id, lc.cancer, cc.cancer_counts from cancer_count cc, cohort_basic cs, lu_gender lg, lu_cancer lc
						where cc.cohort_id = cs.cohort_id 
						and cc.gender_id = lg.id
						and cc.cancer_id = lc.id ";
    
    if gender != "" then
		set @queryString = concat(@queryString, "and cc.gender_id in (",gender,") ");
    end if;
    
    if cancer != "" then
		set @queryString = concat(@queryString, "and cc.cancer_id in (",cancer,") ");
    end if;
    
    if cohort != "" then
		set @queryString = concat(@queryString, "and cc.cohort_id in (",cohort,") ");
    end if;
    
    set @query = concat(@queryString, " order by cc.cancer_id, cc.gender_id, cs.cohort_acronym");
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

DROP PROCEDURE IF EXISTS `select_enrollment_counts`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `select_enrollment_counts`(in gender text, in race text,in ethnicity text,in cohort text)
BEGIN
    set @queryString = "select ec.cohort_id, cs.cohort_name, cs.cohort_acronym,concat(ec.gender_id,'_',ec.ethnicity_id,'_',ec.race_id) as u_id, ec.gender_id, lg.gender, ec.ethnicity_id, le.ethnicity, ec.race_id, lr.race, ec.enrollment_counts from enrollment_count ec, cohort_basic cs, lu_gender lg, lu_ethnicity le, lu_race lr
						where ec.cohort_id = cs.cohort_id 
						and ec.gender_id = lg.id
						and ec.ethnicity_id = le.id
						and ec.race_id = lr.id ";
    
    if gender != "" then
		set @queryString = concat(@queryString, "and ec.gender_id in (",gender,") ");
    end if;
    
    if race != "" then
		set @queryString = concat(@queryString, "and ec.race_id in (",race,") ");
    end if;
    
    if ethnicity != "" then
		set @queryString = concat(@queryString, "and ec.ethnicity_id in (",ethnicity,") ");
    end if;
    
    if cohort != "" then
		set @queryString = concat(@queryString, "and ec.cohort_id in (",cohort,") ");
    end if;
    
    -- set @query = concat(@queryString, " order by ec.gender_id, le.ethnicity, ec.race_id, cs.cohort_acronym");
	set @query = concat(@queryString, " order by ec.gender_id, le.ethnicity, ec.race_id, cs.cohort_acronym");
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

DROP PROCEDURE IF EXISTS `select_specimen_counts`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `select_specimen_counts`(in specimen text, in cancer text,in cohort text)
BEGIN
    set @queryString = "select sc.cohort_id, cs.cohort_name, cs.cohort_acronym,concat(sc.specimen_id,'_',sc.cancer_id) as u_id, sc.specimen_id, ls.specimen, sc.cancer_id, lc.cancer, sc.specimens_counts from specimen_count sc, cohort_basic cs, lu_specimen ls, lu_cancer lc
						where sc.cohort_id = cs.cohort_id 
						and sc.specimen_id = ls.id
						and sc.cancer_id = lc.id ";
    
    if specimen != "" then
		set @queryString = concat(@queryString, "and sc.specimen_id in (",specimen,") ");
    end if;
    
    if cancer != "" then
		set @queryString = concat(@queryString, "and sc.cancer_id in (",cancer,") ");
    end if;
    
    if cohort != "" then
		set @queryString = concat(@queryString, "and sc.cohort_id in (",cohort,") ");
    end if;
    
    set @query = concat(@queryString, " order by sc.specimen_id, sc.cancer_id, cs.cohort_acronym");
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END;;
DELIMITER ;
/*
Generate data for lookup table lu_gender
*/
insert into lu_gender(gender) values ("Female");
insert into lu_gender(gender) values ("Male");
insert into lu_gender(gender) values ("Unknown");
insert into lu_gender(gender) values ("Both");

/*
Generate data for lookup table lu_cancer
*/
insert into lu_cancer(icd9,icd10,cancer) 
values ("","","All Other Cancers"),
("188","C67","Bladder"),
("170","C40","Bone"),
("191","C71","Brain"),
("174-175","C50","Breast"),
("233","D05","Carcinoma"),
("180","C53","Cervix"),
("153","C18","Colon"),
("182","C54","Corpus, body of uterus"),
("150","C15","Esophagus"),
("156","C23, C24","Gall bladder and extrahepatic bile duct"),
("189","C64-C66, C68","Kidney and other unspecified urinary organs"),
("204-208","C91-95","Leukemia"),
("155","C22","Liver and intrahepatic bile ducts"),
("201","C81-84","Hodgkin Lymphoma"),
("172","C43","Melanoma (excluding genital organs)"),
("203","C90","Myeloma"),
("200, 202","C85","Non-Hodgkin Lymphoma"),
("141-149","C00-C14","Oropharyngeal"),
("183","C56","Ovary, fallopian tube, broad ligament"),
("157","C25","Pancreas"),
("185","C61","Prostate"),
("154","C19-C21","Rectum and anus"),
("152","C17","Small intestine"),
("151","C16","Stomach"),
("193","C73","Thyroid"),
("162","C34","Trachea, bronchus, and lung"),
("","","No Cancer");

/*
Generate data for lookup table lu_domain
*/
insert into lu_domain(domain, sub_domain) values ("Socio-economic Status (e.g., income)","");
insert into lu_domain(domain, sub_domain) values ("Education Level","");
insert into lu_domain(domain, sub_domain) values ("Marital Status","");
insert into lu_domain(domain, sub_domain) values ("Language/Country of Origin","");
insert into lu_domain(domain, sub_domain) values ("Employment Status","");
insert into lu_domain(domain, sub_domain) values ("Health Insurance Status","");
insert into lu_domain(domain, sub_domain) values ("Anthropometry (e.g., weight, height, waist circumference)","");
insert into lu_domain(domain, sub_domain) values ("Dietary Intake","");
insert into lu_domain(domain, sub_domain) values ("Dietary Supplement Use","");
insert into lu_domain(domain, sub_domain) values ("Complementary and Alternative Medicine","");
insert into lu_domain(domain, sub_domain) values ("Prescription Medication Use (not related to cancer treatment)","");
insert into lu_domain(domain, sub_domain) values ("Non-prescription Medication Use (not related to cancer treatment)","");
insert into lu_domain(domain, sub_domain) values ("Alcohol Consumption","");
insert into lu_domain(domain, sub_domain) values ("Cigarette Smoking","");
insert into lu_domain(domain, sub_domain) values ("Use of Tobacco Products Other than Cigarettes","Cigars");
insert into lu_domain(domain, sub_domain) values ("Use of Tobacco Products Other than Cigarettes","Pipes");
insert into lu_domain(domain, sub_domain) values ("Use of Tobacco Products Other than Cigarettes","Chewing tobacco");
insert into lu_domain(domain, sub_domain) values ("Use of Tobacco Products Other than Cigarettes","E-Cigarettes");
insert into lu_domain(domain, sub_domain) values ("Use of Tobacco Products Other than Cigarettes","Other");
insert into lu_domain(domain, sub_domain) values ("Physical Activity","");
insert into lu_domain(domain, sub_domain) values ("Sleep Habits","");
insert into lu_domain(domain, sub_domain) values ("Reproductive History","");
insert into lu_domain(domain, sub_domain) values ("Self-Reported Health","");
insert into lu_domain(domain, sub_domain) values ("Quality of Life",""); 
insert into lu_domain(domain, sub_domain) values ("Social Support","");
insert into lu_domain(domain, sub_domain) values ("Cognitive Function","");
insert into lu_domain(domain, sub_domain) values ("Depression","");
insert into lu_domain(domain, sub_domain) values ("Other Psychosocial Variables","");
insert into lu_domain(domain, sub_domain) values ("Fatigue","");
insert into lu_domain(domain, sub_domain) values ("Family History of Cancer","");
insert into lu_domain(domain, sub_domain) values ("Family History of Cancer with Pedigrees","");
insert into lu_domain(domain, sub_domain) values ("Environmental or Occupational Exposures (e.g. air contaminants/quality, occupational exposures and history, water source)","");
insert into lu_domain(domain, sub_domain) values ("Residential history Information (zip code, GIS) over time?","");
insert into lu_domain(domain, sub_domain) values ("Other Medical Conditions","Diabetes");
insert into lu_domain(domain, sub_domain) values ("Other Medical Conditions","Stroke");
insert into lu_domain(domain, sub_domain) values ("Other Medical Conditions","COPD and/or Emphysema");
insert into lu_domain(domain, sub_domain) values ("Other Medical Conditions","Cardiovascular Disease");
insert into lu_domain(domain, sub_domain) values ("Other Medical Conditions","Osteoporosis");
insert into lu_domain(domain, sub_domain) values ("Other Medical Conditions","Mental Health");
insert into lu_domain(domain, sub_domain) values ("Other Medical Conditions","Cognitive Decline");

/*
Generate data for lookup table lu_specimen
*/
insert into lu_specimen(specimen) values ("Serum and/or Plasma");
insert into lu_specimen(specimen) values ("Buffy Coat and/or Lymphocytes");
insert into lu_specimen(specimen) values ("Saliva and/or Buccal");
insert into lu_specimen(specimen) values ("Urine");
insert into lu_specimen(specimen) values ("Feces");
insert into lu_specimen(specimen) values ("Tumor Tissue Fresh/Frozen");
insert into lu_specimen(specimen) values ("Tumor Tissue FFPE");


/*
Generate data for lookup table lu_race
*/
insert into lu_race(race) values ("American Indian/Alaska Native");
insert into lu_race(race) values ("Asian");
insert into lu_race(race) values ("Native Hawaiian or Other Pacific Islander");
insert into lu_race(race) values ("Black or African American");
insert into lu_race(race) values ("White");
insert into lu_race(race) values ("More Than One Race");
insert into lu_race(race) values ("Unknown or Not Reported");

/*
Generate data for lookup table lu_ethnicity
*/
insert into lu_ethnicity(ethnicity) values ("Not Hispanic or Latino");
insert into lu_ethnicity(ethnicity) values ("Hispanic or Latino");
insert into lu_ethnicity(ethnicity) values ("Unknown/Not Reported Ethnicity");

/*
Generate data for lookup table lu_category
*/
insert into lu_category(category) values ("Person who completed the form");
insert into lu_category(category) values ("Contact Person for clarification of the form");
insert into lu_category(category) values ("Cohort Principal Investigator");
insert into lu_category(category) values ("Person to contact if an investigator is interested");

/*
Generate default users 
*/
insert into user(last_name,  first_name,  access_level, active_status, email) values
('Chen', 'Kailing', 'SystemAdmin', 'Y','kai-ling.chen@nih.gov');
insert into user(last_name,  first_name,  access_level, active_status, email) values
('Zhao', 'Joe', 'SystemAdmin', 'Y','joe.zhao@nih.gov');
insert into user(last_name,  first_name,  access_level, active_status, email) values
('Zhang', 'Chao', 'SystemAdmin', 'Y','chao.zhang3@nih.gov');
insert into user(last_name,  first_name,  access_level, active_status, email) values
('Elena', 'Joanne', 'CohortAdmin', 'Y','kai-ling.chen@nih.gov');
insert into user(last_name,  first_name,  access_level, active_status, email) values
('Rogers', 'Scott', 'CohortAdmin', 'Y','rogerssc@mail.nih.gov');
insert into user(last_name,  first_name,  access_level, active_status, email) values
('Pottinger', 'Camille', 'CohortAdmin', 'Y','camille.pottinger@nih.gov');

/*
Generate data for major table cohort from old cedcd schema
*/
insert into cohort (cohort_id, cohort_name, cohort_acronym, cohort_admin, status, create_time, update_time)
select cohort_id,
cohort_name,
cohort_acronym,
'system_admin',
'published',
create_time,
update_time
from cedcd.cohort_basic;


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
request_procedures_web,
request_procedures_web_url,
request_procedures_pdf,
request_procedures_none,
cohort_description,
gender_id,
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
request_procedures_web,
request_procedures_web_url,
request_procedures_pdf,
request_procedures_none,
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
from cedcd.cohort_basic;

/*
Migrate data from table cohort_attachment to cohort_attachment_new
*/
insert into attachment (
id,
cohort_id,
attachment_type,
category,
filename,
website,
status,
create_time,
update_time
)
select attachment_id,
cohort_id,
attachment_type,
category,
filename,
website,
status,
create_time,
update_time
from cedcd.cohort_attachment;

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
from cedcd.cohort_cancer cc , cedcd.cohort_major_content cmc
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
from cedcd.cohort_dlh;

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
from cedcd.cohort_mortality;

/*
Migrate data from table cohort_specimens to cohort_specimens_new
*/
insert into specimen (
cohort_id,
bio_blood_baseline,
bio_blood_baseline_serum,
bio_blood_baseline_plasma,
bio_blood_baseline_buffy_coat,
bio_blood_baseline_other_derivative,
bio_blood_other_time,
bio_blood_other_time_serum,
bio_blood_other_time_plasma,
bio_blood_other_time_buffy_coat,
bio_blood_other_time_other_derivative,
bio_buccal_saliva_baseline,
bio_buccal_saliva_other_time,
bio_tissue_baseline,
bio_tissue_other_time,
bio_tumor_block_info,
bio_genotyping_data,
bio_sequencing_data_exome,
bio_sequencing_data_whole_genome,
bio_epigenetic_or_metabolic_markers,
bio_other_omics_data
)
select cohort_id,
bio_blood_baseline,
bio_blood_baseline_serum,
bio_blood_baseline_plasma,
bio_blood_baseline_buffy_coat,
bio_blood_baseline_other_derivative,
bio_blood_other_time,
bio_blood_other_time_serum,
bio_blood_other_time_plasma,
bio_blood_other_time_buffy_coat,
bio_blood_other_time_other_derivative,
bio_buccal_saliva_baseline,
bio_buccal_saliva_other_time,
bio_tissue_baseline,
bio_tissue_other_time,
bio_tumor_block_info,
bio_genotyping_data,
bio_sequencing_data_exome,
bio_sequencing_data_whole_genome,
bio_epigenetic_or_metabolic_markers,
bio_other_omics_data
from cedcd.cohort_specimens;

/*
Migrate data from table cohort_specimens to cohort_specimens_counts
*/
CALL Migrate_specimens_counts();

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
from cedcd.cohort_technology;
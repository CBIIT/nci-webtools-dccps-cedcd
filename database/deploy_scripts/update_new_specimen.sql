set FOREIGN_key_checks = 0;

DROP TABLE IF EXISTS `lu_domain`;

DROP TABLE IF EXISTS `lu_data_collected_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lu_data_collected_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(500) NOT NULL,
  `sub_category` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

alter table lu_specimen add  sub_category varchar(100) NULL after specimen;

create table major_content_bk as select * from major_content;
DROP TABLE IF EXISTS `major_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `major_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cohort_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `baseline` int(1) NOT NULL,
  `followup` int(1) NOT NULL,
  `other_specify_baseline` varchar(200) DEFAULT NULL,
  `other_specify_followup` varchar(200) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `major_content_new_cohort_id_idx` (`cohort_id`),
  KEY `major_content_domain_id_idx_idx` (`category_id`),
  CONSTRAINT `major_content_new_cohort_id_idx` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `mc_domain_id` FOREIGN KEY (`category_id`) REFERENCES `lu_data_collected_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

insert into major_content select * from major_content_bk;

DROP TABLE IF EXISTS `specimen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specimen` (
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
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `specimen_new_cohort_id_idx` (`cohort_id`),
  CONSTRAINT `specimen_new_cohort_id` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `specimen_collected_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specimen_collected_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cohort_id` int NOT NULL,
  `specimen_id` int NOT NULL,
  `collected_yn` int NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `specimen_collected__cohort_id_idx` (`cohort_id`),
  KEY `specimen_collected_type_idx` (`specimen_id`),
  CONSTRAINT `specimen_collected__cohort_id_idx` FOREIGN KEY (`cohort_id`) REFERENCES `cohort` (`id`),
  CONSTRAINT `specimen_collected_type_idx` FOREIGN KEY (`specimen_id`) REFERENCES `lu_specimen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1324 DEFAULT CHARSET=utf8;


/*
 Generate data for lookup table lu_data_collected_category
 */
insert into lu_data_collected_category(id, category, sub_category) values (1, "Socio-economic Status","");
insert into lu_data_collected_category(id, category, sub_category) values (2, "Education Level","");
insert into lu_data_collected_category(id, category, sub_category) values (3, "Marital Status","");
insert into lu_data_collected_category(id, category, sub_category) values (4, "Language/Country of Origin","");
insert into lu_data_collected_category(id, category, sub_category) values (5, "Employment Status","");
insert into lu_data_collected_category(id, category, sub_category) values (6, "Health Insurance Status","");
insert into lu_data_collected_category(id, category, sub_category) values (7, "Anthropometry","");
insert into lu_data_collected_category(id, category, sub_category) values (8, "Dietary Intake","");
insert into lu_data_collected_category(id, category, sub_category) values (9, "Dietary Supplement Use","");
insert into lu_data_collected_category(id, category, sub_category) values (10, "Complementary and Alternative Medicine","");
insert into lu_data_collected_category(id, category, sub_category) values (11, "Prescription Medication Use","");
insert into lu_data_collected_category(id, category, sub_category) values (12, "Non-prescription Medication","");
insert into lu_data_collected_category(id, category, sub_category) values (13, "Alcohol Consumption","");
insert into lu_data_collected_category(id, category, sub_category) values (14, "Cigarette Smoking","");
insert into lu_data_collected_category(id, category, sub_category) values (15, "Other Tobacco Products","Cigars");
insert into lu_data_collected_category(id, category, sub_category) values (16, "Other Tobacco Products","Pipes");
insert into lu_data_collected_category(id, category, sub_category) values (17, "Other Tobacco Products","Chewing tobacco");
insert into lu_data_collected_category(id, category, sub_category) values (18, "Other Tobacco Products","E-Cigarettes");
insert into lu_data_collected_category(id, category, sub_category) values (19, "Other Tobacco Products","Other");
insert into lu_data_collected_category(id, category, sub_category) values (20, "Physical Activity","");
insert into lu_data_collected_category(id, category, sub_category) values (21, "Sleep Habits","");
insert into lu_data_collected_category(id, category, sub_category) values (22, "Reproductive History","");
insert into lu_data_collected_category(id, category, sub_category) values (23, "Self-Reported Health","");
insert into lu_data_collected_category(id, category, sub_category) values (24, "Quality of Life",""); 
insert into lu_data_collected_category(id, category, sub_category) values (25, "Social Support","");
insert into lu_data_collected_category(id, category, sub_category) values (26, "Cognitive Function","");
insert into lu_data_collected_category(id, category, sub_category) values (27, "Depression","");
insert into lu_data_collected_category(id, category, sub_category) values (28, "Other Psychosocial Variables","");
insert into lu_data_collected_category(id, category, sub_category) values (29, "Fatigue","");
insert into lu_data_collected_category(id, category, sub_category) values (30, "Family History of Cancer","Family History of Cancer");
insert into lu_data_collected_category(id, category, sub_category) values (31, "Family History of Cancer","Family History of Cancer with Pedigrees");
insert into lu_data_collected_category(id, category, sub_category) values (32, "Environmental or Occupational Exposures","");
insert into lu_data_collected_category(id, category, sub_category) values (33, "Residential Information","");
insert into lu_data_collected_category(id, category, sub_category) values (34, "Other Medical Conditions","Diabetes");
insert into lu_data_collected_category(id, category, sub_category) values (35, "Other Medical Conditions","Stroke");
insert into lu_data_collected_category(id, category, sub_category) values (36, "Other Medical Conditions","COPD and/or Emphysema");
insert into lu_data_collected_category(id, category, sub_category) values (37, "Other Medical Conditions","Cardiovascular Disease");
insert into lu_data_collected_category(id, category, sub_category) values (38, "Other Medical Conditions","Osteoporosis");
insert into lu_data_collected_category(id, category, sub_category) values (39, "Other Medical Conditions","Mental Health");
insert into lu_data_collected_category(id, category, sub_category) values (40, "Other Medical Conditions","Cognitive Decline");
insert into lu_data_collected_category(id, category, sub_category) values (41, "Cancer Treatment","");

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
(44,"Metabolomic","bio_meta_outcomes_in_other_study"),
(45,"Metabolomic","bio_member_of_metabolomics_studies");

 insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_baseline"),bio_blood_baseline
	from  cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_baseline_serum"),bio_blood_baseline_serum
	from  cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_baseline_plasma"),bio_blood_baseline_plasma
	from  cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_baseline_buffy_coat"),bio_blood_baseline_buffy_coat
	from  cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_baseline_other_derivative"),bio_blood_baseline_other_derivative
	from  cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_other_time"),bio_blood_other_time
	from  cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_other_time_serum"),bio_blood_other_time_serum
	from  cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_other_time_plasma"),bio_blood_other_time_plasma
	from  cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_other_time_buffy_coat"),bio_blood_other_time_buffy_coat
	from  cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_blood_other_time_other_derivative"),bio_blood_other_time_other_derivative
	from  cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_buccal_saliva_baseline"),bio_buccal_saliva_baseline
	from  cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_buccal_saliva_other_time"),bio_buccal_saliva_other_time
	from  cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_tissue_baseline"),bio_tissue_baseline
	from  cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_tissue_other_time"),bio_tissue_other_time
	from  cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_tumor_block_info"),bio_tumor_block_info
	from  cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_genotyping_data"),bio_genotyping_data
	from  cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_sequencing_data_exome"),bio_sequencing_data_exome
	from  cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_sequencing_data_whole_genome"),bio_sequencing_data_whole_genome
	from  cedcd_old.cohort_specimens;

    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_epigenetic_or_metabolic_markers"),bio_epigenetic_or_metabolic_markers
	from  cedcd_old.cohort_specimens;
    
    insert into specimen_collected_type (cohort_id,specimen_id,collected_yn)
	select cohort_id,(select id from lu_specimen where sub_category = "bio_other_omics_data"),bio_other_omics_data
	from  cedcd_old.cohort_specimens;

insert into specimen (cohort_id)
select cohort_id from  cedcd_old.cohort_specimens;

set FOREIGN_key_checks=1;
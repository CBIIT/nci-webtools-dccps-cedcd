-- -----------------------------------------------------------------------------------------------------------
-- === revised according to questionnarire v8 in 2020 =====
-- === mysql v 8.0 =====
/* 
 *  CREATE Views:
 * 1. v_lu_domian (list top level category for dropdown list)
 *
 */
-- -----------------------------------------------------------------------------------------------------------

DROP VIEW IF EXISTS `cohort_summary` ;
DROP VIEW IF EXISTS `v_lu_data_collected_category` ;

-- -----------------------------------------------------------------------------------------------------------
-- View: v_lu_data_collected_category
-- -----------------------------------------------------------------------------------------------------------
DROP VIEW IF EXISTS `v_lu_data_category` ;

CREATE VIEW v_lu_data_category AS
 select min(id) as id , category as data_category from lu_data_category group by category order by id;

-- -----------------------------------------------------------------------------------------------------------
-- View: v_specimen
-- -----------------------------------------------------------------------------------------------------------
DROP VIEW IF EXISTS `v_specimen` ;

CREATE VIEW v_specimen as 
select sc.cohort_id,
MAX(IF(lu.sub_category="bio_blood_baseline", collected_yn, null)) bio_blood_baseline,
MAX(IF(lu.sub_category="bio_blood_baseline_serum", collected_yn, null)) bio_blood_baseline_serum,
MAX(IF(lu.sub_category="bio_blood_baseline_plasma", collected_yn, null)) bio_blood_baseline_plasma,
MAX(IF(lu.sub_category="bio_blood_baseline_buffy_coat", collected_yn, null)) bio_blood_baseline_buffy_coat,
MAX(IF(lu.sub_category="bio_blood_baseline_other_derivative", collected_yn, null)) bio_blood_baseline_other_derivative,
MAX(IF(lu.sub_category="bio_blood_other_time", collected_yn, null)) bio_blood_other_time,
MAX(IF(lu.sub_category="bio_blood_other_time_serum", collected_yn, null)) bio_blood_other_time_serum,
MAX(IF(lu.sub_category="bio_blood_other_time_plasma", collected_yn, null)) bio_blood_other_time_plasma,
MAX(IF(lu.sub_category="bio_blood_other_time_buffy_coat", collected_yn, null)) bio_blood_other_time_buffy_coat,
MAX(IF(lu.sub_category="bio_blood_other_time_other_derivative", collected_yn, null)) bio_blood_other_time_other_derivative,
MAX(IF(lu.sub_category="bio_buccal_saliva_baseline", collected_yn, null)) bio_buccal_saliva_baseline,
MAX(IF(lu.sub_category="bio_buccal_saliva_other_time", collected_yn, null)) bio_buccal_saliva_other_time,
MAX(IF(lu.sub_category="bio_tissue_baseline", collected_yn, null)) bio_tissue_baseline,
MAX(IF(lu.sub_category="bio_tissue_other_time", collected_yn, null)) bio_tissue_other_time,
MAX(IF(lu.sub_category="bio_urine_baseline", collected_yn, null)) bio_urine_baseline,
MAX(IF(lu.sub_category="bio_urine_other_time", collected_yn, null)) bio_urine_other_time,
MAX(IF(lu.sub_category="bio_feces_baseline", collected_yn, null)) bio_feces_baseline,
MAX(IF(lu.sub_category="bio_feces_other_time", collected_yn, null)) bio_feces_other_time,
MAX(IF(lu.sub_category="bio_other_baseline", collected_yn, null)) bio_other_baseline,
MAX(IF(lu.sub_category="bio_other_other_time", collected_yn, null)) bio_other_other_time,
MAX(IF(lu.sub_category="bio_repeated_sample_same_individual", collected_yn, null)) bio_repeated_sample_same_individual,
MAX(IF(lu.sub_category="bio_tumor_block_info", collected_yn, null)) bio_tumor_block_info,
MAX(IF(lu.sub_category="bio_genotyping_data", collected_yn, null)) bio_genotyping_data,
MAX(IF(lu.sub_category="bio_sequencing_data_exome", collected_yn, null)) bio_sequencing_data_exome,
MAX(IF(lu.sub_category="bio_sequencing_data_whole_genome", collected_yn, null)) bio_sequencing_data_whole_genome,
MAX(IF(lu.sub_category="bio_epigenetic_or_metabolic_markers", collected_yn, null)) bio_epigenetic_or_metabolic_markers,
MAX(IF(lu.sub_category="bio_other_omics_data", collected_yn, null)) bio_other_omics_data,
MAX(IF(lu.sub_category="bio_transcriptomics_data", collected_yn, null)) bio_transcriptomics_data,
MAX(IF(lu.sub_category="bio_microbiome_data", collected_yn, null)) bio_microbiome_data,
MAX(IF(lu.sub_category="bio_metabolomic_data", collected_yn, null)) bio_metabolomic_data,
MAX(IF(lu.sub_category="bio_meta_fasting_sample", collected_yn, null)) bio_meta_fasting_sample,
MAX(IF(lu.sub_category="bio_meta_outcomes_in_cancer_study", collected_yn, null)) bio_meta_outcomes_in_cancer_study,
MAX(IF(lu.sub_category="bio_meta_outcomes_in_cvd_study", collected_yn, null)) bio_meta_outcomes_in_cvd_study,
MAX(IF(lu.sub_category="bio_meta_outcomes_in_other_study", collected_yn, null)) bio_meta_outcomes_in_other_study,
MAX(IF(lu.sub_category="bio_member_of_metabolomics_studies", collected_yn, null)) bio_member_of_metabolomics_studies,
bio_other_baseline_specify,bio_other_other_time_specify,bio_meta_outcomes_other_study_specify,bio_member_in_study,
bio_labs_used_for_analysis,bio_analytical_platform,bio_separation_platform,bio_number_metabolites_measured,bio_year_samples_sent
from specimen_collected_type sc, lu_specimen lu, specimen sp
where sc.specimen_id = lu.id and sp.cohort_id=sc.cohort_id
group by sc.cohort_id, bio_other_baseline_specify,bio_other_other_time_specify,bio_meta_outcomes_other_study_specify,bio_member_in_study,
bio_labs_used_for_analysis,bio_analytical_platform,bio_separation_platform,bio_number_metabolites_measured,bio_year_samples_sent;


-- ======== end View script ===============
insert into cohort_cancer (
	cohort_id,
	ci_oropharyngeal_male,
	ci_oropharyngeal_female,
	ci_esophagus_male,
	ci_esophagus_female,
	ci_stomach_male,
	ci_stomach_female,
	ci_small_intestine_male,
	ci_small_intestine_female,
	ci_colon_male,
	ci_colon_female,
	ci_rectum_male,
	ci_rectum_female,
	ci_gall_bladder_male,
	ci_gall_bladder_female,
	ci_pancreas_male,
	ci_pancreas_female,
	ci_lung_male,
	ci_lung_female,
	ci_bone_male,
	ci_bone_female,
	ci_melanoma_male,
	ci_melanoma_female,
	ci_breast_male,
	ci_breast_female,
	ci_cervix_male,
	ci_cervix_female,
	ci_corpus_male,
	ci_corpus_female,
	ci_ovary_male,
	ci_ovary_female,
	ci_prostate_male,
	ci_prostate_female,
	ci_bladder_male,
	ci_bladder_female,
	ci_kidney_male,
	ci_kidney_female,
	ci_brain_male,
	ci_brain_female,
	ci_thyroid_male,
	ci_thyroid_female,
	ci_lymphoma_male,
	ci_lymphoma_female,
	ci_myeloma_male,
	ci_myeloma_female,
	ci_leukemia_male,
	ci_leukemia_female,
	ci_liver_male,
	ci_liver_female,
	ci_all_other_cancers_male,
	ci_all_other_cancers_female,
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
	ci_cancer_subtype_molecular
)
select 
	cohort_id,
	ci_oropharyngeal_male,
	ci_oropharyngeal_female,
	ci_esophagus_male,
	ci_esophagus_female,
	ci_stomach_male,
	ci_stomach_female,
	ci_small_intestine_male,
	ci_small_intestine_female,
	ci_colon_male,
	ci_colon_female,
	ci_rectum_male,
	ci_rectum_female,
	ci_gall_bladder_male,
	ci_gall_bladder_female,
	ci_pancreas_male,
	ci_pancreas_female,
	ci_lung_male,
	ci_lung_female,
	ci_bone_male,
	ci_bone_female,
	ci_melanoma_male,
	ci_melanoma_female,
	ci_breast_male,
	ci_breast_female,
	ci_cervix_male,
	ci_cervix_female,
	ci_corpus_male,
	ci_corpus_female,
	ci_ovary_male,
	ci_ovary_female,
	ci_prostate_male,
	ci_prostate_female,
	ci_bladder_male,
	ci_bladder_female,
	ci_kidney_male,
	ci_kidney_female,
	ci_brain_male,
	ci_brain_female,
	ci_thyroid_male,
	ci_thyroid_female,
	ci_lymphoma_male,
	ci_lymphoma_female,
	ci_myeloma_male,
	ci_myeloma_female,
	ci_leukemia_male,
	ci_leukemia_female,
	ci_liver_male,
	ci_liver_female,
	ci_all_other_cancers_male,
	ci_all_other_cancers_female,
	ci_confirmed_cancer_year,
	(case when ci_ascertained_self_reporting = "No" then 0
	    when ci_ascertained_self_reporting = "Yes" then 1
	    else -1
	end
	),
	(case when ci_ascertained_tumor_registry = "No" then 0
	    when ci_ascertained_tumor_registry = "Yes" then 1
	    else -1
	end
	),
	(case when ci_ascertained_medical_records = "No" then 0
	    when ci_ascertained_medical_records = "Yes" then 1
	    else -1
	end
	),
	(case when ci_ascertained_other = "No" then 0
	    when ci_ascertained_other = "Yes" then 1
	    else -1
	end
	),
	ci_ascertained_other_specify,
	(case when ci_cancer_recurrence = "No" then 0
	    when ci_cancer_recurrence = "Yes" then 1
	    else -1
	end
	),
	(case when ci_second_primary_diagnosis = "No" then 0
	    when ci_second_primary_diagnosis = "Yes" then 1
	    else -1
	end
	),
	(case when ci_cancer_treatment_data = "No" then 0
	    when ci_cancer_treatment_data = "Yes" then 1
	    else -1
	end
	),
	(case when ci_treatment_data_surgery = "No" then 0
	    when ci_treatment_data_surgery = "Yes" then 1
	    else -1
	end
	),
	(case when ci_treatment_data_radiation = "No" then 0
	    when ci_treatment_data_radiation = "Yes" then 1
	    else -1
	end
	),
	(case when ci_treatment_data_chemotherapy = "No" then 0
	    when ci_treatment_data_chemotherapy = "Yes" then 1
	    else -1
	end
	),
	(case when ci_treatment_data_hormonal_therapy = "No" then 0
	    when ci_treatment_data_hormonal_therapy = "Yes" then 1
	    else -1
	end
	),
	(case when ci_treatment_data_bone_stem_cell = "No" then 0
	    when ci_treatment_data_bone_stem_cell = "Yes" then 1
	    else -1
	end
	),
	(case when ci_treatment_data_other = "No" then 0
	    when ci_treatment_data_other = "Yes" then 1
	    else -1
	end
	),
	ci_treatment_data_other_specify,
	(case when ci_data_source_admin_claims = "No" then 0
	    when ci_data_source_admin_claims = "Yes" then 1
	    else -1
	end
	),
	(case when ci_data_source_electronic_records = "No" then 0
	    when ci_data_source_electronic_records = "Yes" then 1
	    else -1
	end
	),
	(case when ci_data_source_chart_abstraction = "No" then 0
	    when ci_data_source_chart_abstraction = "Yes" then 1
	    else -1
	end
	),
	(case when ci_data_source_patient_reported = "No" then 0
	    when ci_data_source_patient_reported = "Yes" then 1
	    else -1
	end
	),
	(case when ci_data_source_other = "No" then 0
	    when ci_data_source_other = "Yes" then 1
	    else -1
	end
	),
	ci_data_source_other_specify,
	(case when ci_collect_other_information = "No" then 0
	    when ci_collect_other_information = "Yes" then 1
	    else -1
	end
	),
	(case when ci_cancer_staging_data = "No" then 0
	    when ci_cancer_staging_data = "Yes" then 1
	    else -1
	end
	),
	(case when ci_tumor_grade_data = "No" then 0
	    when ci_tumor_grade_data = "Yes" then 1
	    else -1
	end
	),
	(case when ci_tumor_genetic_markers_data = "No" then 0
	    when ci_tumor_genetic_markers_data = "Yes" then 1
	    else -1
	end
	),
	ci_tumor_genetic_markers_data_describe,
	(case when ci_histologically_confirmed = "All" then 0
	    when ci_histologically_confirmed = "Some" then 1
	    when ci_histologically_confirmed = "None" then 2
	    else -1
	end
	),
	(case when ci_cancer_subtype_histological = "No" then 0
	    when ci_cancer_subtype_histological = "Yes" then 1
	    else -1
	end
	),
	(case when ci_cancer_subtype_molecular = "No" then 0
	    when ci_cancer_subtype_molecular = "Yes" then 1
	    else -1
	end
	)
from cohort_data
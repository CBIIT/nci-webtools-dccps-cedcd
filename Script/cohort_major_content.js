insert into cohort_major_content (
  cohort_id,
  mdc_income_baseline,
  mdc_income_followup,
  mdc_education_baseline,
  mdc_education_followup,
  mdc_marital_status_baseline,
  mdc_marital_status_followup,
  mdc_language_origin_baseline,
  mdc_language_origin_followup,
  mdc_employment_baseline,
  mdc_employment_followup,
  mdc_health_insurance_baseline,
  mdc_health_insurance_followup,
  mdc_anthropometry_baseline,
  mdc_anthropometry_followup,
  mdc_dietary_intake_baseline,
  mdc_dietary_intake_followup,
  mdc_dietary_supplement_baseline,
  mdc_dietary_supplement_followup,
  mdc_alternative_medicine_baseline,
  mdc_alternative_medicine_followup,
  mdc_prescription_drug_use_baseline,
  mdc_prescription_drug_use_followup,
  mdc_nonprescription_drug_use_baseline,
  mdc_nonprescription_drug_use_followup,
  mdc_alcohol_baseline,
  mdc_alcohol_followup,
  mdc_cigarette_baseline,
  mdc_cigarette_followup,
  mdc_other_tobacco_cigars_baseline,
  mdc_other_tobacco_cigars_followup,
  mdc_other_tobacco_pipes_baseline,
  mdc_other_tobacco_pipes_followup,
  mdc_other_tobacco_chewing_baseline,
  mdc_other_tobacco_chewing_followup,
  mdc_other_tobacco_ecigarette_baseline,
  mdc_other_tobacco_ecigarette_followup,
  mdc_other_tobacco_other_baseline,
  mdc_other_tobacco_other_specify_baseline,
  mdc_other_tobacco_other_followup,
  mdc_other_tobacco_other_specify_followup,
  mdc_physical_activity_baseline,
  mdc_physical_activity_followup,
  mdc_sleep_habits_baseline,
  mdc_sleep_habits_followup,
  mdc_reproductive_history_baseline,
  mdc_reproductive_history_followup,
  mdc_self_reported_health_baseline,
  mdc_self_reported_health_followup,
  mdc_quality_of_life_baseline,
  mdc_quality_of_life_followup,
  mdc_social_support_baseline,
  mdc_social_support_followup,
  mdc_cognitive_function_baseline,
  mdc_cognitive_function_followup,
  mdc_depression_baseline,
  mdc_depression_followup,
  mdc_other_psychosocial_baseline,
  mdc_other_psychosocial_followup,
  mdc_fatigue_baseline,
  mdc_fatigue_followup,
  mdc_family_hsitory_of_cancer_baseline,
  mdc_family_hsitory_of_cancer_followup,
  mdc_family_hsitory_of_cancer_pedigrees_baseline,
  mdc_family_hsitory_of_cancer_pedigrees_followup,
  mdc_environment_baseline,
  mdc_environment_followup,
  mdc_residential_infomation_baseline,
  mdc_residential_infomation_followup,
  mdc_diabetes_baseline,
  mdc_diabetes_followup,
  mdc_stroke_baseline,
  mdc_stroke_followup,
  mdc_copd_baseline,
  mdc_copd_followup,
  mdc_cardiovascular_disease_baseline,
  mdc_cardiovascular_disease_followup,
  mdc_osteoporosis_baseline,
  mdc_osteoporosis_followup,
  mdc_mental_health_baseline,
  mdc_mental_health_followup,
  mdc_cognitive_decline_baseline,
  mdc_cognitive_decline_followup,
  mdc_acute_treatment_toxicity,
  mdc_late_effects_of_treatment,
  mdc_symptoms_management,
  mdc_other_cancer_condition,
  mdc_other_cancer_condition_specify
)
select cohort_id,
  (case when mdc_income_baseline = "No" then 0
        when mdc_income_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_income_followup = "No" then 0
        when mdc_income_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_education_baseline = "No" then 0
        when mdc_education_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_education_followup = "No" then 0
        when mdc_education_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_marital_status_baseline = "No" then 0
        when mdc_marital_status_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_marital_status_followup = "No" then 0
        when mdc_marital_status_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_language_origin_baseline = "No" then 0
        when mdc_language_origin_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_language_origin_followup = "No" then 0
        when mdc_language_origin_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_employment_baseline = "No" then 0
        when mdc_employment_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_employment_followup = "No" then 0
        when mdc_employment_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_health_insurance_baseline = "No" then 0
        when mdc_health_insurance_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_health_insurance_followup = "No" then 0
        when mdc_health_insurance_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_anthropometry_baseline = "No" then 0
        when mdc_anthropometry_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_anthropometry_followup = "No" then 0
        when mdc_anthropometry_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_dietary_intake_baseline = "No" then 0
        when mdc_dietary_intake_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_dietary_intake_followup = "No" then 0
        when mdc_dietary_intake_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_dietary_supplement_baseline = "No" then 0
        when mdc_dietary_supplement_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_dietary_supplement_followup = "No" then 0
        when mdc_dietary_supplement_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_alternative_medicine_baseline = "No" then 0
        when mdc_alternative_medicine_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_alternative_medicine_followup = "No" then 0
        when mdc_alternative_medicine_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_prescription_drug_use_baseline = "No" then 0
        when mdc_prescription_drug_use_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_prescription_drug_use_followup = "No" then 0
        when mdc_prescription_drug_use_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_nonprescription_drug_use_baseline = "No" then 0
        when mdc_nonprescription_drug_use_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_nonprescription_drug_use_followup = "No" then 0
        when mdc_nonprescription_drug_use_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_alcohol_baseline = "No" then 0
        when mdc_alcohol_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_alcohol_followup = "No" then 0
        when mdc_alcohol_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_cigarette_baseline = "No" then 0
        when mdc_cigarette_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_cigarette_followup = "No" then 0
        when mdc_cigarette_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_tobacco_cigars_baseline = "No" then 0
        when mdc_other_tobacco_cigars_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_tobacco_cigars_followup = "No" then 0
        when mdc_other_tobacco_cigars_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_tobacco_pipes_baseline = "No" then 0
        when mdc_other_tobacco_pipes_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_tobacco_pipes_followup = "No" then 0
        when mdc_other_tobacco_pipes_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_tobacco_chewing_baseline = "No" then 0
        when mdc_other_tobacco_chewing_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_tobacco_chewing_followup = "No" then 0
        when mdc_other_tobacco_chewing_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_tobacco_ecigarette_baseline = "No" then 0
        when mdc_other_tobacco_ecigarette_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_tobacco_ecigarette_followup = "No" then 0
        when mdc_other_tobacco_ecigarette_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_tobacco_other_baseline = "No" then 0
        when mdc_other_tobacco_other_baseline = "Yes" then 1
        else -1
   end
  ),
  mdc_other_tobacco_other_specify_baseline,
  (case when mdc_other_tobacco_other_followup = "No" then 0
        when mdc_other_tobacco_other_followup = "Yes" then 1
        else -1
   end
  ),
  mdc_other_tobacco_other_specify_followup,
  (case when mdc_physical_activity_baseline = "No" then 0
        when mdc_physical_activity_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_physical_activity_followup = "No" then 0
        when mdc_physical_activity_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_sleep_habits_baseline = "No" then 0
        when mdc_sleep_habits_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_sleep_habits_followup = "No" then 0
        when mdc_sleep_habits_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_reproductive_history_baseline = "No" then 0
        when mdc_reproductive_history_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_reproductive_history_followup = "No" then 0
        when mdc_reproductive_history_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_self_reported_health_baseline = "No" then 0
        when mdc_self_reported_health_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_self_reported_health_followup = "No" then 0
        when mdc_self_reported_health_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_quality_of_life_baseline = "No" then 0
        when mdc_quality_of_life_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_quality_of_life_followup = "No" then 0
        when mdc_quality_of_life_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_social_support_baseline = "No" then 0
        when mdc_social_support_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_social_support_baseline = "No" then 0
        when mdc_social_support_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_cognitive_function_baseline = "No" then 0
        when mdc_cognitive_function_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_cognitive_function_followup = "No" then 0
        when mdc_cognitive_function_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_depression_baseline = "No" then 0
        when mdc_depression_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_depression_followup = "No" then 0
        when mdc_depression_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_psychosocial_baseline = "No" then 0
        when mdc_other_psychosocial_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_psychosocial_followup = "No" then 0
        when mdc_other_psychosocial_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_fatigue_baseline = "No" then 0
        when mdc_fatigue_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_fatigue_followup = "No" then 0
        when mdc_fatigue_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_family_hsitory_of_cancer_baseline = "No" then 0
        when mdc_family_hsitory_of_cancer_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_family_hsitory_of_cancer_followup = "No" then 0
        when mdc_family_hsitory_of_cancer_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_family_hsitory_of_cancer_pedigrees_baseline = "No" then 0
        when mdc_family_hsitory_of_cancer_pedigrees_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_family_hsitory_of_cancer_pedigrees_followup = "No" then 0
        when mdc_family_hsitory_of_cancer_pedigrees_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_environment_baseline = "No" then 0
        when mdc_environment_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_environment_followup = "No" then 0
        when mdc_environment_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_residential_infomation_baseline = "No" then 0
        when mdc_residential_infomation_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_residential_infomation_followup = "No" then 0
        when mdc_residential_infomation_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_diabetes_baseline = "No" then 0
        when mdc_diabetes_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_diabetes_followup = "No" then 0
        when mdc_diabetes_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_stroke_baseline = "No" then 0
        when mdc_stroke_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_stroke_followup = "No" then 0
        when mdc_stroke_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_copd_baseline = "No" then 0
        when mdc_copd_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_copd_followup = "No" then 0
        when mdc_copd_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_cardiovascular_disease_baseline = "No" then 0
        when mdc_cardiovascular_disease_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_cardiovascular_disease_followup = "No" then 0
        when mdc_cardiovascular_disease_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_osteoporosis_baseline = "No" then 0
        when mdc_osteoporosis_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_osteoporosis_followup = "No" then 0
        when mdc_osteoporosis_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_mental_health_baseline = "No" then 0
        when mdc_mental_health_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_mental_health_followup = "No" then 0
        when mdc_mental_health_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_cognitive_decline_baseline = "No" then 0
        when mdc_cognitive_decline_baseline = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_cognitive_decline_followup = "No" then 0
        when mdc_cognitive_decline_followup = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_acute_treatment_toxicity = "No" then 0
        when mdc_acute_treatment_toxicity = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_late_effects_of_treatment = "No" then 0
        when mdc_late_effects_of_treatment = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_symptoms_management = "No" then 0
        when mdc_symptoms_management = "Yes" then 1
        else -1
   end
  ),
  (case when mdc_other_cancer_condition = "No" then 0
        when mdc_other_cancer_condition = "Yes" then 1
        else -1
   end
  ),
  mdc_other_cancer_condition_specify
from cohort_data

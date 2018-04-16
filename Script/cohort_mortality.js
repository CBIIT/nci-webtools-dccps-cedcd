insert into cohort_mortality (
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
	mort_number_of_deaths
)
select 
	cohort_id,
	mort_year_mortality_followup,
	(case when mort_death_confirmed_by_ndi_linkage = "No" then 0
		when mort_death_confirmed_by_ndi_linkage = "Yes" then 1
		else -1
	end
	),
	(case when mort_death_confirmed_by_death_certificate = "No" then 0
		when mort_death_confirmed_by_death_certificate = "Yes" then 1
		else -1
	end
	),
	(case when mort_death_confirmed_by_other = "No" then 0
		when mort_death_confirmed_by_other = "Yes" then 1
		else -1
	end
	),
	mort_death_confirmed_by_other_specify,
	(case when mort_have_date_of_death = "No" then 0
		when mort_have_date_of_death = "Yes" then 1
		else -1
	end
	),
	(case when mort_have_cause_of_death = "No" then 0
		when mort_have_cause_of_death = "Yes" then 1
		else -1
	end
	),
	(case when mort_death_code_used_icd9 = "No" then 0
		when mort_death_code_used_icd9 = "Yes" then 1
		else -1
	end
	),
	(case when mort_death_code_used_icd10 = "No" then 0
		when mort_death_code_used_icd10 = "Yes" then 1
		else -1
	end
	),
	(case when mort_death_not_coded = "No" then 0
		when mort_death_not_coded = "Yes" then 1
		else -1
	end
	),
	(case when mort_death_code_used_other = "No" then 0
		when mort_death_code_used_other = "Yes" then 1
		else -1
	end
	),
	mort_death_code_used_other_specify,
	mort_number_of_deaths
from cohort_data
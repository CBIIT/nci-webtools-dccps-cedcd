alter table cancer_count
	add constraint cancer_count_pk
		unique (cohort_id, cancer_id, gender_id, case_type_id);

# note: currently, there are no records with a case_type_id so we will be assigning everything to prevalent (which also includes incident counts)
update cancer_count 
    set case_type_id = 2
    where case_type_id is null;
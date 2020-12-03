# add ci_confirmed_cancer_date after ci_confirmed_cancer_year
alter table cancer_info
	add ci_confirmed_cancer_date date default null null after ci_confirmed_cancer_year;

# populate new column with existing dates (assume jan. 1 is the date, since we only have year values)
update cancer_info
    set ci_confirmed_cancer_date = MAKEDATE(ci_confirmed_cancer_year, 1)
    where ci_confirmed_cancer_date is null and ci_confirmed_cancer_year is not null;
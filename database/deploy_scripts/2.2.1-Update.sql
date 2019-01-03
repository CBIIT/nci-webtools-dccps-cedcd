
/*
[SS-1692] Update links for Selenium and Vitamin E Cancer Prevention Trial (SELECT)
replace cohort website: http://swog.org/Visitors/select
with: https://www.swog.org/clinical-trials/biospecimen-resources/select-biorepository
*/

update cohort_basic
  set cohort_web_site = "https://www.swog.org/clinical-trials/biospecimen-resources/select-biorepository"
  where cohort_id = 49;

update cohort_attachment
  set website = "https://www.swog.org/clinical-trials/biospecimen-resources/select-biorepository"
  where cohort_id = 49
  and (category = 0 or category = 1);

/*
[SS-1692] Update links for Prostate Cancer Prevention Trial (PCPT)
replace cohort website: http://swog.org/Visitors/pcpt/
with: https://www.swog.org/clinical-trials/biospecimen-resources/pcpt-biorepository
*/

update cohort_basic
  set cohort_web_site = "https://www.swog.org/clinical-trials/biospecimen-resources/pcpt-biorepository"
  where cohort_id = 50;

update cohort_attachment
  set website = "https://www.swog.org/clinical-trials/biospecimen-resources/pcpt-biorepository"
  where cohort_id = 50
  and (category = 0 or category = 1 or category = 2);

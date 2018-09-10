
DELIMITER //

/*
[SS-1545] Fix bug  Missing or incorrect Cohort website links [09072018]
*/

update cohort_basic set cohort_web_site = "https://www.test.org/" where cohort_id =20//



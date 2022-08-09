/*
* this script file to update one Cohort Name in DB as CEDCD release 3.2.2
*
* !!!! consider these sqls could be repeated for each deploy !!!!
*  any table structures changes need update accordingly in Schema/cedec_Tables.sql file
*  assume the SAFE_MODE is ON by default (SHOW VARIABLES LIKE 'sql_safe_updates')
*
*/

use cedcd;
SET sql_safe_updates=0;

-- update chort name per user request, remove "The" from the begining in the name
update cedcd.cohort_basic set cohort_name= 'Melbourne Collaborative Cohort Study' where cohort_name ='The Melbourne Collaborative Cohort Study';

update cedcd.cohort set name= 'Melbourne Collaborative Cohort Study' where name ='The Melbourne Collaborative Cohort Study';

SET sql_safe_updates=1;



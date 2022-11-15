/*
* this script file to update one Cohort Name in DB as CEDCD release 3.2.2
*  assume the SAFE_MODE is ON by default (SHOW VARIABLES LIKE 'sql_safe_updates')
*  
*  assume the name update apply to the latest cohort match to the give name
*  updated the latest cohort in the non archived status, 
*  it could update the last published cohort matched to the name
*  update bothe cohort_basic and cohort table  
*/

use cedcd;

SET sql_safe_updates=0;

-- use like '%NAME' in case the cohort being updated first
update cedcd.cohort_basic set cohort_name= 'Melbourne Collaborative Cohort Study' 
where cohort_name ='The Melbourne Collaborative Cohort Study'
and cohort_id = (select max(id) from cohort where name like '%Melbourne Collaborative Cohort Study' and status != 'archived' );

-- update the latest cohort in non-archived status 
update cedcd.cohort src 
inner join (select IFNULL(max(id), 0) as maxid from cohort where name = 'The Melbourne Collaborative Cohort Study'  and status != 'archived' ) ref 
on src.id= ref.maxid 
set src.name= 'Melbourne Collaborative Cohort Study' 
where src.name ='The Melbourne Collaborative Cohort Study' ;

SET sql_safe_updates=1;



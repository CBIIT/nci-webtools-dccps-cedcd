/*
* this script file includes DB updates during CEDCD release 3.1.0
*
* !!!! consider these sqls could be repeated for each deploy !!!!
*  any table structures changes need update accordingly in Schema/cedec_Tables.sql file
*
*/

use cedcd;

insert into cohort_user_mapping (cohort_acronym,user_id,active)
Values ('ATBC', 1,'Y'),
('BCSC',1,'Y');
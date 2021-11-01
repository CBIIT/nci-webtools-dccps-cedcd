/*
* this script file includes DB updates during CEDCD release 3.1.0
*
* !!!! consider these sqls could be repeated for each deploy !!!!
*  any table structures changes need update accordingly in Schema/cedec_Tables.sql file
*
*/

use cedcd;

-- add new category as N/A type
insert ignore into lu_data_category (id, category, sub_category) 
values (42,'Other Tobacco Products','Not Applicable'); 

insert major_content  (cohort_id, category_id) 
select distinct b.cohort_id, 42 
from major_content b where b.cohort_id not in (select distinct c.cohort_id from major_content c where c.category_id=42);

-- add new category as Sexual Orientation and Gender Identity
insert ignore into lu_data_category (id, category, sub_category) 
values (43,'Sexual Orientation and Gender Identity', ''); 

insert major_content  (cohort_id, category_id) 
select distinct b.cohort_id, 43 
from major_content b where b.cohort_id not in (select distinct c.cohort_id from major_content c where c.category_id=43);

/*
*  update cancer_count table to include race and ethnicity 
*/

DELIMITER //    
drop procedure if exists temp_update_cancer_counts //
create procedure temp_update_cancer_counts()
begin

    start transaction;

    -- add new field to keep cancer condition N/A status
    IF NOT EXISTS( SELECT NULL
            FROM INFORMATION_SCHEMA.COLUMNS
             WHERE table_name = 'cancer_info'
             AND table_schema = 'cedcd'
             AND column_name = 'mdc_cancer_related_conditions_na')  THEN

        ALTER TABLE `cancer_info` ADD `mdc_cancer_related_conditions_na` int(1);

    END IF;

    -- check if unique index exists on cancer_count(race_id, ethnicity_id)
    IF (select COUNT(*) != 2
        from information_schema.STATISTICS
        where
            TABLE_SCHEMA = database() and
            TABLE_NAME = 'cancer_count' and
            COLUMN_NAME IN ('race_id', 'ethnicity_id') and NON_UNIQUE = 0
    ) THEN
        -- add unique index on cancer_count(cohort_id, cancer_id, gender_id, case_type_id)
		ALTER TABLE cancer_count add race_id int default 7 after cancer_id,
        ADD FOREIGN KEY cc_race_type_id(race_id) REFERENCES lu_race (id);
      
		ALTER TABLE cancer_count add ethnicity_id int default 3 after race_id,
        ADD FOREIGN KEY cc_eth_type_id(ethnicity_id) REFERENCES lu_ethnicity (id) ;
        ALTER TABLE cancer_count DROP INDEX cancer_count_pk, 
        ADD UNIQUE KEY cancer_count_pk (cohort_id,cancer_id,gender_id,ethnicity_id,race_id,case_type_id);

        -- case_type_id =1 will be not in use, keep only (2 prevalent), merge existing (1 incident) 
        SET SQL_SAFE_UPDATES = 0;
        DROP TEMPORARY TABLE IF EXISTS T_CANCER_COUNTS_UID;
        CREATE TEMPORARY TABLE IF NOT EXISTS T_CANCER_COUNTS_UID AS 
        ( select concat(cohort_id,'_',cancer_id,'_',gender_id, '_', ethnicity_id, '_', race_id) as u_id 
        from cancer_count 
        where case_type_id=1 and cancer_counts > 0 
        group by cohort_id, cancer_id, gender_id, ethnicity_id, race_id );
    
        DROP TEMPORARY TABLE IF exists T_CANCER_COUNTS_UID2;
        CREATE TEMPORARY TABLE IF NOT EXISTS T_CANCER_COUNTS_UID2 as 
        select * from T_CANCER_COUNTS_UID;
    
        With T_SUB as (
	    select t2.u_id, sum(cancer_counts) as subtotal from cancer_count as t1 
	    join  T_CANCER_COUNTS_UID as t2 ON concat(t1.cohort_id,'_',t1.cancer_id,'_',t1.gender_id, '_', t1.ethnicity_id, '_', t1.race_id) = t2.u_id
        group by cohort_id, cancer_id, gender_id, ethnicity_id, race_id )
        update cancer_count as t_src set t_src.cancer_counts = 
            (select t.subtotal from T_SUB as t where concat(t_src.cohort_id,'_',t_src.cancer_id,'_',t_src.gender_id, '_', t_src.ethnicity_id, '_', t_src.race_id) = t.u_id)
        where concat(t_src.cohort_id,'_',t_src.cancer_id,'_',t_src.gender_id, '_', t_src.ethnicity_id, '_', t_src.race_id) in 
            ( select  t_dst.u_id from T_CANCER_COUNTS_UID2 as t_dst) 
        and t_src.case_type_id =2;
    
        update cancer_count as t_src set t_src.cancer_counts = 0  
        where concat(t_src.cohort_id,'_',t_src.cancer_id,'_',t_src.gender_id, '_', t_src.ethnicity_id, '_', t_src.race_id) in 
        ( select  t_dst.u_id from T_CANCER_COUNTS_UID2 as t_dst) 
        and t_src.case_type_id =1;
    
        DROP TEMPORARY TABLE IF EXISTS T_CANCER_COUNTS_UID;
        DROP TEMPORARY TABLE IF EXISTS T_CANCER_COUNTS_UID2; 

    END IF;

    commit;
END //

DELIMITER ;

call temp_update_cancer_counts();

drop procedure if exists temp_update_cancer_counts;



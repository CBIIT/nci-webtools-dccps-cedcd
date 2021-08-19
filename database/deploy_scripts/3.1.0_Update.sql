/*
* this script file includes DB updates during CEDCD release 3.1.0
*
* !!!! consider these sqls could be repeated for each deploy !!!!
*  any table structures changes need update accordingly in Schema/cedec_Tables.sql file
*
*/

use cedcd;
/*
*  update cancer_count table to include race and ethnicity 
*/

DELIMITER //    
drop procedure if exists temp_update_cancer_counts //
create procedure temp_update_cancer_counts()
begin

    start transaction;

    # check if unique index exists on cancer_count(race_id, ethnicity_id)
    if (select COUNT(*) != 2
        from information_schema.STATISTICS
        where
            TABLE_SCHEMA = database() and
            TABLE_NAME = 'cancer_count' and
            COLUMN_NAME IN ('race_id', 'ethnicity_id') and NON_UNIQUE = 0
    ) then
        # add unique index on cancer_count(cohort_id, cancer_id, gender_id, case_type_id)
		ALTER TABLE cancer_count add race_id int default 7 after cancer_id,
        ADD FOREIGN KEY cc_race_type_id(race_id) REFERENCES lu_race (id);
      
		ALTER TABLE cancer_count add ethnicity_id int default 3 after race_id,
        ADD FOREIGN KEY cc_eth_type_id(ethnicity_id) REFERENCES lu_ethnicity (id) ;
        ALTER TABLE cancer_count DROP INDEX cancer_count_pk, 
        ADD UNIQUE KEY cancer_count_pk (cohort_id,cancer_id,gender_id,ethnicity_id,race_id,case_type_id);
    end if;

    commit;
end //

DELIMITER ;

call temp_update_cancer_counts();

drop procedure if exists temp_update_cancer_counts;



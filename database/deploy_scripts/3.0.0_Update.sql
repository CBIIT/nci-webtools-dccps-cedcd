/*
* this script file includes DB updates during CEDCD release 3.0.0
*
* !!!! consider these sqls could be repeated for each deploy !!!!
*  any table structures changes need update accordingly in Schema/cedec_Tables.sql file
*
*/


/* according to Auestionnaire v8,1m change 'Both' to 'All' for gender option  */

update lu_gender set gender = 'All' where id = 4;


/*
*  insert published cohort edit status
*  one time execution
*/

DELIMITER //

CREATE PROCEDURE `update_cohort_published_status`()
BEGIN
  DECLARE bDone INT;

  DECLARE var1 INT;    -- or approriate type
 
  DECLARE curs CURSOR FOR  SELECT id FROM cohort WHERE status ='published'; 
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET bDone = 1;

  OPEN curs;

  SET bDone = 0;
  REPEAT
    FETCH curs INTO var1;
    
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'A', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'B', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'C', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'D', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'E', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'F', 'complete')
    on duplicate key update status  = 'complete';
    INSERT INTO cohort_edit_status (cohort_id,page_code, status) VALUES (var1, 'G', 'complete')
    on duplicate key update status  = 'complete';
    
  UNTIL bDone END REPEAT;

  CLOSE curs;
  
END //

-- end update_cohort_published_status  --


drop procedure if exists temp_update_3_0_0 //
create procedure temp_update_3_0_0()
begin
    start transaction;

    # update dev admin user name
    update user set user_name = 'admin' where id = 1;

    # check if unique index exists on cancer_count(cohort_id, cancer_id, gender_id, case_type_id)
    if (select COUNT(*) != 4
        from information_schema.STATISTICS
        where
            TABLE_SCHEMA = database() and
            TABLE_NAME = 'cancer_count' and
            COLUMN_NAME IN ('cohort_id', 'cancer_id', 'gender_id', 'case_type_id') and
            NON_UNIQUE = 0
    ) then
        # add unique index on cancer_count(cohort_id, cancer_id, gender_id, case_type_id)
        alter table cancer_count
            add constraint cancer_count_pk
                unique (cohort_id, cancer_id, gender_id, case_type_id);
    end if;


    # there are no records with a case_type_id so we need to assign "prevalent" as the default (which also includes incident counts)
    update cancer_count
        set case_type_id = 2
        where case_type_id is null;


    # check if unique index exists on cancer_info(cohort_id)
    if (
        select count(*) = 0
        from information_schema.STATISTICS
        where
            TABLE_SCHEMA = database() and
            TABLE_NAME = 'cancer_info' and
            COLUMN_NAME = 'cohort_id' and
            NON_UNIQUE = 0
    ) then
        # add unique index on cancer_info(cohort_id)
        create unique index cancer_info_cohort_id_uindex
            on cancer_info (cohort_id);
    end if;


    # check if cancer_info(ci_confirmed_cancer_date) exists
    if (
        select count(*) = 0
        from information_schema.COLUMNS
        where
            TABLE_SCHEMA = database() and
            TABLE_NAME = 'cancer_info' and
            COLUMN_NAME = 'ci_confirmed_cancer_date'
    ) then
        # add cancer_info(ci_confirmed_cancer_date)
        alter table cancer_info
            add ci_confirmed_cancer_date date default null null
                after ci_confirmed_cancer_year;
    end if;


    # populate new column with existing dates (assume jan. 1 is the date, since we only have year values)
    update cancer_info
        set ci_confirmed_cancer_date = MAKEDATE(ci_confirmed_cancer_year, 1)
        where ci_confirmed_cancer_date is null and ci_confirmed_cancer_year is not null;


    # check if index exists on cohort (acronym)
    if (
        select count(*) = 0
        from information_schema.STATISTICS
        where
            TABLE_SCHEMA = database() and
            TABLE_NAME = 'cohort' and
            COLUMN_NAME = 'acronym'
    ) then
        create index cohort_acronym_index
            on cohort (acronym);
    end if;

    # add cohort_user_mapping(cohort_acronym) column
    if (
        select count(*) = 0
        from information_schema.COLUMNS
        where
            TABLE_SCHEMA = database() and
            TABLE_NAME = 'cohort_user_mapping' and
            COLUMN_NAME = 'cohort_acronym'
    ) then
        alter table cohort_user_mapping
            add cohort_acronym varchar(100) null after id;

        alter table cohort_user_mapping
            add constraint cohort_user_mapping_cohort_acronym_fk
                foreign key (cohort_acronym) references cohort (acronym);
    end if;

    # remove cohort_user_mapping(cohort_id) column
    if (
        select count(*) = 1
        from information_schema.COLUMNS
        where
            TABLE_SCHEMA = database() and
            TABLE_NAME = 'cohort_user_mapping' and
            COLUMN_NAME = 'cohort_id'
    ) then
        update cohort_user_mapping cm
        join cohort c on cm.cohort_id = c.id
        set cm.cohort_acronym = c.acronym;

        alter table cohort_user_mapping drop foreign key cohort_user_chhort_id;
        drop index cohort_user_chhort_id on cohort_user_mapping;
        
        alter table cohort_user_mapping drop column cohort_id;
    end if;

    commit;
end //

DELIMITER ;

call update_cohort_published_status();

DROP PROCEDURE IF EXISTS `update_cohort_published_status`;

call temp_update_3_0_0();

drop procedure temp_update_3_0_0;



-- === CEDCD stored procedures  =====
-- === revised according to questionnarire v8 in 2020 =====
-- === mysql v 8.0 =====
/* 
 CREATE PROCEDUREs
* following procedures for published pages
 1. select_advanced_cohort
 2. select_cohort
 3. select_cohort_baseline_data
 4. select_cohort_basic_info
 5. select_cohort_cancer_info
 6. select_cohort_description
 7. select_cohort_followup_data
 8. select_cohort_linkages_technology
 9. select_cohort_list
10. select_cohort_lookup
11. select_cohort_mortality 
12. select_cohort_specimen_overview
13. select_cancer_counts
14. select_enrollment_counts
15. select_specimen_counts
16. insert_contact_us
*
* following procedures for user management
 1. select_all_users
 2. select_usrer_profile
 3. select_owner_from_id
 4. update_user_profile
*
* following procedures for cohort management
 1. select_activity_log_by_cohort
 2. select_admin_info
 3. select_admin_cohortlist
 4. select_all_cohort
 5. select_cohort_for_user
 6. select_contact_for_cohort
*
* following procedures for questionnaire v8.1 
 1. add_file_attachment
 2. get_cohort_basic_info
 3. get_enrollment_counts
 4. get_major_content
 5. insert_new_cohort
 6. insert_new_cohort_from_published
 7. populate_cohort_tables
 8. reset_cohort_status
 9. select_cancer_count
10. select_cancer_info
11. selecct_dlh
12. select_editable_cohort_by_acronym
13. select_mortality
14. select_questionnaire_specimen_info
15. select_unpublished_cohort_id
16. update_cancer_count
17. update_cancer_info
18. update_cohort_basic
19. update_dlh
20. update_enrollment_count
21. update_mortality
22. update_specimen_section_data
23. upsert_major_content
*
*  ConvertIntToTable
*  ConvertStrToTable
 */
use cedcd;
-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: advanced_cohort_SELECT
-- -----------------------------------------------------------------------------------------------------------
DELIMITER //

DROP PROCEDURE IF EXISTS `advanced_cohort_SELECT` //
DROP PROCEDURE IF EXISTS `cohort_basic_info` //
DROP PROCEDURE IF EXISTS `cohort_baseline_data` //
DROP PROCEDURE IF EXISTS `cohort_cancer_info` //
DROP PROCEDURE IF EXISTS `cohort_description` //
DROP PROCEDURE IF EXISTS `cohort_followup_data` //
DROP PROCEDURE IF EXISTS `cohort_linkages_technology` //
DROP PROCEDURE IF EXISTS `cohort_list` //
DROP PROCEDURE IF EXISTS `cohort_lookup` //
DROP PROCEDURE IF EXISTS `cohort_mortality` //
DROP PROCEDURE IF EXISTS `cohort_SELECT` //
DROP PROCEDURE IF EXISTS `cohort_specimen_overview` //
DROP PROCEDURE IF EXISTS `updateCohort_basic` //
DROP PROCEDURE IF EXISTS `contact_us` //
DROP PROCEDURE IF EXISTS `upsertEnrollment_count` //
DROP PROCEDURE IF EXISTS `SELECT_advanced_cohort` //

CREATE PROCEDURE `SELECT_advanced_cohort`(
		in `@gender` varchar(100),in `@age_info` varchar(100), in `@study_population` varchar(1000), 
		in `@race` varchar(1000), in `@ethnicity` varchar(1000), in `@type` varchar(1000),
		in `@category` varchar(1000),in `@collected_specimen` varchar(2000),in `@cancer` varchar(2000),
		in booleanOperationBetweenField varchar(200), in booleanOperationWithInField varchar(200),
		in columnName varchar(40), in columnOrder varchar(10),
		in pageIndex int, in pageSize int)
BEGIN
	DECLARE tmp text default '';
    DECLARE v text default ''; 
	DECLARE i INT DEFAULT 0;
    DECLARE tmp_count INT DEFAULT 0; 
    DECLARE len_gender INT DEFAULT 0;
    DECLARE len_age INT DEFAULT 0;
    DECLARE len_study INT DEFAULT 0;
    DECLARE len_race INT DEFAULT 0;
    DECLARE len_ethnicity INT DEFAULT 0;
	DECLARE len_type INT DEFAULT 0;
    DECLARE len_category INT DEFAULT 0;
    DECLARE len_specimen INT DEFAULT 0;
    DECLARE len_cancer INT DEFAULT 0;
	DECLARE page_index INT DEFAULT 0;
    DECLARE page_size INT DEFAULT 0;
    
    drop temporary table IF exists temp_gender;
    create temporary table IF not exists temp_gender( val int );
    drop temporary table IF exists temp_ageinfo;
    create temporary table IF not exists temp_ageinfo( val int );
    drop temporary table IF exists temp_studypop;
    create temporary table IF not exists temp_studypop( val int );
    drop temporary table IF exists temp_race;
    create temporary table IF not exists temp_race( val int );
    drop temporary table IF exists temp_ethnicity;
    create temporary table IF not exists temp_ethnicity( val int );
	drop temporary table IF exists temp_type;
    create temporary table IF not exists temp_type( val int );
    drop temporary table IF exists temp_category;
    create temporary table IF not exists temp_category( val int );
	drop temporary table IF exists temp_cancer;
    create temporary table IF not exists temp_cancer( val int );
    drop temporary table IF exists temp_specimen;
    create temporary table IF not exists temp_specimen( val int );
    set @ageinfo_null = 1;
    set @gender_null = 1;
	set @cancer_null = 1;
    set @cancer_info_null = 1;
    set @category_null = 1;
    set @ethnicity_null = 1;
	set @type_null = 1;
	set @race_null = 1;
    set @specimen_null = 1;
  
    set @and_query = "";
    set @or_query = "";
	-- default booleanOperationBetweenField is AND
    set @globalANDOR = substring_index(booleanOperationBetweenField,',',1);
    IF @globalANDOR = "" OR (locate("AND", @globalANDOR) > 0) THEN 
		set @globalANDOR = "AND";
	else
		set @globalANDOR = "OR";
    END IF;
   
    set @condition_query ="";
    
    /*
    *  For each search criteria, according to AND / OR
    *  expected input is '' or looks like '1,2,3' (foreign key id)
    *  call ConvertIntToTable to INSERT values into tempIntTable (val)
	*  generate cohort list in temp table
    */
    
      -- expected input is '' or looks like '1,2,3' (foreign key id)
    -- call ConvertIntToTable to INSERT values into tempIntTable (val)
       -- expected input is '' or looks like '1,2,3' (foreign key id)
    -- call ConvertIntToTable to INSERT values into tempIntTable (val)
    
    IF `@gender` != "" AND `@gender` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  then
		set @gender_null = 0;
        call ConvertIntToTable(`@gender`);
      
		IF locate("4", `@gender`) <= 0 and (locate("1", `@gender`) > 0 or locate("2", `@gender`) > 0) then
			INSERT into tempIntTable values (4);
        END IF;
		INSERT into temp_gender 
        SELECT cohort_id FROM cohort_basic gendercs WHERE gendercs.eligible_gender_id in (SELECT val FROM tempIntTable);
        -- assume OR and skip AND for gender/sex option (not applicable for male and female, 'All'(id 4) is being applied )
	END IF;
    
    set i = 0;
    set @age_query = "";
    IF `@age_info` != "" AND `@age_info` REGEXP '^[[:space:]]*[0-9[[:space:]]-]+(?:[[:space:]]?,[[:space:]]?[0-9[[:space:]]-]+)*?[[:space:]]*$'  then
		set @ageinfo_null = 0;
		set @len_age = 1+length(`@age_info`) - length(replace(`@age_info`,',','')); 
        set @andor =  reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',2)),',',1));
        set @age_query = ""; 
		WHILE i < @len_age
		do
			set i=i+1;
            set v = trim(reverse(substring_index(reverse(substring_index(`@age_info`,',',i)),',',1)));
            IF v = "0-14" then
				set @age_query = concat(@age_query,"cs.enrollment_age_min <= 14");
            elseIF v ="15-19" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 15 and cs.enrollment_age_min <= 19) or (cs.enrollment_age_max >= 15 and cs.enrollment_age_max <= 19) or (cs.enrollment_age_min <= 15 and cs.enrollment_age_max >= 19))");
            elseIF v = "20-24" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 20 and cs.enrollment_age_min <= 24) or (cs.enrollment_age_max >= 20 and cs.enrollment_age_max <= 24) or (cs.enrollment_age_min <= 20 and cs.enrollment_age_max >= 24))");
			elseIF v = "25-29" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 25 and cs.enrollment_age_min <= 29) or (cs.enrollment_age_max >= 25 and cs.enrollment_age_max <= 29) or (cs.enrollment_age_min <= 25 and cs.enrollment_age_max >= 29))");
            elseIF v = "30-34" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 30 and cs.enrollment_age_min <= 34) or (cs.enrollment_age_max >= 30 and cs.enrollment_age_max <= 34) or (cs.enrollment_age_min <= 30 and cs.enrollment_age_max >= 34))");
			elseIF v = "35-39" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 35 and cs.enrollment_age_min <= 39) or (cs.enrollment_age_max >= 35 and cs.enrollment_age_max <= 39) or (cs.enrollment_age_min <= 35 and cs.enrollment_age_max >= 39))");
			elseIF v = "40-44" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 40 and cs.enrollment_age_min <= 44) or (cs.enrollment_age_max >= 40 and cs.enrollment_age_max <= 44) or (cs.enrollment_age_min <= 40 and cs.enrollment_age_max >= 44))");
			elseIF v = "45-49" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 45 and cs.enrollment_age_min <= 49) or (cs.enrollment_age_max >= 45 and cs.enrollment_age_max <= 49) or (cs.enrollment_age_min <= 45 and cs.enrollment_age_max >= 49))");
			elseIF v = "50-54" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 50 and cs.enrollment_age_min <= 54) or (cs.enrollment_age_max >= 50 and cs.enrollment_age_max <= 54) or (cs.enrollment_age_min <= 50 and cs.enrollment_age_max >= 54))");
			elseIF v = "55-59" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 55 and cs.enrollment_age_min <= 59) or (cs.enrollment_age_max >= 55 and cs.enrollment_age_max <= 59) or (cs.enrollment_age_min <= 55 and cs.enrollment_age_max >= 59))");
			elseIF v = "60-64" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 60 and cs.enrollment_age_min <= 64) or (cs.enrollment_age_max >= 60 and cs.enrollment_age_max <= 64) or (cs.enrollment_age_min <= 60 and cs.enrollment_age_max >= 64))");
			elseIF v = "65-69" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 65 and cs.enrollment_age_min <= 69) or (cs.enrollment_age_max >= 65 and cs.enrollment_age_max <= 69) or (cs.enrollment_age_min <= 65 and cs.enrollment_age_max >= 69))");
			elseIF v = "70-74" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 70 and cs.enrollment_age_min <= 74) or (cs.enrollment_age_max >= 70 and cs.enrollment_age_max <= 74) or (cs.enrollment_age_min <= 70 and cs.enrollment_age_max >= 74))");
			elseIF v = "75-79" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 75 and cs.enrollment_age_min <= 79) or (cs.enrollment_age_max >= 75 and cs.enrollment_age_max <= 79) or (cs.enrollment_age_min <= 75 and cs.enrollment_age_max >= 79))");
			elseIF v = "80-85+" then
				set @age_query = concat(@age_query,"cs.enrollment_age_max >= 80");
			else
				set @age_query = concat(@age_query,"");
            END IF;
			IF i < @len_age then
				set @age_query = concat(@age_query," ", @andor," ");
            END IF;
		END WHILE;
      
		IF @age_query != ""  THEN 
			set @ageinfo_query = concat("INSERT into temp_ageinfo SELECT cs.cohort_id FROM cohort_basic cs WHERE (",@age_query,") ");
			PREPARE stmt FROM @ageinfo_query;
			EXECUTE stmt;
			DEALLOCATE PREPARE stmt;
        END IF;
	END IF;
    
    /* Not process study_population in new ver (2021) 
    IF study_population != "" then
        set @len_study = 1+length(study_population) - length(replace(study_population,',','')); 
        set @study_query = concat(" cs.cohort_id in ( SELECT distinct cohort_id FROM cohort_basic stcs WHERE stcs.eligible_disease in (",study_population,") ");
        set tmp = trim(reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',3)),',',1)));
        IF tmp = "AND" then
			set @study_query = concat(@study_query, " GROUP BY cohort_id having sum(1) >=",  @len_study, " ) " );
		else
            set @study_query = concat(@study_query, " ) ");
        END IF;
    END IF;
   */
    
    IF `@race` != "" AND `@race` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'   then
		set @race_null = 0 ;
		call ConvertIntToTable(`@race`);
        set @len_race = 1+length(`@race`) - length(replace(`@race`,',','')); 
        set tmp =  trim(reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',4)),',',1)));
        IF tmp = "AND" then
			INSERT into temp_race 
			SELECT cohort_id FROM enrollment_count WHERE race_id in (SELECT val FROM tempIntTable) and enrollment_counts > 0 
            GROUP BY cohort_id having sum(1) >= @len_race;
		else
			INSERT into temp_race 
			SELECT cohort_id FROM enrollment_count WHERE race_id in (SELECT val FROM tempIntTable) and enrollment_counts > 0 ;
        END IF;
    END IF;
    
    IF `@ethnicity` != "" AND `@ethnicity` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$' then
		set @ethnicity_null = 0 ;
		call ConvertIntToTable(`@ethnicity`);
        set @len_ethnicity = 1+length(`@ethnicity`) - length(replace(`@ethnicity`,',','')); 
        set @andor = trim(reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',5)),',',1)));
        IF @andor = "AND" then
			INSERT into temp_ethnicity 
			SELECT cohort_id FROM enrollment_count WHERE ethnicity_id in (SELECT val FROM tempIntTable) and enrollment_counts > 0 
            GROUP BY cohort_id having sum(1) >= @len_race;
		else
			INSERT into temp_ethnicity 
			SELECT cohort_id FROM enrollment_count WHERE ethnicity_id in (SELECT val FROM tempIntTable) and enrollment_counts > 0 ;
        END IF;
    END IF;

	IF `@type` != "" AND `@type` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$' then
		set @type_null = 0 ;
		call ConvertIntToTable(`@type`);
        set @len_type = 1+length(`@type`) - length(replace(`@type`,',','')); 
        set @andor = trim(reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',6)),',',1)));
        IF @andor = "AND" then
			INSERT into temp_type
			SELECT cohort_id FROM enrollment_count WHERE type_id in (SELECT val FROM tempIntTable) and enrollment_counts > 0 
            GROUP BY cohort_id having sum(1) >= @len_race;
		else
			INSERT into temp_type
			SELECT cohort_id FROM enrollment_count WHERE type_id in (SELECT val FROM tempIntTable) and enrollment_counts > 0 ;
        END IF;
    END IF;
    
    IF `@category` != "" AND `@category` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$' then
        set @category_null = 0;
		IF `@category` = "99" then
			set @cancer_info_null = 0;
            INSERT into temp_category 
            SELECT distinct cohort_id FROM cancer_info WHERE ci_cancer_treatment_data=1;
		else
            call ConvertIntToTable(`@category`);
			drop temporary table IF exists temp_category_id;
			create temporary table IF not exists temp_category_id( val int );
            INSERT into temp_category_id 
            SELECT distinct ld.id FROM lu_data_category ld , v_lu_data_category vld 
			WHERE ld.category=vld.data_category and vld.id in (SELECT val FROM tempIntTable);
            SELECT count(distinct val) into @len_category  FROM temp_category_id;
			-- set @len_category = 1+length(`@category`) - length(replace(`@category`,',','')); 
			set @andor = trim(reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',7)),',',1)));
            IF locate("99", `@category`) > 0 then
				set @cancer_info_null = 0;
            END IF;
			IF @andor = "OR" then
				IF @cancer_info_null = 0 THEN 
					INSERT into temp_category 
					(SELECT cohort_id FROM cancer_info WHERE ci_cancer_treatment_data=1
					union 
					SELECT cohort_id 
					FROM major_content WHERE category_id in ( SELECT val FROM temp_category_id ) and (baseline=1 or followup = 1) );
				else
					INSERT into temp_category 
					(SELECT cohort_id 
					FROM major_content WHERE category_id in ( SELECT val FROM temp_category_id) and (baseline=1 or followup = 1) );
                END IF;
            ELSE -- AND condition
				IF @cancer_info_null = 0 THEN 
					INSERT into temp_category 
                    SELECT a.cohort_id FROM (
					SELECT cohort_id , category_id
					FROM major_content a WHERE a.category_id in ( SELECT val FROM temp_category_id) and (baseline=1 or followup = 1)
                    GROUP BY a.cohort_id, category_id having sum(1) >= @len_category) a
                   JOIN  (SELECT distinct cohort_id FROM cancer_info WHERE ci_cancer_treatment_data=1)  b ON a.cohort_id = b.cohort_id;
                else
					INSERT into temp_category 
					SELECT cohort_id 
					FROM major_content WHERE category_id in ( SELECT val FROM temp_category_id) and (baseline=1 or followup = 1)
                    GROUP BY cohort_id having sum(1) >= @len_category;
                END IF;
            END IF;  --  END and/or
		END IF;  -- END IF only 99
    END IF; --  END catgegory
    
    IF `@collected_specimen` != "" AND `@collected_specimen` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$' then
        set @specimen_null = 0;
        -- set @len_specimen = 1+length(`@collected_specimen`) - length(replace(`@collected_specimen`,',','')); 
        set @andor = trim(reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',8)),',',1)));
		call ConvertIntToTable(`@collected_specimen`);
        drop temporary table IF exists temp_specimen_id;
		create temporary table IF not exists temp_specimen_id( val int );
		INSERT into temp_specimen_id
		SELECT distinct id FROM (SELECT * FROM lu_specimen WHERE sub_category IS NOT NULL
				and ( specimen IN ('Buccal/Saliva', 'Tissue (includes tumor and/or normal)', 'Urine','Feces','Other') OR id in (11,16))
				) AS lu 
		JOIN (SELECT distinct specimen FROM lu_specimen WHERE id in (SELECT val FROM tempIntTable) ) AS lc ON lc.specimen = lu.specimen;
            
        IF @andor = "AND" then
        -- get sub-category counts, for blood options only FROM (11,16)
			SELECT count(distinct val) into @len_specimen FROM temp_specimen_id;
			INSERT into temp_specimen 
			SELECT sp.cohort_id FROM specimen_collected_type sp
			JOIN temp_specimen_id lu ON sp.specimen_id = lu.val
			WHERE sp.collected_yn = 1
            GROUP BY sp.cohort_id having sum(1) >= @len_specimen;
		else
			INSERT into temp_specimen 
			SELECT distinct sp.cohort_id FROM specimen_collected_type sp
			join temp_specimen_id lu ON sp.specimen_id = lu.val
			WHERE sp.collected_yn = 1 ;
        END IF;
	END IF;

    IF `@cancer` != "" AND `@cancer` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$' then
		set @cancer_null = 0;
        call ConvertIntToTable(`@cancer`);
        set @len_cancer = 1+length(`@cancer`) - length(replace(`@cancer`,',','')); 
        set @andor = trim(reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',9)),',',1)));
        IF @andor  = "OR" then
			INSERT into temp_cancer 
            SELECT distinct cohort_id FROM cancer_count WHERE cancer_id in (SELECT distinct val FROM tempIntTable) and cancer_counts > 0 ;
		elseif@andor = "AND" then
			INSERT into temp_cancer 
            SELECT distinct cohort_id FROM cancer_count WHERE cancer_id in (SELECT distinct val FROM tempIntTable) and cancer_counts > 0
            GROUP BY cohort_id, cancer_id having sum(1) >=  @len_cancer;
        END IF;
    END IF;
    
	IF pageIndex > -1 THEN 
        set page_size = IFNULL(pageSize,50);
        set page_index = pageIndex;
	else
        set page_size = 1000;
        set page_index = 0;
    END IF;
    
    IF @globalANDOR = 'AND' THEN 
		SELECT sql_calc_found_rows cs.cohort_id AS id,cs.cohort_name, cs.cohort_acronym, ch.type, ch.active, cs.cohort_web_site,ch.publish_time AS update_time,
			sum(ec.enrollment_counts) AS enrollment_total 
		FROM cohort_basic cs 
		JOIN enrollment_count ec ON cs.cohort_id = ec.cohort_id  
		JOIN cohort ch ON ch.id = cs.cohort_id
		WHERE lower(ch.status) = 'published' 
		and ( @gender_null = 1 OR cs.cohort_id in (SELECT val FROM temp_gender) )
		and ( @ageinfo_null = 1 OR cs.cohort_id in ( SELECT val FROM temp_ageinfo) )
		and ( @race_null = 1 OR cs.cohort_id in (SELECT val FROM temp_race) )
		and ( @ethnicity_null = 1 OR cs.cohort_id in (SELECT val FROM temp_ethnicity) )
		and ( @type_null = 1 OR cs.cohort_id in (SELECT val FROM temp_type) )
		and ( @category_null = 1 OR cs.cohort_id in (SELECT val FROM temp_category) )
		and ( @specimen_null = 1 OR cs.cohort_id in ( SELECT val FROM temp_specimen) )
		and ( @cancer_null = 1 OR cs.cohort_id in ( SELECT val FROM temp_cancer  ) )
		group by cs.cohort_id, cs.cohort_name, cs.cohort_acronym,cs.cohort_web_site,ch.type, ch.active, ch.publish_time 
		order by CASE WHEN lower(columnOrder) = 'asc' then
			 CASE  WHEN columnName = 'cohort_name' THEN  cs.cohort_name
				 WHEN columnName = 'cohort_acronym' THEN cs.cohort_acronym
				 WHEN columnName = 'type' THEN ch.type
				 WHEN columnName = 'active' THEN ch.active
				 WHEN columnName = 'update_time' THEN  ch.publish_time
				 WHEN columnName = 'enrollment_total' THEN length(sum(ec.enrollment_counts))
				ELSE cs.cohort_name  END 
			 END ASC,
			 CASE  WHEN lower(columnOrder) = 'asc' then
			 CASE  WHEN columnName = 'enrollment_total' THEN sum(ec.enrollment_counts)
				 END 
			 END ASC,
			 CASE  WHEN lower(columnOrder) = 'desc' then
				 CASE  WHEN columnName = 'cohort_name' THEN  cs.cohort_name
				 WHEN columnName = 'cohort_acronym' THEN cs.cohort_acronym
				 WHEN columnName = 'type' THEN ch.type
				 WHEN columnName = 'active' THEN ch.active
				 WHEN columnName = 'update_time' THEN  ch.publish_time
				 WHEN columnName = 'enrollment_total' THEN length(sum(ec.enrollment_counts))
				ELSE cs.cohort_name  END 
			 END DESC,
			 CASE  WHEN lower(columnOrder) = 'desc' then
				 CASE  WHEN columnName = 'enrollment_total' THEN sum(ec.enrollment_counts)
				 END 
			 END DESC,
        cs.cohort_name
    limit page_index, page_size;
    ELSE 
        SELECT sql_calc_found_rows cs.cohort_id AS id,cs.cohort_name, cs.cohort_acronym, ch.type, ch.active, cs.cohort_web_site,ch.publish_time AS update_time,
		sum(ec.enrollment_counts) AS enrollment_total 
		FROM cohort_basic cs 
		JOIN enrollment_count ec ON cs.cohort_id = ec.cohort_id  
		JOIN cohort ch ON ch.id = cs.cohort_id
		WHERE lower(ch.status) = 'published' 
		and (( @gender_null = 1 OR cs.cohort_id in (SELECT val FROM temp_gender) )
			OR ( @ageinfo_null = 1 OR cs.cohort_id in ( SELECT val FROM temp_ageinfo) )
			OR ( @race_null = 1 OR cs.cohort_id in (SELECT val FROM temp_race) )
			OR ( @ethnicity_null = 1 OR cs.cohort_id in (SELECT val FROM temp_ethnicity) )
			OR ( @type_null = 1 OR cs.cohort_id in (SELECT val FROM temp_type) )
			OR ( @category_null = 1 OR cs.cohort_id in (SELECT val FROM temp_category) )
			OR ( @specimen_null = 1 OR cs.cohort_id in ( SELECT val FROM temp_specimen) )
			OR ( @cancer_null = 1 OR cs.cohort_id in ( SELECT val FROM temp_cancer  ) ) )
		group by cs.cohort_id, cs.cohort_name, cs.cohort_acronym, cs.cohort_web_site, ch.type, ch.active, ch.publish_time 
		order by CASE WHEN lower(columnOrder) = 'asc' then
			 CASE  WHEN columnName = 'cohort_name' THEN  cs.cohort_name
				 WHEN columnName = 'cohort_acronym' THEN cs.cohort_acronym
				 WHEN columnName = 'type' THEN ch.type
				 WHEN columnName = 'active' THEN ch.active
				 WHEN columnName = 'update_time' THEN  ch.publish_time
				 WHEN columnName = 'enrollment_total' THEN length(sum(ec.enrollment_counts))
				ELSE cs.cohort_name  END 
			 END ASC,
			 CASE  WHEN lower(columnOrder) = 'asc' then
				 CASE  WHEN columnName = 'enrollment_total' THEN sum(ec.enrollment_counts)
				 END 
			 END ASC,
			 CASE  WHEN lower(columnOrder) = 'desc' then
			 CASE  WHEN columnName = 'cohort_name' THEN  cs.cohort_name
				 WHEN columnName = 'cohort_acronym' THEN cs.cohort_acronym
				 WHEN columnName = 'type' THEN ch.type
				 WHEN columnName = 'active' THEN ch.active
				 WHEN columnName = 'update_time' THEN  ch.publish_time
				 WHEN columnName = 'enrollment_total' THEN length(sum(ec.enrollment_counts))
				ELSE cs.cohort_name  END 
			 END DESC,
			 CASE  WHEN lower(columnOrder) = 'desc' then
			 CASE  WHEN columnName = 'enrollment_total' THEN sum(ec.enrollment_counts)
				 END 
			 END DESC,
			cs.cohort_name
		limit page_index, page_size;
    END IF;
    
   SELECT found_rows() AS total;
	
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_baseline_data
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cohort_baseline_data` //

CREATE PROCEDURE `SELECT_cohort_baseline_data`(in cohort_info text)
BEGIN
	set @cohort_null = 1;
	IF cohort_info != "" AND cohort_info REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  THEN 
		set @cohort_null = 0;
		call ConvertIntToTable (cohort_info);
    END IF;
    
	SELECT cs.cohort_id AS id,cs.cohort_name,cs.cohort_acronym,mc.category_id, ld.category, ld.sub_category, 
				mc.baseline, mc.other_specify_baseline 
	FROM cohort_basic cs 
    JOIN major_content mc ON cs.cohort_id = mc.cohort_id 
    JOIN lu_data_category ld ON mc.category_id = ld.id
    JOIN cohort ch ON ch.id = cs.cohort_id
    JOIN v_lu_data_category vld ON ld.category = vld.data_category 
	WHERE  lower(ch.status)='published' 
        and ( @cohort_null = 1 OR cs.cohort_id in (SELECT val FROM tempIntTable) )
	ORDER BY cs.cohort_acronym ASC ;  

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_basic_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cohort_basic_info` //

CREATE PROCEDURE `SELECT_cohort_basic_info`(in cohort_info text)
BEGIN
	set @cohort_null = 1;
	IF cohort_info != "" AND cohort_info REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  THEN 
		set @cohort_null = 0;
		call ConvertIntToTable (cohort_info);
    END IF;
    
	SELECT cs.*,lg.gender, ci.ci_confirmed_cancer_year,m.mort_year_mortality_followup 
	FROM cohort_basic cs 
    JOIN cancer_info ci ON cs.cohort_id = ci.cohort_id 
    JOIN mortality m ON cs.cohort_id = m.cohort_id
    JOIN lu_gender lg ON cs.eligible_gender_id = lg.id 
    JOIN cohort ch ON ch.id = cs.cohort_id
	WHERE lower(ch.status)='published' 
		and ( @cohort_null = 1 OR cs.cohort_id in (SELECT val FROM tempIntTable) )
	ORDER BY cs.cohort_acronym asc;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_cohort_cancer_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cohort_cancer_info` //

CREATE PROCEDURE `SELECT_cohort_cancer_info`(in cohort_info text)
BEGIN
	set @cohort_null = 1;
	IF cohort_info != "" AND cohort_info REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  THEN 
		set @cohort_null = 0;
		call ConvertIntToTable (cohort_info);
    END IF;
    
    SELECT cs.cohort_id AS c_id,cs.cohort_name,cs.cohort_acronym,ci.* 
	FROM cohort_basic cs 
    JOIN cancer_info ci ON cs.cohort_id = ci.cohort_id 
    JOIN  cohort ch ON ch.id = cs.cohort_id
	WHERE lower(ch.status)='published' 
		and ( @cohort_null = 1 OR cs.cohort_id in (SELECT val FROM tempIntTable) )
	ORDER BY cs.cohort_acronym ASC;

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_cohort_description
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cohort_description` //

CREATE PROCEDURE `SELECT_cohort_description`(in c_id int)
BEGIN
	set @cohort_id = c_id;

	SELECT coalesce(pub.id,0) into @cohort_id 
    FROM cohort ori 
    LEFT JOIN (SELECT id, acronym, status FROM cohort WHERE status="published") pub ON ori.acronym=pub.acronym 
    WHERE ori.id= c_id ;
    
    SELECT a.*,  dlh_procedure_online AS request_procedures_none 
    FROM cohort_basic a 
    JOIN dlh b ON a.cohort_id=b.cohort_id 
    WHERE a.cohort_id = @cohort_id;
	
    SELECT a.* FROM cohort_document a WHERE a.cohort_id = @cohort_id and status = 1 and category not in (2,3) ;
   
    SELECT p.* FROM person p WHERE p.cohort_id = @cohort_id and category_id in (1,3,4);

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_cohort_followup_data
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cohort_followup_data` //

CREATE PROCEDURE `SELECT_cohort_followup_data`(in cohort_info text)
BEGIN
	set @cohort_null = 1;
	IF cohort_info != "" AND cohort_info REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  THEN 
		set @cohort_null = 0;
		call ConvertIntToTable (cohort_info);
    END IF;
    
    SELECT cs.cohort_id AS id,cs.cohort_name,cs.cohort_acronym,mc.category_id, 
			ld.category, ld.sub_category, mc.followup, mc.other_specify_followup 
	FROM cohort_basic cs 
    JOIN major_content mc ON  cs.cohort_id = mc.cohort_id 
    JOIN lu_data_category ld ON mc.category_id = ld.id 
    JOIN cohort ch ON ch.id = cs.cohort_id
    JOIN v_lu_data_category vld ON ld.category = vld.data_category
	WHERE lower(ch.status)='published' 
		and ( @cohort_null = 1 OR cs.cohort_id in (SELECT val FROM tempIntTable) ) 
	ORDER BY cs.cohort_acronym asc ;

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_cohort_linkages_technology
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cohort_linkages_technology` //

CREATE PROCEDURE `SELECT_cohort_linkages_technology`(in cohort_info text)
BEGIN
	set @cohort_null = 1;
	IF cohort_info != "" AND cohort_info REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  THEN 
		set @cohort_null = 0;
		call ConvertIntToTable (cohort_info);
    END IF;
    
  
	SELECT cs.cohort_id AS c_id,cs.cohort_name,cs.cohort_acronym,cd.* 
	FROM cohort_basic cs
	JOIN dlh cd ON cs.cohort_id = cd.cohort_id 
	JOIN cohort ch ON ch.id = cs.cohort_id
	WHERE lower(ch.status)='published' 
        and ( @cohort_null = 1 OR cs.cohort_id in (SELECT val FROM tempIntTable) )  
	ORDER BY cohort_acronym ASC;

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_cohort_list
-- original features for published cohort only
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `SELECT_cohort_list` //

CREATE PROCEDURE `SELECT_cohort_list`()
BEGIN
	SELECT cs.cohort_id AS id, cs.cohort_name, cs.cohort_acronym, cs.cohort_type, ch.active FROM cohort_basic cs 
	JOIN cohort ch ON ch.id = cs.cohort_id
	WHERE lower(ch.status)='published' ORDER BY cs.cohort_acronym;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_all_cohort
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `SELECT_all_cohort` //

CREATE PROCEDURE `SELECT_all_cohort`()
BEGIN
	SELECT id, name, type, acronym AS cohort_acronym FROM cohort ORDER BY acronym;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_owners_from_id
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_owners_from_id` //

CREATE PROCEDURE `SELECT_owners_from_id`(in targetID int)
BEGIN
	set @cohort_id = targetID;
    
	SELECT distinct u.first_name,u.last_name,u.email,c1.acronym,c1.name 
	FROM user u 
	JOIN cohort_user_mapping cum ON u.id=cum.user_id
	JOIN cohort c1 ON cum.cohort_acronym= c1.acronym
	WHERE  u.access_level='CohortAdmin' and u.active_status ='Y'
     	 and c1.id = @cohort_id ;

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_admin_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_admin_info` //

CREATE PROCEDURE `SELECT_admin_info`(in targetID int)
BEGIN
	set @cohort_id = targetID;
    SELECT distinct first_name, last_name, email, name, type, acronym 
	FROM user x
    JOIN cohort y 
    WHERE access_level='SystemAdmin' and x.active_status='Y' and y.id= @cohort_id and x.id >1 ;

END //
-- -----------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_owner
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS SELECT_cohort_owner //
CREATE PROCEDURE `SELECT_cohort_owner`()
BEGIN
	SELECT id, first_name, last_name, email FROM user
	WHERE access_level='CohortAdmin' and active_status='Y' ORDER BY last_name, first_name;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_lookup
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cohort_lookup` //

CREATE PROCEDURE `SELECT_cohort_lookup`()
BEGIN
	SELECT * FROM lu_gender;
    SELECT * FROM lu_cancer WHERE id <= 29 ORDER BY CASE WHEN id=1 THEN 'zza' WHEN id=29 THEN 'zzz' ELSE cancer end, cancer;
    SELECT * FROM v_lu_data_category;
    SELECT * FROM lu_ethnicity;
    SELECT * FROM lu_race ORDER BY CASE WHEN id=7 THEN 'zzz' ELSE race end, race;
    SELECT * FROM lu_specimen WHERE id < 10;
	SELECT * FROM lu_cohort_status;
	SELECT * FROM v_lu_collected_specimen;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_cohort_mortality
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cohort_mortality` //

CREATE PROCEDURE `SELECT_cohort_mortality`(in cohort_info text)
BEGIN
	set @cohort_null = 1;
	IF cohort_info != "" AND cohort_info REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  THEN 
		set @cohort_null = 0;
		call ConvertIntToTable (cohort_info);
    END IF;
    
	SELECT cs.cohort_id AS c_id,cs.cohort_name,cs.cohort_acronym,cm.* 
	FROM cohort_basic cs 
    JOIN mortality cm ON cs.cohort_id = cm.cohort_id 
    JOIN cohort ch ON ch.id = cs.cohort_id
	WHERE lower(ch.status)='published' 
		and ( @cohort_null = 1 OR cs.cohort_id in (SELECT val FROM tempIntTable) )
	ORDER BY cs.cohort_acronym ASC;

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_cohort
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cohort` //

CREATE PROCEDURE `SELECT_cohort`(in `@gender` varchar(100),in `@age_info` varchar(100), in `@study_population` varchar(1000), 
									in `@race` varchar(1000), in `@ethnicity` varchar(1000), in `@type` varchar(1000),
									in `@category` varchar(1000),in `@collected_specimen` varchar(2000),in `@cancer` varchar(2000),
                                    in columnName varchar(40), in columnOrder varchar(10),
									in pageIndex int, in pageSize int)
BEGIN
	DECLARE tmp TEXT DEFAULT '';
    DECLARE v TEXT DEFAULT ''; 
	DECLARE i INT DEFAULT 0;
    DECLARE tmp_count INT DEFAULT 0; 
    DECLARE page_index INT DEFAULT 0;
    DECLARE page_size INT DEFAULT 0;
    
	drop temporary table IF exists temp_gender;
    create temporary table IF not exists temp_gender( val int );
    drop temporary table IF exists temp_ageinfo;
    create temporary table IF not exists temp_ageinfo( val int );
    drop temporary table IF exists temp_studypop;
    create temporary table IF not exists temp_studypop( val int );
    drop temporary table IF exists temp_race;
    create temporary table IF not exists temp_race( val int );
    drop temporary table IF exists temp_ethnicity;
    create temporary table IF not exists temp_ethnicity( val int );
	drop temporary table IF exists temp_type;
    create temporary table IF not exists temp_type( val int );
    drop temporary table IF exists temp_category;
    create temporary table IF not exists temp_category( val int );
	drop temporary table IF exists temp_cancer;
    create temporary table IF not exists temp_cancer( val int );
    drop temporary table IF exists temp_specimen;
    create temporary table IF not exists temp_specimen( val int );
    set @ageinfo_null = 1;
    set @gender_null = 1;
	set @cancer_null = 1;
    set @cancer_info_null = 1;
    set @category_null = 1;
    set @ethnicity_null = 1;
	set @race_null = 1;
	set @type_null = 1;
    set @specimen_null = 1;
   
    -- expected input is '' or looks like '1,2,3' (foreign key id)
    -- call ConvertIntToTable to INSERT values into tempIntTable (val)
    IF `@gender` != "" AND `@gender` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'   then
		set @gender_null = 0;
        call ConvertIntToTable(`@gender`);
        INSERT into temp_gender SELECT distinct val FROM tempIntTable;
		IF locate("4", `@gender`) <= 0 and (locate("1", `@gender`) > 0 or locate("2", `@gender`) > 0) then
			INSERT into temp_gender values (4);
        END IF;
	END IF;
        
    IF `@race` != "" AND `@race` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  then
		set @race_null = 0 ;
		call ConvertIntToTable(`@race`);
        INSERT into temp_race SELECT distinct val FROM tempIntTable;
	END IF;

	IF `@type` != "" AND `@type` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  then
		set @type_null = 0 ;
		call ConvertIntToTable(`@type`);
        INSERT into temp_type SELECT distinct val FROM tempIntTable;
	END IF;
    
    IF `@ethnicity` != "" AND `@ethnicity` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  then
		set @ethnicity_null = 0;
		call ConvertIntToTable(`@ethnicity`);
        INSERT into temp_ethnicity SELECT distinct val FROM tempIntTable;
	END IF;

    IF `@cancer` != "" AND `@cancer` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  then
		set @cancer_null = 0;
        call ConvertIntToTable(`@cancer`);
        INSERT into temp_cancer SELECT distinct val FROM tempIntTable;
	END IF;
    
    IF `@study_population` != "" AND `@study_population` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  then
		call ConvertIntToTable(`@study_population`);
        INSERT into temp_studypop SELECT distinct val FROM tempIntTable;
	END IF;
    
	IF `@category` != ""  AND `@category` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$' then
		set @category_null = 0;
		IF `@category` = "99" then
			set @cancer_info_null = 0;
		else
            call ConvertIntToTable(`@category`);
			INSERT into temp_category SELECT distinct val FROM tempIntTable;
            IF locate("99", `@category`) > 0 then
				set @cancer_info_null = 0;
            END IF;
		END IF;
	END IF;
    
    set @specimen_query = "";
    IF `@collected_specimen` != "" AND `@collected_specimen` REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  then
		set @specimen_null = 0;
        call ConvertIntToTable(`@collected_specimen`);
		INSERT into temp_specimen 
		SELECT sp.cohort_id FROM specimen_collected_type sp
		join (SELECT * FROM lu_specimen WHERE sub_category IS NOT NULL
			and ( specimen IN ('Buccal/Saliva', 'Tissue (includes tumor and/or normal)', 'Urine','Feces','Other') OR id in (11,16))
			) AS lu ON sp.specimen_id = lu.id
		join (SELECT distinct specimen FROM lu_specimen WHERE id in (SELECT val FROM tempIntTable) ) AS lc ON lc.specimen = lu.specimen
		WHERE sp.collected_yn = 1;
	END IF;
        
    set tmp = '';
    set i = 0;
    IF `@age_info` != "" AND `@age_info` REGEXP '^[[:space:]]*[0-9[[:space:]]-]+(?:[[:space:]]?,[[:space:]]?[0-9[[:space:]]-]+)*?[[:space:]]*$'  then
		set @ageinfo_null = 0;
		set tmp_count = 1+length(`@age_info`) - length(replace(`@age_info`,',','')); 
		WHILE i < tmp_count
		do
			set i=i+1;
            set v = trim(reverse(substring_index(reverse(substring_index(`@age_info`,',',i)),',',1)));
            IF v = "0-14" then
				set tmp = concat(tmp,"cs.enrollment_age_min <= 14");
            elseIF v ="15-19" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 15 and cs.enrollment_age_min <= 19) or (cs.enrollment_age_max >= 15 and cs.enrollment_age_max <= 19) or (cs.enrollment_age_min <= 15 and cs.enrollment_age_max >= 19))");
            elseIF v = "20-24" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 20 and cs.enrollment_age_min <= 24) or (cs.enrollment_age_max >= 20 and cs.enrollment_age_max <= 24) or (cs.enrollment_age_min <= 20 and cs.enrollment_age_max >= 24))");
			elseIF v = "25-29" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 25 and cs.enrollment_age_min <= 29) or (cs.enrollment_age_max >= 25 and cs.enrollment_age_max <= 29) or (cs.enrollment_age_min <= 25 and cs.enrollment_age_max >= 29))");
            elseIF v = "30-34" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 30 and cs.enrollment_age_min <= 34) or (cs.enrollment_age_max >= 30 and cs.enrollment_age_max <= 34) or (cs.enrollment_age_min <= 30 and cs.enrollment_age_max >= 34))");
			elseIF v = "35-39" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 35 and cs.enrollment_age_min <= 39) or (cs.enrollment_age_max >= 35 and cs.enrollment_age_max <= 39) or (cs.enrollment_age_min <= 35 and cs.enrollment_age_max >= 39))");
			elseIF v = "40-44" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 40 and cs.enrollment_age_min <= 44) or (cs.enrollment_age_max >= 40 and cs.enrollment_age_max <= 44) or (cs.enrollment_age_min <= 40 and cs.enrollment_age_max >= 44))");
			elseIF v = "45-49" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 45 and cs.enrollment_age_min <= 49) or (cs.enrollment_age_max >= 45 and cs.enrollment_age_max <= 49) or (cs.enrollment_age_min <= 45 and cs.enrollment_age_max >= 49))");
			elseIF v = "50-54" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 50 and cs.enrollment_age_min <= 54) or (cs.enrollment_age_max >= 50 and cs.enrollment_age_max <= 54) or (cs.enrollment_age_min <= 50 and cs.enrollment_age_max >= 54))");
			elseIF v = "55-59" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 55 and cs.enrollment_age_min <= 59) or (cs.enrollment_age_max >= 55 and cs.enrollment_age_max <= 59) or (cs.enrollment_age_min <= 55 and cs.enrollment_age_max >= 59))");
			elseIF v = "60-64" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 60 and cs.enrollment_age_min <= 64) or (cs.enrollment_age_max >= 60 and cs.enrollment_age_max <= 64) or (cs.enrollment_age_min <= 60 and cs.enrollment_age_max >= 64))");
			elseIF v = "65-69" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 65 and cs.enrollment_age_min <= 69) or (cs.enrollment_age_max >= 65 and cs.enrollment_age_max <= 69) or (cs.enrollment_age_min <= 65 and cs.enrollment_age_max >= 69))");
			elseIF v = "70-74" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 70 and cs.enrollment_age_min <= 74) or (cs.enrollment_age_max >= 70 and cs.enrollment_age_max <= 74) or (cs.enrollment_age_min <= 70 and cs.enrollment_age_max >= 74))");
			elseIF v = "75-79" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 75 and cs.enrollment_age_min <= 79) or (cs.enrollment_age_max >= 75 and cs.enrollment_age_max <= 79) or (cs.enrollment_age_min <= 75 and cs.enrollment_age_max >= 79))");
			elseIF v = "80-85+" then
				set tmp = concat(tmp,"cs.enrollment_age_max >= 80");
			else
				set tmp = "";
            END IF;
			IF i < tmp_count then
				set tmp = concat(tmp," or ");
            END IF;
		END WHILE;

        IF tmp != ""  THEN 
			set @ageinfo_query = concat("INSERT into temp_ageinfo SELECT cs.cohort_id FROM cohort_basic cs WHERE (",tmp,") ");
			PREPARE stmt FROM @ageinfo_query;
			EXECUTE stmt;
			DEALLOCATE PREPARE stmt;
        END IF;
    END IF;

    IF pageIndex > -1 THEN 
        set page_size = IFNULL(pageSize,50);
        set page_index = pageIndex;
	else
        set page_size = 1000;
        set page_index = 0;
    END IF;
 
	SELECT sql_calc_found_rows cs.cohort_id AS id,cs.cohort_name, cs.cohort_acronym, cs.cohort_type, cs.cohort_web_site, ch.active, ch.publish_time AS update_time, 
	 sum(ec.enrollment_counts) AS enrollment_total 
	FROM cohort_basic cs 
    JOIN enrollment_count ec ON cs.cohort_id = ec.cohort_id
    JOIN cohort ch ON ch.id = cs.cohort_id
	WHERE lower(ch.status)='published' 
    and ( @gender_null = 1 OR cs.eligible_gender_id in (SELECT val FROM temp_gender) )
    and  cs.cohort_id in (
			SELECT cohort_id FROM enrollment_count WHERE 
            ( @race_null = 1 OR ( enrollment_counts > 0  and race_id in (SELECT val FROM temp_race )) )
			and ( @type_null = 1 OR ( enrollment_counts > 0  and type_id in (SELECT val FROM temp_type )) )
			and ( @ethnicity_null = 1 OR (  enrollment_counts > 0  and ethnicity_id in (SELECT val FROM temp_ethnicity )))
      ) 
	and ( @category_null = 1  OR ( 
			cs.cohort_id in ( 
				SELECT cohort_id FROM major_content WHERE category_id in ( 
					SELECT ld.id FROM lu_data_category ld , v_lu_data_category vld 
					WHERE ld.category=vld.data_category and vld.id in (SELECT val FROM temp_category )  and ( baseline=1 or followup = 1) 
                )
				union
				SELECT cohort_id FROM cancer_info WHERE ci_cancer_treatment_data = 1 and @cancer_info_null != 1  
			)
        ) )
	and ( @ageinfo_null = 1 OR cs.cohort_id in (SELECT val FROM temp_ageinfo) )
	and ( @specimen_null = 1 OR cs.cohort_id in (SELECT val FROM temp_specimen) )
    and ( @cancer_null = 1 OR cs.cohort_id in (SELECT cohort_id FROM cancer_count WHERE cancer_id in (SELECT val FROM temp_cancer ) and cancer_counts > 0 ) )
	group by cs.cohort_id, cs.cohort_name, cs.cohort_acronym, cs.cohort_web_site, ch.publish_time, ch.active
    ORDER BY CASE WHEN lower(columnOrder) = 'asc' then
			 CASE  WHEN columnName = 'cohort_name' THEN  cs.cohort_name
				 WHEN columnName = 'cohort_acronym' THEN cs.cohort_acronym
				 WHEN columnName = 'type' THEN ch.type
				 WHEN columnName = 'update_time' THEN  ch.publish_time
				 WHEN columnName = 'active' THEN  ch.active
				 WHEN columnName = 'enrollment_total' THEN length(sum(ec.enrollment_counts))
				ELSE cs.cohort_name  END 
			 END ASC,
		 CASE  WHEN lower(columnOrder) = 'asc' then
			 CASE  WHEN columnName = 'enrollment_total' THEN sum(ec.enrollment_counts)
				 END 
		 END ASC,
        CASE WHEN lower(columnOrder) = 'desc' then
			 CASE  WHEN columnName = 'cohort_name' THEN  cs.cohort_name
				 WHEN columnName = 'cohort_acronym' THEN cs.cohort_acronym
				 WHEN columnName = 'type' THEN ch.type
				 WHEN columnName = 'update_time' THEN  ch.publish_time 
				 WHEN columnName = 'active' THEN  ch.active
				 WHEN columnName = 'enrollment_total' THEN length(sum(ec.enrollment_counts))
				ELSE cs.cohort_name  END 
		 END DESC,
        CASE WHEN lower(columnOrder) = 'desc' then
			 CASE  WHEN columnName = 'enrollment_total' THEN sum(ec.enrollment_counts)
				 END 
		 END DESC,
        cs.cohort_name
    limit page_index, page_size;
   
    SELECT found_rows() AS total;

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_specimen_overview
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cohort_specimen_overview` //

CREATE PROCEDURE `SELECT_cohort_specimen_overview`(in cohort_info text)
BEGIN
	set @cohort_null = 1;
	IF cohort_info != "" AND cohort_info REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'  THEN 
		set @cohort_null = 0;
		call ConvertIntToTable (cohort_info);
    END IF;
    
    SELECT cs.cohort_id AS c_id,cs.cohort_name,cs.cohort_acronym,s.* 
	FROM cohort_basic cs 
    JOIN v_specimen s ON cs.cohort_id = s.cohort_id 
    JOIN cohort ch ON ch.id = cs.cohort_id
	WHERE lower(ch.status)='published'
    and ( @cohort_null = 1 OR cs.cohort_id in (SELECT val FROM tempIntTable) )
	ORDER BY cs.cohort_acronym ASC;

END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: insert_contact_us
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `insert_contact_us` //

CREATE PROCEDURE `insert_contact_us`(in firstname varchar(50), in lastname varchar(50), in organization varchar(100), 
														in phone varchar(20), in email varchar(50), in topic int, in message text)
BEGIN
	set @fistName = firstname;
    set @lastName = lastname;
    set @org = organization;
    set @phone= phone;
    set @email = email;
    set @topic = topic;
    set @message = message;
    
    set @query = "INSERT into contact(first_name, last_name,organization,phone,email,topic, message,create_time,update_time) 
    values ( ?, ? , ?, ?, ?, ?, ?, now(), now() )";
    PREPARE stmt FROM @query;
	EXECUTE stmt using @fistName, @lastName, @org, @phone, @email, @topic, @message;
	DEALLOCATE PREPARE stmt;
    
    SELECT LAST_INSERT_ID();

END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_cohort_for_user
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cohort_for_user` //
/*
CREATE PROCEDURE `SELECT_cohort_for_user`(in user_id int)
BEGIN
	
    set @user_id = user_id;
    SELECT c.*
	FROM cohort c
    JOIN cohort_user_mapping cm ON cm.cohort_acronym = c.acronym
	WHERE cm.user_id = @user_id
	ORDER BY
			status = 'draft' desc,
			status = 'rejected' desc,
			status = 'in review' desc,
			status = 'submitted' desc,
			status = 'new' desc,
			status = 'published' desc,
			status = 'archived' desc
	LIMIT 1; 

END //
*/

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_contact_for_cohort
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_contact_for_cohort` //
/*
CREATE PROCEDURE `SELECT_contact_for_cohort`(in cohort_id int)
BEGIN
    set @cohort_id = cohort_id;
    
	SELECT * FROM person
	WHERE cohort_id = @cohort_id and email is not null and email != ''
	ORDER BY category_id = 2 desc, category_id = 1  desc
	LIMIT 1;

END //

*/


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_editable_cohort_by_acronym
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_editable_cohort_by_acronym` //
CREATE PROCEDURE `SELECT_editable_cohort_by_acronym`(in acronym varchar(100))
BEGIN
    set @query = "
		SELECT *
		FROM cohort c
		WHERE acronym = ?
		order by
			status = 'rejected' desc,
			status = 'draft' desc,
			status = 'in review' desc,
			status = 'submitted' desc,
			status = 'new' desc,
			status = 'published' desc
		limit 1;
	";
    set @acronym = acronym;
    PREPARE stmt FROM @query;
	EXECUTE stmt using @acronym;
	DEALLOCATE PREPARE stmt;
END //



-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_cancer_count
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cancer_count` //
CREATE PROCEDURE `SELECT_cancer_count`(in cohort_id integer)
BEGIN
	set @cohort_id = cohort_id;
  	SELECT a.* FROM cancer_count a WHERE a.cohort_id = @cohort_id;
	
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_cancer_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cancer_info` //
CREATE PROCEDURE `SELECT_cancer_info`(in cohort_id integer)
BEGIN
    set @cohort_id = cohort_id;
    SELECT a.* FROM cancer_info a WHERE a.cohort_id = @cohort_id;
	
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: update_cancer_count
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `update_cancer_count` //
CREATE PROCEDURE `update_cancer_count`(in cohort_id integer, in params json)
BEGIN
	DECLARE success INT DEFAULT 1;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
      SET success = 0;
      ROLLBACK;
	END;

    START TRANSACTION;

    set @cohort_id = cohort_id;
    set @params = params;
    set @query = "
            INSERT into cancer_count (
            cohort_id,
            cancer_id,
            race_id, ethnicity_id,
            gender_id,
            case_type_id,
            cancer_counts
        )
        SELECT
            ?,
            cancer_id,
            race_id, ethnicity_id,
            gender_id,
            case_type_id,
            cancer_counts
        FROM json_table(
            ?,
            '$[*]' columns(
                cancer_id integer path '$.cancer_id',
                race_id integer path '$.race_id', 
                ethnicity_id integer path '$.ethnicity_id',
                gender_id integer path '$.gender_id',
                case_type_id integer path '$.case_type_id',
                cancer_counts integer path '$.cancer_counts'    )
        ) AS json_params
        on duplicate key update
            cancer_counts = values(cancer_counts)";

    PREPARE stmt FROM @query;
	EXECUTE stmt using @cohort_id, @params;
	DEALLOCATE PREPARE stmt;

    COMMIT;

    SELECT success;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: update_cancer_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `update_cancer_info` //
CREATE PROCEDURE `update_cancer_info`(in cohort_id integer, in params json)
BEGIN
	DECLARE success INT DEFAULT 1;
    DECLARE new_id INT DEFAULT cohort_id;
	DECLARE user_id INT DEFAULT 1;
   
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
      SET success = 0;
      ROLLBACK;
	END;

	SELECT `status` INTO @cohort_status FROM cohort WHERE id = new_id;
    IF @cohort_status = 'published' THEN CALL SELECT_unpublished_cohort_id(cohort_id, new_id, user_id); END IF;
    START TRANSACTION;
	
    set @cohort_id = new_id;
    set @old_id = cohort_id;
    set @params = params;
    set @query = "
        INSERT into cancer_info (
            cohort_id,
            ci_confirmed_cancer_year,
            ci_confirmed_cancer_date,
            ci_ascertained_self_reporting,
            ci_ascertained_tumor_registry,
            ci_ascertained_medical_records,
            ci_ascertained_other,
            ci_ascertained_other_specify,
            ci_cancer_recurrence,
            ci_second_primary_diagnosis,
            ci_cancer_treatment_data,
            ci_treatment_data_surgery,
            ci_treatment_data_radiation,
            ci_treatment_data_chemotherapy,
            ci_treatment_data_hormonal_therapy,
            ci_treatment_data_bone_stem_cell,
            ci_treatment_data_other,
            ci_treatment_data_other_specify,
            ci_data_source_admin_claims,
            ci_data_source_electronic_records,
            ci_data_source_chart_abstraction,
            ci_data_source_patient_reported,
            ci_data_source_other,
            ci_data_source_other_specify,
            ci_collect_other_information,
            ci_cancer_staging_data,
            ci_tumor_grade_data,
            ci_tumor_genetic_markers_data,
            ci_tumor_genetic_markers_data_describe,
            ci_histologically_confirmed,
            ci_cancer_subtype_histological,
            ci_cancer_subtype_molecular
        )
        SELECT
            ?,
            ci_confirmed_cancer_year,
            ci_confirmed_cancer_date,
            ci_ascertained_self_reporting,
            ci_ascertained_tumor_registry,
            ci_ascertained_medical_records,
            ci_ascertained_other,
            ci_ascertained_other_specify,
            ci_cancer_recurrence,
            ci_second_primary_diagnosis,
            ci_cancer_treatment_data,
            ci_treatment_data_surgery,
            ci_treatment_data_radiation,
            ci_treatment_data_chemotherapy,
            ci_treatment_data_hormonal_therapy,
            ci_treatment_data_bone_stem_cell,
            ci_treatment_data_other,
            ci_treatment_data_other_specify,
            ci_data_source_admin_claims,
            ci_data_source_electronic_records,
            ci_data_source_chart_abstraction,
            ci_data_source_patient_reported,
            ci_data_source_other,
            ci_data_source_other_specify,
            ci_collect_other_information,
            ci_cancer_staging_data,
            ci_tumor_grade_data,
            ci_tumor_genetic_markers_data,
            ci_tumor_genetic_markers_data_describe,
            ci_histologically_confirmed,
            ci_cancer_subtype_histological,
            ci_cancer_subtype_molecular
        FROM json_table(
            ?,
            '$[*]' columns(
                ci_confirmed_cancer_year integer path '$.ci_confirmed_cancer_year',
                ci_confirmed_cancer_date DATE path '$.ci_confirmed_cancer_date',
                ci_ascertained_self_reporting integer path '$.ci_ascertained_self_reporting',
                ci_ascertained_tumor_registry integer path '$.ci_ascertained_tumor_registry',
                ci_ascertained_medical_records integer path '$.ci_ascertained_medical_records',
                ci_ascertained_other integer path '$.ci_ascertained_other',
                ci_ascertained_other_specify varchar(300) path '$.ci_ascertained_other_specify',
                ci_cancer_recurrence integer path '$.ci_cancer_recurrence',
                ci_second_primary_diagnosis integer path '$.ci_second_primary_diagnosis',
                ci_cancer_treatment_data integer path '$.ci_cancer_treatment_data',
                ci_treatment_data_surgery integer path '$.ci_treatment_data_surgery',
                ci_treatment_data_radiation integer path '$.ci_treatment_data_radiation',
                ci_treatment_data_chemotherapy integer path '$.ci_treatment_data_chemotherapy',
                ci_treatment_data_hormonal_therapy integer path '$.ci_treatment_data_hormonal_therapy',
                ci_treatment_data_bone_stem_cell integer path '$.ci_treatment_data_bone_stem_cell',
                ci_treatment_data_other integer path '$.ci_treatment_data_other',
                ci_treatment_data_other_specify varchar(200) path '$.ci_treatment_data_other_specify',
                ci_data_source_admin_claims integer path '$.ci_data_source_admin_claims',
                ci_data_source_electronic_records integer path '$.ci_data_source_electronic_records',
                ci_data_source_chart_abstraction integer path '$.ci_data_source_chart_abstraction',
                ci_data_source_patient_reported integer path '$.ci_data_source_patient_reported',
                ci_data_source_other integer path '$.ci_data_source_other',
                ci_data_source_other_specify varchar(200) path '$.ci_data_source_other_specify',
                ci_collect_other_information integer path '$.ci_collect_other_information',
                ci_cancer_staging_data integer path '$.ci_cancer_staging_data',
                ci_tumor_grade_data integer path '$.ci_tumor_grade_data',
                ci_tumor_genetic_markers_data integer path '$.ci_tumor_genetic_markers_data',
                ci_tumor_genetic_markers_data_describe varchar(200) path '$.ci_tumor_genetic_markers_data_describe',
                ci_histologically_confirmed integer path '$.ci_histologically_confirmed',
                ci_cancer_subtype_histological integer path '$.ci_cancer_subtype_histological',
                ci_cancer_subtype_molecular integer path '$.ci_cancer_subtype_molecular'
            )
        ) AS json_params
        on duplicate key update
            ci_confirmed_cancer_year = values(ci_confirmed_cancer_year),
            ci_confirmed_cancer_date = values(ci_confirmed_cancer_date),
            ci_ascertained_self_reporting = values(ci_ascertained_self_reporting),
            ci_ascertained_tumor_registry = values(ci_ascertained_tumor_registry),
            ci_ascertained_medical_records = values(ci_ascertained_medical_records),
            ci_ascertained_other = values(ci_ascertained_other),
            ci_ascertained_other_specify = values(ci_ascertained_other_specify),
            ci_cancer_recurrence = values(ci_cancer_recurrence),
            ci_second_primary_diagnosis = values(ci_second_primary_diagnosis),
            ci_cancer_treatment_data = values(ci_cancer_treatment_data),
            ci_treatment_data_surgery = values(ci_treatment_data_surgery),
            ci_treatment_data_radiation = values(ci_treatment_data_radiation),
            ci_treatment_data_chemotherapy = values(ci_treatment_data_chemotherapy),
            ci_treatment_data_hormonal_therapy = values(ci_treatment_data_hormonal_therapy),
            ci_treatment_data_bone_stem_cell = values(ci_treatment_data_bone_stem_cell),
            ci_treatment_data_other = values(ci_treatment_data_other),
            ci_treatment_data_other_specify = values(ci_treatment_data_other_specify),
            ci_data_source_admin_claims = values(ci_data_source_admin_claims),
            ci_data_source_electronic_records = values(ci_data_source_electronic_records),
            ci_data_source_chart_abstraction = values(ci_data_source_chart_abstraction),
            ci_data_source_patient_reported = values(ci_data_source_patient_reported),
            ci_data_source_other = values(ci_data_source_other),
            ci_data_source_other_specify = values(ci_data_source_other_specify),
            ci_collect_other_information = values(ci_collect_other_information),
            ci_cancer_staging_data = values(ci_cancer_staging_data),
            ci_tumor_grade_data = values(ci_tumor_grade_data),
            ci_tumor_genetic_markers_data = values(ci_tumor_genetic_markers_data),
            ci_tumor_genetic_markers_data_describe = values(ci_tumor_genetic_markers_data_describe),
            ci_histologically_confirmed = values(ci_histologically_confirmed),
            ci_cancer_subtype_histological = values(ci_cancer_subtype_histological),
            ci_cancer_subtype_molecular = values(ci_cancer_subtype_molecular)
            ";

    PREPARE stmt FROM @query;
	EXECUTE stmt using @cohort_id, @params;
	DEALLOCATE PREPARE stmt;
	
    COMMIT;
	
	IF success = 1 then
    BEGIN
	  IF exists (SELECT * FROM cohort WHERE id = new_id and lower(status) in ('new', 'rejected') ) then
		update cohort set status = 'draft', cohort_last_update_date = now(), update_time = NOW() WHERE id = new_id;
		INSERT into cohort_activity_log (cohort_id, user_id, activity, notes ) values (new_id, user_id, 'draft', null);
	  else
        update cohort set  cohort_last_update_date = now(), update_time = NOW() WHERE id = new_id;
	  END IF;
	  SELECT success , id AS duplicated_cohort_id , `status` FROM cohort WHERE id = new_id;
	end;
    else
        SELECT success;
    END IF;
    set @query1 = "SELECT page_code, status FROM cohort_edit_status WHERE cohort_id = ? ";
      PREPARE stmt1 FROM @query1;
    EXECUTE stmt1 using @cohort_id;
    DEALLOCATE PREPARE stmt1;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_cancer_counts
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_cancer_counts` //
CREATE PROCEDURE `SELECT_cancer_counts`(in gender varchar(200),in race varchar(500),in ethnicity varchar(500), in cancer varchar(1000),in cohort varchar(1000))
BEGIN 
	set @gender_null = 1;
    set @race_null = 1;
    set @ethnicity_null = 1;
    set @cancer_null = 1;
	set @cohort_null = 1;
  	set @gender = gender;
    set @race = race;
  	set @ethnicity = ethnicity;
  	set @cancer = cancer;
  	set @cohort = cohort;
	set @gender_list = '';
    set @race_list = '';
  	set @ethnicity_list = '';
  	set @cancer_list = '';
  	set @cohort_list = '';
	drop temporary table IF exists temp_gender;
    create temporary table IF not exists temp_gender( val int );
    drop temporary table IF exists temp_race;
    create temporary table IF not exists temp_race( val int );
    drop temporary table IF exists temp_ethnicity;
    create temporary table IF not exists temp_ethnicity( val int );
	drop temporary table IF exists temp_cancer;
    create temporary table IF not exists temp_cancer( val int );
	drop temporary table IF exists temp_cohort;
    create temporary table IF not exists temp_cohort( val int );
	drop temporary table IF exists temp_cancer_nozero;
    create temporary table IF not exists temp_cancer_nozero( val int );
    
    IF (@gender != "" AND @gender REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'   ) then
        set @gender_null = 0 ;
		call ConvertIntToTable(@gender);
		INSERT into temp_gender SELECT distinct val FROM tempIntTable;
		SELECT GROUP_CONCAT(val SEPARATOR ',') into @gender_list FROM temp_gender;
    END IF;
    
     IF ( @race != "" AND @race REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'    ) then
        set @race_null = 0 ;
		call ConvertIntToTable(@race);
		INSERT into temp_race SELECT distinct val FROM tempIntTable;
		SELECT GROUP_CONCAT(val ORDER BY val  SEPARATOR ',') into @race_list FROM temp_race;
    END IF;
    
    IF ( @ethnicity != "" AND  @ethnicity REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'   ) then
        set @ethnicity_null = 0 ;
		call ConvertIntToTable(@ethnicity);
		INSERT into temp_ethnicity SELECT distinct val FROM tempIntTable;
		SELECT GROUP_CONCAT(val SEPARATOR ',') into @ethnicity_list FROM temp_ethnicity;
    END IF;
    
    IF ( @cancer != "" AND @cancer REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'   ) then
		call ConvertIntToTable(@cancer);
		INSERT into temp_cancer 
        SELECT distinct val FROM tempIntTable;
        set @temp_compare = 0;
        SELECT count(*) into @temp_compare FROM 
         ( select distinct id from lu_cancer as lu where lu.id !=29 and lu.id NOT in (select val from temp_cancer)) as t;
        IF ( @temp_compare >  0) THEN
         set @cancer_null = 0 ;
		END IF;
    END IF;
    
    /*
    *. IF no any cohort being specified FROM GUI , THEN only Cohorts with valid cancer_counts will be returned
    *  any GUI gender/cancer SELECTions will be applied
    *  a few old version cancer_counts were recorded AS negative values, for corrct sum exclude these nagative values
    */
    IF ( cohort != ""  AND cohort REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'   ) then
        set @cohort_null = 0 ;
		call ConvertIntToTable(@cohort);
		INSERT into temp_cohort SELECT distinct val FROM tempIntTable;
    else
        INSERT into temp_cohort 
        SELECT tc.cohort_id FROM cancer_count tc 
        WHERE abs(IFNULL(tc.cancer_counts, 0)) >=0  
        and ( @gender_null = 1 OR tc.gender_id in ( SELECT val FROM temp_gender ) )
        and ( @cancer_null = 1 OR tc.cancer_id in ( SELECT val FROM temp_cancer ) )
        GROUP BY tc.cohort_id having sum( CASE  WHEN IFNULL(tc.cancer_counts, 0) > 0  THEN tc.cancer_counts ELSE 0 end) > 0 ;
    END IF;
	SELECT GROUP_CONCAT(val SEPARATOR ',') into @cohort_list FROM temp_cohort;
    
	INSERT into temp_cancer_nozero
	SELECT tc.cancer_id FROM cancer_count tc 
	WHERE abs(IFNULL(tc.cancer_counts, 0)) >=0  
        and ( @gender_null = 1 OR find_in_set(tc.gender_id , @gender_list ))
        and ( @race_null = 1 OR find_in_set(tc.race_id , @race_list ) )
        and ( @ethnicity_null = 1 OR find_in_set(tc.ethnicity_id , @ethnicity_list ) )
        and ( @cancer_null = 1 OR tc.cancer_id in (select val from temp_cancer) )
        and find_in_set (tc.cohort_id, @cohort_list )
	GROUP BY tc.cancer_id having sum( CASE  WHEN IFNULL(tc.cancer_counts, 0) > 0  THEN tc.cancer_counts ELSE 0 end) > 0 ;
	SELECT GROUP_CONCAT(val SEPARATOR ',') into @cancer_list FROM temp_cancer_nozero;
  
   SELECT * FROM (
    SELECT concat(cc.gender_id,'_',cc.ethnicity_id, '_', cc.race_id,'_',cc.cancer_id) AS u_id, cc.cohort_id, 
		ch.name as cohort_name, ch.acronym as cohort_acronym, 
     (case when lg.id=4 then lg.gender else concat(lg.gender,'s') end ) as gender, cc.gender_id,
     le.ethnicity, cc.ethnicity_id, lr.race, cc.race_id, cc.cancer_id , 
      (case when cc.cancer_id=0 then 'All Cancer Types' else lc.cancer end ) as cancer, cancer_counts 
    FROM 
    ( SELECT c0.cohort_id, c0.gender_id,c0.ethnicity_id, c0.race_id,c0.cancer_id, 
		sum( CASE  WHEN IFNULL(c0.cancer_counts, 0) > 0 THEN c0.cancer_counts ELSE 0 end) AS cancer_counts 
	FROM cancer_count c0
    WHERE c0.gender_id in (1,2) and c0.cancer_id !=29
		and ( @gender_null = 1 OR find_in_set(c0.gender_id, @gender_list ) )
		and find_in_set (c0.cancer_id, @cancer_list )
        and ( @race_null = 1 OR find_in_set(c0.race_id , @race_list ) )
        and ( @ethnicity_null = 1 OR find_in_set(c0.ethnicity_id , @ethnicity_list ) )
		and find_in_set (c0.cohort_id, @cohort_list )
    GROUP BY c0.cohort_id, c0.gender_id, c0.ethnicity_id, c0.race_id, c0.cancer_id
    UNION
    SELECT c1.cohort_id, 4 as gender_id, c1.ethnicity_id, c1.race_id,c1.cancer_id, 
		sum( CASE  WHEN IFNULL(c1.cancer_counts, 0) > 0 THEN c1.cancer_counts ELSE 0 end) AS cancer_counts 
	FROM cancer_count c1 
    WHERE c1.gender_id in (1,2) and c1.cancer_id !=29
		and find_in_set (c1.cancer_id, @cancer_list )
        and ( @race_null = 1 OR find_in_set(c1.race_id , @race_list ) )
        and ( @ethnicity_null = 1 OR find_in_set(c1.ethnicity_id , @ethnicity_list ) )
		and find_in_set(c1.cohort_id, @cohort_list ) 
    GROUP BY c1.cohort_id, c1.ethnicity_id, c1.race_id, c1.cancer_id
    UNION
    SELECT c2.cohort_id, c2.gender_id, c2.ethnicity_id, c2.race_id,0 as cancer_id, 
		sum( CASE  WHEN IFNULL(c2.cancer_counts, 0) > 0 THEN c2.cancer_counts ELSE 0 end) AS cancer_counts 
	FROM cancer_count c2 
    WHERE c2.gender_id in (1,2) and c2.cancer_id !=29 and @cancer_null = 1
		and find_in_set (c2.cancer_id, @cancer_list )
        and ( @gender_null = 1 OR find_in_set(c2.gender_id, @gender_list ) )
        and ( @race_null = 1 OR find_in_set(c2.race_id, @race_list ) )
        and ( @ethnicity_null = 1 OR find_in_set(c2.ethnicity_id , @ethnicity_list ) )
		and find_in_set(c2.cohort_id, @cohort_list )
    GROUP BY c2.cohort_id, c2.gender_id, c2.ethnicity_id, c2.race_id
    UNION
    SELECT c3.cohort_id, 4 as gender_id, c3.ethnicity_id, c3.race_id,0 as cancer_id, 
		sum( CASE  WHEN IFNULL(c3.cancer_counts, 0) > 0 THEN c3.cancer_counts ELSE 0 end) AS cancer_counts 
	FROM cancer_count c3 
    WHERE c3.gender_id in (1,2) and c3.cancer_id !=29 and @cancer_null = 1
		and find_in_set (c3.cancer_id, @cancer_list )
        and ( @race_null = 1 OR find_in_set(c3.race_id , @race_list ) )
        and ( @ethnicity_null = 1 OR find_in_set(c3.ethnicity_id , @ethnicity_list ) )
		and find_in_set(c3.cohort_id, @cohort_list )
    GROUP BY c3.cohort_id,  c3.ethnicity_id, c3.race_id
    ) as cc
	JOIN cohort ch ON ch.id = cc.cohort_id 
    JOIN lu_gender lg ON cc.gender_id = lg.id 
    LEFT JOIN lu_cancer lc ON cc.cancer_id = lc.id 
	JOIN lu_race lr ON cc.race_id = lr.id 
    JOIN lu_ethnicity le ON cc.ethnicity_id = le.id 
    where lower(ch.status)='published' ) as a
    ORDER BY CASE WHEN a.cancer = 'All Other Cancers' THEN 'zzz' ELSE a.cancer  END asc, a.gender_id desc, a.ethnicity,  
    CASE  WHEN a.race_id = 3 THEN 4.5 ELSE a.race_id end, a.cohort_acronym ;

END//

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_enrollment_counts
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_enrollment_counts` //

CREATE PROCEDURE `SELECT_enrollment_counts`(in gender varchar(200), in race varchar(500),in ethnicity varchar(500),in cohort varchar(1000) )
BEGIN
    set @gender_null = 1;
    set @race_null = 1;
    set @ethnicity_null = 1;
	set @cohort_null = 1;
  	set @gender = gender;
  	set @race = race;
  	set @ethnicity = ethnicity;
  	set @cohort = cohort;
	drop temporary table IF exists temp_gender;
    create temporary table IF not exists temp_gender( val int );
	drop temporary table IF exists temp_race;
    create temporary table IF not exists temp_race( val int );
    drop temporary table IF exists temp_ethnicity;
    create temporary table IF not exists temp_ethnicity( val int );
	drop temporary table IF exists temp_cohort;
    create temporary table IF not exists temp_cohort( val int );
   
    -- call ConvertIntToTable to INSERT values into tempIntTable (val)
    IF ( @gender != "" AND @gender REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'    ) then
		set @gender_null = 0 ;
		call ConvertIntToTable(@gender);
		INSERT into temp_gender SELECT distinct val FROM tempIntTable;
    END IF;
    
    IF ( @race != "" AND @race REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'    ) then
        set @race_null = 0 ;
		call ConvertIntToTable(@race);
		INSERT into temp_race SELECT distinct val FROM tempIntTable;
    END IF;
    
    IF ( @ethnicity != "" AND  @ethnicity REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'   ) then
        set @ethnicity_null = 0 ;
		call ConvertIntToTable(@ethnicity);
		INSERT into temp_ethnicity SELECT distinct val FROM tempIntTable;
    END IF;
    
	/*
    *. IF no any cohort being specified FROM GUI , THEN only these Cohort with valid enrollment_counts will be returned
    *  any GUI gender/race/ethnicity SELECTions will be applied
    *  a few old version enrollment_counts were recorded AS negative values, for corrct sum exclude these nagative values
    */
    IF ( @cohort != "" AND @cohort REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'    ) then
		set @cohort_null = 0 ;
		call ConvertIntToTable(@cohort);
		INSERT into temp_cohort SELECT distinct val FROM tempIntTable;
	else
        INSERT into temp_cohort 
        SELECT tc.cohort_id FROM enrollment_count tc WHERE abs(IFNULL(tc.enrollment_counts, 0)) >=0  
            and (@gender_null = 1 OR tc.gender_id in (SELECT val FROM temp_gender) )
			and (@race_null = 1 OR tc.race_id in (SELECT val FROM temp_race) )
			and (@ethnicity_null = 1 OR tc.ethnicity_id in (SELECT val FROM temp_ethnicity) )
		group by tc.cohort_id having sum( CASE  WHEN IFNULL(tc.enrollment_counts, 0) > 0  THEN tc.enrollment_counts ELSE 0 end) > 0 ;
    END IF;
   
    SELECT ec.cohort_id, ch.name AS cohort_name, ch.acronym AS cohort_acronym,concat(ec.gender_id,'_',ec.ethnicity_id,'_',ec.race_id) AS u_id, ec.gender_id, 
		lg.gender, ec.ethnicity_id, le.ethnicity, ec.race_id, lr.race, 
		( CASE  WHEN IFNULL(ec.enrollment_counts,0) > 0 THEN ec.enrollment_counts ELSE 0  END ) AS enrollment_counts  
	FROM enrollment_count ec
	JOIN cohort ch ON ch.id = ec.cohort_id
    JOIN ( SELECT * FROM lu_gender a WHERE  @gender_null = 1 OR a.id in (SELECT val FROM temp_gender) ) lg ON ec.gender_id = lg.id 
    JOIN ( SELECT * FROM lu_ethnicity b WHERE @ethnicity_null = 1 OR b.id in (SELECT val FROM temp_ethnicity) )le ON ec.ethnicity_id = le.id 
    JOIN ( SELECT * FROM lu_race c WHERE @race_null = 1 OR c.id in (SELECT val FROM temp_race) ) lr ON ec.race_id = lr.id 
	WHERE lower(ch.status)='published' and  ec.cohort_id in (SELECT val FROM temp_cohort) 
	ORDER BY ec.gender_id, le.ethnicity, 
		 CASE  WHEN ec.race_id = 3 THEN 4.5 ELSE ec.race_id end, 
        ch.acronym;

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_specimen_counts
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_specimen_counts` //

CREATE PROCEDURE `SELECT_specimen_counts`(in specimen varchar(1000), in cancer varchar(1000),in cohort varchar(1000))
BEGIN
  	set @specimen_null = 1;
    set @cancer_null = 1;
	set @cohort_null = 1;
  	set @specimen = specimen;
  	set @cancer = cancer;
  	set @cohort = cohort;
	drop temporary table IF exists temp_specimen;
    create temporary table IF not exists temp_specimen( val int );
	drop temporary table IF exists temp_cancer;
    create temporary table IF not exists temp_cancer( val int );
	drop temporary table IF exists temp_cohort;
    create temporary table IF not exists temp_cohort( val int );
    
    IF ( @specimen != "" AND @specimen REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'   ) then
        set @specimen_null = 0 ;
		call ConvertIntToTable(@specimen);
		INSERT into temp_specimen SELECT distinct val FROM tempIntTable;
    END IF;
    
    IF ( @cancer != "" AND @cancer REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'    )  then
        set @cancer_null = 0 ;
		call ConvertIntToTable(@cancer);
		INSERT into temp_cancer SELECT distinct val FROM tempIntTable;
    END IF;
    
    IF ( @cohort != "" AND @cohort REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'   ) then
        set @cohort_null = 0 ;
		call ConvertIntToTable(@cohort);
		INSERT into temp_cohort SELECT distinct val FROM tempIntTable;
    else
        INSERT into temp_cohort 
        SELECT tc.cohort_id FROM specimen_count tc 
        WHERE abs(IFNULL(tc.specimens_counts, 0)) >=0  
        and ( @specimen_null = 1 OR tc.specimen_id in ( SELECT val FROM temp_specimen ) )
        and ( @cancer_null = 1 OR tc.cancer_id in ( SELECT val FROM temp_cancer ) )
        GROUP BY tc.cohort_id having sum( CASE  WHEN IFNULL(tc.specimens_counts, 0) > 0  THEN tc.specimens_counts ELSE 0 end) > 0 ;
    END IF;
    
   	SELECT sc.cohort_id, ch.name AS cohort_name, ch.acronym AS cohort_acronym,concat(sc.specimen_id,'_',sc.cancer_id) AS u_id, sc.specimen_id, ls.specimen, sc.cancer_id, lc.cancer, 
		( CASE  WHEN IFNULL(sc.specimens_counts,0) > 0 THEN sc.specimens_counts ELSE 0  END ) AS specimens_counts    
	FROM specimen_count sc 
	JOIN cohort ch ON ch.id = sc.cohort_id
    JOIN lu_specimen ls ON sc.specimen_id = ls.id
    JOIN lu_cancer lc ON sc.cancer_id = lc.id
	WHERE lower(ch.status)='published' 
		and ( @specimen_null = 1 OR sc.specimen_id in ( SELECT val FROM temp_specimen ) )
		and ( @cancer_null = 1 OR sc.cancer_id in ( SELECT val FROM temp_cancer ) )
		and sc.cohort_id in ( SELECT val FROM temp_cohort ) 
	ORDER BY ls.specimen, CASE WHEN lc.cancer = 'All Other Cancers' THEN 'zza' WHEN lc.cancer = 'No Cancer' THEN 'zzz' ELSE lc.cancer  END asc, ch.acronym;

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: updateCohort_basic
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `update_cohort_basic` //

CREATE  PROCEDURE `update_cohort_basic`(in targetID int, in info JSON)
BEGIN
	DECLARE i INT DEFAULT 0;
	DECLARE new_id INT DEFAULT targetID;
    DECLARE user_id INT DEFAULT 1;

    DECLARE flag INT DEFAULT 1;
 	
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
   
	set @acronym = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohort_acronym')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohort_acronym')));
    
	SELECT `status` INTO @cohort_status FROM cohort WHERE id = `targetID`;
    set user_id = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')) in ('null', '') , 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')));

    IF @cohort_status = 'published' then
	   IF exists (SELECT acronym FROM cohort WHERE acronym is not null and acronym = @acronym and status not in ('published', 'archived', 'submitted', 'in review')) Then
			SELECT id into new_id FROM cohort WHERE acronym = @acronym and status not in ('published', 'archived', 'submitted', 'in review');
	   ELSE 
			call SELECT_unpublished_cohort_id(targetID, new_id, user_id); 
       END IF;
    ELSE 
       set new_id = targetID;
    END IF;
  
  START transaction;
  
	drop table IF exists temp_PI_IDS;
    create table temp_PI_IDS(
		upToDatePIId int not null default 0
    );
    
	SELECT `status` INTO @cohort_status FROM cohort WHERE id = new_id;

    SET @latest_cohort = new_id;
	UPDATE `cohort_basic` 
	SET 
		cohort_web_site = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohort_web_site')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohort_web_site'))),
		-- date_completed =if(@completionDate is not null and @completionDate != '' and @completionDate in ('null', ''), replace(replace(@completionDate, 'T', ' '), 'Z', ''), NOW()),
		clarification_contact = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.clarification_contact')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.clarification_contact'))),
		sameAsSomeone = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.sameAsSomeone')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.sameAsSomeone'))),
		cohort_description = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohort_description')) in ('null', ''), null, RTRIM(LTRIM(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohort_description'))))),
		eligible_gender_id = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_gender_id')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_gender_id'))),
		eligible_disease = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_disease')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_disease'))),
		eligible_disease_cancer_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_disease_cancer_specify')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_disease_cancer_specify'))),
		eligible_disease_other_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_disease_other_specify')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_disease_other_specify'))),
		enrollment_total = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_total')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_total'))),
		enrollment_year_start = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_start')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_start'))),
		enrollment_year_end = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_end')) in('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_end'))),
		enrollment_ongoing = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_ongoing')) in('null', ''), null, CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_ongoing')) AS SIGNED)),
		enrollment_target = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_target')) in ('null',''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_target'))),
		enrollment_year_complete = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_complete')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_complete'))),
		enrollment_age_min = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_min')) in('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_min'))),
		enrollment_age_max = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_max')) in('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_max'))),
		enrollment_age_median = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_median')) in('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_median'))),
		enrollment_age_mean = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_mean')) in('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_mean'))),
		current_age_min = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_min')) in('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_min'))),
		current_age_max = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_max')) in('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_max'))),
		current_age_median = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_median')) in('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_median'))),
		current_age_mean = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_mean')) in('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_mean'))),
		time_interval = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.time_interval')) in('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.time_interval'))),
		most_recent_year = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.most_recent_year')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.most_recent_year'))),
		data_collected_in_person = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_in_person')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_in_person'))),
		data_collected_phone = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_phone')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_phone'))),
		data_collected_paper = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_paper')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_paper'))),
		data_collected_web = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_web')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_web'))),
		data_collected_other = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_other')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_other'))),
		data_collected_other_specify = IF(data_collected_other = 1, if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_other_specify'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_other_specify'))), ''),
		restrictions = IF (JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireNone')) = 1, '1_0_0_0_0_0_0_0',
						   CONCAT('0_', if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireCollab')) in ('null', ''), '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireCollab')) AS CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireIrb')) in ('null', ''), '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireIrb')) AS CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireData')) in ('null', ''), '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireData'))  AS CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictGenoInfo')) in ('null', ''), '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictGenoInfo'))  AS CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOtherDb')) in ('null', ''), '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOtherDb'))  AS CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictCommercial')) in ('null', ''), '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictCommercial'))  AS CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOther')) in ('null', ''), '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOther'))  AS CHAR)))),
		restrictions_other_specify = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOther'))= 1, if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictions_other_specify'))='null',null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictions_other_specify'))), ''),
		strategy_routine = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_routine')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_routine'))),
		strategy_mailing = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_mailing')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_mailing'))),
		strategy_aggregate_study = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_aggregate_study')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_aggregate_study'))),
		strategy_individual_study = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_individual_study')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_individual_study'))),
        strategy_committees = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_committees')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_committees'))),
		strategy_invitation = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_invitation')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_invitation'))),
        strategy_participant_input = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_participant_input')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_participant_input'))),
		strategy_other = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_other')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_other'))),
		strategy_other_specify = IF(strategy_other = 1, if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_other_specify')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_other_specify'))), ''),
		update_time = NOW()
		WHERE cohort_id = new_id;
		-- update section status
		
        IF ROW_COUNT() > 0 THEN
        BEGIN
			UPDATE cohort_edit_status SET `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionAStatus')) 
			WHERE cohort_id = new_id AND page_code = 'A';
		END;
        END IF;
		IF EXISTS (SELECT * FROM person WHERE cohort_id = new_id AND category_id = 1) THEN
			UPDATE person 
			SET `name` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerName'))),
				`position` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPosition')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPosition'))),
				phone = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPhone')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPhone'))),
				country_code = JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerCountry')), 
				email = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerEmail')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerEmail'))),
				update_time = NOW()
			WHERE cohort_id = new_id and category_id = 1;
		ELSE
			INSERT INTO person(cohort_id, category_id, `name`, `position`, phone, country_code, email, create_time, update_time)
			VALUES (new_id, 1, if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerName'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPosition')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPosition'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPhone')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPhone'))),
					JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerCountry')), 
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerEmail')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerEmail'))),
					NOW(), NOW());
		END IF;
		IF EXISTS (SELECT * FROM person WHERE cohort_id = new_id AND category_id = 2) THEN
			UPDATE person
			SET `name` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterName'))),
				`position` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPosition')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPosition'))),
				phone = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPhone')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPhone'))),
				country_code = JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterCountry')), 
				email = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterEmail')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterEmail'))),
				update_time = NOW()
			WHERE cohort_id = new_id and category_id = 2;
	   ELSE
			INSERT INTO person(cohort_id, category_id, `name`, `position`, phone, country_code, email, create_time, update_time)
			VALUES (new_id, 2, if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterName'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPosition')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPosition'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPhone')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPhone'))),
					JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterCountry')), 
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterEmail')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterEmail'))),
					NOW(), NOW());
		END IF; 
		IF EXISTS (SELECT * FROM person WHERE cohort_id = new_id AND category_id = 4) THEN
			UPDATE person
			SET `name` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorName'))),
				`position` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPosition')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPosition'))),
				phone = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPhone')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPhone'))),
				country_code = JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorCountry')), 
				email = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorEmail')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorEmail'))),
				update_time = NOW()
			WHERE cohort_id = new_id and category_id = 4;
		ELSE
			INSERT INTO person(cohort_id, category_id, `name`, `position`, phone, country_code, email, create_time, update_time)
			VALUES (new_id, 4, if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorName'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPosition')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPosition'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPhone')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPhone'))),
					JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorCountry')), 
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorEmail')) in ('null', ''), null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorEmail'))),
					NOW(), NOW());
		END IF; 
		
		SET @investigators = JSON_UNQUOTE(JSON_EXTRACT(info, '$.investigators'));
		WHILE i < JSON_LENGTH(@investigators) DO
			SELECT JSON_EXTRACT(@investigators, concat('$[',i,']')) INTO @investigator;
		
			IF targetID <> new_id THEN -- IF duplication occurred
				SELECT new_PI_Id into @new_PI_Id FROM mapping_old_PI_Id_To_New WHERE old_PI_Id =  JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.personId'));
			else
				set @new_PI_Id = JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.personId'));
			END IF;
		
			IF exists(SELECT * FROM person WHERE id = @new_PI_Id) then
			BEGIN
				INSERT into temp_PI_IDS (upToDatePIId) values (@new_PI_Id);
				update person 
				SET `name` = JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.name')),
					institution = JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.institution')),
					email = JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.email'))
				WHERE id = @new_PI_Id;
				-- delete FROM mapping_old_PI_Id_To_New WHERE new_PI_Id = @new_PI_Id;
			end;
			ELSE 
            BEGIN
				INSERT into person (cohort_id, category_id, `name`, institution, email) values (new_id, 3,  JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.name')),
				JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.institution')), JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.email')));
				INSERT into temp_PI_IDS (upToDatePIId) values (last_insert_id());
			end;
			END IF;
			SELECT i + 1 INTO i;
		END WHILE;
		
		delete FROM person WHERE cohort_id = new_id and category_id = 3 and id not in (SELECT upToDatePIId FROM temp_PI_IDS);
		TRUNCATE TABLE mapping_old_PI_Id_To_New;
        
        set @questionnaireUrlEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.questionnaire_url'));
        set @mainUrlEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.main_cohort_url'));
        -- set @dataUrlEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_url'));
        -- set @specimenUrlEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.specimen_url'));
        set @publicationUrlEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.publication_url'));
		
        set @questionnaireFiles = JSON_UNQUOTE(JSON_EXTRACT(info, '$.questionnaireFileName'));
        set @mainFiles = JSON_UNQUOTE(JSON_EXTRACT(info, '$.mainFileName'));
        -- set @dataFiles = JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataFileName'));
        -- set @specimenFiles = JSON_UNQUOTE(JSON_EXTRACT(info, '$.specimenFileName'));
        set @publicationFiles = JSON_UNQUOTE(JSON_EXTRACT(info, '$.publicationFileName'));
        
        -- questionnaire/url-0
		SELECT 0 into i;

		delete FROM cohort_document WHERE cohort_id=@latest_cohort and attachment_type=0 and category <> 5;

		WHILE i < JSON_LENGTH(@questionnaireUrlEntry) DO
			INSERT INTO cohort_document (cohort_id, attachment_type, category, filename, website, `status`, create_time, update_time) VALUES (@latest_cohort, 0, 0, '', JSON_UNQUOTE(JSON_EXTRACT(@questionnaireUrlEntry,concat('$[',i,']'))), 1, NOW(), NOW());
			SELECT i + 1 INTO i;
		END WHILE;
        -- main file/url-1

		SELECT 0 into i;

        WHILE i < JSON_LENGTH(@mainUrlEntry) DO
			INSERT INTO cohort_document (cohort_id, attachment_type, category, filename, website, `status`, create_time, update_time) VALUES (@latest_cohort, 0, 1, '', JSON_UNQUOTE(JSON_EXTRACT(@mainUrlEntry,concat('$[',i,']'))), 1, NOW(), NOW());
			SELECT i + 1 INTO i;
		END WHILE;

        -- data file/url-2
        SELECT 0 into i;
/*
        WHILE i < JSON_LENGTH(@dataUrlEntry) DO
			INSERT INTO cohort_document (cohort_id, attachment_type, category, filename, website, `status`, create_time, update_time) VALUES (@latest_cohort, 0, 2, '', JSON_UNQUOTE(JSON_EXTRACT(@dataUrlEntry,concat('$[',i,']'))), 1, NOW(), NOW());
			SELECT i + 1 INTO i;
		END WHILE;
        -- specimen file/url-3
        SELECT 0 into i;

        WHILE i < JSON_LENGTH(@specimenUrlEntry) DO
			INSERT INTO cohort_document (cohort_id, attachment_type, category, filename, website, `status`, create_time, update_time) VALUES (@latest_cohort, 0, 3, '', JSON_UNQUOTE(JSON_EXTRACT(@specimenUrlEntry,concat('$[',i,']'))), 1, NOW(), NOW());
			SELECT i + 1 INTO i;
		END WHILE;
        -- publication file/url-4
        SELECT 0 into i;
*/
        WHILE i < JSON_LENGTH(@publicationUrlEntry) DO
			INSERT INTO cohort_document (cohort_id, attachment_type, category, filename, website, `status`, create_time, update_time) VALUES (@latest_cohort, 0, 4, '', JSON_UNQUOTE(JSON_EXTRACT(@publicationUrlEntry,concat('$[',i,']'))), 1, NOW(), NOW());
			SELECT i + 1 INTO i;
		END WHILE;

 commit;
	
    SELECT flag AS rowsAffacted;
    SELECT id AS personId, cohort_id, category_id,
	`name`, `position`, institution, phone, country_code,
	email, create_time, update_time FROM person
	WHERE cohort_id = new_id and category_id = 3;
	 SELECT new_id AS duplicated_cohort_id;
    IF exists (SELECT * FROM cohort WHERE id = new_id and lower(status) in ('new', 'rejected') ) then
		update cohort set status = 'draft',  cohort_last_update_date = now(), update_time = NOW() WHERE id = new_id;
        INSERT into cohort_activity_log (cohort_id, user_id, activity, notes ) values (new_id, user_id, 'draft', null);
	else
        update cohort set  cohort_last_update_date = now(), update_time = NOW() WHERE id = new_id;
	END IF;
	 SELECT `status` FROM cohort WHERE id = new_id;

	 SELECT page_code, status FROM cohort_edit_status WHERE cohort_id = new_id;
     
	 IF JSON_LENGTH(@questionnaireFiles) > 0 Then
		call add_file_attachment(new_id, 0,JSON_OBJECT('filenames', @questionnaireFiles ));
	 else
		update cohort_document set status = 0 WHERE cohort_id = new_id and category = 0 and attachment_type = 1;
	 END IF;

	IF JSON_LENGTH(@mainFiles) > 0 Then
		call add_file_attachment(new_id, 1,JSON_OBJECT('filenames', @mainFiles ));
	else
		update cohort_document set status = 0 WHERE cohort_id = new_id and category = 1 and attachment_type = 1;
	END IF;
 /*   
	IF JSON_LENGTH(@dataFiles) > 0 Then
		call add_file_attachment(new_id, 2,JSON_OBJECT('filenames', @dataFiles )); 
	 else
		update cohort_document set status = 0 WHERE cohort_id = new_id and category = 2 and attachment_type = 1;
	END IF;
	IF JSON_LENGTH(@specimenFiles) > 0 Then
		call add_file_attachment(new_id, 3,JSON_OBJECT('filenames', @specimenFiles ));
	 else
		update cohort_document set status = 0 WHERE cohort_id = new_id and category = 3 and attachment_type = 1;
	END IF;
    */
	IF JSON_LENGTH(@publicationFiles) > 0 Then
		call add_file_attachment(new_id, 4,JSON_OBJECT('filenames', @publicationFiles ));
	 else
		update cohort_document set status = 0 WHERE cohort_id = new_id and category = 4 and attachment_type = 1;
	END IF;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_admin_cohortlist
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_admin_cohortlist` //

CREATE PROCEDURE `SELECT_admin_cohortlist`(in status text, in cohortSearch text,
                  in columnName varchar(40), in columnOrder varchar(10),
									in pageIndex int, in pageSize int)
BEGIN 
  	DECLARE page_index INT DEFAULT 0;
    DECLARE page_size INT DEFAULT 0;
    set @status_null = 1;
  	set @cohortSearch = cohortSearch;
    drop temporary table IF exists temp_status;
    create temporary table IF not exists temp_status( val int );
   
    -- expected status input is '' or looks like '1, 2, 3 ' (foreign key id)
    -- call ConvertIntToTable to INSERT values into tempIntTable (val)
  	IF status != "" AND status REGEXP '^[[:space:]]*[0-9]+(?:[[:space:]]?,[[:space:]]?[0-9]+)*?[[:space:]]*$'   then
		set @status_null = 0 ;
		call ConvertIntToTable(status);
		INSERT into temp_status SELECT distinct val FROM tempIntTable;
	END IF;
   
	IF pageIndex > -1 THEN 
        set page_size = IFNULL(pageSize,50);
        set page_index = pageIndex;
	else
        set page_size = 1000;
        set page_index = 0;
    END IF;
    
	SELECT sql_calc_found_rows r.* FROM (
    SELECT ch.id, ch.name, ch.acronym, ch.type, ch.active, ch.status,l_status.id AS status_id, ch.document_ver as ver,
		concat(u1.first_name, ' ', u1.last_name) create_by, 
		(	case
			 WHEN lower(ch.status) in ('submitted', 'in review','published', 'rejected') and submit_by =1 THEN 'SystemAdmin'
			 WHEN lower(ch.status) in ('submitted', 'in review','published', 'rejected') and submit_by is not null THEN  (SELECT concat(u2.first_name, ' ', u2.last_name) FROM user u2 WHERE u2.id=ch.submit_by) 
			ELSE 'N/A' end) submit_by,
		(	 CASE  WHEN lower(ch.status) in ('submitted','draft', 'in review','published', 'rejected') and ch.update_time is not null THEN DATE_FORMAT(ch.update_time, '%m/%d/%Y') 
			ELSE 'Never' end) AS update_time,
		(	 CASE  WHEN lower(ch.status) in ('submitted', 'in review') THEN 'review' ELSE 'view' end) action
	FROM cohort ch 
    JOIN user u1 ON IFNULL(ch.create_by, 1)=u1.id
    JOIN lu_cohort_status l_status  ON lower(ch.status)=lower(l_status.cohortstatus) 
    WHERE ( @status_null = 1 OR lower(ch.status) in ( SELECT lower(cohortstatus) FROM lu_cohort_status WHERE  id in (SELECT val FROM temp_status) ) )
		and (locate( @cohortSearch , ch.acronym ) > 0  or locate(@cohortSearch ,ch.name ) > 0 ) 
        ) AS r
	ORDER BY
    CASE WHEN columnName = 'update_time' THEN  r.update_time='Never'
    	WHEN columnName = 'publish_by' THEN  r.submit_by='N/A'
    END desc,
	CASE WHEN lower(columnOrder) = 'asc' then
		CASE WHEN columnName = 'name' THEN  r.name
			 WHEN columnName = 'acronym' THEN r.acronym
			 WHEN columnName = 'type' THEN r.type
			 WHEN columnName = 'status' THEN  r.status
			 WHEN columnName = 'ver' THEN  cast(r.ver as signed)
			 WHEN columnName = 'publish_by' THEN r.submit_by
             WHEN columnName = 'update_time' THEN STR_TO_DATE(r.update_time, '%m/%d/%Y') 
			 WHEN columnName = 'active' then r.active
			 WHEN columnName = 'action' THEN r.action
			ELSE r.name 
		END 
	END ASC,
    CASE WHEN lower(columnOrder) = 'desc' then
		CASE WHEN columnName = 'name' THEN  r.name
			 WHEN columnName = 'acronym' THEN r.acronym
			 WHEN columnName = 'type' THEN r.type
			 WHEN columnName = 'status' THEN  r.status
			 WHEN columnName = 'ver' THEN  cast(r.ver as signed)
			 WHEN columnName = 'publish_by' THEN r.submit_by
             WHEN columnName = 'update_time' THEN STR_TO_DATE(r.update_time, '%m/%d/%Y') 
			 WHEN columnName = 'active' then r.active
             WHEN columnName = 'action' THEN r.action
			ELSE r.name 
		END 
	END DESC,
        r.name, r.status 
	LIMIT page_index, page_size;
	
    SELECT found_rows() AS total;

END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: get_cohort_basic_info
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `get_cohort_basic_info` //

CREATE  PROCEDURE `get_cohort_basic_info`(in `targetID` int)
BEGIN
	SELECT 
		-- cohort_id
        cohort_name
        ,cohort_acronym
		,cohort_type
        ,coalesce(cohort_web_site, '') AS cohort_web_site
        -- ,date_format(date_completed, '%Y-%m-%dT%H:%i:%s.000Z') AS completionDate
        ,clarification_contact
        ,sameAsSomeone
        ,coalesce(LTRIM(cohort_description), '') AS cohort_description
        ,eligible_gender_id
        ,eligible_disease
        ,coalesce(eligible_disease_cancer_specify, '') AS eligible_disease_cancer_specify
        ,coalesce(eligible_disease_other_specify, '') AS eligible_disease_other_specify
        ,coalesce(enrollment_total, '') AS enrollment_total
        ,coalesce(enrollment_year_start, '') AS enrollment_year_start
        ,coalesce(enrollment_year_end, '') AS enrollment_year_end
        ,enrollment_ongoing
        ,coalesce(enrollment_target, '') AS enrollment_target
        ,coalesce(enrollment_year_complete, '') AS enrollment_year_complete
        ,coalesce(enrollment_age_min, '') AS enrollment_age_min
        ,coalesce(enrollment_age_max, '') AS enrollment_age_max
        ,coalesce(enrollment_age_median, '') AS enrollment_age_median
        ,coalesce(enrollment_age_mean, '') AS enrollment_age_mean
        ,coalesce(current_age_min, '') AS current_age_min
        ,coalesce(current_age_max, '') AS current_age_max
        ,coalesce(current_age_median, '') AS current_age_median
        ,coalesce(current_age_mean, '') AS current_age_mean
        ,coalesce(time_interval, '') AS time_interval
        ,coalesce(most_recent_year, '') AS most_recent_year
        ,data_collected_in_person
        ,data_collected_phone
        ,data_collected_paper
        ,data_collected_web
        ,data_collected_other
        ,coalesce(data_collected_other_specify, '') AS data_collected_other_specify
        ,cast(substring(restrictions, 1, 1) AS signed) AS requireNone
        ,cast(substring(restrictions, 3, 1) AS signed) AS requireCollab
        ,cast(substring(restrictions, 5, 1) AS signed) AS requireIrb
        ,cast(substring(restrictions, 7, 1) AS signed) AS requireData
        ,cast(substring(restrictions, 9, 1) AS signed) AS restrictGenoInfo
        ,cast(substring(restrictions, 11, 1) AS signed) AS restrictOtherDb
        ,cast(substring(restrictions, 13, 1) AS signed) AS restrictCommercial
        ,cast(substring(restrictions, 15, 1) AS signed) AS restrictOther
        ,coalesce(restrictions_other_specify, '') AS restrictions_other_specify
        ,strategy_routine 
        ,strategy_mailing 
        ,strategy_aggregate_study 
        ,strategy_individual_study 
        ,strategy_committees
        ,strategy_invitation 
        ,strategy_participant_input
        ,strategy_other 
        ,strategy_other_specify        
	FROM cohort_basic WHERE cohort_id = `targetID`;
    
    SELECT coalesce(`name`, '') AS completerName, coalesce(`position`, '') AS completerPosition,
    coalesce(phone, '') AS completerPhone, coalesce(country_code, '') AS completerCountry, 
    coalesce(email, '') AS completerEmail 
    FROM person WHERE category_id = 1 and cohort_id = `targetID`;
    
    SELECT coalesce(`name`, '') AS contacterName, coalesce(`position`, '') AS contacterPosition,
    coalesce(phone, '') AS contacterPhone, coalesce(country_code, '') AS contacterCountry,
    coalesce(email, '') AS contacterEmail 
    FROM person WHERE category_id = 2 and cohort_id = `targetID`;
    
    SELECT id AS personId, coalesce(`name`, '') AS `name`, coalesce(institution, '') AS institution, 
    coalesce(email, '') AS email
    FROM person WHERE (`name` is not null and `name` <> '') and category_id = 3 and cohort_id = `targetID`;
    
    SELECT coalesce(`name`, '') AS collaboratorName, coalesce(`position`, '') AS collaboratorPosition,
    coalesce(phone, '') AS collaboratorPhone, coalesce(country_code, '') AS collaboratorCountry, coalesce(email, '') AS collaboratorEmail 
    FROM person WHERE category_id = 4 and cohort_id = `targetID`;
    
    SELECT page_code, `status` AS section_status FROM cohort_edit_status WHERE cohort_id = `targetID`;
    
    SELECT `status` AS cohort_status FROM cohort WHERE id = targetID;
    
    -- SELECT cd.id AS fileId, cd.category AS fileCategory, cd.filename, c.acronym, c.status FROM cohort_document cd
    SELECT cd.id AS fileId, cd.category AS fileCategory, cd.filename, cd.status AS status FROM cohort_document cd
    JOIN cohort c on cd.cohort_id = c.id
     WHERE cohort_id = targetID and filename !='' and filename is not null and cd.status = 1 and attachment_type = 1 and category in (0, 1, 4);

	SELECT category AS urlCategory, website FROM cohort_document WHERE cohort_id=targetID and website not in('', 'null') and website is not null and status = 1 and attachment_type = 0;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: upsert_enrollment_count
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS update_enrollment_count //

CREATE PROCEDURE `update_enrollment_count`(in targetID int, in info JSON)
BEGIN
	DECLARE new_id INT DEFAULT 0;
	DECLARE user_id INT DEFAULT 1;
    DECLARE flag INT DEFAULT 1;
 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
    
	SELECT `status` INTO @cohort_status FROM cohort WHERE id = targetID;
    set user_id = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')) in ('null', '') , 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')));
    IF @cohort_status = 'published' THEN 
    call SELECT_unpublished_cohort_id(targetID, new_id, user_id); 
    else
     set new_id = targetID;
    END IF;
    
     /*
    *  SELECT_unpublished_cohort_id should retunr a cohort_id not in published status
    * IF new_id not 0 (default value), continue
    */
 
    
  IF new_id > 0  THEN
		BEGIN

	SET @recentDate = JSON_UNQUOTE(JSON_EXTRACT(info, '$.mostRecentDate'));

	IF exists (SELECT * FROM enrollment_count WHERE cohort_id = new_id) then
		update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."111"')) where
        race_id=1 and ethnicity_id=1 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."112"')) where
        race_id=1 and ethnicity_id=1 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."113"')) where
        race_id=1 and ethnicity_id=1 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."121"')) where
        race_id=1 and ethnicity_id=2 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."122"')) where
        race_id=1 and ethnicity_id=2 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."123"')) where
        race_id=1 and ethnicity_id=2 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."131"')) where
        race_id=1 and ethnicity_id=3 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."132"')) where
        race_id=1 and ethnicity_id=3 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."133"')) where
        race_id=1 and ethnicity_id=3 and gender_id=3 and cohort_id=new_id;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."211"')) where
        race_id=2 and ethnicity_id=1 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."212"')) where
        race_id=2 and ethnicity_id=1 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."213"')) where
        race_id=2 and ethnicity_id=1 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."221"')) where
        race_id=2 and ethnicity_id=2 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."222"')) where
        race_id=2 and ethnicity_id=2 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."223"')) where
        race_id=2 and ethnicity_id=2 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."231"')) where
        race_id=2 and ethnicity_id=3 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."232"')) where
        race_id=2 and ethnicity_id=3 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."233"')) where
        race_id=2 and ethnicity_id=3 and gender_id=3 and cohort_id=new_id;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."311"')) where
        race_id=3 and ethnicity_id=1 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."312"')) where
        race_id=3 and ethnicity_id=1 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."313"')) where
        race_id=3 and ethnicity_id=1 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."321"')) where
        race_id=3 and ethnicity_id=2 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."322"')) where
        race_id=3 and ethnicity_id=2 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."323"')) where
        race_id=3 and ethnicity_id=2 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."331"')) where
        race_id=3 and ethnicity_id=3 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."332"')) where
        race_id=3 and ethnicity_id=3 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."333"')) where
        race_id=3 and ethnicity_id=3 and gender_id=3 and cohort_id=new_id;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."411"')) where
        race_id=4 and ethnicity_id=1 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."412"')) where
        race_id=4 and ethnicity_id=1 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."413"')) where
        race_id=4 and ethnicity_id=1 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."421"')) where
        race_id=4 and ethnicity_id=2 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."422"')) where
        race_id=4 and ethnicity_id=2 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."423"')) where
        race_id=4 and ethnicity_id=2 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."431"')) where
        race_id=4 and ethnicity_id=3 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."432"')) where
        race_id=4 and ethnicity_id=3 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."433"')) where
        race_id=4 and ethnicity_id=3 and gender_id=3 and cohort_id=new_id;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."511"')) where
        race_id=5 and ethnicity_id=1 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."512"')) where
        race_id=5 and ethnicity_id=1 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."513"')) where
        race_id=5 and ethnicity_id=1 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."521"')) where
        race_id=5 and ethnicity_id=2 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."522"')) where
        race_id=5 and ethnicity_id=2 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."523"')) where
        race_id=5 and ethnicity_id=2 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."531"')) where
        race_id=5 and ethnicity_id=3 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."532"')) where
        race_id=5 and ethnicity_id=3 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."533"')) where
        race_id=5 and ethnicity_id=3 and gender_id=3 and cohort_id=new_id;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."611"')) where
        race_id=6 and ethnicity_id=1 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."612"')) where
        race_id=6 and ethnicity_id=1 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."613"')) where
        race_id=6 and ethnicity_id=1 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."621"')) where
        race_id=6 and ethnicity_id=2 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."622"')) where
        race_id=6 and ethnicity_id=2 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."623"')) where
        race_id=6 and ethnicity_id=2 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."631"')) where
        race_id=6 and ethnicity_id=3 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."632"')) where
        race_id=6 and ethnicity_id=3 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."633"')) where
        race_id=6 and ethnicity_id=3 and gender_id=3 and cohort_id=new_id;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."711"')) where
        race_id=7 and ethnicity_id=1 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."712"')) where
        race_id=7 and ethnicity_id=1 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."713"')) where
        race_id=7 and ethnicity_id=1 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."721"')) where
        race_id=7 and ethnicity_id=2 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."722"')) where
        race_id=7 and ethnicity_id=2 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."723"')) where
        race_id=7 and ethnicity_id=2 and gender_id=3 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."731"')) where
        race_id=7 and ethnicity_id=3 and gender_id=1 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."732"')) where
        race_id=7 and ethnicity_id=3 and gender_id=2 and cohort_id=new_id;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."733"')) where
        race_id=7 and ethnicity_id=3 and gender_id=3 and cohort_id=new_id;
        
        update cohort_edit_status set `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionBStatus')) WHERE 
        cohort_id = new_id and page_code = 'B';
	
    END IF;
    
    update cohort_basic 
    set enrollment_most_recent_date = if(@recentDate is not null and @recentDate != '' and @recentDate != 'null', replace(replace(@recentDate, 'T', ' '), 'Z', ''), NULL)
	WHERE cohort_id = new_id;

    -- SET @rowcount = ROW_COUNT();
    SELECT flag AS rowsAffacted;
    
	SELECT new_id AS duplicated_cohort_id;
    IF exists (SELECT * FROM cohort WHERE id = new_id and lower(status) in  ('new', 'rejected')) then
		update cohort set status = 'draft', cohort_last_update_date = now(), update_time = NOW() WHERE id = new_id;
		INSERT into cohort_activity_log (cohort_id, user_id, activity, notes ) values (new_id, user_id, 'draft', null);
	else
        update cohort set  cohort_last_update_date = now(), update_time = NOW() WHERE id = new_id;
	END IF;
	SELECT `status` FROM cohort WHERE id = new_id;
    SELECT page_code, status FROM cohort_edit_status WHERE cohort_id = new_id;
	
    end;
    END IF;
    
    
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: get_enrollment_counts
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `get_enrollment_counts` //

CREATE PROCEDURE `get_enrollment_counts`(in targetID int)
BEGIN
	SELECT 
		CONCAT(CAST(race_id AS CHAR), CAST(ethnicity_id AS CHAR),
    CAST(gender_id AS CHAR)) AS cellId, CAST(enrollment_counts AS CHAR) AS cellCount
	FROM enrollment_count WHERE cohort_id = `targetID`
	ORDER BY race_id, ethnicity_id, gender_id;
    
	SELECT CAST(race_id AS CHAR) AS rowId, SUM(enrollment_counts) AS rowTotal 
	FROM enrollment_count 
	WHERE cohort_id = `targetID` GROUP BY race_id ;

	SELECT concat(cast(t.ethnicity_id AS char), cast(t.gender_id AS char)) AS colId, sum(t.enrollment_counts) AS colTotal
	FROM (SELECT enrollment_counts, race_id, ethnicity_id, gender_id 
	FROM enrollment_count
	WHERE cohort_id = `targetID`
	order by ethnicity_id, gender_id, race_id) AS t
	group by t.ethnicity_id, t.gender_id;
	 
	SELECT sum(enrollment_counts)  AS grandTotal
	FROM enrollment_count
	WHERE cohort_id = `targetID`;
     
	SELECT date_format(enrollment_most_recent_date, '%Y-%m-%dT%H:%i:%s.000Z') AS mostRecentDate FROM cohort_basic WHERE cohort_id = `targetID`;
END//

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: add_file_attachment
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS add_file_attachment //

CREATE PROCEDURE `add_file_attachment`(in targetID int, in categoryType int, in info JSON)
BEGIN
	DECLARE i INT default 0;
    DECLARE flag INT DEFAULT 1;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;

    START TRANSACTION;
    set @inputFileNames = '';
    set @fileCategory = categoryType;
    set @cohort_id = targetID;
	SET @filenames = JSON_UNQUOTE(JSON_EXTRACT(info, '$.filenames'));
	SELECT JSON_LENGTH(@filenames) AS json_length;
    IF JSON_LENGTH(@filenames) > 0 Then
		WHILE i < JSON_LENGTH(@filenames) DO
			SELECT JSON_EXTRACT(@filenames, concat('$[',i,']')) INTO @filename;
            set @inputFileNames = concat(@inputFileNames, @filename, ",");
            set @filename = replace(@filename, '"', '');
            
            IF NOT EXISTS (SELECT * FROM cohort_document WHERE cohort_id = targetID and category = categoryType and attachment_type = 1 and filename = @filename) THEN
				INSERT into cohort_document (cohort_id, attachment_type, category, fileName, website, status, create_time, update_time)
				values (targetID, 1, categoryType, @fileName, '', 1, NOW(), NOW());
			ELSE 
				update cohort_document set status = 1, update_time=now() WHERE cohort_id = targetID and category = categoryType and attachment_type = 1 and filename = @filename;
			END IF;
			SELECT i + 1 INTO i;
		END WHILE;

		set @inputFileNames = substring(@inputFileNames, 1, length(@inputFileNames)-1);
		IF @inputFileNames != "" THEN 
        -- call ConvertIntToTable(@inputFileNames) to convert str values into tempStrTable
			call ConvertStrToTable(@inputFileNames);
			update cohort_document c set c.status = 0 WHERE c.cohort_id = @cohort_id and c.attachment_type = 1 and c.category = @fileCategory  and filename not in (SELECT replace(val, '"', '') FROM tempStrTable ); 
		END IF; 
	END IF;
       
	COMMIT;

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: get_major_content
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS get_major_content //

CREATE PROCEDURE `get_major_content`(in targetID int)
BEGIN
	
	SELECT cohort_id, category_id, category, sub_category, baseline, followup, other_specify_baseline, other_specify_followup 
	FROM major_content m 
	JOIN lu_data_category d ON m.category_id = d.id
	WHERE cohort_id = targetID ORDER BY category_id ;

	SELECT  mdc_cancer_related_conditions_na AS cancerRelatedConditionsNA, mdc_acute_treatment_toxicity AS cancerToxicity, 
		mdc_late_effects_of_treatment AS cancerLateEffects, mdc_symptoms_management AS cancerSymptom, 
		mdc_other_cancer_condition  AS cancerOther, mdc_other_cancer_condition_specify AS cancerOtherSpecify
	FROM cancer_info WHERE cohort_id = targetID  ;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: upsert_major_count
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS upsert_major_content //

CREATE  PROCEDURE `upsert_major_content`(in Old_targetID int, in info JSON)
BEGIN
	DECLARE flag INT DEFAULT 1;
	DECLARE targetID INT DEFAULT 0;
	DECLARE user_id INT DEFAULT 1;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;

	SELECT `status` INTO @cohort_status FROM cohort WHERE id = Old_targetID;
    set user_id = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')) in ('null', '') , 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')));
    IF @cohort_status = 'published' THEN call SELECT_unpublished_cohort_id(Old_targetID, targetID, user_id);
	ELSE set targetID = Old_targetID;
    END IF;
    IF targetID > 0 then
    BEGIN
    start transaction;
	IF exists (SELECT * FROM major_content WHERE cohort_id = targetID) then
    BEGIN
		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.seStatusBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.seStatusBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.seStatusFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.seStatusFollowUp'))) WHERE cohort_id = targetID and category_id = 1 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.educationBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.educationBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.educationFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.educationFollowUp'))) WHERE cohort_id = targetID and category_id = 2 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.maritalStatusBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.maritalStatusBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.maritalStatusFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.maritalStatusFollowUp'))) WHERE cohort_id = targetID and category_id = 3 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.originBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.originBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.originFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.originFollowUp'))) WHERE cohort_id = targetID and category_id = 4 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.empStatusBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.empStatusBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.empStatusFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.empStatusFollowUp'))) WHERE cohort_id = targetID and category_id = 5 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.insuranceStatusBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.insuranceStatusBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.insuranceStatusFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.insuranceStatusFollowUp'))) WHERE cohort_id = targetID and category_id = 6 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.anthropometryBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.anthropometryBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.anthropometryFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.anthropometryFollowUp'))) WHERE cohort_id = targetID and category_id = 7 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dietaryBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.dietaryBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dietaryFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.dietaryFollowUp'))) WHERE cohort_id = targetID and category_id = 8 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.supplementBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.supplementBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.supplementFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.supplementFollowUp'))) WHERE cohort_id = targetID and category_id = 9;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.medicineBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.medicineBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.medicineFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.medicineFollowUp'))) WHERE cohort_id = targetID and category_id = 10 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.prescriptionBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.prescriptionBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.prescriptionFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.prescriptionFollowUp'))) WHERE cohort_id = targetID and category_id = 11 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.nonprescriptionBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.nonprescriptionBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.nonprescriptionFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.nonprescriptionFollowUp'))) WHERE cohort_id = targetID and category_id = 12;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.alcoholBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.alcoholBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.alcoholFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.alcoholFollowUp'))) WHERE cohort_id = targetID and category_id = 13 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigaretteBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigaretteBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigaretteFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigaretteFollowUp'))) WHERE cohort_id = targetID and category_id = 14 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigarBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigarBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigarFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigarFollowUp'))) WHERE cohort_id = targetID and category_id = 15 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.pipeBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.pipeBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.pipeFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.pipeFollowUp'))) WHERE cohort_id = targetID and category_id = 16;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoFollowUp'))) WHERE cohort_id = targetID and category_id = 17 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.ecigarBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.ecigarBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.ecigarFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.ecigarFollowUp'))) WHERE cohort_id = targetID and category_id = 18 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarOtherBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarOtherBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarOtherFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarOtherFollowUp'))) WHERE cohort_id = targetID and category_id = 19;

		update major_content set other_specify_baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarBaseLineSpecify')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarBaseLineSpecify'))), other_specify_followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarFollowUpSpecify')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarFollowUpSpecify'))) WHERE cohort_id = targetID and category_id = 19 ;
		
		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalFollowUp'))) WHERE cohort_id = targetID and category_id = 20 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.sleepBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.sleepBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.sleepFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.sleepFollowUp'))) WHERE cohort_id = targetID and category_id = 21 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.reproduceBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.reproduceBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.reproduceFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.reproduceFollowUp'))) WHERE cohort_id = targetID and category_id = 22 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.reportedHealthBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.reportedHealthBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.reportedHealthFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.reportedHealthFollowUp'))) WHERE cohort_id = targetID and category_id = 23 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.lifeBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.lifeBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.lifeFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.lifeFollowUp'))) WHERE cohort_id = targetID and category_id = 24 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.socialSupportBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.socialSupportBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.socialSupportFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.socialSupportFollowUp'))) WHERE cohort_id = targetID and category_id = 25 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitionBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitionBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitionFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitionFollowUp'))) WHERE cohort_id = targetID and category_id = 26 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.depressionBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.depressionBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.depressionFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.depressionFollowUp'))) WHERE cohort_id = targetID and category_id = 27 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.psychosocialBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.psychosocialBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.psychosocialFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.psychosocialFollowUp'))) WHERE cohort_id = targetID and category_id = 28 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.fatigueBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.fatigueBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.fatigueFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.fatigueFollowUp'))) WHERE cohort_id = targetID and category_id = 29 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerHistoryBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerHistoryBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerHistoryFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerHistoryFollowUp'))) WHERE cohort_id = targetID and category_id = 30 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerPedigreeBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerPedigreeBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerPedigreeFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerPedigreeFollowUp'))) WHERE cohort_id = targetID and category_id = 31 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.exposureBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.exposureBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.exposureFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.exposureFollowUp'))) WHERE cohort_id = targetID and category_id = 32 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.residenceBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.residenceBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.residenceFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.residenceFollowUp'))) WHERE cohort_id = targetID and category_id = 33 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.diabetesBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.diabetesBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.diabetesFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.diabetesFollowUp'))) WHERE cohort_id = targetID and category_id = 34 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strokeBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.strokeBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strokeFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strokeFollowUp'))) WHERE cohort_id = targetID and category_id = 35 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.copdBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.copdBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.copdFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.copdFollowUp'))) WHERE cohort_id = targetID and category_id = 36 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cardiovascularBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cardiovascularBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cardiovascularFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cardiovascularFollowUp'))) WHERE cohort_id = targetID and category_id = 37 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.osteoporosisBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.osteoporosisBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.osteoporosisFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.osteoporosisFollowUp'))) WHERE cohort_id = targetID and category_id = 38 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.mentalBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.mentalBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.mentalFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.mentalFollowUp'))) WHERE cohort_id = targetID and category_id = 39 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitiveDeclineBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitiveDeclineBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitiveDeclineFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitiveDeclineFollowUp'))) WHERE cohort_id = targetID and category_id = 40 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalMeasureBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalMeasureBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalMeasureFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalMeasureFollowUp'))) WHERE cohort_id = targetID and category_id = 41 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoUseBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoUseBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoUseFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoUseFollowUp'))) WHERE cohort_id = targetID and category_id = 42 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.sexgenderIdentityBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.sexgenderIdentityBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.sexgenderIdentityFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.sexgenderIdentityFollowUp'))) WHERE cohort_id = targetID and category_id = 43 ;

        update cancer_info set mdc_cancer_related_conditions_na = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerRelatedConditionsNA')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerRelatedConditionsNA'))),
        					   mdc_acute_treatment_toxicity = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerToxicity')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerToxicity'))),
							   mdc_late_effects_of_treatment = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerLateEffects')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerLateEffects'))),
                               mdc_symptoms_management = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerSymptom')) ='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerSymptom'))),
                               mdc_other_cancer_condition = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerOther')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerOther'))),
                               mdc_other_cancer_condition_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerOtherSpecify')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerOtherSpecify')))
		WHERE cohort_id = targetID;
        update cohort_edit_status set `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionCStatus'))
        
        WHERE 
        cohort_id = targetID and page_code = 'C';
     
    end;

    END IF;
    commit;
    
    SELECT flag AS rowAffacted;
    
    SELECT targetID AS duplicated_cohort_id;
    IF exists (SELECT * FROM cohort WHERE id = targetID and lower(status) in ('new', 'rejected') ) then
		update cohort set status = 'draft', cohort_last_update_date = now(), update_time = NOW() WHERE id = targetID;
		INSERT into cohort_activity_log (cohort_id, user_id, activity, notes ) values (targetID, user_id, 'draft', null);
	else
        update cohort set  cohort_last_update_date = now(), update_time = NOW() WHERE id = targetID;
	END IF;
	SELECT `status` FROM cohort WHERE id = targetID;
	SELECT page_code, status FROM cohort_edit_status WHERE cohort_id = targetID;
    end;
    END IF;

END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: update_specimen_section_data
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `update_specimen_section_data` //

CREATE  PROCEDURE `update_specimen_section_data`(in targetID int, in info JSON)
BEGIN
	DECLARE flag INT DEFAULT 1;
	DECLARE i INT DEFAULT 0;
    DECLARE cohortID INT DEFAULT 0;
	DECLARE user_id INT DEFAULT 1;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
    
    SELECT `status` INTO @cohort_status FROM cohort WHERE id = `targetID`;
	set user_id = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')) in ('null', '') , 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')));

    IF @cohort_status = 'published' THEN call SELECT_unpublished_cohort_id(targetID, cohortID, user_id); 
    ELSE 
     set cohortID = targetID;
    END IF;
    /*
    *  SELECT_unpublished_cohort_id should retunr a cohort_id not in published status
    * IF cohortID not 0 (default value), continue
    */
 
    
  IF cohortID > 0  THEN
		BEGIN
        
  SET @counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$.counts')) ;


  START transaction;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-1"')) WHERE cancer_id = 1 and specimen_id = 1 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-2"')) WHERE cancer_id = 1 and specimen_id = 2 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-3"')) WHERE cancer_id = 1 and specimen_id = 3 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-4"')) WHERE cancer_id = 1 and specimen_id = 4 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-5"')) WHERE cancer_id = 1 and specimen_id = 5 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-6"')) WHERE cancer_id = 1 and specimen_id = 6 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-7"')) WHERE cancer_id = 1 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-1"')) WHERE cancer_id = 2 and specimen_id = 1 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-2"')) WHERE cancer_id = 2 and specimen_id = 2 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-3"')) WHERE cancer_id = 2 and specimen_id = 3 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-4"')) WHERE cancer_id = 2 and specimen_id = 4 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-5"')) WHERE cancer_id = 2 and specimen_id = 5 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-6"')) WHERE cancer_id = 2 and specimen_id = 6 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-7"')) WHERE cancer_id = 2 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-1"')) WHERE cancer_id = 3 and specimen_id = 1 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-2"')) WHERE cancer_id = 3 and specimen_id = 2 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-3"')) WHERE cancer_id = 3 and specimen_id = 3 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-4"')) WHERE cancer_id = 3 and specimen_id = 4 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-5"')) WHERE cancer_id = 3 and specimen_id = 5 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-6"')) WHERE cancer_id = 3 and specimen_id = 6 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-7"')) WHERE cancer_id = 3 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-1"')) WHERE cancer_id = 4 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-2"')) WHERE cancer_id = 4 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-3"')) WHERE cancer_id = 4 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-4"')) WHERE cancer_id = 4 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-5"')) WHERE cancer_id = 4 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-6"')) WHERE cancer_id = 4 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-7"')) WHERE cancer_id = 4 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-1"')) WHERE cancer_id = 5 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-2"')) WHERE cancer_id = 5 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-3"')) WHERE cancer_id = 5 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-4"')) WHERE cancer_id = 5 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-5"')) WHERE cancer_id = 5 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-6"')) WHERE cancer_id = 5 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-7"')) WHERE cancer_id = 5 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-1"')) WHERE cancer_id = 6 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-2"')) WHERE cancer_id = 6 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-3"')) WHERE cancer_id = 6 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-4"')) WHERE cancer_id = 6 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-5"')) WHERE cancer_id = 6 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-6"')) WHERE cancer_id = 6 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-7"')) WHERE cancer_id = 6 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-1"')) WHERE cancer_id = 7 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-2"')) WHERE cancer_id = 7 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-3"')) WHERE cancer_id = 7 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-4"')) WHERE cancer_id = 7 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-5"')) WHERE cancer_id = 7 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-6"')) WHERE cancer_id = 7 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-7"')) WHERE cancer_id = 7 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-1"')) WHERE cancer_id = 8 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-2"')) WHERE cancer_id = 8 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-3"')) WHERE cancer_id = 8 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-4"')) WHERE cancer_id = 8 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-5"')) WHERE cancer_id = 8 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-6"')) WHERE cancer_id = 8 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-7"')) WHERE cancer_id = 8 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-1"')) WHERE cancer_id = 9 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-2"')) WHERE cancer_id = 9 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-3"')) WHERE cancer_id = 9 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-4"')) WHERE cancer_id = 9 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-5"')) WHERE cancer_id = 9 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-6"')) WHERE cancer_id = 9 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-7"')) WHERE cancer_id = 9 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-1"')) WHERE cancer_id = 10 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-2"')) WHERE cancer_id = 10 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-3"')) WHERE cancer_id = 10 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-4"')) WHERE cancer_id = 10 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-5"')) WHERE cancer_id = 10 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-6"')) WHERE cancer_id = 10 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-7"')) WHERE cancer_id = 10 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-1"')) WHERE cancer_id = 11 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-2"')) WHERE cancer_id = 11 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-3"')) WHERE cancer_id = 11 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-4"')) WHERE cancer_id = 11 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-5"')) WHERE cancer_id = 11 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-6"')) WHERE cancer_id = 11 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-7"')) WHERE cancer_id = 11 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-1"')) WHERE cancer_id = 12 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-2"')) WHERE cancer_id = 12 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-3"')) WHERE cancer_id = 12 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-4"')) WHERE cancer_id = 12 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-5"')) WHERE cancer_id = 12 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-6"')) WHERE cancer_id = 12 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-7"')) WHERE cancer_id = 12 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-1"')) WHERE cancer_id = 13 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-2"')) WHERE cancer_id = 13 and specimen_id = 2 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-3"')) WHERE cancer_id = 13 and specimen_id = 3 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-4"')) WHERE cancer_id = 13 and specimen_id = 4 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-5"')) WHERE cancer_id = 13 and specimen_id = 5 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-6"')) WHERE cancer_id = 13 and specimen_id = 6 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-7"')) WHERE cancer_id = 13 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-1"')) WHERE cancer_id = 14 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-2"')) WHERE cancer_id = 14 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-3"')) WHERE cancer_id = 14 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-4"')) WHERE cancer_id = 14 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-5"')) WHERE cancer_id = 14 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-6"')) WHERE cancer_id = 14 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-7"')) WHERE cancer_id = 14 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-1"')) WHERE cancer_id = 15 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-2"')) WHERE cancer_id = 15 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-3"')) WHERE cancer_id = 15 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-4"')) WHERE cancer_id = 15 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-5"')) WHERE cancer_id = 15 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-6"')) WHERE cancer_id = 15 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-7"')) WHERE cancer_id = 15 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-1"')) WHERE cancer_id = 16 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-2"')) WHERE cancer_id = 16 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-3"')) WHERE cancer_id = 16 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-4"')) WHERE cancer_id = 16 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-5"')) WHERE cancer_id = 16 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-6"')) WHERE cancer_id = 16 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-7"')) WHERE cancer_id = 16 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-1"')) WHERE cancer_id = 17 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-2"')) WHERE cancer_id = 17 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-3"')) WHERE cancer_id = 17 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-4"')) WHERE cancer_id = 17 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-5"')) WHERE cancer_id = 17 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-6"')) WHERE cancer_id = 17 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-7"')) WHERE cancer_id = 17 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-1"')) WHERE cancer_id = 18 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-2"')) WHERE cancer_id = 18 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-3"')) WHERE cancer_id = 18 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-4"')) WHERE cancer_id = 18 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-5"')) WHERE cancer_id = 18 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-6"')) WHERE cancer_id = 18 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-7"')) WHERE cancer_id = 18 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-1"')) WHERE cancer_id = 19 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-2"')) WHERE cancer_id = 19 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-3"')) WHERE cancer_id = 19 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-4"')) WHERE cancer_id = 19 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-5"')) WHERE cancer_id = 19 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-6"')) WHERE cancer_id = 19 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-7"')) WHERE cancer_id = 19 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-1"')) WHERE cancer_id = 20 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-2"')) WHERE cancer_id = 20 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-3"')) WHERE cancer_id = 20 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-4"')) WHERE cancer_id = 20 and specimen_id = 4 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-5"')) WHERE cancer_id = 20 and specimen_id = 5 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-6"')) WHERE cancer_id = 20 and specimen_id = 6 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-7"')) WHERE cancer_id = 20 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-1"')) WHERE cancer_id = 21 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-2"')) WHERE cancer_id = 21 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-3"')) WHERE cancer_id = 21 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-4"')) WHERE cancer_id = 21 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-5"')) WHERE cancer_id = 21 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-6"')) WHERE cancer_id = 21 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-7"')) WHERE cancer_id = 21 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-1"')) WHERE cancer_id = 22 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-2"')) WHERE cancer_id = 22 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-3"')) WHERE cancer_id = 22 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-4"')) WHERE cancer_id = 22 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-5"')) WHERE cancer_id = 22 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-6"')) WHERE cancer_id = 22 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-7"')) WHERE cancer_id = 22 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-1"')) WHERE cancer_id = 23 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-2"')) WHERE cancer_id = 23 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-3"')) WHERE cancer_id = 23 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-4"')) WHERE cancer_id = 23 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-5"')) WHERE cancer_id = 23 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-6"')) WHERE cancer_id = 23 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-7"')) WHERE cancer_id = 23 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-1"')) WHERE cancer_id = 24 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-2"')) WHERE cancer_id = 24 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-3"')) WHERE cancer_id = 24 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-4"')) WHERE cancer_id = 24 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-5"')) WHERE cancer_id = 24 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-6"')) WHERE cancer_id = 24 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-7"')) WHERE cancer_id = 24 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-1"')) WHERE cancer_id = 25 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-2"')) WHERE cancer_id = 25 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-3"')) WHERE cancer_id = 25 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-4"')) WHERE cancer_id = 25 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-5"')) WHERE cancer_id = 25 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-6"')) WHERE cancer_id = 25 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-7"')) WHERE cancer_id = 25 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-1"')) WHERE cancer_id = 26 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-2"')) WHERE cancer_id = 26 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-3"')) WHERE cancer_id = 26 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-4"')) WHERE cancer_id = 26 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-5"')) WHERE cancer_id = 26 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-6"')) WHERE cancer_id = 26 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-7"')) WHERE cancer_id = 26 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-1"')) WHERE cancer_id = 27 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-2"')) WHERE cancer_id = 27 and specimen_id = 2 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-3"')) WHERE cancer_id = 27 and specimen_id = 3 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-4"')) WHERE cancer_id = 27 and specimen_id = 4 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-5"')) WHERE cancer_id = 27 and specimen_id = 5 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-6"')) WHERE cancer_id = 27 and specimen_id = 6 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-7"')) WHERE cancer_id = 27 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-1"')) WHERE cancer_id = 28 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-2"')) WHERE cancer_id = 28 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-3"')) WHERE cancer_id = 28 and specimen_id = 3 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-4"')) WHERE cancer_id = 28 and specimen_id = 4 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-5"')) WHERE cancer_id = 28 and specimen_id = 5 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-6"')) WHERE cancer_id = 28 and specimen_id = 6 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-7"')) WHERE cancer_id = 28 and specimen_id = 7 and cohort_id = `cohortID`;
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-1"')) WHERE cancer_id = 29 and specimen_id = 1 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-2"')) WHERE cancer_id = 29 and specimen_id = 2 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-3"')) WHERE cancer_id = 29 and specimen_id = 3 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-4"')) WHERE cancer_id = 29 and specimen_id = 4 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-5"')) WHERE cancer_id = 29 and specimen_id = 5 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-6"')) WHERE cancer_id = 29 and specimen_id = 6 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-7"')) WHERE cancer_id = 29 and specimen_id = 7 and cohort_id = `cohortID`;
  
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaseline')) in ( 'null', ''), null , JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaseline')) ) WHERE specimen_id = 11 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineSerum'))in ( 'null', ''),null,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineSerum'))) WHERE specimen_id = 12 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselinePlasma'))in ( 'null', ''), null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselinePlasma'))) WHERE specimen_id = 13 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineBuffyCoat'))in ( 'null', ''), null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineBuffyCoat'))) WHERE specimen_id = 14 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineOtherDerivative'))in ( 'null', ''), null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineOtherDerivative'))) WHERE specimen_id = 15 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTime'))= 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTime'))) WHERE specimen_id = 16 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeSerum')) in ( 'null', ''), null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeSerum'))) WHERE specimen_id = 17 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimePlasma')) in ( 'null', ''), null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimePlasma'))) WHERE specimen_id = 18 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeBuffyCoat')) in ( 'null', ''), null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeBuffyCoat'))) WHERE specimen_id = 19 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeOtherDerivative'))in ( 'null', ''), null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeOtherDerivative')))  WHERE specimen_id = 20 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBuccalSalivaBaseline')) = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBuccalSalivaBaseline')))WHERE specimen_id = 21 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBuccalSalivaOtherTime')) = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBuccalSalivaOtherTime'))) WHERE specimen_id = 22 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTissueBaseline')) = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTissueBaseline'))) WHERE specimen_id = 23 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTissueOtherTime')) = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTissueOtherTime'))) WHERE specimen_id = 24 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioUrineBaseline'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioUrineBaseline'))) WHERE specimen_id = 25 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioUrineOtherTime'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioUrineOtherTime'))) WHERE specimen_id = 26 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioFecesBaseline'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioFecesBaseline'))) WHERE specimen_id = 27 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioFecesOtherTime'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioFecesOtherTime'))) WHERE specimen_id = 28 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherBaseline'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherBaseline'))) WHERE specimen_id = 29 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherOtherTime'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherOtherTime'))) WHERE specimen_id = 30 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioRepeatedSampleSameIndividual'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioRepeatedSampleSameIndividual'))) WHERE specimen_id = 31 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTumorBlockInfo'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTumorBlockInfo'))) WHERE specimen_id = 32 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioGenotypingData'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioGenotypingData'))) WHERE specimen_id = 33 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioSequencingDataExome'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioSequencingDataExome'))) WHERE specimen_id = 34 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioSequencingDataWholeGenome'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioSequencingDataWholeGenome'))) WHERE specimen_id = 35 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioEpigeneticOrMetabolicMarkers'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioEpigeneticOrMetabolicMarkers'))) WHERE specimen_id = 36 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherOmicsData'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherOmicsData'))) WHERE specimen_id = 37 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTranscriptomicsData'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTranscriptomicsData'))) WHERE specimen_id = 38 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMicrobiomeData'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMicrobiomeData'))) WHERE specimen_id = 39 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetabolomicData'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetabolomicData'))) WHERE specimen_id = 40 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaFastingSample'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaFastingSample'))) WHERE specimen_id = 41 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInCancerStudy'))  in ( 'null', ''), null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInCancerStudy'))) WHERE specimen_id = 42 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInCvdStudy'))  in ( 'null', ''), null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInCvdStudy'))) WHERE specimen_id = 43 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInDiabetesStudy'))  in ( 'null', ''), null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInDiabetesStudy'))) WHERE specimen_id = 44 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInOtherStudy'))  in ( 'null', ''), null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInOtherStudy'))) WHERE specimen_id = 45 and cohort_id = `cohortID`;
	update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMemberOfMetabolomicsStudies'))  = 'null', null ,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMemberOfMetabolomicsStudies'))) WHERE specimen_id = 46 and cohort_id = `cohortID`;
	
 
  
  update specimen set 
  bio_other_baseline_specify = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherBaselineSpecify')) ='null' 
     OR JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherBaselineSpecify')) ='' , null, JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherBaselineSpecify'))),
  bio_other_other_time_specify = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherOtherTimeSpecify'))='null' 
     OR JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherOtherTimeSpecify'))='',  null, JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherOtherTimeSpecify'))),
  bio_meta_outcomes_other_study_specify = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesOtherStudySpecify')) ='null' 
    OR JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesOtherStudySpecify'))='',null, JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesOtherStudySpecify'))),
  bio_member_in_study = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMemberInStudy')) ='null' 
    OR JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMemberInStudy'))='',null, JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMemberInStudy'))),
  bio_labs_used_for_analysis = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioLabsUsedForAnalysis'))='null' 
    OR JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioLabsUsedForAnalysis')) ='' ,null, JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioLabsUsedForAnalysis'))),
  bio_analytical_platform = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioAnalyticalPlatform')) = 'null'
    OR JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioAnalyticalPlatform'))='', null, JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioAnalyticalPlatform'))),
  bio_separation_platform = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioSeparationPlatform')) = 'null'
    OR JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioSeparationPlatform')) = '', null, JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioSeparationPlatform'))),
  bio_number_metabolites_measured = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioNumberMetabolitesMeasured')) = 'null' 
    OR JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioNumberMetabolitesMeasured'))='', null, JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioNumberMetabolitesMeasured'))),
  bio_year_samples_sent = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioYearSamplesSent'))='null' 
    OR JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioYearSamplesSent')) ='' , null, JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioYearSamplesSent')))
  WHERE cohort_id = `cohortID`;

  update cohort_edit_status set `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionGStatus')) WHERE 
        cohort_id = `cohortID` and page_code = 'G';
	
  commit;
  	SELECT flag AS rowsAffacted;
  	SELECT cohortID AS duplicated_cohort_id;
  	IF exists (SELECT * FROM cohort WHERE id = cohortID and lower(status) in ('new', 'rejected')) then
		update cohort set status = 'draft', cohort_last_update_date = now(), update_time = NOW() WHERE id = cohortID;
		INSERT into cohort_activity_log (cohort_id, user_id, activity, notes ) values (cohortID, user_id, 'draft', null);
	else
        update cohort set  cohort_last_update_date = now(), update_time = NOW() WHERE id = cohortID;
  	END IF;
  	SELECT `status` FROM cohort WHERE id = cohortID;

 	SELECT page_code, status FROM cohort_edit_status WHERE cohort_id = cohortID;
   END ;
  END IF ;
  
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_questionnaire_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_questionnaire_specimen_info` //

CREATE PROCEDURE `SELECT_questionnaire_specimen_info`(in cohort_id integer)
BEGIN
    set @cohort_id = cohort_id;
    
   	SELECT c.cancer, ls.specimen,
	concat(cast(c.id AS char), '-', cast(s.specimen_id AS char)) AS cellId,
	s.specimens_counts AS counts
	FROM specimen_count s
	JOIN lu_cancer c ON s.cancer_id = c.id
	JOIN lu_specimen ls ON s.specimen_id = ls.id
	WHERE s.cohort_id = @cohort_id ORDER BY cancer_id, specimen_id;
    
    SELECT cohort_id, specimen_id, sub_category, collected_yn 
	FROM specimen_collected_type a 
	JOIN lu_specimen b ON a.specimen_id = b.id 
	WHERE a.cohort_id = @cohort_id;
    
    SELECT a.* FROM specimen a WHERE a.cohort_id = @cohort_id;
   
   	SELECT u.email FROM cohort c 
  	JOIN cohort_user_mapping um ON c.acronym = um.cohort_acronym 
   	JOIN user u ON um.user_id = u.id 
   	WHERE c.id = @cohort_id;

END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_unpublished_cohort_id
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_unpublished_cohort_id` //

CREATE PROCEDURE `SELECT_unpublished_cohort_id`(in targetID int, out new_id int, in user_id int)
BEGIN
	  set new_id = targetID; -- assume it is draft
    IF exists (SELECT * FROM cohort WHERE status = 'published' and id = targetID) THEN -- IF it is published
        IF exists (SELECT * FROM cohort a join cohort b on a.acronym = b.acronym and a.status <> b.status and b.id = targetID and a.status != 'archived') THEN -- find its copy
            SELECT a.id into new_id FROM cohort a join cohort b on a.acronym = b.acronym and a.status <> b.status and b.id = targetID;
        ELSE -- IF copy not exists, create a new one
		   SELECT value into @latest_ver FROM lu_config WHERE type = 'questionnaire ver' and active = 1 order by id desc LIMIT 1;
        	IF (@latest_ver IS NULL or @latest_ver = '') THEN set @latest_ver='1.0'; END IF;
           INSERT cohort (name, acronym, type, status, publish_by, document_ver,create_by, create_time, update_time, cohort_last_update_date, publish_time) 
           SELECT name, acronym, type, 'draft', null,@latest_ver,user_id, now(), now(),now(),  publish_time FROM cohort
           WHERE id = targetID;
           set new_id = last_insert_id();
           call insert_new_cohort_from_published(new_id, targetID);

		   INSERT into cohort_activity_log (cohort_id, user_id, activity, notes ) values (new_id, user_id, 'draft', null);
 
        END IF;
    END IF;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: insert_new_cohort_from_published
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `insert_new_cohort_from_published` //

CREATE  PROCEDURE `insert_new_cohort_from_published`(in new_cohort_id int, in old_cohort_id int)
BEGIN
 DECLARE flag INT DEFAULT 1;
 
 DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;

set sql_mode='';
SET SQL_SAFE_UPDATES = 0;

  START transaction;
-- INSERT into Cohort table
/* assune cohort table was updated, and new cohort_id is passed in
* INSERT into cohort (id, name, acronym, status, create_by, create_time, update_time)
* SELECT new_cohort_id, cohort_name, cohort_acronym, 'draft', 3, now(), now() FROM cohort_basic WHERE cohort_id =old_cohort_id;
*/

-- INSERT into cohort_basic 
drop table IF exists cohort_temp;

CREATE TABLE cohort_temp AS SELECT * FROM
    cohort_basic
WHERE
    cohort_id = old_cohort_id;

UPDATE cohort_temp 
SET 
    cohort_id = new_cohort_id;
alter table cohort_temp drop column id;

INSERT into cohort_basic SELECT null, a.* FROM cohort_temp a; 

-- INSERT into person, attachment
-- first person who are not PIs
drop table IF exists temp_person;
set sql_mode='';
create table temp_person SELECT * FROM person WHERE 1=2;

INSERT into temp_person (cohort_id, category_id, name, position, institution, phone, email, create_time, update_time)
SELECT new_cohort_id, category_id, name, position, institution, phone, email, now(), now() 
FROM person  WHERE cohort_id = old_cohort_id and name is not null and name != '';

INSERT into person (cohort_id, category_id, name, position, institution, phone, email, create_time, update_time)
SELECT new_cohort_id, category_id, name, position, institution, phone, email, now(), now() 
FROM temp_person WHERE cohort_id = new_cohort_id and name is not null and name != '';

INSERT into mapping_old_PI_Id_To_New 
SELECT new_cohort_id, old.id, new.id 
FROM person new 
join (SELECT * FROM person WHERE cohort_id = old_cohort_id and category_id = 3 and name is not null and name != '') AS old
on new.name = old.name  and new.category_id and old.category_id WHERE new.cohort_id = new_cohort_id and new.category_id = 3;

INSERT into cohort_document (cohort_id, attachment_type, category, filename, website, status, create_time, update_time)
SELECT new_cohort_id, old.attachment_type, old.category, old.filename, old.website, old.status, now() AS old_create_time, now() AS old_update_time 
FROM cohort_document AS old WHERE old.cohort_id = old_cohort_id;

INSERT into mapping_old_file_Id_To_New (cohort_id, old_file_id, new_file_id)
SELECT new_cohort_id, old.id, new.id
FROM cohort_document AS new join (SELECT * FROM cohort_document WHERE cohort_id = old_cohort_id and attachment_type = 1) AS old
on new.filename = old.filename and new.category WHERE new.attachment_type = 1 and new.cohort_id = new_cohort_id;

-- INSERT into enrollment_count
INSERT into enrollment_count (cohort_id, race_id, ethnicity_id, gender_id, enrollment_counts, create_time, update_time)
SELECT new_cohort_id, old.race_id, old.ethnicity_id, old.gender_id, old.enrollment_counts, now() AS col1, now() AS col2
FROM enrollment_count AS old WHERE old.cohort_id =old_cohort_id;

-- ---- INSERT into dlh --
drop table IF exists cohort_temp;

CREATE TABLE cohort_temp AS SELECT * FROM
    dlh
WHERE
    cohort_id = old_cohort_id;

UPDATE cohort_temp 
SET 
    cohort_id = new_cohort_id;
alter table cohort_temp drop column id;

INSERT into dlh SELECT null, a.* FROM cohort_temp a; 

-- INSERT into cancer_count
INSERT into cancer_count (cohort_id,cancer_id,gender_id,ethnicity_id, race_id, case_type_id,cancer_counts, create_time, update_time)
SELECT new_cohort_id, old.cancer_id,old.gender_id,old.ethnicity_id, old.race_id, old.case_type_id,old.cancer_counts, now() AS col1, now() AS col2
FROM cancer_count AS old WHERE old.cohort_id =old_cohort_id;

drop table IF exists cohort_temp;

CREATE TABLE cohort_temp AS SELECT * FROM
    cancer_info
WHERE
    cohort_id = old_cohort_id;

UPDATE cohort_temp 
SET 
    cohort_id = new_cohort_id;
alter table cohort_temp drop column id;

INSERT into cancer_info SELECT null, a.* FROM cohort_temp a; 

-- INSERT into major_count
INSERT into major_content (cohort_id,category_id,baseline, followup, other_specify_baseline,other_specify_followup, create_time, update_time)
SELECT new_cohort_id, lu.id AS category_id,baseline, followup, other_specify_baseline,other_specify_followup, 
( CASE  WHEN mdc.create_time is null THEN now() ELSE mdc.create_time end) AS create_time, 
( CASE  WHEN mdc.update_time is null THEN now() ELSE mdc.update_time end) AS update_time
FROM major_content AS mdc right join  
(SELECT * FROM lu_data_category WHERE category <> 'Cancer Treatment') AS lu 
on mdc.cohort_id = old_cohort_id and mdc.category_id = lu.id ;


-- inert into mortality

drop table IF exists cohort_temp;

CREATE TABLE cohort_temp AS SELECT * FROM
    mortality
WHERE
    cohort_id = old_cohort_id;

UPDATE cohort_temp 
SET 
    cohort_id = new_cohort_id;
alter table cohort_temp drop column id;

INSERT into mortality SELECT null, a.* FROM cohort_temp a; 

-- INSERT into specimen_count
INSERT into specimen_count (cohort_id,cancer_id,specimen_id, specimens_counts, create_time, update_time)
SELECT new_cohort_id, old.cancer_id,old.specimen_id, old.specimens_counts, now() AS col1, now() AS col2
FROM specimen_count AS old WHERE old.cohort_id =old_cohort_id;

INSERT into specimen_collected_type
SELECT null, new_cohort_id, c.id AS specimen_id, b.collected_yn,
( CASE  WHEN b.create_time is null THEN now() ELSE b.create_time  END ) AS create_time,
( CASE  WHEN b.update_time is null THEN now() ELSE b.create_time  END ) AS update_time
FROM specimen_collected_type b right join (SELECT * FROM lu_specimen WHERE id > 10) c
on b.specimen_id = c.id and b.cohort_id = old_cohort_id;

-- inert into specimen

drop table IF exists cohort_temp;

CREATE TABLE cohort_temp AS SELECT * FROM
    specimen
WHERE
    cohort_id = old_cohort_id;

UPDATE cohort_temp 
SET 
    cohort_id = new_cohort_id;
alter table cohort_temp drop column id;

INSERT into specimen SELECT null, a.* FROM cohort_temp a; 

-- INSERT into technology
INSERT into technology (cohort_id,tech_use_of_mobile, tech_use_of_mobile_describe, tech_use_of_cloud, tech_use_of_cloud_describe, create_time, update_time)
SELECT new_cohort_id, old.tech_use_of_mobile, old.tech_use_of_mobile_describe, old.tech_use_of_cloud, old.tech_use_of_cloud_describe, now() AS col1, now() AS col2
FROM technology AS old WHERE old.cohort_id =old_cohort_id;


-- INSERT update supporting tables ,for published cohort, 

SELECT document_ver INTO @cohort_ver FROM cohort WHERE id = old_cohort_id;

SELECT value into @latest_ver FROM lu_config WHERE type = 'questionnaire ver' and active = 1 order by id desc LIMIT 1;
 
IF (@latest_ver IS NULL or @latest_ver = '') THEN set @latest_ver='1.0'; END IF;
set @new_status = 'complete' ;
 INSERT into cohort_edit_status (cohort_id, page_code, status)
    values ( new_cohort_id, 'A', @new_status),
    ( new_cohort_id, 'B', @new_status ),
    ( new_cohort_id, 'C', @new_status ),
    ( new_cohort_id, 'D', @new_status ),
    ( new_cohort_id, 'E', @new_status ),
    ( new_cohort_id, 'F', @new_status ),
    ( new_cohort_id, 'G', @new_status );

IF @cohort_ver != @latest_ver THEN 
   UPDATE cohort_edit_status src set src.status ='incomplete' 
   where src.id > 1 and src.cohort_id = new_cohort_id and src.page_code in (select section_code_updated from lu_questionnaire_version where base_ver = @cohort_ver) ;
END IF;
/* update log table 
INSERT into cohort_activity_log (cohort_id, user_id, activity, notes, create_time)
values ( new_cohort_id,  3, 'init new cohort FROM published cohort new_cohort_id', null, now());
*/

SET SQL_SAFE_UPDATES = 1;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_mortality
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_mortality` //

CREATE PROCEDURE `SELECT_mortality`(in targetID int) 
BEGIN
	SELECT 
		cohort_id
		,mort_year_mortality_followup
		,mort_death_confirmed_by_ndi_linkage
		,mort_death_confirmed_by_death_certificate
		,mort_death_confirmed_by_other
		,mort_death_confirmed_by_other_specify
		,mort_have_date_of_death
		,mort_have_cause_of_death
		,mort_death_code_used_icd9
		,mort_death_code_used_icd10
		,mort_death_not_coded
		,mort_death_code_used_other
		,mort_death_code_used_other_specify
		,mort_number_of_deaths
		,create_time
		,update_time
	FROM mortality WHERE cohort_id = targetID;
end//

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: update_mortality
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `update_mortality` //

CREATE  PROCEDURE `update_mortality`(in Old_targetID int, in info JSON)
BEGIN
	DECLARE flag INT DEFAULT 1;
	DECLARE targetID INT DEFAULT 0;
	DECLARE user_id INT DEFAULT 1;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
    
	SELECT `status` INTO @cohort_status FROM cohort WHERE id = Old_targetID;
	set user_id = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')) in ('null', '') , 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')));
    IF @cohort_status = 'published' THEN call SELECT_unpublished_cohort_id(Old_targetID, targetID, user_id);
	ELSE set targetID = Old_targetID;
    END IF;
    IF targetID > 0 then
    BEGIN
    start transaction;
	IF exists (SELECT * FROM mortality WHERE cohort_id = `targetID`) THEN 
		update mortality set mort_year_mortality_followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.mortalityYear')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.mortalityYear')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.mortalityYear'))) WHERE cohort_id = `targetID`;
		update mortality set mort_death_confirmed_by_ndi_linkage = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathIndex')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathIndex')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathIndex'))) WHERE cohort_id = `targetID`;
		update mortality set mort_death_confirmed_by_death_certificate = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathCertificate')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathCertificate')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathCertificate'))) WHERE cohort_id = `targetID`;
		update mortality set mort_death_confirmed_by_other = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherDeath')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherDeath')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherDeath'))) WHERE cohort_id = `targetID`;
		update mortality set mort_death_confirmed_by_other_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherDeathSpecify')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherDeathSpecify')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherDeathSpecify'))) WHERE cohort_id = `targetID`;
		update mortality set mort_have_date_of_death = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeathDate')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeathDate')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeathDate'))) WHERE cohort_id = `targetID`;
		update mortality set mort_have_cause_of_death = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeathCause')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeathCause')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeathCause'))) WHERE cohort_id = `targetID`;
		update mortality set mort_death_code_used_icd9 = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.icd9')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.icd9')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.icd9'))) WHERE cohort_id = `targetID`;
		update mortality set mort_death_code_used_icd10 = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.icd10')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.icd10')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.icd10'))) WHERE cohort_id = `targetID`;
		update mortality set mort_death_not_coded = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.notCoded')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.notCoded')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.notCoded'))) WHERE cohort_id = `targetID`;
		update mortality set mort_death_code_used_other = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherCode')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherCode')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherCode'))) WHERE cohort_id = `targetID`;
		update mortality set mort_death_code_used_other_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherCodeSpecify')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherCodeSpecify')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherCodeSpecify'))) WHERE cohort_id = `targetID`;
		update mortality set mort_number_of_deaths = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathNumbers')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathNumbers')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathNumbers'))) WHERE cohort_id = `targetID`;
		update mortality set update_time = NOW() WHERE cohort_id = `targetID`;
		update cohort_edit_status set `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionEStatus')) WHERE cohort_id = `targetID` and page_code = 'E';
	END IF;
    commit;
	SELECT flag AS rowAffacted;
    
	SELECT targetID AS duplicated_cohort_id;
    IF exists (SELECT * FROM cohort WHERE id = targetID and lower(status) in ('new', 'rejected') ) then
		update cohort set status = 'draft', cohort_last_update_date = now(), update_time = NOW() WHERE id = targetID;
		INSERT into cohort_activity_log (cohort_id, user_id, activity, notes ) values (targetID, user_id, 'draft', null);
	else
        update cohort set  cohort_last_update_date = now(), update_time = NOW() WHERE id = targetID;
	END IF;
	SELECT `status` FROM cohort WHERE id = targetID;
	SELECT page_code, status FROM cohort_edit_status WHERE cohort_id = targetID;
    end;
    END IF;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_dlh
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_dlh` //

CREATE PROCEDURE `SELECT_dlh` (in targetID int) 
BEGIN
	SELECT
		cohort_id
		,dlh_linked_to_existing_databases
		,dlh_linked_to_existing_databases_specify
		,dlh_harmonization_projects
		,dlh_harmonization_projects_specify
		,dlh_nih_repository
		,dlh_nih_dbgap
		,dlh_nih_biolincc
		,dlh_nih_other
		,dlh_procedure_online
		-- ,dlh_procedure_website
		-- ,dlh_procedure_url
		-- ,dlh_procedure_attached
		,dlh_procedure_enclave
		,dlh_enclave_location
		,create_time
		,update_time
	FROM dlh WHERE cohort_id = targetID;
	SELECT status FROM cohort_edit_status WHERE cohort_id = targetID and page_code='F';
    SELECT id AS fileId, category AS fileCategory, coalesce(filename, '') AS filename, status FROM cohort_document
    WHERE cohort_id = targetID and category = 5 and attachment_type = 1;
    SELECT website FROM cohort_document WHERE cohort_id = targetID and attachment_type = 0 and category = 5;

end//

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: update_dlh
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `update_dlh` //

CREATE PROCEDURE `update_dlh`(in Old_targetID int, in info JSON)
BEGIN
	DECLARE targetID INT DEFAULT Old_targetID;
	DECLARE user_id INT DEFAULT 1;
    DECLARE flag INT DEFAULT 1;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
    
	SELECT `status` INTO @cohort_status FROM cohort WHERE id = Old_targetID;
	set user_id = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')) in ('null', '') , 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$.userID')));
    IF @cohort_status = 'published' THEN call SELECT_unpublished_cohort_id(Old_targetID, targetID, user_id );
	ELSE set targetID = Old_targetID;
    END IF;
    IF targetID > 0 then
    BEGIN
    start transaction;
    set @dataFileName = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataFileName')) in ('null', ''), '', JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataFileName')));
    set @dataUrl = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL')) in ('null', ''), '', JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL')));
    set @dataOnline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnline')) in ('null',''), null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnline'))); 
	IF exists (SELECT * FROM dlh WHERE cohort_id = `targetID`) THEN 
		update dlh set dlh_linked_to_existing_databases = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLink')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLink')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLink'))) WHERE cohort_id = `targetID`;
		update dlh set dlh_linked_to_existing_databases_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLinkSpecify')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLinkSpecify')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLinkSpecify'))) WHERE cohort_id = `targetID`;
		update dlh set dlh_harmonization_projects = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonization')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonization')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonization'))) WHERE cohort_id = `targetID`;
		update dlh set dlh_harmonization_projects_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonizationSpecify')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonizationSpecify')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonizationSpecify'))) WHERE cohort_id = `targetID`;
		update dlh set dlh_nih_repository = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeposited')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeposited')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeposited'))) WHERE cohort_id = `targetID`;
		update dlh set dlh_nih_dbgap = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dbGaP')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dbGaP')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.dbGaP'))) WHERE cohort_id = `targetID`;
		update dlh set dlh_nih_biolincc = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.BioLINCC')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.BioLINCC')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.BioLINCC'))) WHERE cohort_id = `targetID`;
		update dlh set dlh_nih_other = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherRepo')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherRepo')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherRepo'))) WHERE cohort_id = `targetID`;
		update dlh set dlh_procedure_online = @dataOnline WHERE cohort_id = `targetID`;
		-- update dlh set dlh_procedure_website = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineWebsite')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineWebsite')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineWebsite'))) WHERE cohort_id = `targetID`;
		-- update dlh set dlh_procedure_url = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL'))) WHERE cohort_id = `targetID`;
		-- update dlh set dlh_procedure_attached = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlinePolicy')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlinePolicy')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlinePolicy'))) WHERE cohort_id = `targetID`;
		update dlh set dlh_procedure_enclave = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepo')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepo')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepo'))) WHERE cohort_id = `targetID`;
		update dlh set dlh_enclave_location = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepoSpecify')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepoSpecify')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepoSpecify'))) WHERE cohort_id = `targetID`;
		update dlh set update_time = NOW() WHERE cohort_id = `targetID`;
		update cohort_edit_status set `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionFStatus')) WHERE cohort_id = `targetID` and page_code = 'F';
		
	else
		INSERT into dlh (
			cohort_id
			,dlh_linked_to_existing_databases
			,dlh_linked_to_existing_databases_specify
			,dlh_harmonization_projects
			,dlh_harmonization_projects_specify
			,dlh_nih_repository
			,dlh_nih_dbgap
			,dlh_nih_biolincc
			,dlh_nih_other
			,dlh_procedure_online
			,dlh_procedure_website
			,dlh_procedure_url
			,dlh_procedure_attached
			,dlh_procedure_enclave
			,dlh_enclave_location
			,create_time
			,update_time
		) values(
			targetID
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLink')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLink')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLink')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLinkSpecify')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLinkSpecify')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLinkSpecify')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonization')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonization')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonization')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonizationSpecify')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonizationSpecify')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonizationSpecify')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeposited')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeposited')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeposited')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dbGaP')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dbGaP')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.dbGaP')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.BioLINCC')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.BioLINCC')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.BioLINCC')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherRepo')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherRepo')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherRepo')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnline')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnline')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnline')))
			-- ,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineWebsite')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineWebsite')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineWebsite')))
			-- ,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL')))
			-- ,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlinePolicy')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlinePolicy')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlinePolicy')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepo')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepo')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepo')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepoSpecify')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepoSpecify')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepoSpecify')))
			,NOW()
			,NOW()
		);
		INSERT into cohort_edit_status (cohort_id, page_code, `status`)
		values (targetID, 'F', JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionFStatus')));
	END IF;
    
	IF exists (SELECT * FROM cohort_document WHERE cohort_id = targetID and attachment_type = 1 and category = 5) THEN 
		delete FROM cohort_document WHERE cohort_id = targetID and attachment_type = 1 and category = 5;
	END IF;
    IF @dataFileName <> '' then
		INSERT into cohort_document (cohort_id, attachment_type, category, filename, website, status, create_time, update_time)
		values (targetID, 1, 5, @dataFileName, null, 1, Now(), Now());
	END IF;
    
    IF exists (SELECT * FROM cohort_document WHERE cohort_id = targetID and attachment_type = 0 and category = 5) THEN 
		delete FROM cohort_document WHERE cohort_id = targetID and attachment_type = 0 and category = 5;
	END IF;
    IF @dataUrl <> '' then
		INSERT into cohort_document (cohort_id, attachment_type, category, filename, website, status, create_time, update_time)
		values (targetID, 0, 5, null, @dataUrl, 1, Now(), Now());
	END IF;
    commit;
    
	SELECT flag AS rowAffacted;
    SELECT targetID AS duplicated_cohort_id;
    IF exists (SELECT * FROM cohort WHERE id = targetID and lower(status) in ( 'new', 'rejected') ) then
		update cohort set status = 'draft', cohort_last_update_date = now(), update_time = NOW() WHERE id = targetID;
		INSERT into cohort_activity_log (cohort_id, user_id, activity, notes ) values (targetID, user_id, 'draft', null);
	else
        update cohort set  cohort_last_update_date = now(), update_time = NOW() WHERE id = targetID;
		
	END IF;
	SELECT `status` FROM cohort WHERE id = targetID;

	SELECT page_code, status FROM cohort_edit_status WHERE cohort_id = targetID;
    
    end;
    END IF;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: reset_cohort_status
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS reset_cohort_status //

CREATE  PROCEDURE `reset_cohort_status`(in targetID int, in cohort_status varchar(30), in userID int)
BEGIN
	DECLARE rowAffacted int default 0;
    DECLARE flag INT DEFAULT 1;
 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
	
    START TRANSACTION;
	 BEGIN
          if( lower(cohort_status) = "published") THEN 
		   update cohort set `status` = cohort_status, publish_by = IFNULL(userID,10), 
           cohort_last_update_date = now(), update_time = now()
           WHERE id = targetID;
        elseif(lower(cohort_status) = "submitted" ) THEN 
           update cohort set `status` = cohort_status , cohort_last_update_date = now(), 
           update_time = now(), submit_by = IFNULL(userID,1) WHERE id = targetID;
        ELSE  
           update cohort set `status` = cohort_status , cohort_last_update_date = now(), 
           update_time = now() WHERE id = targetID;
        END IF;
        INSERT into cohort_activity_log (cohort_id, user_id, activity, notes ) 
        values (targetID, IFNULL(userID,1),  cohort_status, null);
	end;
    commit;
    SELECT flag AS rowAffacted;
 END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: reject_cohort_status
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS reject_cohort_status //

CREATE PROCEDURE `reject_cohort_status`(in targetID int, in userID int, in notes varchar(2000))
BEGIN
	DECLARE rowAffacted int default 0;
    DECLARE flag INT DEFAULT 1;
 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
    
    select status, document_ver into @cohort_status, @cohort_ver from cohort where id = targetID LIMIT 1;
    
    IF (@cohort_status = 'in review' ) THEN 
		START TRANSACTION;
		BEGIN
			 SELECT value into @latest_ver FROM lu_config WHERE type = 'questionnaire ver' and active = 1 order by id desc LIMIT 1;
             IF (@latest_ver IS NULL or @latest_ver = '') THEN set @latest_ver='1.0'; END IF;
			 IF( @latest_ver != @cohort_ver) THEN 
                UPDATE cohort set `status` = 'rejected' , document_ver = @latest_ver, cohort_last_update_date = now(), update_time = now() WHERE id = targetID;
                UPDATE cohort_edit_status src set src.status ='incomplete' 
                where src.id > 1 and src.cohort_id = targetID 
                and src.page_code in (select section_code_updated from lu_questionnaire_version where base_ver = @cohort_ver) ;
			  ELSE 
                UPDATE cohort set `status` = 'rejected' , cohort_last_update_date = now(), update_time = now() WHERE id = targetID;
			  END IF;
			
			INSERT INTO cohort_activity_log (cohort_id, user_id, activity, notes ) 
			values (targetID, IFNULL(userID,1),  'rejected', notes);
		END;
		commit;
		SELECT flag AS rowAffacted;
    END IF;
 END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: insert_new_cohort
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `insert_new_cohort` //

CREATE PROCEDURE `insert_new_cohort`(in info JSON)
BEGIN
	DECLARE i INT DEFAULT 0;
    DECLARE new_id INT DEFAULT 0;
    DECLARE popSuccess INT DEFAULT 1;
    DECLARE flag INT DEFAULT 1;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0;
      ROLLBACK;
      SELECT flag AS success;
	END;

    START TRANSACTION;
		BEGIN
			set @cohortName = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohortName'));
			set @cohortAcronym = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohortAcronym'));
			set @cohortType = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohortType'));
            set @createBy = JSON_UNQUOTE(JSON_EXTRACT(info, '$.createBy'));
			set @notes = JSON_UNQUOTE(JSON_EXTRACT(info, '$.notes'));
			set @activeInput = JSON_UNQUOTE(JSON_EXTRACT(active, '$.active'));

			SELECT value into @latest_ver FROM lu_config WHERE type = 'questionnaire ver' and active = 1 order by id desc LIMIT 1;
			
			IF (@latest_ver IS NULL or @latest_status = '') THEN set @latest_status='1.0'; END IF;
			
			INSERT into cohort (name,acronym,type,status,document_ver,create_by,update_time,active) values(@cohortName,@cohortAcronym,@cohortType,"new",@latest_ver, @createBy,now(),@activeInput);
            set new_id = last_insert_id();
			INSERT into cohort_activity_log (cohort_id, user_id, activity, notes ) values(new_id, @createBy, 'new', @notes);
            
			SET @owners = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohortOwners'));

			call populate_cohort_tables(new_id, @cohortName, @cohortAcronym, @cohortType, popSuccess);
            
			IF popSuccess < 1 THEN
				BEGIN
					delete FROM cohort WHERE acronym = @cohortAcronym;
					call raise_error;
				END;
			END IF;
            
			WHILE i < JSON_LENGTH(@owners) DO
				INSERT into cohort_user_mapping (cohort_acronym, user_id,active,update_time) values(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohortAcronym')),JSON_EXTRACT(@owners,concat('$[',i,']')),'Y',NOW());
				SELECT i + 1 INTO i;	
			 END WHILE;
		END;
    COMMIT;
    
    SELECT flag AS success;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_all_users
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_all_users` //

CREATE  PROCEDURE `SELECT_all_users`(in nameSearch varchar(200), in columnName varchar(40), in columnOrder varchar(10),
									in pageIndex int, in pageSize int)
BEGIN 

	DECLARE page_index INT DEFAULT 0;
    DECLARE page_size INT DEFAULT 0;
	set @nameSearch = nameSearch;
    
	IF pageIndex > -1 THEN 
        set page_size = IFNULL(pageSize,50);
        set page_index = pageIndex;
	else
        set page_size = 1000;
        set page_index = 0;
    END IF;
   
    SELECT sql_calc_found_rows id, concat(u.last_name,', ', u.first_name) AS name,u.login_type, user_name, u.email,
       ( CASE WHEN access_level like '%SystemAdmin' THEN 'Admin' ELSE 'Cohort Owner' end) AS user_role,
	   ( CASE WHEN access_level like '%SystemAdmin' THEN 'All' 
			ELSE (SELECT GROUP_CONCAT(cohort_acronym SEPARATOR ', ') AS cohort_list 
				FROM (	SELECT * FROM cohort_user_mapping WHERE IFNULL(upper(active),'Y')='Y' and user_id = u.id ORDER BY cohort_acronym 
                ) AS a
				GROUP BY user_id ) 
			end) AS cohort_list, 
       IFNULL(u.active_status, 'Y') AS active_status,
       ( CASE  WHEN last_login is null THEN 'Never' ELSE DATE_FORMAT(last_login, '%m/%d/%Y') end) AS last_login   
	FROM user u WHERE u.id > 1 and ( locate( @nameSearch, first_name ) > 0 or locate( @nameSearch, last_name) > 0
       or locate( @nameSearch, email) > 0  or locate( @nameSearch, IFNULL(user_name,'')) > 0 )
	ORDER BY
        CASE WHEN columnName = 'last_login' THEN  last_login is NULL
			WHEN columnName = 'cohort_list' THEN cohort_list is NULL
        END,
        CASE WHEN lower(columnOrder) = 'asc' THEN
			CASE WHEN columnName = 'name' THEN  name
				WHEN columnName = 'user_name' THEN user_name
				WHEN columnName = 'email' THEN  u.email
				WHEN columnName = 'login_type' THEN  u.login_type
				WHEN columnName = 'user_role' THEN user_role
				WHEN columnName = 'active_status' THEN active_status
                WHEN columnName = 'cohort_list' THEN cohort_list
				WHEN columnName = 'last_login' THEN DATE_FORMAT(last_login, '%m/%d/%Y') 
				ELSE name 
			END 
		END ASC,
        CASE WHEN lower(columnOrder) = 'desc' THEN
			CASE WHEN columnName = 'name' THEN  name
				WHEN columnName = 'user_name' THEN user_name
				WHEN columnName = 'email' THEN  u.email
				WHEN columnName = 'login_type' THEN  u.login_type
				WHEN columnName = 'user_role' THEN user_role
				WHEN columnName = 'active_status' THEN active_status
                WHEN columnName = 'cohort_list' THEN cohort_list
				WHEN columnName = 'last_login' THEN DATE_FORMAT(last_login, '%m/%d/%Y') 
				ELSE name 
			END 
		END DESC,
        name
	LIMIT page_index, page_size;
       
    SELECT found_rows() AS total;

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_user_profile
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `SELECT_user_profile` //

CREATE PROCEDURE `SELECT_user_profile`(in usid int)
BEGIN 
 
   	set @usid = usid;
    
	SELECT u.user_name, u.last_name, u.first_name, u.email,u.login_type,
       ( CASE WHEN access_level like '%SystemAdmin' THEN 'Admin' ELSE 'Cohort Owner' end) AS user_role,
	   ( CASE WHEN access_level like '%SystemAdmin' THEN 'All' ELSE (SELECT GROUP_CONCAT(cohort_acronym SEPARATOR ',') AS cohort_list 
	FROM cohort_user_mapping WHERE IFNULL(upper(active),'Y')='Y' and user_id = @usid
       GROUP BY user_id ) end) AS cohort_list, active_status,
       ( CASE WHEN last_login is null THEN 'Never' ELSE DATE_FORMAT(last_login, '%m/%d/%Y') end) AS last_login   
    FROM user u WHERE  u.id = @usid; 
   
    SELECT found_rows() AS total;
	
	SELECT distinct email, login_type FROM  user ORDER BY email; 

	SELECT distinct name, acronym FROM cohort ORDER BY acronym;
    
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: update_user_profile
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `update_user_profile` //

CREATE PROCEDURE `update_user_profile`(in userID int, in info JSON)
BEGIN
    DECLARE i INT DEFAULT 0;
   DECLARE new_id INT DEFAULT userID;
	
    DECLARE flag INT DEFAULT 1;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
    
     START transaction;
     if(`userID` = 0 ) then
        INSERT into  user ( user_name, login_type, email,last_name, first_name, access_level, active_status, create_time) values (  
        if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_name')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_name')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_name'))),
		if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.login_type')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.login_type')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.login_type'))),
		  if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.email')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.email')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.email'))) ,
		  if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.last_name')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.last_name')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.last_name'))),
		  if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.first_name')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.first_name')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.first_name'))),
		  if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role')) ='',null , 
		  if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role'))='Admin', 'SystemAdmin', 'CohortAdmin' )),
		  if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.active_status')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.active_status')) ='','Y' , JSON_UNQUOTE(JSON_EXTRACT(info, '$.active_status'))) ,
		  now());
        
        set new_id = last_insert_id();
     ELSE     
        update user set email = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.email')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.email')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.email'))) ,
					login_type = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.login_type')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.login_type')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.login_type'))),
		 			user_name = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_name')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_name')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_name'))),
                    last_name = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.last_name')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.last_name')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.last_name'))),
                    first_name = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.first_name')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.first_name')) ='',null , JSON_UNQUOTE(JSON_EXTRACT(info, '$.first_name'))),
                      access_level = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role')) ='',null , 
					 if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role'))='Admin', 'SystemAdmin', 'CohortAdmin' )),
                     active_status = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.active_status')) ='null' OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.active_status')) ='','Y' , JSON_UNQUOTE(JSON_EXTRACT(info, '$.active_status'))) ,
                     update_time= now()
                 WHERE id = `userID`;
   END IF;
   
 	SET @cohortList = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohort_list'));
    if(JSON_LENGTH(@cohortList) > 0 OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role')) <> 'Admin') then
      update cohort_user_mapping set active='N' WHERE user_id = `userID`;
		WHILE i < JSON_LENGTH(@cohortList) DO
			SELECT JSON_EXTRACT(@cohortList, concat('$[',i,']')) INTO @cohortAcronym;
            if(replace(@cohortAcronym, '"','') <> 'All') then
            INSERT into cohort_user_mapping (cohort_acronym, user_id, active, create_time, update_time)
            values (replace(@cohortAcronym, '"',''), new_id, 'Y' , now(), now() )
            on duplicate key update active  = 'Y';
            END IF;
	        SELECT i + 1 INTO i;
		END WHILE;
        END IF;
        
        commit;

	SELECT flag AS rowAffacted;

END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: delete_cohort_file
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS delete_cohort_file //

CREATE PROCEDURE `delete_cohort_file`(in file_Id int, in cohort_ID int)
BEGIN
	DECLARE flag INT DEFAULT 1;
	DECLARE new_id INT DEFAULT 0;
	DECLARE user_id INT DEFAULT 1;
   
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;

    SELECT `status` INTO @cohort_status FROM cohort WHERE id = cohort_ID;

    IF @cohort_status = 'published' THEN 
	   call SELECT_unpublished_cohort_id(cohort_ID, new_id, user_id); 
    ELSE 
       set new_id = cohort_ID;
    END IF;
    
    IF new_id > 0 THEN
    BEGIN
		START TRANSACTION;
			IF new_id <> cohort_ID then
				SELECT new_file_id into @updated_file_id FROM mapping_old_file_Id_To_New WHERE old_file_id = file_Id;
			else
				set @updated_file_id = file_Id;
			END IF;
        update cohort_document set status = 0 WHERE id = @updated_file_id;

		COMMIT;
    END;
    END IF;
    SELECT flag AS rowsAffacted;
    SELECT new_id;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: populate_cohort_tables
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `populate_cohort_tables` //

CREATE  PROCEDURE `populate_cohort_tables`(in cohortID int, in cohortName varchar(50), in acronym varchar(20), in cohortType varchar(20), out popSuccess int)
BEGIN
	DECLARE flag INT DEFAULT 1;
 
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      SET popSuccess = 0;
      ROLLBACK;
	END;
	
   START TRANSACTION;
   
   INSERT cohort_basic (cohort_id, cohort_name, cohort_acronym, cohort_type) values (cohortID, cohortName, acronym, cohortType);
   INSERT cohort_edit_status (cohort_id, page_code, status) values (cohortID, 'A', 'new'), (cohortID, 'B', 'new'), (cohortID, 'C', 'new'),
 																   (cohortID, 'D', 'new'), (cohortID, 'E', 'new'), (cohortID, 'F', 'new'), (cohortID, 'G', 'new');
	
    INSERT enrollment_count(cohort_id, race_id, ethnicity_id, gender_id, enrollment_counts, create_time, update_time) 
    SELECT cohortID, r.id, e.id, g.id, 0, NOW(), NOW()
	FROM lu_race r, lu_ethnicity e, lu_gender g WHERE g.id < 4 ORDER BY r.id, e.id, g.id;
	
	INSERT major_content(cohort_id, category_id)
    SELECT cohortID, id FROM lu_data_category WHERE id < 99;
  
	
    INSERT cancer_info (cohort_id, create_time, update_time) values (cohortID, NOW(), NOW());
	
    
    INSERT into cancer_count (cohort_id, cancer_id, gender_id, case_type_id, cancer_counts, create_time, update_time)
    SELECT cohortID, c.id, g.id, t.id, 0, NOW(), NOW() FROM 
	lu_cancer c, lu_gender g, lu_case_type t WHERE g.id < 3;
    
	INSERT mortality (cohort_id, create_time, update_time) values (cohortID, NOW(), NOW());
    INSERT dlh (cohort_id, create_time, update_time) values (cohortID, NOW(), NOW());
    INSERT specimen (cohort_id, create_time, update_time) values (cohortID, NOW(), NOW());
    
    INSERT into specimen_count (cohort_id, cancer_id, specimen_id, specimens_counts, create_time, update_time)
    SELECT cohortID, c.id, s.id, 0, NOW(), NOW() FROM lu_cancer c, lu_specimen s WHERE s.id < 10;
    
    INSERT into specimen_collected_type (cohort_id, specimen_id, collected_yn, create_time, update_time)
    SELECT cohortID, id, null, NOW(), NOW() FROM lu_specimen WHERE id > 10;
    
	COMMIT;
   
	-- SELECT flag AS rowsAffacted;
						
			
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: SELECT_activity_log_by_cohort
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `SELECT_activity_log_by_cohort` //

CREATE PROCEDURE `SELECT_activity_log_by_cohort`(acronym varchar(100))
BEGIN
	
    SELECT * FROM cohort_activity_log WHERE cohort_id IN (SELECT id FROM cohort WHERE acronym = @acronym) ORDER BY create_time DESC;
    
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: ConvertIntToTable
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `ConvertIntToTable` //

CREATE PROCEDURE `ConvertIntToTable`( IN `@input` LONGTEXT )
BEGIN

	drop temporary table if exists tempIntTable;
    create temporary table if not exists tempIntTable( val int );
  
	IF `@input` IS NOT NULL  is NOT NULL THEN
		set @sql = concat("insert into tempIntTable  (val) values (", 
							replace((SELECT group_concat(`@input`) as data FROM dual), ",", "),("),
							");"                            
						 );
		prepare stmt1 from @sql;
		execute stmt1;

	END IF;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: ConvertStrToTable
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `ConvertStrToTable` //

CREATE PROCEDURE `ConvertStrToTable`( IN `@input` LONGTEXT )
BEGIN
	DECLARE `@sql` LONGTEXT DEFAULT '';
	drop temporary table if exists tempStrTable;
    create temporary table if not exists tempStrTable( val  VARCHAR(200) );
    -- SET group_concat_max_len=100000 
	IF `@input` IS NOT NULL THEN
		set @sql = concat("insert into tempStrTable (val) values ('", 
							replace((SELECT group_concat(`@input`) as data FROM dual), ",", "'),('"),
							"');"                            
						 );
		prepare stmt1 from @sql;
		execute stmt1;

	END IF;
END //


DELIMITER ;


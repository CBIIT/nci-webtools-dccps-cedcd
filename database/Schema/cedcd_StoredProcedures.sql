-- === CEDCD stored procedures  =====
-- === revised according to questionnarire v8 in 2020 =====
-- === mysql v 8.0 =====
/* 
 CREATE PROCEDUREs
 1. select_advanced_cohort
 2. select_cohort_baseline_data
 3. select_cohort_basic_info
 4. select_cohort_cancer_info
 5. select_cohort_description
 6. select_cohort_followup_data
 7. select_cohort_linkages_technology
 8. select_cohort_list
 9. select_cohort_lookup
10. select_cohort_mortality
11. select_cohort
12. select_cohort_specimen_overview
13. insert_contact_us
14. select_cancer_counts
15. select_enrollment_counts
16. select_specimen_counts
17. update_cohort_basic
18. select_admin_cohortlist
18. get_cohort_basic_info
19. upsert_enrollment_count
20. add_file_attachment
21. get_enrollment_counts
22. get_specimen_counts
23. update_specimen_section_data
24. select_questionnaire_specimen_info
25. update_questionnaire_speciemn_info
26. inspect_cohort
27. insert_new_cohort_from_published
28. select_all_users
29. select_usrer_profile
30. update_user_profile
31. delete_cohort_file
*
 */
use cedcd;
-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: advanced_cohort_select
-- -----------------------------------------------------------------------------------------------------------
DELIMITER //

DROP PROCEDURE IF EXISTS `advanced_cohort_select` //
DROP PROCEDURE IF EXISTS `cohort_basic_info` //
DROP PROCEDURE IF EXISTS `cohort_baseline_data` //
DROP PROCEDURE IF EXISTS `cohort_cancer_info` //
DROP PROCEDURE IF EXISTS `cohort_description` //
DROP PROCEDURE IF EXISTS `cohort_followup_data` //
DROP PROCEDURE IF EXISTS `cohort_linkages_technology` //
DROP PROCEDURE IF EXISTS `cohort_list` //
DROP PROCEDURE IF EXISTS `cohort_lookup` //
DROP PROCEDURE IF EXISTS `cohort_mortality` //
DROP PROCEDURE IF EXISTS `cohort_select` //
DROP PROCEDURE IF EXISTS `cohort_specimen_overview` //
DROP PROCEDURE IF EXISTS `updateCohort_basic` //
DROP PROCEDURE IF EXISTS `contact_us` //

DROP PROCEDURE IF EXISTS `upsertEnrollment_count` //



DROP PROCEDURE IF EXISTS `select_advanced_cohort` //

CREATE PROCEDURE `select_advanced_cohort`(in gender text, in age_info varchar(100), in study_population text,
		in race text, in ethnicity text, 
									in category text,in collected_specimen varchar(200),in cancer text,
                                    in booleanOperationBetweenField text, in booleanOperationWithInField text,
                                    in columnName varchar(40), in columnOrder varchar(10),
									in pageIndex int, in pageSize int)
BEGIN
	declare tmp text default '';
    declare v text default ''; 
	declare i int default 0;
    declare tmp_count int default 0; 
    
    set @and_query = "";
    set @or_query = "";
    
    set @gender_query = "";
    if gender != "" then
		if locate("4", gender) <= 0 and (locate("1", gender) > 0 or locate("2", gender) > 0) then
			set gender = concat(gender, ",4");
		end if;
		set @gender_query = concat("cs.eligible_gender_id in (",gender,") ");
		set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',1)),',',1));
		if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @gender_query);
		else
			set @or_query = concat(@or_query, " or ", @gender_query);
		end if;
	end if;

    set i = 0;
    set @age_query = "";
    if age_info != "" then
		set tmp_count = 1+length(age_info) - length(replace(age_info,',','')); 
		while i < tmp_count
		do
			set i=i+1;
            set v = reverse(substring_index(reverse(substring_index(age_info,',',i)),',',1));
            if v = "0-14" then
				set @age_query = concat(@age_query,"cs.enrollment_age_min <= 14");
            elseif v ="15-19" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 15 and cs.enrollment_age_min <= 19) or (cs.enrollment_age_max >= 15 and cs.enrollment_age_max <= 19) or (cs.enrollment_age_min <= 15 and cs.enrollment_age_max >= 19))");
            elseif v = "20-24" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 20 and cs.enrollment_age_min <= 24) or (cs.enrollment_age_max >= 20 and cs.enrollment_age_max <= 24) or (cs.enrollment_age_min <= 20 and cs.enrollment_age_max >= 24))");
			elseif v = "25-29" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 25 and cs.enrollment_age_min <= 29) or (cs.enrollment_age_max >= 25 and cs.enrollment_age_max <= 29) or (cs.enrollment_age_min <= 25 and cs.enrollment_age_max >= 29))");
            elseif v = "30-34" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 30 and cs.enrollment_age_min <= 34) or (cs.enrollment_age_max >= 30 and cs.enrollment_age_max <= 34) or (cs.enrollment_age_min <= 30 and cs.enrollment_age_max >= 34))");
			elseif v = "35-39" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 35 and cs.enrollment_age_min <= 39) or (cs.enrollment_age_max >= 35 and cs.enrollment_age_max <= 39) or (cs.enrollment_age_min <= 35 and cs.enrollment_age_max >= 39))");
			elseif v = "40-44" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 40 and cs.enrollment_age_min <= 44) or (cs.enrollment_age_max >= 40 and cs.enrollment_age_max <= 44) or (cs.enrollment_age_min <= 40 and cs.enrollment_age_max >= 44))");
			elseif v = "45-49" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 45 and cs.enrollment_age_min <= 49) or (cs.enrollment_age_max >= 45 and cs.enrollment_age_max <= 49) or (cs.enrollment_age_min <= 45 and cs.enrollment_age_max >= 49))");
			elseif v = "50-54" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 50 and cs.enrollment_age_min <= 54) or (cs.enrollment_age_max >= 50 and cs.enrollment_age_max <= 54) or (cs.enrollment_age_min <= 50 and cs.enrollment_age_max >= 54))");
			elseif v = "55-59" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 55 and cs.enrollment_age_min <= 59) or (cs.enrollment_age_max >= 55 and cs.enrollment_age_max <= 59) or (cs.enrollment_age_min <= 55 and cs.enrollment_age_max >= 59))");
			elseif v = "60-64" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 60 and cs.enrollment_age_min <= 64) or (cs.enrollment_age_max >= 60 and cs.enrollment_age_max <= 64) or (cs.enrollment_age_min <= 60 and cs.enrollment_age_max >= 64))");
			elseif v = "65-69" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 65 and cs.enrollment_age_min <= 69) or (cs.enrollment_age_max >= 65 and cs.enrollment_age_max <= 69) or (cs.enrollment_age_min <= 65 and cs.enrollment_age_max >= 69))");
			elseif v = "70-74" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 70 and cs.enrollment_age_min <= 74) or (cs.enrollment_age_max >= 70 and cs.enrollment_age_max <= 74) or (cs.enrollment_age_min <= 70 and cs.enrollment_age_max >= 74))");
			elseif v = "75-79" then
				set @age_query = concat(@age_query,"((cs.enrollment_age_min >= 75 and cs.enrollment_age_min <= 79) or (cs.enrollment_age_max >= 75 and cs.enrollment_age_max <= 79) or (cs.enrollment_age_min <= 75 and cs.enrollment_age_max >= 79))");
			elseif v = "80-85+" then
				set @age_query = concat(@age_query,"cs.enrollment_age_max >= 80");
			else
				set @age_query = "";
            end if;
			if i < tmp_count then
				set @age_query = concat(@age_query," or ");
            end if;
		end while;
        
		set @age_query = concat("(",@age_query,") ");
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',2)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @age_query);
		else
			set @or_query = concat(@or_query, " or ", @age_query);
        end if;
    end if;
    
    set @study_query = "";
    if study_population != "" then
		set @study_query = concat("cs.eligible_disease in (",study_population,") ");
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',3)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @study_query);
		else
			set @or_query = concat(@or_query, " or ", @study_query);
        end if;
    end if;
    
    set @enrollment_race_query = "";
    if race != "" then
		set @enrollment_race_query = concat("cs.cohort_id in (select distinct cohort_id from enrollment_count where race_id in (",race,") and enrollment_counts > 0)");
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',4)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @enrollment_race_query);
		else
			set @or_query = concat(@or_query, " or ", @enrollment_race_query);
        end if;
    end if;
    
    set @enrollment_ethnicity_query = "";
    if ethnicity != "" then
		set @enrollment_ethnicity_query = concat("cs.cohort_id in (select distinct cohort_id from enrollment_count where ethnicity_id in (",ethnicity,") and enrollment_counts > 0)");
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',5)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @enrollment_ethnicity_query);
		else
			set @or_query = concat(@or_query, " or ", @enrollment_ethnicity_query);
        end if;
    end if;
    
    set @major_content_query = "";
    if category != "" then
      if category = "99" then
        set @major_content_query = concat(" cs.cohort_id in (select distinct cohort_id from cancer_info where ci_cancer_treatment_data=1 ");
      elseif locate("99", category) > 0 then
        set @major_content_query = concat(" cs.cohort_id in ( select distinct cohort_id 
        from major_content where category_id in ( select ld.id from lu_data_category ld , v_lu_data_category vld 
        where ld.category=vld.data_category and vld.id in (",category,")) ", " and (baseline=1 or followup = 1) 
        union
        select distinct cohort_id from cancer_info where ci_cancer_treatment_data=1 ");
      else
		     set @major_content_query = concat(" cs.cohort_id in (select distinct cohort_id 
        from major_content where category_id in ( select ld.id from lu_data_category ld , v_lu_data_category vld 
        where ld.category=vld.data_category and vld.id in (",category,")) ", " and (baseline=1 or followup = 1) ");
      end if;
	
  
       set tmp = reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',6)),',',1));
        if tmp = "AND" then
			set @len = LENGTH(category) - LENGTH(REPLACE(category, ',', '')) + 1;
			set @major_content_query = concat(@major_content_query, " having sum(1) >= ", @len);
        end if;
        set @major_content_query = concat(@major_content_query, " )");
        
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',6)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @major_content_query);
		else
			set @or_query = concat(@or_query, " or ", @major_content_query);
        end if;
    end if;
    
    set @specimen_query = "";
    if collected_specimen != "" then
    
		set @operator = reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',7)),',',1));
        
		set tmp_count = 1+length(collected_specimen) - length(replace(collected_specimen,',','')); 
		while i < tmp_count
		do
			set i=i+1;
			set tmp = concat(tmp,reverse(substring_index(reverse(substring_index(collected_specimen,',',i)),',',1)),"=1");
            if i < tmp_count then
				set tmp = concat(tmp," ", @operator, " ");
            end if;
		end while;

		set @specimen_query = concat(" cs.cohort_id in (select cohort_id from v_specimen where 1=1 ", "and (",tmp,") )");
        
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',7)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @specimen_query);
		else
			set @or_query = concat(@or_query, " or ", @specimen_query);
        end if;
	end if;
        
        
	set @cancer_query = "";
    if cancer != "" then
		set tmp = reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',8)),',',1));
        if tmp = "OR" then
			set @cancer_query = concat("and cs.cohort_id in (select distinct cohort_id from cancer_count where cancer_id in (",cancer,") and cancer_counts > 0 ");
		elseif tmp = "AND" then
			set @len = LENGTH(cancer) - LENGTH(REPLACE(cancer, ',', '')) + 1;
			set @cancer_query = concat("and cs.cohort_id in (select t.cohort_id from ( select cohort_id, cancer_id from cancer_count where cancer_id in (",cancer,") and cancer_counts > 0 group by cohort_id, cancer_id ) as t group by t.cohort_id ");
			set @cancer_query = concat(@cancer_query, " having sum(1) >= ", @len);
        end if;
		set @cancer_query = concat(@cancer_query,") ");
        
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationBetweenField,',',8)),',',1));
        if tmp = "AND" then
			set @and_query = concat(@and_query, " and ", @cancer_query);
		else
			set @or_query = concat(@or_query, " or ", @cancer_query);
        end if;
    end if;
    
    set @query = "select sql_calc_found_rows cs.cohort_id as id,cs.cohort_name, cs.cohort_acronym,cs.cohort_web_site,cs.update_time,
	sum(ec.enrollment_counts) as enrollment_total FROM cohort_basic cs, enrollment_count ec, cohort ch
	WHERE ch.id = cs.cohort_id and lower(ch.status) = 'published' and cs.cohort_id = ec.cohort_id  ";
    
    if @and_query = "" and @or_query = "" then
		set @query = concat(@query, " ");
    elseif @and_query != "" and @or_query = "" then
		set @query = concat(@query, @and_query);
    elseif @and_query = "" and @or_query != "" then
		set @or_query = SUBSTRING(@or_query, 5);
        set @query = concat(@query, " and (", @or_query, ")");
    else
		set @query = concat(@query, @and_query, @or_query);
    end if;
    
    set @groupBy = " group by cs.cohort_id, cs.cohort_name, cs.cohort_acronym,cs.cohort_web_site,cs.update_time ";
    
    if columnName != "" then
		set @orderBy = concat(" order by ",columnName," ",columnOrder," ");
	else
		set @orderBy = "order by cs.cohort_name asc";
    end if;
    
    if pageIndex > -1 then
		set @paging = concat(' limit ',pageIndex,',',pageSize,' ');
	else
		set @paging = "";
    end if;
    
    set @query = concat(@query, @groupBy, @orderBy, @paging);
	PREPARE stmt FROM @query;
	EXECUTE stmt;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt;

END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_baseline_data
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort_baseline_data` //

CREATE PROCEDURE `select_cohort_baseline_data`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as id,cs.cohort_name,cs.cohort_acronym,mc.category_id, ld.category, ld.sub_category, mc.baseline, mc.other_specify_baseline 
	    from cohort_basic cs, major_content mc, lu_data_category ld, cohort ch, v_lu_data_category vld
	    WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and cs.cohort_id = mc.cohort_id and mc.category_id = ld.id and ld.category = vld.data_category ",@queryString);
  
  PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_basic_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort_basic_info` //

CREATE PROCEDURE `select_cohort_basic_info`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, " and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.*,lg.gender, ci.ci_confirmed_cancer_year,m.mort_year_mortality_followup 
	from cohort_basic cs, cancer_info ci, mortality m, lu_gender lg , cohort ch
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and cs.cohort_id = ci.cohort_id and cs.cohort_id = m.cohort_id and cs.eligible_gender_id = lg.id",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_cancer_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort_cancer_info` //

CREATE PROCEDURE `select_cohort_cancer_info`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,ci.* 
	from cohort_basic cs, cancer_info ci , cohort ch
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and cs.cohort_id = ci.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_description
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort_description` //

CREATE PROCEDURE `select_cohort_description`(in c_id int(11))
BEGIN
	select * from cohort_basic where cohort_id = c_id;
    select * from attachment where cohort_id = c_id;
    select * from person where cohort_id = c_id and category_id in (1,3,4);
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_followup_data
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort_followup_data` //

CREATE PROCEDURE `select_cohort_followup_data`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
     set @query = concat("select cs.cohort_id as id,cs.cohort_name,cs.cohort_acronym,mc.category_id, ld.category, ld.sub_category, mc.followup, mc.other_specify_followup 
	from cohort_basic cs, major_content mc, lu_data_category ld , cohort ch, v_lu_data_category vld
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and cs.cohort_id = mc.cohort_id and mc.category_id = ld.id and ld.category = vld.data_category ",@queryString);
     
  PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_linkages_technology
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort_linkages_technology` //

CREATE PROCEDURE `select_cohort_linkages_technology`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,cd.*, ct.* 
	from cohort_basic cs, dlh cd, technology ct , cohort ch
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and cs.cohort_id = cd.cohort_id and cs.cohort_id = ct.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_list
-- original features for published cohort only
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `select_cohort_list` //

CREATE PROCEDURE `select_cohort_list`()
BEGIN
	select cs.cohort_id as id, cs.cohort_name, cs.cohort_acronym from cohort_basic cs, cohort ch
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' order by cs.cohort_acronym;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_owner
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS select_cohort_owner //
CREATE PROCEDURE `select_cohort_owner`()
BEGIN
	select id, first_name, last_name, email from user
	where access_level='CohortAdmin' order by last_name, first_name;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_lookup
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort_lookup` //

CREATE PROCEDURE `select_cohort_lookup`()
BEGIN
	  select * from lu_gender;
    select * from lu_cancer where id < 29 order by case when id=1 then 'zzz' else cancer end, cancer;
    select * from v_lu_data_category;
    select * from lu_ethnicity;
    select * from lu_race order by case when id=7 then 'zzz' else race end, race;
    select * from lu_specimen where id < 10;
	  select * from lu_cohort_status;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_mortality
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort_mortality` //

CREATE PROCEDURE `select_cohort_mortality`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,cm.* 
	from cohort_basic cs, mortality cm , cohort ch
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and cs.cohort_id = cm.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_select
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort` //

CREATE PROCEDURE `select_cohort`(in gender text,in age_info varchar(100), in study_population text, 
									in race text, in ethnicity text, 
									in category text,in collected_specimen varchar(200),in cancer text,
                                    in columnName varchar(40), in columnOrder varchar(10),
									in pageIndex int, in pageSize int)
BEGIN
	declare tmp text default '';
    declare v text default ''; 
	declare i int default 0;
    declare tmp_count int default 0; 
    
    set @enrollment_query = "";
    if race != "" || ethnicity != "" then
		set @enrollment_query = "and cs.cohort_id in (select cohort_id from enrollment_count where 1=1 ";
        
		if race != "" then
			set @enrollment_query = concat(@enrollment_query, "and race_id in (",race,") ");
		end if;
		
		if ethnicity != "" then
			set @enrollment_query = concat(@enrollment_query, "and ethnicity_id in (",ethnicity,") ");
		end if;
        set @enrollment_query = concat(@enrollment_query, "  and enrollment_counts > 0)");
	end if;
    
    set @major_content_query = "";
    if category != "" then
      if category = "99" then
       set @major_content_query = concat(" and cs.cohort_id in (select distinct cohort_id from cancer_info where ci_cancer_treatment_data=1) ");
      elseif locate("99", category) > 0 then
       set @major_content_query = concat(" and cs.cohort_id in ( select distinct cohort_id 
        from major_content where category_id in ( select ld.id from lu_data_category ld , v_lu_data_category vld 
        where ld.category=vld.data_category and vld.id in (",category,")) ", " and (baseline=1 or followup = 1) 
        union
        select distinct cohort_id from cancer_info where ci_cancer_treatment_data=1 )");
      else
		    set @major_content_query = concat(" and cs.cohort_id in (select distinct cohort_id 
        from major_content where category_id in ( select ld.id from lu_data_category ld , v_lu_data_category vld 
        where ld.category=vld.data_category and vld.id in (",category,")) ", " and (baseline=1 or followup = 1) )");
      end if;
    end if;
    
    set @specimen_query = "";
    if collected_specimen != "" then
		set tmp_count = 1+length(collected_specimen) - length(replace(collected_specimen,',','')); 
		while i < tmp_count
		do
			set i=i+1;
			set tmp = concat(tmp,reverse(substring_index(reverse(substring_index(collected_specimen,',',i)),',',1)),"=1");
            if i < tmp_count then
				set tmp = concat(tmp," or ");
            end if;
		end while;

		set @specimen_query = concat("and cs.cohort_id in (select cohort_id from v_specimen where 1=1 ", "and (",tmp,") )");
	end if;
        
        
	set @cancer_query = "";
    if cancer != "" then
		set @cancer_query = concat("and cs.cohort_id in (select distinct cohort_id from cancer_count where cancer_id in (",cancer,") and cancer_counts > 0 ");
        
        set @cancer_query = concat(@cancer_query,") ");
    end if;
    
    set @cohort_query = "";
	if gender != "" then
		if locate("4", gender) <= 0 and (locate("1", gender) > 0 or locate("2", gender) > 0) then
			set gender = concat(gender, ",4");
		end if;
		set @cohort_query = concat(@cohort_query, "and cs.eligible_gender_id in (",gender,") ");
	end if;

	/*
    if gender != "" then
		set @cohort_query = concat(@cohort_query, "and cs.gender_id in (",gender,") ");
    end if;
	*/
    set tmp = '';
    set i = 0;
    if age_info != "" then
		set tmp_count = 1+length(age_info) - length(replace(age_info,',','')); 
		while i < tmp_count
		do
			set i=i+1;
            set v = reverse(substring_index(reverse(substring_index(age_info,',',i)),',',1));
            if v = "0-14" then
				set tmp = concat(tmp,"cs.enrollment_age_min <= 14");
            elseif v ="15-19" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 15 and cs.enrollment_age_min <= 19) or (cs.enrollment_age_max >= 15 and cs.enrollment_age_max <= 19) or (cs.enrollment_age_min <= 15 and cs.enrollment_age_max >= 19))");
            elseif v = "20-24" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 20 and cs.enrollment_age_min <= 24) or (cs.enrollment_age_max >= 20 and cs.enrollment_age_max <= 24) or (cs.enrollment_age_min <= 20 and cs.enrollment_age_max >= 24))");
			elseif v = "25-29" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 25 and cs.enrollment_age_min <= 29) or (cs.enrollment_age_max >= 25 and cs.enrollment_age_max <= 29) or (cs.enrollment_age_min <= 25 and cs.enrollment_age_max >= 29))");
            elseif v = "30-34" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 30 and cs.enrollment_age_min <= 34) or (cs.enrollment_age_max >= 30 and cs.enrollment_age_max <= 34) or (cs.enrollment_age_min <= 30 and cs.enrollment_age_max >= 34))");
			elseif v = "35-39" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 35 and cs.enrollment_age_min <= 39) or (cs.enrollment_age_max >= 35 and cs.enrollment_age_max <= 39) or (cs.enrollment_age_min <= 35 and cs.enrollment_age_max >= 39))");
			elseif v = "40-44" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 40 and cs.enrollment_age_min <= 44) or (cs.enrollment_age_max >= 40 and cs.enrollment_age_max <= 44) or (cs.enrollment_age_min <= 40 and cs.enrollment_age_max >= 44))");
			elseif v = "45-49" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 45 and cs.enrollment_age_min <= 49) or (cs.enrollment_age_max >= 45 and cs.enrollment_age_max <= 49) or (cs.enrollment_age_min <= 45 and cs.enrollment_age_max >= 49))");
			elseif v = "50-54" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 50 and cs.enrollment_age_min <= 54) or (cs.enrollment_age_max >= 50 and cs.enrollment_age_max <= 54) or (cs.enrollment_age_min <= 50 and cs.enrollment_age_max >= 54))");
			elseif v = "55-59" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 55 and cs.enrollment_age_min <= 59) or (cs.enrollment_age_max >= 55 and cs.enrollment_age_max <= 59) or (cs.enrollment_age_min <= 55 and cs.enrollment_age_max >= 59))");
			elseif v = "60-64" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 60 and cs.enrollment_age_min <= 64) or (cs.enrollment_age_max >= 60 and cs.enrollment_age_max <= 64) or (cs.enrollment_age_min <= 60 and cs.enrollment_age_max >= 64))");
			elseif v = "65-69" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 65 and cs.enrollment_age_min <= 69) or (cs.enrollment_age_max >= 65 and cs.enrollment_age_max <= 69) or (cs.enrollment_age_min <= 65 and cs.enrollment_age_max >= 69))");
			elseif v = "70-74" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 70 and cs.enrollment_age_min <= 74) or (cs.enrollment_age_max >= 70 and cs.enrollment_age_max <= 74) or (cs.enrollment_age_min <= 70 and cs.enrollment_age_max >= 74))");
			elseif v = "75-79" then
				set tmp = concat(tmp,"((cs.enrollment_age_min >= 75 and cs.enrollment_age_min <= 79) or (cs.enrollment_age_max >= 75 and cs.enrollment_age_max <= 79) or (cs.enrollment_age_min <= 75 and cs.enrollment_age_max >= 79))");
			elseif v = "80-85+" then
				set tmp = concat(tmp,"cs.enrollment_age_max >= 80");
			else
				set tmp = "";
            end if;
			if i < tmp_count then
				set tmp = concat(tmp," or ");
            end if;
		end while;
        
		set @cohort_query = concat(@cohort_query, "and (",tmp,") ");
    end if;
    
    if study_population != "" then
		set @cohort_query = concat(@cohort_query, "and cs.eligible_disease in (",study_population,") ");
    end if;
    
    set @groupBy = " group by cs.cohort_id, cs.cohort_name, cs.cohort_acronym,cs.cohort_web_site,cs.update_time ";
    
    if columnName != "" then
		set @orderBy = concat(" order by ",columnName," ",columnOrder," ");
	else
		set @orderBy = "order by cs.cohort_name asc";
    end if;
    
    if pageIndex > -1 then
		set @paging = concat(' limit ',pageIndex,',',pageSize,' ');
	else
		set @paging = "";
    end if;
    
    set @query = concat("select sql_calc_found_rows cs.cohort_id as id,cs.cohort_name, cs.cohort_acronym,cs.cohort_web_site,cs.update_time,sum(ec.enrollment_counts) as enrollment_total 
	FROM cohort_basic cs, enrollment_count ec, cohort ch
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and cs.cohort_id = ec.cohort_id ",@enrollment_query,@major_content_query,@specimen_query,@cancer_query);
    set @query = concat(@query, @cohort_query,@groupBy, @orderBy, @paging);

	PREPARE stmt FROM @query;
	EXECUTE stmt;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_specimen_overview
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort_specimen_overview` //

CREATE PROCEDURE `select_cohort_specimen_overview`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,s.* 
	from cohort_basic cs, v_specimen s, cohort ch
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and cs.cohort_id = s.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: contact_us
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `insert_contact_us` //

CREATE PROCEDURE `insert_contact_us`(in firstname varchar(50), in lastname varchar(50), in organization varchar(100), 
														in phone varchar(20), in email varchar(50), in topic int(3), in message text)
BEGIN
	set @queryString = concat("('",firstname,"','",lastname,"','",organization,"','",phone,"','",email,"',",topic,",'",message,"',now(),now())");
    
    set @query = concat("insert into contact(first_name, last_name,organization,phone,email,topic, message,create_time,update_time) values",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
    
    SELECT LAST_INSERT_ID();
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_cohort_for_user
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort_for_user` //
CREATE PROCEDURE `select_cohort_for_user`(in user_id int)
BEGIN
	

    set @query = "
		select c.*
		from cohort c
        join cohort_user_mapping cm on cm.cohort_acronym = c.acronym
		where cm.user_id = ?
		and cm.acronym = ?
		order by
			status = 'draft' desc,
			status = 'in review' desc,
			status = 'submitted' desc,
			status = 'new' desc,
			status = 'published' desc
		limit 1;
	";
    set @user_id = user_id;
    PREPARE stmt FROM @query;
	EXECUTE stmt using @user_id;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_editable_cohort_by_acronym
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_editable_cohort_by_acronym` //
CREATE PROCEDURE `select_editable_cohort_by_acronym`(in acronym varchar(100))
BEGIN
    set @query = "
		select *
		from cohort c
		where acronym = ?
		order by
			status = 'draft' desc,
			status = 'in review' desc,
			status = 'rejectd' desc,
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
-- Stored Procedure: select_cancer_count
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cancer_count` //
CREATE PROCEDURE `select_cancer_count`(in cohort_id integer)
BEGIN
    set @query = "SELECT * FROM cancer_count WHERE cohort_id = ?";
    set @cohort_id = cohort_id;
    PREPARE stmt FROM @query;
	EXECUTE stmt using @cohort_id;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_cancer_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cancer_info` //
CREATE PROCEDURE `select_cancer_info`(in cohort_id integer)
BEGIN
    set @query = "SELECT * FROM cancer_info WHERE cohort_id = ?";
    set @cohort_id = cohort_id;
    PREPARE stmt FROM @query;
	EXECUTE stmt using @cohort_id;
	DEALLOCATE PREPARE stmt;
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
        insert into cancer_count (
            cohort_id,
            cancer_id,
            gender_id,
            case_type_id,
            cancer_counts
        )
        select
            ?,
            cancer_id,
            gender_id,
            case_type_id,
            cancer_counts
        from json_table(
            ?,
            '$[*]' columns(
                cancer_id integer path '$.cancer_id',
                gender_id integer path '$.gender_id',
                case_type_id integer path '$.case_type_id',
                cancer_counts integer path '$.cancer_counts'
            )
        ) as json_params
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
   
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
      SET success = 0;
      ROLLBACK;
	END;

	SELECT `status` INTO @cohort_status FROM cohort WHERE id = new_id;
    IF @cohort_status = 'published' THEN CALL select_unpublished_cohort_id(cohort_id, new_id); END IF;
    START TRANSACTION;
	
    set @cohort_id = new_id;
    set @old_id = cohort_id;
    set @params = params;
    set @query = "
        insert into cancer_info (
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
        select
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
        from json_table(
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
        ) as json_params
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
    begin
	  if exists (select * from cohort where id = new_id and status = 'new') then
		update cohort set status = 'draft', update_time = NOW() where id = new_id;
	  end if;
	  SELECT success , id AS duplicated_cohort_id , `status` from cohort WHERE id = new_id;
	end;
    else
        select success;
    END IF;
    
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_cancer_counts
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cancer_counts` //
CREATE PROCEDURE `select_cancer_counts`(in gender text, in cancer text,in cohort text)
BEGIN
    set @queryString = "select cc.cohort_id, cs.cohort_name, cs.cohort_acronym,concat(cc.gender_id,'_',cc.cancer_id) as u_id, cc.gender_id, lg.gender, cc.cancer_id, lc.cancer, cc.cancer_counts 
	from cancer_count cc, cohort_basic cs, lu_gender lg, lu_cancer lc, cohort ch
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and cc.cohort_id = cs.cohort_id and cc.gender_id = lg.id and cc.cancer_id = lc.id ";
    
    if gender != "" then
		set @queryString = concat(@queryString, "and cc.gender_id in (",gender,") ");
    end if;
    
    if cancer != "" then
		set @queryString = concat(@queryString, "and cc.cancer_id in (",cancer,") ");
    end if;
    
    if cohort != "" then
		set @queryString = concat(@queryString, "and cc.cohort_id in (",cohort,") ");
    end if;
    
    set @query = concat(@queryString, " order by cc.cancer_id, cc.gender_id, cs.cohort_acronym");
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_enrollment_counts
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_enrollment_counts` //

CREATE PROCEDURE `select_enrollment_counts`(in gender text, in race text,in ethnicity text,in cohort text)
BEGIN
    set @queryString = "select ec.cohort_id, cs.cohort_name, cs.cohort_acronym,concat(ec.gender_id,'_',ec.ethnicity_id,'_',ec.race_id) as u_id, ec.gender_id, lg.gender, ec.ethnicity_id, le.ethnicity, ec.race_id, lr.race, ec.enrollment_counts 
	from enrollment_count ec, cohort_basic cs, lu_gender lg, lu_ethnicity le, lu_race lr, cohort ch
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and ec.cohort_id = cs.cohort_id and ec.gender_id = lg.id and ec.ethnicity_id = le.id and ec.race_id = lr.id ";
    
    if gender != "" then
		set @queryString = concat(@queryString, "and ec.gender_id in (",gender,") ");
    end if;
    
    if race != "" then
		set @queryString = concat(@queryString, "and ec.race_id in (",race,") ");
    end if;
    
    if ethnicity != "" then
		set @queryString = concat(@queryString, "and ec.ethnicity_id in (",ethnicity,") ");
    end if;
    
    if cohort != "" then
		set @queryString = concat(@queryString, "and ec.cohort_id in (",cohort,") ");
    end if;
    
    -- set @query = concat(@queryString, " order by ec.gender_id, le.ethnicity, ec.race_id, cs.cohort_acronym");
	set @query = concat(@queryString, " order by ec.gender_id, le.ethnicity, ec.race_id, cs.cohort_acronym");
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_specimen_counts
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_specimen_counts` //

CREATE PROCEDURE `select_specimen_counts`(in specimen text, in cancer text,in cohort text)
BEGIN
    set @queryString = "select sc.cohort_id, cs.cohort_name, cs.cohort_acronym,concat(sc.specimen_id,'_',sc.cancer_id) as u_id, sc.specimen_id, ls.specimen, sc.cancer_id, lc.cancer, sc.specimens_counts 
	from specimen_count sc, cohort_basic cs, lu_specimen ls, lu_cancer lc, cohort ch
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and sc.cohort_id = cs.cohort_id and sc.specimen_id = ls.id and sc.cancer_id = lc.id ";
    
    if specimen != "" then
		set @queryString = concat(@queryString, "and sc.specimen_id in (",specimen,") ");
    end if;
    
    if cancer != "" then
		set @queryString = concat(@queryString, "and sc.cancer_id in (",cancer,") ");
    end if;
    
    if cohort != "" then
		set @queryString = concat(@queryString, "and sc.cohort_id in (",cohort,") ");
    end if;
    
    set @query = concat(@queryString, " order by sc.specimen_id, sc.cancer_id, cs.cohort_acronym");
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: updateCohort_basic
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `update_cohort_basic` //

CREATE  PROCEDURE `update_cohort_basic`(in targetID int(11), in info JSON)
BEGIN
	DECLARE i INT DEFAULT 0;
	DECLARE new_id INT DEFAULT targetID;
	
    DECLARE flag INT DEFAULT 1;
 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;

	SELECT `status` INTO @cohort_status FROM cohort WHERE id = `targetID`;

    IF @cohort_status = 'published' then 
	   call select_unpublished_cohort_id(targetID, new_id); 
    else 
       set new_id = targetID;
    END IF;

  START transaction;
  
	drop table if exists temp_PI_IDS;
    create table temp_PI_IDS(
		upToDatePIId int not null default 0
    );
    
	SELECT `status` INTO @cohort_status FROM cohort WHERE id = new_id;

    SET @completionDate = JSON_UNQUOTE(JSON_EXTRACT(info, '$.completionDate'));
    SET @latest_cohort = new_id;
	UPDATE `cohort_basic` 
	SET 
		cohort_web_site = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohort_web_site')),
		-- get_cohort_basic_infodate_completed =if(@completionDate is not null and @completionDate != '' and @completionDate != 'null', replace(replace(@completionDate, 'T', ' '), 'Z', ''), NOW()),
		clarification_contact = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.clarification_contact')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.clarification_contact'))),
		sameAsSomeone = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.sameAsSomeone')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.sameAsSomeone'))),
		cohort_description = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohort_description')),
		eligible_gender_id = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_gender_id')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_gender_id'))),
		eligible_disease = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_disease')) = 'true', 1 , 0),
		eligible_disease_cancer_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_disease_cancer_specify')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_disease_cancer_specify'))),
		eligible_disease_other_specify = JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligible_disease_other_specify')),
		enrollment_total = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_total')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_total'))),
		enrollment_year_start = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_start')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_start'))),
		enrollment_year_end = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_end')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_end'))),
		enrollment_ongoing = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_ongoing')) = 'null', null, CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_ongoing')) AS SIGNED)),
		enrollment_target = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_target')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_target'))),
		enrollment_year_complete = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_complete')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_year_complete'))),
		enrollment_age_min = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_min')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_min'))),
		enrollment_age_max = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_max')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_max'))),
		enrollment_age_median = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_median')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_mean'))),
		enrollment_age_mean = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_mean')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollment_age_mean'))),
		current_age_min = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_min')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_min'))),
		current_age_max = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_max')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_max'))),
		current_age_median = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_median')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_median'))),
		current_age_mean = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_mean')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.current_age_mean'))),
		time_interval = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.time_interval')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.time_interval'))),
		most_recent_year = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.most_recent_year')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.most_recent_year'))),
		data_collected_in_person = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_in_person')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_in_person'))),
		data_collected_phone = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_phone')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_phone'))),
		data_collected_paper = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_paper')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_paper'))),
		data_collected_web = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_web')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_web'))),
		data_collected_other = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_other')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_other'))),
		data_collected_other_specify = IF(data_collected_other = 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_collected_other_specify')), ''),
		restrictions = IF (JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireNone')) = 1, '1_0_0_0_0_0_0_0',
						   CONCAT('0_', if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireNone')) = 'null', '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireNone')) as CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireIrb')) = 'null', '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireIrb')) as CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireData')) = 'null', '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireData'))  as CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictGenoInfo')) = 'null', '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictGenoInfo'))  as CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOtherDb')) = 'null', '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOtherDb'))  as CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictCommercial')) = 'null', '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictCommercial'))  as CHAR)), '_',
										if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOther')) = 'null', '0', CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOther'))  as CHAR)))),
		restrictions_other_specify = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOther'))= 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictions_other_specify')), ''),
		strategy_routine = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_routine')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_routine'))),
		strategy_mailing = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_mailing')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_mailing'))),
		strategy_aggregate_study = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_aggregate_study')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_aggregate_study'))),
		strategy_individual_study = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_individual_study')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_individual_study'))),
		strategy_invitation = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_invitation')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_invitation'))),
		strategy_other = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_other')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_other'))),
		strategy_other_specify = IF(strategy_other = 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategy_other_specify')), ''),
		questionnaire_url = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.questionnaire_url')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.questionnaire_url'))),
		main_cohort_url = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.main_cohort_url')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.main_cohort_url'))),
		data_url = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_url')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.data_url'))),
		specimen_url = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.specimen_url')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.specimen_url'))),
		publication_url = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.publication_url')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.publication_url'))),
		update_time = NOW()
		WHERE cohort_id = new_id;
		-- update section status
		IF ROW_COUNT() > 0 THEN
			UPDATE cohort_edit_status SET `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionAStatus')) 
			WHERE cohort_id = new_id AND page_code = 'A';
		END IF;
		IF EXISTS (SELECT * FROM person WHERE cohort_id = new_id AND category_id = 1) THEN
			UPDATE person 
			SET `name` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerName'))),
				`position` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPosition')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPosition'))),
				phone = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPhone')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPhone'))),
				country_code = JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerCountry')), 
				email = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerEmail')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerEmail'))),
				update_time = NOW()
			WHERE cohort_id = new_id and category_id = 1;
		ELSE
			INSERT INTO person(cohort_id, category_id, `name`, `position`, phone, country_code, email, create_time, update_time)
			VALUES (new_id, 1, if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerName'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPosition')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPosition'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPhone')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerPhone'))),
					JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerCountry')), 
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerEmail')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.completerEmail'))),
					NOW(), NOW());
		END IF;
		IF EXISTS (SELECT * FROM person WHERE cohort_id = new_id AND category_id = 2) THEN
			UPDATE person
			SET `name` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterName'))),
				`position` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPosition')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPosition'))),
				phone = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPhone')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPhone'))),
				country_code = JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterCountry')), 
				email = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterEmail')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterEmail'))),
				update_time = NOW()
			WHERE cohort_id = new_id and category_id = 2;
	   ELSE
			INSERT INTO person(cohort_id, category_id, `name`, `position`, phone, country_code, email, create_time, update_time)
			VALUES (new_id, 2, if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterName'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPosition')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPosition'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPhone')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterPhone'))),
					JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterCountry')), 
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterEmail')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.contacterEmail'))),
					NOW(), NOW());
		END IF; 
		IF EXISTS (SELECT * FROM person WHERE cohort_id = new_id AND category_id = 4) THEN
			UPDATE person
			SET `name` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorName'))),
				`position` = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPosition')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPosition'))),
				phone = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPhone')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPhone'))),
				country_code = JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorCountry')), 
				email = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorEmail')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorEmail'))),
				update_time = NOW()
			WHERE cohort_id = new_id and category_id = 4;
		ELSE
			INSERT INTO person(cohort_id, category_id, `name`, `position`, phone, country_code, email, create_time, update_time)
			VALUES (new_id, 4, if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorName'))='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorName'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPosition')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPosition'))),
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPhone')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorPhone'))),
					JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorCountry')), 
					if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorEmail')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collaboratorEmail'))),
					NOW(), NOW());
		END IF; 
		
		SET @investigators = JSON_UNQUOTE(JSON_EXTRACT(info, '$.investigators'));
		WHILE i < JSON_LENGTH(@investigators) DO
			SELECT JSON_EXTRACT(@investigators, concat('$[',i,']')) INTO @investigator;
		
			IF targetID <> new_id THEN -- if duplication occurred
				select new_PI_Id into @new_PI_Id from mapping_old_PI_Id_To_New WHERE old_PI_Id =  JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.personId'));
			else
				set @new_PI_Id = JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.personId'));
			end if;
		
			if exists(select * from person where id = @new_PI_Id) then
			begin
				insert into temp_PI_IDS (upToDatePIId) values (@new_PI_Id);
				update person 
				SET `name` = JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.name')),
					institution = JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.institution')),
					email = JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.email'))
				WHERE id = @new_PI_Id;
				-- delete from mapping_old_PI_Id_To_New where new_PI_Id = @new_PI_Id;
			end;
			else 
            begin
				Insert into person (cohort_id, category_id, `name`, institution, email) values (new_id, 3,  JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.name')),
				JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.institution')), JSON_UNQUOTE(JSON_EXTRACT(@investigator, '$.email')));
				insert into temp_PI_IDS (upToDatePIId) values (last_insert_id());
			end;
			end if;
			SELECT i + 1 INTO i;
		END WHILE;
		
		delete from person where cohort_id = new_id and category_id = 3 and id not in (select upToDatePIId from temp_PI_IDS);
		TRUNCATE TABLE mapping_old_PI_Id_To_New;

        -- END IF; */
        -- attachment_type: 1 for files, 0 for websites
        -- category: 1 for main website, 2 for questionnaire, 3 for main protocol, 4 for data policy, 5 for specimen, 6 for publication
        -- set @questionnaireFileEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.questionnaireFileName'));
        -- set @mainFileEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.mainFileName'));
        -- set @dataFileEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataFileName'));
		-- set @specimenFileEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.specimenFileName'));
        -- set @publicationFileEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.publicationFileName'));
        
        set @questionnaireUrlEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.questionnaireUrl'));
        set @mainUrlEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.mainCohortUrl'));
        set @dataUrlEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataUrl'));
        set @specimenUrlEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.specimenUrl'));
        set @publicationUrlEntry = JSON_UNQUOTE(JSON_EXTRACT(info, '$.publicationUrl'));
        -- questionnaire/url-2
        IF(@questionnaireUrlEntry IS NOT NULL) THEN
        BEGIN
			IF EXISTS (SELECT * from attachment WHERE cohort_id = @latest_cohort and attachment_type = 0 and category = 2) THEN
				UPDATE attachment SET website = @questionnaireUrlEntry, update_time = NOW() WHERE cohort_id = @latest_cohort and attachment_type = 0 and category = 2;
			ELSE
				INSERT INTO attachment (cohort_id, attachment_type, category, filename, website, `status`, create_time, update_time)
				VALUES (@latest_cohort, 0, 2, '', @questionnaireUrlEntry, 1, NOW(), NOW());
			END IF; 
		END;
		END IF;
        -- main file/url-3
        IF(@mainUrlEntry IS NOT NULL) THEN
        BEGIN
			IF EXISTS (SELECT * from attachment WHERE cohort_id = @latest_cohort and attachment_type = 0 and category = 3) THEN
            BEGIN
				UPDATE attachment SET website = @mainUrlEntry, update_time = NOW() WHERE cohort_id = @latest_cohort and attachment_type = 0 and category = 3;
			END;
			ELSE
				INSERT INTO attachment (cohort_id, attachment_type, category, filename, website, `status`, create_time, update_time)
				VALUES (@latest_cohort, 0, 3, '', @mainUrlEntry, 1, NOW(), NOW());
			END IF; 
		END;
		END IF;
        -- data file/url-4
        IF(@dataUrlEntry IS NOT NULL) THEN
        BEGIN
			IF EXISTS (SELECT * from attachment WHERE cohort_id = @latest_cohort and attachment_type = 0 and category = 4) THEN
				UPDATE attachment SET website = @dataUrlEntry, update_time = NOW() WHERE cohort_id = @latest_cohort and attachment_type = 0 and category = 4;
			ELSE
				INSERT INTO attachment (cohort_id, attachment_type, category, filename, website, `status`, create_time, update_time)
				VALUES (@latest_cohort, 0, 4, '', @dataUrlEntry, 1, NOW(), NOW());
			END IF; 
		END;
		END IF;
        -- specimen file/url-5
        IF(@specimenUrlEntry IS NOT NULL) THEN
        BEGIN
			IF EXISTS (SELECT * from attachment WHERE cohort_id = @latest_cohort and attachment_type = 0 and category = 5) THEN
				UPDATE attachment SET website = @specimenUrlEntry, update_time = NOW() WHERE cohort_id = @latest_cohort and attachment_type = 0 and category = 5;
			ELSE
				INSERT INTO attachment (cohort_id, attachment_type, category, filename, website, `status`, create_time, update_time)
				VALUES (@latest_cohort, 0, 5, '', @specimenUrlEntry, 1, NOW(), NOW());
			END IF; 
		END;
		END IF;
        -- publication file/url
        IF(@publicationUrlEntry IS NOT NULL) THEN
        BEGIN
			IF EXISTS (SELECT * from attachment WHERE cohort_id = @latest_cohort and attachment_type = 0 and category = 6) THEN
				UPDATE attachment SET website = @publicationUrlEntry, update_time = NOW() WHERE cohort_id = @latest_cohort and attachment_type = 0 and category = 6;
			ELSE
				INSERT INTO attachment (cohort_id, attachment_type, category, filename, website, `status`, create_time, update_time)
				VALUES (@latest_cohort, 0, 6, '', @publicationUrlEntry, 1, NOW(), NOW());
			END IF; 
		END;
		END IF;

 commit;
	
    SELECT flag AS rowsAffacted;
    SELECT id as personId, cohort_id, category_id,
	`name`, `position`, institution, phone, country_code,
	email, create_time, update_time from person
	where cohort_id = new_id and category_id = 3;
	SELECT new_id as duplicated_cohort_id;
    if exists (select * from cohort where id = new_id and status = 'new') then
		update cohort set status = 'draft', update_time = NOW() where id = new_id;
	end if;
	SELECT `status` from cohort where id = new_id;
    
END //



-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_admin_cohortlist
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_admin_cohortlist` //

CREATE PROCEDURE `select_admin_cohortlist`(in status text, in cohortSearch text,
                  in columnName varchar(40), in columnOrder varchar(10),
									in pageIndex int, in pageSize int)
BEGIN 
  declare tmp text default '';
  declare v text default ''; 
	declare i int default 0;
  declare tmp_count int default 0; 
    
  set @status_query = " and lower(ch.status) in (select lower(cohortstatus) from lu_cohort_status where 1=1 ";
    
  if status != "" then
    set @status_query = concat(@status_query, " and id in (",status,") ) ");
	else
    set @status_query = concat(@status_query,") ");
	end if;
    
   if cohortSearch != "" then
      set @status_query = concat(" and ( lower(acronym) like lower('%", cohortSearch, "%') or lower(name) like lower('%", cohortSearch, "%')) ", @status_query);
    end if;
    
    
  if columnName != "" then
		set @orderBy = concat(" order by ",columnName," ",columnOrder," ");
	else
		set @orderBy = "order by ch.id desc";
  end if;
    
  if pageIndex > -1 then
		set @paging = concat(' limit ',pageIndex,',',pageSize,' ');
	else
		set @paging = "";
  end if;
    
  set @query = concat("select sql_calc_found_rows ch.id, ch.name, ch.acronym,ch.status,l_status.id as status_id, concat(u1.first_name, ' ', u1.last_name) create_by, 
	 (case when ch.publish_by is null then null else (select concat(u2.first_name, ' ', u2.last_name) from user u2 where u2.id=ch.publish_by) end) publish_by,
	 (case when ch.update_time is not null then DATE_FORMAT(ch.update_time, '%m/%d/%Y') else null end) as update_time,
	  (case when lower(ch.status) in ('submitted', 'in review') then 'review' else 'view' end) action
	 FROM cohort ch, user u1, lu_cohort_status l_status WHERE IFNULL(ch.create_by, 1)=u1.id and lower(ch.status)=lower(l_status.cohortstatus) ", @status_query);
  
  set @query = concat(@query, @orderBy, @paging);
	
  PREPARE stmt FROM @query;
	EXECUTE stmt;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt;
  
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
        ,cohort_web_site
        -- ,date_format(date_completed, '%Y-%m-%dT%H:%i:%s.000Z') as completionDate
        ,clarification_contact
        ,sameAsSomeone
        ,cohort_description
        ,eligible_gender_id
        ,eligible_disease
        ,eligible_disease_cancer_specify
        ,eligible_disease_other_specify
        ,enrollment_total
        ,enrollment_year_start
        ,enrollment_year_end
        ,enrollment_ongoing
        ,enrollment_target
        ,enrollment_year_complete
        ,enrollment_age_min
        ,enrollment_age_max
        ,enrollment_age_median
        ,enrollment_age_mean
        ,current_age_min
        ,current_age_max
        ,current_age_median
        ,current_age_mean
        ,time_interval
        ,most_recent_year
        ,data_collected_in_person
        ,data_collected_phone
        ,data_collected_paper
        ,data_collected_web
        ,data_collected_other
        ,data_collected_other_specify
        ,cast(substring(restrictions, 1, 1) as signed) as requireNone
        ,cast(substring(restrictions, 3, 1) as signed) as requireCollab
        ,cast(substring(restrictions, 5, 1) as signed) as requireIrb
        ,cast(substring(restrictions, 7, 1) as signed) as requireData
        ,cast(substring(restrictions, 9, 1) as signed) as restrictGenoInfo
        ,cast(substring(restrictions, 11, 1) as signed) as restrictOtherDb
        ,cast(substring(restrictions, 13, 1) as signed) as restrictCommercial
        ,cast(substring(restrictions, 15, 1) as signed) as restrictOther
        ,restrictions_other_specify
        ,strategy_routine 
        ,strategy_mailing 
        ,strategy_aggregate_study 
        ,strategy_individual_study 
        ,strategy_invitation 
        ,strategy_other 
        ,strategy_other_specify
        ,questionnaire_url
        ,main_cohort_url
        ,data_url
        ,specimen_url
        ,publication_url
        
	FROM cohort_basic WHERE cohort_id = `targetID`;
    
    select `name` as completerName, `position` as completerPosition, phone as completerPhone, country_code as completerCountry, email as completerEmail 
    from person where category_id = 1 and cohort_id = `targetID`;
    
    select `name` as contacterName, `position` as contacterPosition, phone as contacterPhone, country_code as contacterCountry, email as contacterEmail 
    from person where category_id = 2 and cohort_id = `targetID`;
    
    select id as personId, `name` as `name`, institution as institution, email as email
    from person where (`name` is not null and `name` <> '') and category_id = 3 and cohort_id = `targetID`;
    
    select `name` as collaboratorName, `position` as collaboratorPosition, phone as collaboratorPhone, country_code as collaboratorCountry, email as collaboratorEmail 
    from person where category_id = 4 and cohort_id = `targetID`;
    
    select page_code, `status` as section_status from cohort_edit_status where cohort_id = `targetID`;
    
    select `status` as cohort_status from cohort where id = targetID;
    
    select
     id as fileId,
	 category as fileCategory,
     filename from attachment
     where cohort_id = targetID and filename !='' and filename is not null;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: upsert_enrollment_count
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS update_enrollment_count //

CREATE PROCEDURE `update_enrollment_count`(in targetID int(11), in info JSON)
BEGIN
	DECLARE new_id INT DEFAULT 0;
    DECLARE flag INT DEFAULT 1;
 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
    
	SELECT `status` INTO @cohort_status FROM cohort WHERE id = targetID;
    IF @cohort_status = 'published' then 
    call select_unpublished_cohort_id(targetID, new_id); 
    else
     set new_id = targetID;
    END IF;
    
     /*
    *  select_unpublished_cohort_id should retunr a cohort_id not in published status
    * if new_id not 0 (default value), continue
    */
 
    
  IF new_id > 0  THEN
		BEGIN

	SET @recentDate = JSON_UNQUOTE(JSON_EXTRACT(info, '$.mostRecentDate'));

	if exists (select * from enrollment_count where cohort_id = new_id) then
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
        
        update cohort_edit_status set `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionBStatus')) where 
        cohort_id = new_id and page_code = 'B';
	
    END IF;
    
    update cohort_basic 
    set enrollment_most_recent_date = if(@recentDate is not null and @recentDate != '' and @recentDate != 'null', replace(replace(@recentDate, 'T', ' '), 'Z', ''), NULL)
	where cohort_id = new_id;
    -- SET @rowcount = ROW_COUNT();
    SELECT flag AS rowsAffacted;
    
	SELECT new_id as duplicated_cohort_id;
    if exists (select * from cohort where id = new_id and status = 'new') then
		update cohort set status = 'draft', update_time = NOW() where id = new_id;
	end if;
	SELECT `status` from cohort where id = new_id;
	
    end;
    end if;
    
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
    
	SELECT CAST(race_id as CHAR) AS rowId, SUM(enrollment_counts) AS rowTotal 
	from enrollment_count 
	where cohort_id = `targetID` group by race_id ;

	select concat(cast(t.ethnicity_id as char), cast(t.gender_id as char)) as colId, sum(t.enrollment_counts) as colTotal
	from (select enrollment_counts, race_id, ethnicity_id, gender_id 
	from enrollment_count
	where cohort_id = `targetID`
	order by ethnicity_id, gender_id, race_id) as t
	group by t.ethnicity_id, t.gender_id;
	 
	select sum(enrollment_counts)  as grandTotal
	from enrollment_count
	where cohort_id = `targetID`;
     
	select date_format(enrollment_most_recent_date, '%Y-%m-%dT%H:%i:%s.000Z') as mostRecentDate from cohort_basic where cohort_id = `targetID`;
END//

DROP PROCEDURE IF EXISTS add_file_attachment //

CREATE PROCEDURE `add_file_attachment`(in targetID int, in categoryType int, in info JSON)

begin
	DECLARE i INT default 0;
    DECLARE flag INT DEFAULT 1;
	DECLARE new_id INT DEFAULT 0;
   
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;

    SELECT `status` INTO @cohort_status FROM cohort WHERE id = targetID;

    IF @cohort_status = 'published' then 
	   call select_unpublished_cohort_id(targetID, new_id); 
    else 
       set new_id = targetID;
    END IF;
    
    IF new_id > 0 THEN
    BEGIN
    START TRANSACTION;
	SET @filenames = JSON_UNQUOTE(JSON_EXTRACT(info, '$.filenames'));
		WHILE i < JSON_LENGTH(@filenames) DO
			SELECT JSON_EXTRACT(@filenames, concat('$[',i,']')) INTO @filename;
            set @filename = replace(@filename, '"', '');
			insert into attachment (cohort_id, attachment_type, category, fileName, website, status, create_time, update_time)
			values (new_id, 1, categoryType, @fileName, '', 1, NOW(), NOW());
			SELECT i + 1 INTO i;
		END WHILE;
	COMMIT;
    END;
    END IF;
    SELECT flag as rowsAffacted;
    SELECT new_id;
    SELECT id AS fileId, category AS fileCategory, filename FROM attachment
	WHERE cohort_id = new_id and category = categoryType;
end //

DROP PROCEDURE IF EXISTS get_major_content //

CREATE PROCEDURE `get_major_content`(in targetID int)
begin
select cohort_id, category_id, category, sub_category, baseline, followup, other_specify_baseline, other_specify_followup from 
major_content m join lu_data_category d
on m.category_id = d.id
where cohort_id = targetID order by category_id;

select mdc_acute_treatment_toxicity as cancerToxicity, mdc_late_effects_of_treatment as cancerLateEffects,
 mdc_symptoms_management as cancerSymptom, mdc_other_cancer_condition  as cancerOther, mdc_other_cancer_condition_specify as cancerOtherSpecify
from cancer_info where cohort_id = targetID;
end //

DROP PROCEDURE IF EXISTS upsert_major_content //

CREATE  PROCEDURE `upsert_major_content`(in Old_targetID int, in info JSON)
begin
	DECLARE flag INT DEFAULT 1;
	DECLARE targetID INT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;

	SELECT `status` INTO @cohort_status FROM cohort WHERE id = Old_targetID;
    IF @cohort_status = 'published' then call select_unpublished_cohort_id(Old_targetID, targetID);
	else set targetID = Old_targetID;
    END IF;
    IF targetID > 0 then
    begin
    start transaction;
	if exists (select * from major_content where cohort_id = targetID) then
    begin
		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.seStatusBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.seStatusBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.seStatusFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.seStatusFollowUp'))) where cohort_id = targetID and category_id = 1 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.educationBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.educationBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.educationFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.educationFollowUp'))) where cohort_id = targetID and category_id = 2 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.maritalStatusBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.maritalStatusBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.maritalStatusFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.maritalStatusFollowUp'))) where cohort_id = targetID and category_id = 3 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.originBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.originBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.originFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.originFollowUp'))) where cohort_id = targetID and category_id = 4 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.empStatusBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.empStatusBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.empStatusFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.empStatusFollowUp'))) where cohort_id = targetID and category_id = 5 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.insuranceStatusBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.insuranceStatusBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.insuranceStatusFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.insuranceStatusFollowUp'))) where cohort_id = targetID and category_id = 6 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.anthropometryBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.anthropometryBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.anthropometryFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.anthropometryFollowUp'))) where cohort_id = targetID and category_id = 7 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dietaryBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.dietaryBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dietaryFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.dietaryFollowUp'))) where cohort_id = targetID and category_id = 8 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.supplementBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.supplementBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.supplementFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.supplementFollowUp'))) where cohort_id = targetID and category_id = 9;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.medicineBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.medicineBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.medicineFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.medicineFollowUp'))) where cohort_id = targetID and category_id = 10 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.prescriptionBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.prescriptionBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.prescriptionFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.prescriptionFollowUp'))) where cohort_id = targetID and category_id = 11 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.nonprescriptionBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.nonprescriptionBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.nonprescriptionFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.nonprescriptionFollowUp'))) where cohort_id = targetID and category_id = 12;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.alcoholBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.alcoholBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.alcoholFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.alcoholFollowUp'))) where cohort_id = targetID and category_id = 13 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigaretteBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigaretteBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigaretteFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigaretteFollowUp'))) where cohort_id = targetID and category_id = 14 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigarBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigarBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigarFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cigarFollowUp'))) where cohort_id = targetID and category_id = 15 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.pipeBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.pipeBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.pipeFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.pipeFollowUp'))) where cohort_id = targetID and category_id = 16;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.tobaccoFollowUp'))) where cohort_id = targetID and category_id = 17 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.ecigarBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.ecigarBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.ecigarFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.ecigarFollowUp'))) where cohort_id = targetID and category_id = 18 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarOtherBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarOtherBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarOtherFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarOtherFollowUp'))) where cohort_id = targetID and category_id = 19;

		update major_content set other_specify_baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarBaseLineSpecify')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarBaseLineSpecify'))), other_specify_followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarFollowUpSpecify')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.noncigarFollowUpSpecify'))) where cohort_id = targetID and category_id = 19 ;
		
		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalFollowUp'))) where cohort_id = targetID and category_id = 20 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.sleepBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.sleepBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.sleepFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.sleepFollowUp'))) where cohort_id = targetID and category_id = 21 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.reproduceBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.reproduceBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.reproduceFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.reproduceFollowUp'))) where cohort_id = targetID and category_id = 22 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.reportedHealthBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.reportedHealthBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.reportedHealthFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.reportedHealthFollowUp'))) where cohort_id = targetID and category_id = 23 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.lifeBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.lifeBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.lifeFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.lifeFollowUp'))) where cohort_id = targetID and category_id = 24 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.socialSupportBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.socialSupportBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.socialSupportFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.socialSupportFollowUp'))) where cohort_id = targetID and category_id = 25 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitionBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitionBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitionFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitionFollowUp'))) where cohort_id = targetID and category_id = 26 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.depressionBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.depressionBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.depressionFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.depressionFollowUp'))) where cohort_id = targetID and category_id = 27 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.psychosocialBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.psychosocialBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.psychosocialFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.psychosocialFollowUp'))) where cohort_id = targetID and category_id = 28 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.fatigueBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.fatigueBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.fatigueFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.fatigueFollowUp'))) where cohort_id = targetID and category_id = 29 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerHistoryBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerHistoryBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerHistoryFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerHistoryFollowUp'))) where cohort_id = targetID and category_id = 30 ;

		update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerPedigreeBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerPedigreeBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerPedigreeFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerPedigreeFollowUp'))) where cohort_id = targetID and category_id = 31 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.exposureBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.exposureBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.exposureFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.exposureFollowUp'))) where cohort_id = targetID and category_id = 32 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.residenceBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.residenceBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.residenceFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.residenceFollowUp'))) where cohort_id = targetID and category_id = 33 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.diabetesBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.diabetesBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.diabetesFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.diabetesFollowUp'))) where cohort_id = targetID and category_id = 34 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strokeBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.strokeBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strokeFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strokeFollowUp'))) where cohort_id = targetID and category_id = 35 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.copdBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.copdBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.copdFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.copdFollowUp'))) where cohort_id = targetID and category_id = 36 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cardiovascularBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cardiovascularBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cardiovascularFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cardiovascularFollowUp'))) where cohort_id = targetID and category_id = 37 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.osteoporosisBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.osteoporosisBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.osteoporosisFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.osteoporosisFollowUp'))) where cohort_id = targetID and category_id = 38 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.mentalBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.mentalBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.mentalFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.mentalFollowUp'))) where cohort_id = targetID and category_id = 39 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitiveDeclineBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitiveDeclineBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitiveDeclineFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cognitiveDeclineFollowUp'))) where cohort_id = targetID and category_id = 40 ;

update major_content set baseline = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalMeasureBaseLine')) = 'null', null,JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalMeasureBaseLine'))), followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalMeasureFollowUp')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.physicalMeasureFollowUp'))) where cohort_id = targetID and category_id = 41 ;

        update cancer_info set mdc_acute_treatment_toxicity = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerToxicity')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerToxicity'))),
							   mdc_late_effects_of_treatment = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerLateEffects')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerLateEffects'))),
                               mdc_symptoms_management = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerSymptom')) ='null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerSymptom'))),
                               mdc_other_cancer_condition = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerOther')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerOther'))),
                               mdc_other_cancer_condition_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerOtherSpecify')) = 'null', null, JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerOtherSpecify')))
		where cohort_id = targetID;
        update cohort_edit_status set `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionCStatus'))
        
        where 
        cohort_id = targetID and page_code = 'C';
    end;
    end if;
    commit;
    
    SELECT flag as rowAffacted;
    
    SELECT targetID as duplicated_cohort_id;
    if exists (select * from cohort where id = targetID and status = 'new') then
		update cohort set status = 'draft', update_time = NOW() where id = targetID;
	end if;
	SELECT `status` from cohort where id = targetID;
    end;
    end if;
end //

DROP PROCEDURE if EXISTS `get_specimen_counts` //

CREATE PROCEDURE `get_specimen_counts`(in targetID int)
begin
	select c.cancer, ls.specimen,
	concat(cast(c.id as char), '-', cast(s.specimen_id as char)) as cellId,
	s.specimens_counts as counts
	from specimen_count s
	join lu_cancer c on s.cancer_id = c.id
	join lu_specimen ls on s.specimen_id = ls.id
	where cohort_id = targetID order by cancer_id, specimen_id;
end //

DROP PROCEDURE if EXISTS `update_specimen_section_data` //

CREATE  PROCEDURE `update_specimen_section_data`(in targetID int, in info JSON)
begin
	DECLARE flag INT DEFAULT 1;
	DECLARE i INT DEFAULT 0;
    DECLARE cohortID INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
    
    SELECT `status` INTO @cohort_status FROM cohort WHERE id = `targetID`;

    IF @cohort_status = 'published' then call select_unpublished_cohort_id(targetID, cohortID); 
    else 
     set cohortID = targetID;
    END IF;
    /*
    *  select_unpublished_cohort_id should retunr a cohort_id not in published status
    * if cohortID not 0 (default value), continue
    */
 
    
  IF cohortID > 0  THEN
		BEGIN
        
  SET @counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$.counts')) ;


  START transaction;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-1"')) where cancer_id = 1 and specimen_id = 1 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-2"')) where cancer_id = 1 and specimen_id = 2 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-3"')) where cancer_id = 1 and specimen_id = 3 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-4"')) where cancer_id = 1 and specimen_id = 4 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-5"')) where cancer_id = 1 and specimen_id = 5 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-6"')) where cancer_id = 1 and specimen_id = 6 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."1-7"')) where cancer_id = 1 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-1"')) where cancer_id = 2 and specimen_id = 1 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-2"')) where cancer_id = 2 and specimen_id = 2 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-3"')) where cancer_id = 2 and specimen_id = 3 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-4"')) where cancer_id = 2 and specimen_id = 4 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-5"')) where cancer_id = 2 and specimen_id = 5 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-6"')) where cancer_id = 2 and specimen_id = 6 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."2-7"')) where cancer_id = 2 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-1"')) where cancer_id = 3 and specimen_id = 1 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-2"')) where cancer_id = 3 and specimen_id = 2 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-3"')) where cancer_id = 3 and specimen_id = 3 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-4"')) where cancer_id = 3 and specimen_id = 4 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-5"')) where cancer_id = 3 and specimen_id = 5 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-6"')) where cancer_id = 3 and specimen_id = 6 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."3-7"')) where cancer_id = 3 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-1"')) where cancer_id = 4 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-2"')) where cancer_id = 4 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-3"')) where cancer_id = 4 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-4"')) where cancer_id = 4 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-5"')) where cancer_id = 4 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-6"')) where cancer_id = 4 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."4-7"')) where cancer_id = 4 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-1"')) where cancer_id = 5 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-2"')) where cancer_id = 5 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-3"')) where cancer_id = 5 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-4"')) where cancer_id = 5 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-5"')) where cancer_id = 5 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-6"')) where cancer_id = 5 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."5-7"')) where cancer_id = 5 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-1"')) where cancer_id = 6 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-2"')) where cancer_id = 6 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-3"')) where cancer_id = 6 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-4"')) where cancer_id = 6 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-5"')) where cancer_id = 6 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-6"')) where cancer_id = 6 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."6-7"')) where cancer_id = 6 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-1"')) where cancer_id = 7 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-2"')) where cancer_id = 7 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-3"')) where cancer_id = 7 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-4"')) where cancer_id = 7 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-5"')) where cancer_id = 7 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-6"')) where cancer_id = 7 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."7-7"')) where cancer_id = 7 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-1"')) where cancer_id = 8 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-2"')) where cancer_id = 8 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-3"')) where cancer_id = 8 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-4"')) where cancer_id = 8 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-5"')) where cancer_id = 8 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-6"')) where cancer_id = 8 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."8-7"')) where cancer_id = 8 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-1"')) where cancer_id = 9 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-2"')) where cancer_id = 9 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-3"')) where cancer_id = 9 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-4"')) where cancer_id = 9 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-5"')) where cancer_id = 9 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-6"')) where cancer_id = 9 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."9-7"')) where cancer_id = 9 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-1"')) where cancer_id = 10 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-2"')) where cancer_id = 10 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-3"')) where cancer_id = 10 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-4"')) where cancer_id = 10 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-5"')) where cancer_id = 10 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-6"')) where cancer_id = 10 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."10-7"')) where cancer_id = 10 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-1"')) where cancer_id = 11 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-2"')) where cancer_id = 11 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-3"')) where cancer_id = 11 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-4"')) where cancer_id = 11 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-5"')) where cancer_id = 11 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-6"')) where cancer_id = 11 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."11-7"')) where cancer_id = 11 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-1"')) where cancer_id = 12 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-2"')) where cancer_id = 12 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-3"')) where cancer_id = 12 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-4"')) where cancer_id = 12 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-5"')) where cancer_id = 12 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-6"')) where cancer_id = 12 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."12-7"')) where cancer_id = 12 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-1"')) where cancer_id = 13 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-2"')) where cancer_id = 13 and specimen_id = 2 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-3"')) where cancer_id = 13 and specimen_id = 3 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-4"')) where cancer_id = 13 and specimen_id = 4 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-5"')) where cancer_id = 13 and specimen_id = 5 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-6"')) where cancer_id = 13 and specimen_id = 6 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."13-7"')) where cancer_id = 13 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-1"')) where cancer_id = 14 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-2"')) where cancer_id = 14 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-3"')) where cancer_id = 14 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-4"')) where cancer_id = 14 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-5"')) where cancer_id = 14 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-6"')) where cancer_id = 14 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."14-7"')) where cancer_id = 14 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-1"')) where cancer_id = 15 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-2"')) where cancer_id = 15 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-3"')) where cancer_id = 15 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-4"')) where cancer_id = 15 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-5"')) where cancer_id = 15 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-6"')) where cancer_id = 15 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."15-7"')) where cancer_id = 15 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-1"')) where cancer_id = 16 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-2"')) where cancer_id = 16 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-3"')) where cancer_id = 16 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-4"')) where cancer_id = 16 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-5"')) where cancer_id = 16 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-6"')) where cancer_id = 16 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."16-7"')) where cancer_id = 16 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-1"')) where cancer_id = 17 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-2"')) where cancer_id = 17 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-3"')) where cancer_id = 17 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-4"')) where cancer_id = 17 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-5"')) where cancer_id = 17 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-6"')) where cancer_id = 17 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."17-7"')) where cancer_id = 17 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-1"')) where cancer_id = 18 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-2"')) where cancer_id = 18 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-3"')) where cancer_id = 18 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-4"')) where cancer_id = 18 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-5"')) where cancer_id = 18 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-6"')) where cancer_id = 18 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."18-7"')) where cancer_id = 18 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-1"')) where cancer_id = 19 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-2"')) where cancer_id = 19 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-3"')) where cancer_id = 19 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-4"')) where cancer_id = 19 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-5"')) where cancer_id = 19 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-6"')) where cancer_id = 19 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."19-7"')) where cancer_id = 19 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-1"')) where cancer_id = 20 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-2"')) where cancer_id = 20 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-3"')) where cancer_id = 20 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-4"')) where cancer_id = 20 and specimen_id = 4 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-5"')) where cancer_id = 20 and specimen_id = 5 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-6"')) where cancer_id = 20 and specimen_id = 6 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."20-7"')) where cancer_id = 20 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-1"')) where cancer_id = 21 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-2"')) where cancer_id = 21 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-3"')) where cancer_id = 21 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-4"')) where cancer_id = 21 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-5"')) where cancer_id = 21 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-6"')) where cancer_id = 21 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."21-7"')) where cancer_id = 21 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-1"')) where cancer_id = 22 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-2"')) where cancer_id = 22 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-3"')) where cancer_id = 22 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-4"')) where cancer_id = 22 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-5"')) where cancer_id = 22 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-6"')) where cancer_id = 22 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."22-7"')) where cancer_id = 22 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-1"')) where cancer_id = 23 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-2"')) where cancer_id = 23 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-3"')) where cancer_id = 23 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-4"')) where cancer_id = 23 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-5"')) where cancer_id = 23 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-6"')) where cancer_id = 23 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."23-7"')) where cancer_id = 23 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-1"')) where cancer_id = 24 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-2"')) where cancer_id = 24 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-3"')) where cancer_id = 24 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-4"')) where cancer_id = 24 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-5"')) where cancer_id = 24 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-6"')) where cancer_id = 24 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."24-7"')) where cancer_id = 24 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-1"')) where cancer_id = 25 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-2"')) where cancer_id = 25 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-3"')) where cancer_id = 25 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-4"')) where cancer_id = 25 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-5"')) where cancer_id = 25 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-6"')) where cancer_id = 25 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."25-7"')) where cancer_id = 25 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-1"')) where cancer_id = 26 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-2"')) where cancer_id = 26 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-3"')) where cancer_id = 26 and specimen_id = 3 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-4"')) where cancer_id = 26 and specimen_id = 4 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-5"')) where cancer_id = 26 and specimen_id = 5 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-6"')) where cancer_id = 26 and specimen_id = 6 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."26-7"')) where cancer_id = 26 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-1"')) where cancer_id = 27 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-2"')) where cancer_id = 27 and specimen_id = 2 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-3"')) where cancer_id = 27 and specimen_id = 3 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-4"')) where cancer_id = 27 and specimen_id = 4 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-5"')) where cancer_id = 27 and specimen_id = 5 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-6"')) where cancer_id = 27 and specimen_id = 6 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."27-7"')) where cancer_id = 27 and specimen_id = 7 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-1"')) where cancer_id = 28 and specimen_id = 1 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-2"')) where cancer_id = 28 and specimen_id = 2 and cohort_id = `cohortID`;	
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-3"')) where cancer_id = 28 and specimen_id = 3 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-4"')) where cancer_id = 28 and specimen_id = 4 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-5"')) where cancer_id = 28 and specimen_id = 5 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-6"')) where cancer_id = 28 and specimen_id = 6 and cohort_id = `cohortID`;	
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."28-7"')) where cancer_id = 28 and specimen_id = 7 and cohort_id = `cohortID`;
    update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-1"')) where cancer_id = 29 and specimen_id = 1 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-2"')) where cancer_id = 29 and specimen_id = 2 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-3"')) where cancer_id = 29 and specimen_id = 3 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-4"')) where cancer_id = 29 and specimen_id = 4 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-5"')) where cancer_id = 29 and specimen_id = 5 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-6"')) where cancer_id = 29 and specimen_id = 6 and cohort_id = `cohortID`;
	update specimen_count set specimens_counts = JSON_UNQUOTE(JSON_EXTRACT( @counts, '$."29-7"')) where cancer_id = 29 and specimen_id = 7 and cohort_id = `cohortID`;
  
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaseline'))= 'null' OR JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaseline'))= '', 0, JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaseline')) ) where specimen_id = 11 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineSerum'))= '',0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineSerum'))) where specimen_id = 12 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselinePlasma'))= '', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineSerum'))) where specimen_id = 13 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineBuffyCoat'))= '', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineSerum'))) where specimen_id = 14 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineOtherDerivative'))= '', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodBaselineOtherDerivative'))) where specimen_id = 15 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTime'))= 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTime'))) where specimen_id = 16 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeSerum')) = '', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeSerum'))) where specimen_id = 17 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimePlasma')) = '', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimePlasma'))) where specimen_id = 18 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeBuffyCoat')) = '', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeBuffyCoat'))) where specimen_id = 19 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeOtherDerivative'))= '', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBloodOtherTimeOtherDerivative')))  where specimen_id = 20 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBuccalSalivaBaseline')) = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBuccalSalivaBaseline')))where specimen_id = 21 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBuccalSalivaOtherTime')) = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioBuccalSalivaOtherTime'))) where specimen_id = 22 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTissueBaseline')) = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTissueBaseline'))) where specimen_id = 23 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTissueOtherTime')) = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTissueOtherTime'))) where specimen_id = 24 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioUrineBaseline'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioUrineBaseline'))) where specimen_id = 25 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioUrineOtherTime'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioUrineOtherTime'))) where specimen_id = 26 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioFecesBaseline'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioFecesBaseline'))) where specimen_id = 27 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioFecesOtherTime'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioFecesOtherTime'))) where specimen_id = 28 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherBaseline'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherBaseline'))) where specimen_id = 29 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherOtherTime'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherOtherTime'))) where specimen_id = 30 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioRepeatedSampleSameIndividual'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioRepeatedSampleSameIndividual'))) where specimen_id = 31 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTumorBlockInfo'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTumorBlockInfo'))) where specimen_id = 32 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioGenotypingData'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioGenotypingData'))) where specimen_id = 33 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioSequencingDataExome'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioSequencingDataExome'))) where specimen_id = 34 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioSequencingDataWholeGenome'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioSequencingDataWholeGenome'))) where specimen_id = 35 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioEpigeneticOrMetabolicMarkers'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioEpigeneticOrMetabolicMarkers'))) where specimen_id = 36 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherOmicsData'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioOtherOmicsData'))) where specimen_id = 37 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTranscriptomicsData'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioTranscriptomicsData'))) where specimen_id = 38 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMicrobiomeData'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMicrobiomeData'))) where specimen_id = 39 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetabolomicData'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetabolomicData'))) where specimen_id = 40 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaFastingSample'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaFastingSample'))) where specimen_id = 41 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInCancerStudy'))  = '', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInCancerStudy'))) where specimen_id = 42 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInCvdStudy'))  = '', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInCvdStudy'))) where specimen_id = 43 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInDiabetesStudy'))  = '', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInDiabetesStudy'))) where specimen_id = 44 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInOtherStudy'))  = '', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMetaOutcomesInOtherStudy'))) where specimen_id = 45 and cohort_id = `cohortID`;
update specimen_collected_type set collected_yn = if(JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMemberOfMetabolomicsStudies'))  = 'null', 0,JSON_UNQUOTE(JSON_EXTRACT( info, '$.bioMemberOfMetabolomicsStudies'))) where specimen_id = 46 and cohort_id = `cohortID`;
  
  
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
  where cohort_id = `cohortID`;

  update cohort_edit_status set `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionGStatus')) where 
        cohort_id = `cohortID` and page_code = 'G';
  
  commit;
  select flag as rowsAffacted;
  SELECT cohortID as duplicated_cohort_id;
  if exists (select * from cohort where id = cohortID and status = 'new') then
	update cohort set status = 'draft', update_time = NOW() where id = cohortID;
  end if;
  SELECT `status` from cohort where id = cohortID;
  end ;
  end if ;
  
  end //


DROP PROCEDURE if EXISTS `select_questionnaire_specimen_info` //

CREATE PROCEDURE `select_questionnaire_specimen_info`(in cohort_id integer)
BEGIN
    set @cohort_id = cohort_id;
    
    set @query = "select c.cancer, ls.specimen,
	concat(cast(c.id as char), '-', cast(s.specimen_id as char)) as cellId,
	s.specimens_counts as counts
	from specimen_count s
	join lu_cancer c on s.cancer_id = c.id
	join lu_specimen ls on s.specimen_id = ls.id
	where cohort_id = ? order by cancer_id, specimen_id";
	PREPARE stmt FROM @query;
	EXECUTE stmt using @cohort_id;
	DEALLOCATE PREPARE stmt;
    
    set @query1 = "SELECT cohort_id, specimen_id, sub_category, collected_yn FROM specimen_collected_type a join lu_specimen b on a.specimen_id = b.id WHERE cohort_id = ?";
    
    PREPARE stmt1 FROM @query1;
	EXECUTE stmt1 using @cohort_id;
	DEALLOCATE PREPARE stmt1;
    
    set @query2 = "SELECT * FROM specimen WHERE cohort_id = ?";
   
    PREPARE stmt2 FROM @query2;
	EXECUTE stmt2 using @cohort_id;
	DEALLOCATE PREPARE stmt2;
    
    set @query3 = "select u.email from cohort c join cohort_user_mapping um on c.acronym = um.cohort_acronym join user u on um.user_id = u.id where c.id = ?";
    
    PREPARE stmt3 FROM @query3;
    EXECUTE stmt3 using @cohort_id;
    DEALLOCATE PREPARE stmt3;

END //

DROP PROCEDURE IF EXISTS `select_unpublished_cohort_id` //

CREATE PROCEDURE `select_unpublished_cohort_id`(in targetID int, out new_id int)
BEGIN
	  set new_id = targetID; -- assume it is draft
    if exists (select * from cohort where status = 'published' and id = targetID) then -- if it is published
        if exists (select * from cohort a join cohort b on a.acronym = b.acronym and a.status <> b.status and b.id = targetID) then -- find its copy
            select a.id into new_id from cohort a join cohort b on a.acronym = b.acronym and a.status <> b.status and b.id = targetID;
        else -- if copy not exists, create a new one
           insert cohort (name, acronym, status, publish_by, create_time, update_time) select name, acronym, 'draft', null, now(), now() from cohort
           where id = targetID;
           set new_id = last_insert_id();
           call insert_new_cohort_from_published(new_id, targetID);
 
        end if;
    end if;
END//


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
-- insert into Cohort table
/* assune cohort table was updated, and new cohort_id is passed in
* insert into cohort (id, name, acronym, status, create_by, create_time, update_time)
* select new_cohort_id, cohort_name, cohort_acronym, 'draft', 3, now(), now() from cohort_basic where cohort_id =old_cohort_id;
*/

-- insert into cohort_basic 
drop table if exists cohort_temp;

CREATE TABLE cohort_temp AS SELECT * FROM
    cohort_basic
WHERE
    cohort_id = old_cohort_id;

UPDATE cohort_temp 
SET 
    cohort_id = new_cohort_id;
alter table cohort_temp drop column id;

insert into cohort_basic select null, a.* from cohort_temp a; 

-- insert into person, attachment
-- first person who are not PIs
drop table if exists temp_person;
set sql_mode='';
create table temp_person select * from person where 1=2;

insert into temp_person (cohort_id, category_id, name, position, institution, phone, email, create_time, update_time)
select new_cohort_id, category_id, name, position, institution, phone, email, now(), now() 
from person  where cohort_id = old_cohort_id and name is not null and name != '';

insert into person (cohort_id, category_id, name, position, institution, phone, email, create_time, update_time)
select new_cohort_id, category_id, name, position, institution, phone, email, now(), now() 
from temp_person where cohort_id = new_cohort_id and name is not null and name != '';

insert into mapping_old_PI_Id_To_New 
select new_cohort_id, old.id, new.id 
from person new 
join (select * from person where cohort_id = old_cohort_id and category_id = 3 and name is not null and name != '') as old
on new.name = old.name  and new.category_id and old.category_id where new.cohort_id = new_cohort_id and new.category_id = 3;

insert into attachment (cohort_id, attachment_type, category, filename, website, status, create_time, update_time)
select new_cohort_id, old.attachment_type, old.category, old.filename, old.website, old.status, now() as old_create_time, now() as old_update_time 
from attachment as old where old.cohort_id = old_cohort_id;

insert into mapping_old_file_Id_To_New (cohort_id, old_file_id, new_file_id)
select new_cohort_id, old.id, new.id
from attachment as new join (select * from attachment where cohort_id = old_cohort_id and attachment_type = 1) as old
on new.filename = old.filename and new.category where new.attachment_type = 1 and new.cohort_id = new_cohort_id;

-- insert into enrollment_count
insert into enrollment_count (cohort_id, race_id, ethnicity_id, gender_id, enrollment_counts, create_time, update_time)
select new_cohort_id, old.race_id, old.ethnicity_id, old.gender_id, old.enrollment_counts, now() as col1, now() as col2
from enrollment_count as old where old.cohort_id =old_cohort_id;

-- ---- insert into dlh --
drop table if exists cohort_temp;

CREATE TABLE cohort_temp AS SELECT * FROM
    dlh
WHERE
    cohort_id = old_cohort_id;

UPDATE cohort_temp 
SET 
    cohort_id = new_cohort_id;
alter table cohort_temp drop column id;

insert into dlh select null, a.* from cohort_temp a; 

-- insert into cancer_count
insert into cancer_count (cohort_id,cancer_id,gender_id, case_type_id,cancer_counts, create_time, update_time)
select new_cohort_id, old.cancer_id,old.gender_id, old.case_type_id,old.cancer_counts, now() as col1, now() as col2
from cancer_count as old where old.cohort_id =old_cohort_id;

drop table if exists cohort_temp;

CREATE TABLE cohort_temp AS SELECT * FROM
    cancer_info
WHERE
    cohort_id = old_cohort_id;

UPDATE cohort_temp 
SET 
    cohort_id = new_cohort_id;
alter table cohort_temp drop column id;

insert into cancer_info select null, a.* from cohort_temp a; 

-- insert into major_count
insert into major_content (cohort_id,category_id,baseline, followup, other_specify_baseline,other_specify_followup, create_time, update_time)
select new_cohort_id, lu.id as category_id,baseline, followup, other_specify_baseline,other_specify_followup, 
(case when mdc.create_time is null then now() else mdc.create_time end) as create_time, 
(case when mdc.update_time is null then now() else mdc.update_time end) as update_time
from major_content as mdc right join  
(select * from lu_data_category where category <> 'Cancer Treatment') as lu 
on mdc.cohort_id = old_cohort_id and mdc.category_id = lu.id ;


-- inert into mortality

drop table if exists cohort_temp;

CREATE TABLE cohort_temp AS SELECT * FROM
    mortality
WHERE
    cohort_id = old_cohort_id;

UPDATE cohort_temp 
SET 
    cohort_id = new_cohort_id;
alter table cohort_temp drop column id;

insert into mortality select null, a.* from cohort_temp a; 

-- insert into specimen_count
insert into specimen_count (cohort_id,cancer_id,specimen_id, specimens_counts, create_time, update_time)
select new_cohort_id, old.cancer_id,old.specimen_id, old.specimens_counts, now() as col1, now() as col2
from specimen_count as old where old.cohort_id =old_cohort_id;

insert into specimen_collected_type
select null, new_cohort_id, c.id as specimen_id, b.collected_yn,
(case when b.create_time is null then now() else b.create_time end ) as create_time,
(case when b.update_time is null then now() else b.create_time end ) as update_time
from specimen_collected_type b right join (select * from lu_specimen where id > 10) c
on b.specimen_id = c.id and b.cohort_id = old_cohort_id;

-- inert into specimen

drop table if exists cohort_temp;

CREATE TABLE cohort_temp AS SELECT * FROM
    specimen
WHERE
    cohort_id = old_cohort_id;

UPDATE cohort_temp 
SET 
    cohort_id = new_cohort_id;
alter table cohort_temp drop column id;

insert into specimen select null, a.* from cohort_temp a; 

-- insert into technology
insert into technology (cohort_id,tech_use_of_mobile, tech_use_of_mobile_describe, tech_use_of_cloud, tech_use_of_cloud_describe, create_time, update_time)
select new_cohort_id, old.tech_use_of_mobile, old.tech_use_of_mobile_describe, old.tech_use_of_cloud, old.tech_use_of_cloud_describe, now() as col1, now() as col2
from technology as old where old.cohort_id =old_cohort_id;

-- insert update supporting tables ,for published cohort, 
insert into cohort_edit_status (cohort_id, page_code, status)
values ( new_cohort_id, 'A', 'complete'),
( new_cohort_id, 'B', 'complete'),
( new_cohort_id, 'C', 'complete'),
( new_cohort_id, 'D', 'complete'),
( new_cohort_id, 'E', 'complete'),
( new_cohort_id, 'F', 'complete'),
( new_cohort_id, 'G', 'complete');

/* update log table 
insert into cohort_activity_log (cohort_id, user_id, activity, notes, create_time)
values ( new_cohort_id,  3, 'init new cohort from published cohort new_cohort_id', null, now());
*/

SET SQL_SAFE_UPDATES = 1;
END //

DROP PROCEDURE IF EXISTS `update_mortality` //

CREATE  PROCEDURE `update_mortality`(in Old_targetID int, in info JSON)
BEGIN
	DECLARE flag INT DEFAULT 1;
	DECLARE targetID INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
    
	SELECT `status` INTO @cohort_status FROM cohort WHERE id = Old_targetID;
    IF @cohort_status = 'published' then call select_unpublished_cohort_id(Old_targetID, targetID);
	else set targetID = Old_targetID;
    END IF;
    IF targetID > 0 then
    begin
    start transaction;
	if exists (select * from mortality where cohort_id = `targetID`) then 
		update mortality set mort_year_mortality_followup = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.mortalityYear')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.mortalityYear')) ='',null , json_unquote(json_extract(info, '$.mortalityYear'))) where cohort_id = `targetID`;
		update mortality set mort_death_confirmed_by_ndi_linkage = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathIndex')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathIndex')) ='',null , json_unquote(json_extract(info, '$.deathIndex'))) where cohort_id = `targetID`;
		update mortality set mort_death_confirmed_by_death_certificate = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathCertificate')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathCertificate')) ='',null , json_unquote(json_extract(info, '$.deathCertificate'))) where cohort_id = `targetID`;
		update mortality set mort_death_confirmed_by_other = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherDeath')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherDeath')) ='',null , json_unquote(json_extract(info, '$.otherDeath'))) where cohort_id = `targetID`;
		update mortality set mort_death_confirmed_by_other_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherDeathSpecify')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherDeathSpecify')) ='',null , json_unquote(json_extract(info, '$.otherDeathSpecify'))) where cohort_id = `targetID`;
		update mortality set mort_have_date_of_death = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeathDate')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeathDate')) ='',null , json_unquote(json_extract(info, '$.haveDeathDate'))) where cohort_id = `targetID`;
		update mortality set mort_have_cause_of_death = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeathCause')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeathCause')) ='',null , json_unquote(json_extract(info, '$.haveDeathCause'))) where cohort_id = `targetID`;
		update mortality set mort_death_code_used_icd9 = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.icd9')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.icd9')) ='',null , json_unquote(json_extract(info, '$.icd9'))) where cohort_id = `targetID`;
		update mortality set mort_death_code_used_icd10 = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.icd10')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.icd10')) ='',null , json_unquote(json_extract(info, '$.icd10'))) where cohort_id = `targetID`;
		update mortality set mort_death_not_coded = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.notCoded')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.notCoded')) ='',null , json_unquote(json_extract(info, '$.notCoded'))) where cohort_id = `targetID`;
		update mortality set mort_death_code_used_other = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherCode')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherCode')) ='',null , json_unquote(json_extract(info, '$.otherCode'))) where cohort_id = `targetID`;
		update mortality set mort_death_code_used_other_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherCodeSpecify')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherCodeSpecify')) ='',null , json_unquote(json_extract(info, '$.otherCodeSpecify'))) where cohort_id = `targetID`;
		update mortality set mort_number_of_deaths = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathNumbers')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.deathNumbers')) ='',null , json_unquote(json_extract(info, '$.deathNumbers'))) where cohort_id = `targetID`;
		update mortality set update_time = NOW() where cohort_id = `targetID`;
		update cohort_edit_status set `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionEStatus')) where cohort_id = `targetID` and page_code = 'E';
	end if;
    commit;
	select flag as rowAffacted;
    
	SELECT targetID as duplicated_cohort_id;
    if exists (select * from cohort where id = targetID and status = 'new') then
		update cohort set status = 'draft', update_time = NOW() where id = targetID;
	end if;
	SELECT `status` from cohort where id = targetID;
    end;
    end if;
end //

DROP PROCEDURE IF EXISTS `select_dlh` //

CREATE PROCEDURE `select_dlh` (in targetID int) 
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
		,dlh_procedure_website
		,dlh_procedure_url
		,dlh_procedure_attached
		,dlh_procedure_enclave
		,dlh_enclave_location
		,create_time
		,update_time
	FROM dlh WHERE cohort_id = targetID;
	SELECT status FROM cohort_edit_status WHERE cohort_id = targetID and page_code='F';
end//

DROP PROCEDURE if EXISTS `update_dlh` //

CREATE PROCEDURE `update_dlh`(in Old_targetID int, in info JSON)
BEGIN
	DECLARE targetID INT DEFAULT Old_targetID;
    DECLARE flag INT DEFAULT 1;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
    
	SELECT `status` INTO @cohort_status FROM cohort WHERE id = Old_targetID;
    IF @cohort_status = 'published' then call select_unpublished_cohort_id(Old_targetID, targetID);
	else set targetID = Old_targetID;
    END IF;
    IF targetID > 0 then
    begin
    start transaction;
	if exists (select * from dlh where cohort_id = `targetID`) then 
		update dlh set dlh_linked_to_existing_databases = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLink')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLink')) ='',null , json_unquote(json_extract(info, '$.haveDataLink'))) where cohort_id = `targetID`;
		update dlh set dlh_linked_to_existing_databases_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLinkSpecify')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLinkSpecify')) ='',null , json_unquote(json_extract(info, '$.haveDataLinkSpecify'))) where cohort_id = `targetID`;
		update dlh set dlh_harmonization_projects = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonization')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonization')) ='',null , json_unquote(json_extract(info, '$.haveHarmonization'))) where cohort_id = `targetID`;
		update dlh set dlh_harmonization_projects_specify = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonizationSpecify')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonizationSpecify')) ='',null , json_unquote(json_extract(info, '$.haveHarmonizationSpecify'))) where cohort_id = `targetID`;
		update dlh set dlh_nih_repository = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeposited')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeposited')) ='',null , json_unquote(json_extract(info, '$.haveDeposited'))) where cohort_id = `targetID`;
		update dlh set dlh_nih_dbgap = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dbGaP')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dbGaP')) ='',null , json_unquote(json_extract(info, '$.dbGaP'))) where cohort_id = `targetID`;
		update dlh set dlh_nih_biolincc = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.BioLINCC')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.BioLINCC')) ='',null , json_unquote(json_extract(info, '$.BioLINCC'))) where cohort_id = `targetID`;
		update dlh set dlh_nih_other = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherRepo')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherRepo')) ='',null , json_unquote(json_extract(info, '$.otherRepo'))) where cohort_id = `targetID`;
		update dlh set dlh_procedure_online = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnline')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnline')) ='',null , json_unquote(json_extract(info, '$.dataOnline'))) where cohort_id = `targetID`;
		update dlh set dlh_procedure_website = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineWebsite')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineWebsite')) ='',null , json_unquote(json_extract(info, '$.dataOnlineWebsite'))) where cohort_id = `targetID`;
		update dlh set dlh_procedure_url = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL')) ='',null , json_unquote(json_extract(info, '$.dataOnlineURL'))) where cohort_id = `targetID`;
		update dlh set dlh_procedure_attached = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlinePolicy')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlinePolicy')) ='',null , json_unquote(json_extract(info, '$.dataOnlinePolicy'))) where cohort_id = `targetID`;
		update dlh set dlh_procedure_enclave = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepo')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepo')) ='',null , json_unquote(json_extract(info, '$.createdRepo'))) where cohort_id = `targetID`;
		update dlh set dlh_enclave_location = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepoSpecify')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepoSpecify')) ='',null , json_unquote(json_extract(info, '$.createdRepoSpecify'))) where cohort_id = `targetID`;
		update dlh set update_time = NOW() where cohort_id = `targetID`;
		update cohort_edit_status set `status` = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionFStatus')) where cohort_id = `targetID` and page_code = 'F';
	else
		insert into dlh (
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
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLink')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLink')) ='',null , json_unquote(json_extract(info, '$.haveDataLink')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLinkSpecify')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDataLinkSpecify')) ='',null , json_unquote(json_extract(info, '$.haveDataLinkSpecify')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonization')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonization')) ='',null , json_unquote(json_extract(info, '$.haveHarmonization')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonizationSpecify')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveHarmonizationSpecify')) ='',null , json_unquote(json_extract(info, '$.haveHarmonizationSpecify')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeposited')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.haveDeposited')) ='',null , json_unquote(json_extract(info, '$.haveDeposited')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dbGaP')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dbGaP')) ='',null , json_unquote(json_extract(info, '$.dbGaP')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.BioLINCC')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.BioLINCC')) ='',null , json_unquote(json_extract(info, '$.BioLINCC')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherRepo')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.otherRepo')) ='',null , json_unquote(json_extract(info, '$.otherRepo')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnline')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnline')) ='',null , json_unquote(json_extract(info, '$.dataOnline')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineWebsite')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineWebsite')) ='',null , json_unquote(json_extract(info, '$.dataOnlineWebsite')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlineURL')) ='',null , json_unquote(json_extract(info, '$.dataOnlineURL')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlinePolicy')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataOnlinePolicy')) ='',null , json_unquote(json_extract(info, '$.dataOnlinePolicy')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepo')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepo')) ='',null , json_unquote(json_extract(info, '$.createdRepo')))
			,if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepoSpecify')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.createdRepoSpecify')) ='',null , json_unquote(json_extract(info, '$.createdRepoSpecify')))
			,NOW()
			,NOW()
		);
		insert into cohort_edit_status (cohort_id, page_code, `status`)
		values (targetID, 'F', JSON_UNQUOTE(JSON_EXTRACT(info, '$.sectionFStatus')));
	end if;
    commit;
    
	SELECT flag as rowAffacted;
    SELECT targetID as duplicated_cohort_id;
    if exists (select * from cohort where id = targetID and status = 'new') then
		update cohort set status = 'draft', update_time = NOW() where id = targetID;
	end if;
	SELECT `status` from cohort where id = targetID;
    
    end;
    end if;
end //

DROP PROCEDURE IF EXISTS reset_cohort_status //

CREATE  PROCEDURE `reset_cohort_status`(in targetID int, in cohort_status varchar(30))
begin
	DECLARE rowAffacted int default 0;
    DECLARE flag INT DEFAULT 1;
 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;
	
    START TRANSACTION;
	if exists (select * from lu_cohort_status where lower(cohortstatus) = cohort_status) then
    begin
		update cohort set `status` = cohort_status where id = targetID;
	end;
	end if;
    commit;
    select flag as rowAffacted;
 end //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: insert_new_cohort
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `insert_new_cohort` //

CREATE PROCEDURE `insert_new_cohort`(in info JSON)
BEGIN
	DECLARE i INT DEFAULT 0;

	set @cohortName = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohortName'));
	set @cohortAcronym = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohortAcronym'));
	
	insert into cohort (name,acronym,status,publish_by,update_time) values(@cohortName,@cohortAcronym,"new",NULL,now());
	SET @owners = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohortOwners'));

	call populate_cohort_tables(last_insert_id(), @cohortName, @cohortAcronym);

	WHILE i < JSON_LENGTH(@owners) DO
		insert into cohort_user_mapping (cohort_acronym,user_id,active,update_time) values(JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohortAcronym')),JSON_EXTRACT(@owners,concat('$[',i,']')),'Y',NOW());
		SELECT i + 1 INTO i;	
	end WHILE;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_all_users
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_all_users` //

CREATE  PROCEDURE `select_all_users`(in cohortSearch text, in columnName varchar(40), in columnOrder varchar(10),
									in pageIndex int, in pageSize int)
BEGIN 
    
    set @status_query = " and 1=1 ";
     if cohortSearch != "" then
      set @status_query = concat(" and ( lower(first_name) like lower('%", cohortSearch, "%') or lower(last_name) like lower('%", cohortSearch, "%') 
       or lower(email) like lower('%", cohortSearch, "%') or lower(IFNULL(user_name,'')) like lower('%", cohortSearch, "%') ) ", @status_query);
    end if;
    if columnName != "" && columnName !="action" then 
      set @orderBy = concat(" order by ",columnName," ",columnOrder,", name asc ");
    else
	  set @orderBy = "order by name asc";
	end if;
    
    if pageIndex > -1 then
		set @paging = concat(' limit ',pageIndex,',',pageSize,' ');
	else
		set @paging = "";
    end if;
    
    set @query = concat("select sql_calc_found_rows id, concat(u.last_name,', ', u.first_name) as name, user_name, u.email,
       ( case when access_level like '%SystemAdmin' then 'Admin' else 'Cohort Owner' end) as user_role,
	   ( case when access_level like '%SystemAdmin' then 'All' 
	      else (select GROUP_CONCAT(cohort_acronym SEPARATOR ',') as cohort_list 
        from (select * from cohort_user_mapping where IFNULL(upper(active),'Y')='Y' and user_id = u.id order by cohort_acronym ) as a
        group by user_id ) end) AS cohort_list, 
       IFNULL(u.active_status, 'Y') as active_status,
       (case when last_login is null then 'Never' else DATE_FORMAT(last_login, '%m/%d/%Y') end) as last_login   
        from user u where u.id > 1 ", @status_query , @orderBy, @paging);

	
    PREPARE stmt FROM @query;
	EXECUTE stmt;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt;
	
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_user_profile
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `select_user_profile` //

CREATE PROCEDURE `select_user_profile`(in usid int)
BEGIN 
 
    set @query = concat("select u.user_name, u.last_name, u.first_name, u.email,
       ( case when access_level like '%SystemAdmin' then 'Admin' else 'Cohort Owner' end) as user_role,
	   ( case when access_level like '%SystemAdmin' then 'All' else (select GROUP_CONCAT(cohort_acronym SEPARATOR ',') as cohort_list 
        from cohort_user_mapping where IFNULL(upper(active),'Y')='Y' and user_id = ", usid, "
       group by user_id ) end) AS cohort_list, active_status,
       ( case when last_login is null then 'Never' else DATE_FORMAT(last_login, '%m/%d/%Y') end) as last_login   
    from user u where  u.id = ", usid); 
	
    PREPARE stmt FROM @query;
	EXECUTE stmt;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt;
    
	set @query1 = concat("select distinct email, user_name from user order by email "); 
	PREPARE stmt1 FROM @query1;
	EXECUTE stmt1;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt1;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: update_user_profile
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `update_user_profile` //

CREATE PROCEDURE `update_user_profile`(in userID int, in info JSON)
begin
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
        insert into  user ( user_name, email,last_name, first_name, access_level, active_status, create_time) values (  
        if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_name')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_name')) ='',null , json_unquote(json_extract(info, '$.user_name'))),
		  if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.email')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.email')) ='',null , json_unquote(json_extract(info, '$.email'))) ,
		  if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.last_name')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.last_name')) ='',null , json_unquote(json_extract(info, '$.last_name'))),
		  if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.first_name')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.first_name')) ='',null , json_unquote(json_extract(info, '$.first_name'))),
		  if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role')) ='',null , 
		  if(json_unquote(json_extract(info, '$.user_role'))='Admin', 'SystemAdmin', 'CohortAdmin' )),
		  if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.active_status')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.active_status')) ='','Y' , json_unquote(json_extract(info, '$.active_status'))) ,
		  now());
        
        set new_id = last_insert_id();
     else     
        update user set email = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.email')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.email')) ='',null , json_unquote(json_extract(info, '$.email'))) ,
					user_name = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_name')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_name')) ='',null , json_unquote(json_extract(info, '$.user_name'))),
                    last_name = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.last_name')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.last_name')) ='',null , json_unquote(json_extract(info, '$.last_name'))),
                    first_name = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.first_name')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.first_name')) ='',null , json_unquote(json_extract(info, '$.first_name'))),
                      access_level = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role')) ='',null , 
					 if(json_unquote(json_extract(info, '$.user_role'))='Admin', 'SystemAdmin', 'CohortAdmin' )),
                     active_status = if(JSON_UNQUOTE(JSON_EXTRACT(info, '$.active_status')) ='null'OR JSON_UNQUOTE(JSON_EXTRACT(info, '$.active_status')) ='','Y' , json_unquote(json_extract(info, '$.active_status'))) ,
                     update_time= now()
                 where id = `userID`;
   end if;
   
 	SET @cohortList = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cohort_list'));
    if(JSON_LENGTH(@cohortList) > 0 || JSON_UNQUOTE(JSON_EXTRACT(info, '$.user_role')) <> 'Admin') then
      update cohort_user_mapping set active='N' where user_id = `userID`;
		WHILE i < JSON_LENGTH(@cohortList) DO
			SELECT JSON_EXTRACT(@cohortList, concat('$[',i,']')) INTO @cohortAcronym;
            if(replace(@cohortAcronym, '"','') <> 'All') then
            insert into cohort_user_mapping (cohort_acronym, user_id, active, create_time, update_time)
            values (replace(@cohortAcronym, '"',''), new_id, 'Y' , now(), now() )
            on duplicate key update active  = 'Y';
            end if;
	        SELECT i + 1 INTO i;
		END WHILE;
        END IF;
        
        commit;

	select flag as rowAffacted;

END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: delete_cohort_file
-- -----------------------------------------------------------------------------------------------------------

drop procedure if exists delete_cohort_file //

CREATE PROCEDURE `delete_cohort_file`(in file_Id int, in cohort_ID int)
begin
	DECLARE flag INT DEFAULT 1;
	DECLARE new_id INT DEFAULT 0;
   
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;

    SELECT `status` INTO @cohort_status FROM cohort WHERE id = cohort_ID;

    IF @cohort_status = 'published' then 
	   call select_unpublished_cohort_id(cohort_ID, new_id); 
    else 
       set new_id = cohort_ID;
    END IF;
    
    IF new_id > 0 THEN
    BEGIN
		START TRANSACTION;
			if new_id <> cohort_ID then
				select new_file_id into @updated_file_id from mapping_old_file_Id_To_New where old_file_id = file_Id;
			else
				set @updated_file_id = file_Id;
			end if;
			delete from attachment where id = @updated_file_id;
		COMMIT;
    END;
    END IF;
    select flag as rowsAffacted;
    select new_id;
end //

DROP PROCEDURE IF EXISTS `populate_cohort_tables` //

CREATE PROCEDURE `populate_cohort_tables`(in cohortID int, in cohortName varchar(50), in acronym varchar(20))
BEGIN
	DECLARE flag INT DEFAULT 1;
 
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	BEGIN
      SET flag = 0; 
      ROLLBACK;
	END;

    START TRANSACTION;

   insert cohort_basic (cohort_id, cohort_name, cohort_acronym) values (cohortID,  cohortName, acronym);
   insert cohort_edit_status (cohort_id, page_code, status) values (cohortID, 'A', 'new'), (cohortID, 'B', 'new'), (cohortID, 'C', 'new'),
 																   (cohortID, 'D', 'new'), (cohortID, 'E', 'new'), (cohortID, 'F', 'new'), (cohortID, 'G', 'new');
	
    
    insert enrollment_count(cohort_id, race_id, ethnicity_id, gender_id, enrollment_counts, create_time, update_time) 
    select cohortID, r.id, e.id, g.id, 0, NOW(), NOW()
	from lu_race r, lu_ethnicity e, lu_gender g where g.id < 4 order by r.id, e.id, g.id;
	
	insert major_content(cohort_id, category_id)
    select cohortID, id from lu_data_category where id < 99;
  
	
    insert cancer_info (cohort_id, create_time, update_time) values (cohortID, NOW(), NOW());
	
    
    insert into cancer_count (cohort_id, cancer_id, gender_id, case_type_id, cancer_counts, create_time, update_time)
    select cohortID, c.id, g.id, t.id, 0, NOW(), NOW() from 
	lu_cancer c, lu_gender g, lu_case_type t where g.id < 3;
    
	insert mortality (cohort_id, create_time, update_time) values (cohortID, NOW(), NOW());
    insert dlh (cohort_id, create_time, update_time) values (cohortID, NOW(), NOW());
    insert specimen (cohort_id, create_time, update_time) values (cohortID, NOW(), NOW());
    
    insert into specimen_count (cohort_id, cancer_id, specimen_id, specimens_counts, create_time, update_time)
    select cohortID, c.id, s.id, 0, NOW(), NOW() from lu_cancer c, lu_specimen s where s.id < 10;
    
    insert into specimen_collected_type (cohort_id, specimen_id, collected_yn, create_time, update_time)
    select cohortID, id, null, NOW(), NOW() from lu_specimen where id > 10;
    
	COMMIT;
   
	SELECT flag as rowsAffacted;
						
			
END //


DELIMITER ;

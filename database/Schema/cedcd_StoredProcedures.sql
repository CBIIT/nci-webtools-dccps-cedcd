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
*
 */

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
									in domain text,in collected_specimen varchar(200),in cancer text,
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
    if domain != "" then
		set @major_content_query = concat("cs.cohort_id in (select cohort_id from major_content where domain_id  in ( select ld.id from lu_domain ld , v_lu_domain vld where ld.domain=vld.domain and vld.id in (",domain,")) ", " and (baseline=1 or followup = 1) group by cohort_id ");
        set tmp = reverse(substring_index(reverse(substring_index(booleanOperationWithInField,',',6)),',',1));
        if tmp = "AND" then
			set @len = LENGTH(domain) - LENGTH(REPLACE(domain, ',', '')) + 1;
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

		set @specimen_query = concat("and cs.cohort_id in (select cohort_id from specimen where 1=1 ", "and (",tmp,") )");
        
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
    
    set @groupBy = " group by cs.cohort_id ";
    
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
    
    set @query = concat("select cs.cohort_id,cs.cohort_name,cs.cohort_acronym,mc.domain_id, ld.domain, ld.sub_domain, mc.baseline, mc.other_specify_baseline 
	from cohort_basic cs, major_content mc, lu_domain ld, cohort ch, v_lu_domain vld
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and cs.cohort_id = mc.cohort_id and mc.domain_id = ld.id and ld.domain = vld.domain ",@queryString);
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
    
    set @query = concat("select cs.cohort_id,cs.cohort_name,cs.cohort_acronym,mc.domain_id, ld.domain, ld.sub_domain, mc.followup, mc.other_specify_followup 
	from cohort_basic cs, major_content mc, lu_domain ld , cohort ch, v_lu_domain vld
	WHERE ch.id = cs.cohort_id and lower(ch.status)='published' and cs.cohort_id = mc.cohort_id and mc.domain_id = ld.id and ld.domain = vld.domain ",@queryString);
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
-- Stored Procedure: cohort_lookup
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `select_cohort_lookup` //

CREATE PROCEDURE `select_cohort_lookup`()
BEGIN
	select * from lu_gender;
    select * from lu_cancer;
    select * from v_lu_domain;
    select * from lu_ethnicity;
    select * from lu_race;
    select * from lu_specimen;
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
									in domain text,in collected_specimen varchar(200),in cancer text,
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
    if domain != "" then
		set @major_content_query = concat("and cs.cohort_id in (select distinct cohort_id from major_content where domain_id in ( select ld.id from lu_domain ld , v_lu_domain vld where ld.domain=vld.domain and vld.id in (",domain,")) ", " and (baseline=1 or followup = 1) )");
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

		set @specimen_query = concat("and cs.cohort_id in (select cohort_id from specimen where 1=1 ", "and (",tmp,") )");
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
    
    set @groupBy = " group by cs.cohort_id ";
    
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
	from cohort_basic cs, specimen s, cohort ch
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

CREATE PROCEDURE update_cohort_basic(in id int(11), in info JSON)
BEGIN 
	UPDATE `cohort_basic` 
	SET 
		cohort_name = JSON_UNQUOTE(JSON_EXTRACT(info, '$.name')),
		cohort_web_site = JSON_UNQUOTE(JSON_EXTRACT(info, '$.url')),
        sameAsSomeone = JSON_UNQUOTE(JSON_EXTRACT(info, '$.sameAsSomeone')),
        cohort_description = JSON_UNQUOTE(JSON_EXTRACT(info, '$.description')),
        eligible_gender_id = JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligibleGender')),
        eligible_disease = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.hasCancerSite')) = 'true', 1 , 0),
        eligible_disease_cancer_specify = JSON_UNQUOTE(JSON_EXTRACT(info, '$.cancerSites')),
        eligible_disease_other_specify = JSON_UNQUOTE(JSON_EXTRACT(info, '$.eligibilityCriteriaOther')),
        enrollment_total = JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrolledTotal')),
        enrollment_year_start = JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollStartYear')),
        enrollment_year_end = JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollEndYear')),
        enrollment_ongoing = CAST(JSON_UNQUOTE(JSON_EXTRACT(info, '$.enrollOnGoing')) AS SIGNED),
        enrollment_target = JSON_UNQUOTE(JSON_EXTRACT(info, '$.numOfPlans')),
        enrollment_year_complete = JSON_UNQUOTE(JSON_EXTRACT(info, '$.yearToComplete')),
        enrollment_age_min = JSON_UNQUOTE(JSON_EXTRACT(info, '$.baseLineMinAge')),
        enrollment_age_max = JSON_UNQUOTE(JSON_EXTRACT(info, '$.baseLineMaxAge')),
        enrollment_age_median = JSON_UNQUOTE(JSON_EXTRACT(info, '$.baseLineMedianAge')),
        enrollment_age_mean = JSON_UNQUOTE(JSON_EXTRACT(info, '$.baseLineMeanAge')),
        current_age_min = JSON_UNQUOTE(JSON_EXTRACT(info, '$.currentMinAge')),
        current_age_max = JSON_UNQUOTE(JSON_EXTRACT(info, '$.currentMaxAge')),
        current_age_median = JSON_UNQUOTE(JSON_EXTRACT(info, '$.currentMedianAge')),
        current_age_mean = JSON_UNQUOTE(JSON_EXTRACT(info, '$.currentMeanAge')),
        time_interval = JSON_UNQUOTE(JSON_EXTRACT(info, '$.timeInterval')),
        most_recent_year = JSON_UNQUOTE(JSON_EXTRACT(info, '$.mostRecentYear')),
        data_collected_in_person = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collectedInPerson')) = 'true', 1, 0),
        data_collected_phone = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collectedPhone')) = 'true', 1, 0),
        data_collected_paper = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collectedPaper')) = 'true', 1, 0),
        data_collected_web = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collectedWeb')) = 'true', 1, 0),
        data_collected_other = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.collectedOther')) = 'true', 1, 0),
        data_collected_other_specify = IF(data_collected_other = 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$.collectedOtherSpecify')), ''),
        restrictions = IF (JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireNone')) = 'true', '1_0_0_0_0_0_0_0',
						   CONCAT('0_', IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireNone'))= 'true', '1_', '0_'),
										IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireIrb'))= 'true', '1_', '0_'),
                                        IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.requireData'))= 'true', '1_', '0_'),
                                        IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictGenoInfo'))= 'true', '1_', '0_'),
                                        IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOtherDb'))= 'true', '1_', '0_'),
                                        IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictCommercial'))= 'true', '1_', '0_'),
                                        IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOther'))= 'true', '1', '0'))),
		restrictions_other_specify = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOther'))= 'true', JSON_UNQUOTE(JSON_EXTRACT(info, '$.restrictOtherSpecify')), ''),
        strategy_routine = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategyRoutine')) = 'true', 1, 0),
        strategy_mailing = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategyMailing')) = 'true', 1, 0),
        strategy_aggregate_study = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategyAggregateStudy')) = 'true', 1, 0),
        strategy_individual_study = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategyIndividualStudy')) = 'true', 1, 0),
        strategy_invitation = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategyInvitation')) = 'true', 1, 0),
        strategy_other = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategyOther')) = 'true', 1, 0),
        strategy_other_specify = IF(strategy_other = 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$.strategyOtherSpecify')), ''),
        questionnaire_file_attached = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.questionnaireFile')) = 'true', 1, 0),
        main_cohort_file_attached = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.mainCohortFile')) = 'true', 1, 0),
        data_file_attached = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataFile')) = 'true', 1, 0),
        specimen_file_attached = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.specimenFile')) = 'true', 1, 0),
        publication_file_attached = IF(JSON_UNQUOTE(JSON_EXTRACT(info, '$.publicationFile')) = 'true', 1, 0),
        questionnaire_url = JSON_UNQUOTE(JSON_EXTRACT(info, '$.questionnaireUrl')),
        main_cohort_url = JSON_UNQUOTE(JSON_EXTRACT(info, '$.mainCohortUrl')),
        data_url = JSON_UNQUOTE(JSON_EXTRACT(info, '$.dataUrl')),
        specimen_url = JSON_UNQUOTE(JSON_EXTRACT(info, '$.specimenUrl')),
        publication_url = JSON_UNQUOTE(JSON_EXTRACT(info, '$.publicationUrl')),
        update_time = NOW()
	    WHERE cohort_id = `id`;
        
	SET @rowcount = ROW_COUNT();
    SELECT @rowcount AS rowsAffacted;
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
	 (case when lower(ch.status) in (\"in review\",\"submitted\", \"published\") and ch.update_time is not null then DATE_FORMAT(ch.update_time, '%m/%d/%Y') else null end) as update_time 
	 FROM cohort ch, user u1, lu_cohort_status l_status WHERE ch.create_by=u1.id and lower(ch.status)=lower(l_status.cohortstatus) ", @status_query);
  
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

CREATE PROCEDURE `get_cohort_basic_info`(in `targetID` int)
BEGIN
	SELECT 
		cohort_id
        ,cohort_name
        ,cohort_acronym
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
        ,substring(restrictions, 1, 1) as requireNone
        ,substring(restrictions, 3, 1) as requireCollab
        ,substring(restrictions, 5, 1) as requireIrb
        ,substring(restrictions, 7, 1) as requireData
        ,substring(restrictions, 9, 1) as restrictGenoInfo
        ,substring(restrictions, 11, 1) as restrictOtherDb
        ,substring(restrictions, 13, 1) as restrictCommercial
        ,substring(restrictions, 15, 1) as restrictOther
        ,restrictions_other_specify
        ,strategy_routine
        ,strategy_mailing
        ,strategy_aggregate_study
        ,strategy_individual_study
        ,strategy_invitation
        ,strategy_other
        ,strategy_other_specify
        ,questionnaire_file_attached
        ,main_cohort_file_attached
        ,data_file_attached
        ,specimen_file_attached
        ,publication_file_attached
        ,questionnaire_url
        ,main_cohort_url
        ,data_url
        ,specimen_url
        ,publication_url
	FROM cohort_basic WHERE id = `targetID`;
    
    select `name` as completerName, `position` as completerPosition, phone as completerPhone, email as completerEmail 
    from person where category_id = 1 and cohort_id = `targetID`;
    
    select `name` as contacterName, `position` as contacterPosition, phone as contacterPhone, email as contacterEmail 
    from person where category_id = 2 and cohort_id = `targetID`;
    
    select `name` as `name`, institution as institution, email as email 
    from person where category_id = 3 and cohort_id = `targetID`;
    
    select `name` as collaboratorName, `position` as collaboratorPosition, phone as collaboratorPhone, email as collaboratorEmail 
    from person where category_id = 4 and cohort_id = `targetID`;
END //


DROP PROCEDURE IF EXISTS upsert_enrollment_count //

CREATE PROCEDURE `upsert_enrollment_count`(in id int(11), in info JSON)
BEGIN
	if exists (select * from enrollment_count where cohort_id = `id`) then
		update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."111"')) where
        race_id=1 and ethnicity_id=1 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."112"')) where
        race_id=1 and ethnicity_id=1 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."113"')) where
        race_id=1 and ethnicity_id=1 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."121"')) where
        race_id=1 and ethnicity_id=2 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."122"')) where
        race_id=1 and ethnicity_id=2 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."123"')) where
        race_id=1 and ethnicity_id=2 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."131"')) where
        race_id=1 and ethnicity_id=3 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."132"')) where
        race_id=1 and ethnicity_id=3 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."133"')) where
        race_id=1 and ethnicity_id=3 and gender_id=3 and cohort_id=`id`;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."211"')) where
        race_id=2 and ethnicity_id=1 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."212"')) where
        race_id=2 and ethnicity_id=1 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."213"')) where
        race_id=2 and ethnicity_id=1 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."221"')) where
        race_id=2 and ethnicity_id=2 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."222"')) where
        race_id=2 and ethnicity_id=2 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."223"')) where
        race_id=2 and ethnicity_id=2 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."231"')) where
        race_id=2 and ethnicity_id=3 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."232"')) where
        race_id=2 and ethnicity_id=3 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."233"')) where
        race_id=2 and ethnicity_id=3 and gender_id=3 and cohort_id=`id`;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."311"')) where
        race_id=3 and ethnicity_id=1 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."312"')) where
        race_id=3 and ethnicity_id=1 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."313"')) where
        race_id=3 and ethnicity_id=1 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."321"')) where
        race_id=3 and ethnicity_id=2 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."322"')) where
        race_id=3 and ethnicity_id=2 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."323"')) where
        race_id=3 and ethnicity_id=2 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."331"')) where
        race_id=3 and ethnicity_id=3 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."332"')) where
        race_id=3 and ethnicity_id=3 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."333"')) where
        race_id=3 and ethnicity_id=3 and gender_id=3 and cohort_id=`id`;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."411"')) where
        race_id=4 and ethnicity_id=1 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."412"')) where
        race_id=4 and ethnicity_id=1 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."413"')) where
        race_id=4 and ethnicity_id=1 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."421"')) where
        race_id=4 and ethnicity_id=2 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."422"')) where
        race_id=4 and ethnicity_id=2 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."423"')) where
        race_id=4 and ethnicity_id=2 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."431"')) where
        race_id=4 and ethnicity_id=3 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."432"')) where
        race_id=4 and ethnicity_id=3 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."433"')) where
        race_id=4 and ethnicity_id=3 and gender_id=3 and cohort_id=`id`;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."511"')) where
        race_id=5 and ethnicity_id=1 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."512"')) where
        race_id=5 and ethnicity_id=1 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."513"')) where
        race_id=5 and ethnicity_id=1 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."521"')) where
        race_id=5 and ethnicity_id=2 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."522"')) where
        race_id=5 and ethnicity_id=2 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."523"')) where
        race_id=5 and ethnicity_id=2 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."531"')) where
        race_id=5 and ethnicity_id=3 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."532"')) where
        race_id=5 and ethnicity_id=3 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."533"')) where
        race_id=5 and ethnicity_id=3 and gender_id=3 and cohort_id=`id`;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."611"')) where
        race_id=6 and ethnicity_id=1 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."612"')) where
        race_id=6 and ethnicity_id=1 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."613"')) where
        race_id=6 and ethnicity_id=1 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."621"')) where
        race_id=6 and ethnicity_id=2 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."622"')) where
        race_id=6 and ethnicity_id=2 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."623"')) where
        race_id=6 and ethnicity_id=2 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."631"')) where
        race_id=6 and ethnicity_id=3 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."632"')) where
        race_id=6 and ethnicity_id=3 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."633"')) where
        race_id=6 and ethnicity_id=3 and gender_id=3 and cohort_id=`id`;
        
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."711"')) where
        race_id=7 and ethnicity_id=1 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."712"')) where
        race_id=7 and ethnicity_id=1 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."713"')) where
        race_id=7 and ethnicity_id=1 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."721"')) where
        race_id=7 and ethnicity_id=2 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."722"')) where
        race_id=7 and ethnicity_id=2 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."723"')) where
        race_id=7 and ethnicity_id=2 and gender_id=3 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."731"')) where
        race_id=7 and ethnicity_id=3 and gender_id=1 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."732"')) where
        race_id=7 and ethnicity_id=3 and gender_id=2 and cohort_id=`id`;
        update enrollment_count set enrollment_counts = JSON_UNQUOTE(JSON_EXTRACT(info, '$."733"')) where
        race_id=7 and ethnicity_id=3 and gender_id=3 and cohort_id=`id`;
	ELSE 
		INSERT enrollment_count (cohort_id, race_id, ethnicity_id, gender_id, enrollment_counts, create_time, update_time)
        VALUES 
        (`id`, 1, 1, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."111"')), now(), now()),
        (`id`, 1, 1, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."112"')), now(), now()),
        (`id`, 1, 1, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."113"')), now(), now()),
        (`id`, 1, 2, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."121"')), now(), now()),
        (`id`, 1, 2, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."122"')), now(), now()),
        (`id`, 1, 2, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."123"')), now(), now()),
        (`id`, 1, 3, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."131"')), now(), now()),
        (`id`, 1, 3, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."132"')), now(), now()),
        (`id`, 1, 3, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."133"')), now(), now()),
        
        (`id`, 2, 1, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."211"')), now(), now()),
        (`id`, 2, 1, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."212"')), now(), now()),
        (`id`, 2, 1, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."213"')), now(), now()),
        (`id`, 2, 2, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."221"')), now(), now()),
        (`id`, 2, 2, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."222"')), now(), now()),
        (`id`, 2, 2, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."223"')), now(), now()),
        (`id`, 2, 3, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."231"')), now(), now()),
        (`id`, 2, 3, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."232"')), now(), now()),
        (`id`, 2, 3, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."233"')), now(), now()),
        
        (`id`, 3, 1, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."311"')), now(), now()),
        (`id`, 3, 1, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."312"')), now(), now()),
        (`id`, 3, 1, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."313"')), now(), now()),
        (`id`, 3, 2, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."321"')), now(), now()),
        (`id`, 3, 2, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."322"')), now(), now()),
        (`id`, 3, 2, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."323"')), now(), now()),
        (`id`, 3, 3, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."331"')), now(), now()),
        (`id`, 3, 3, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."332"')), now(), now()),
        (`id`, 3, 3, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."333"')), now(), now()),
        
        (`id`, 4, 1, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."411"')), now(), now()),
        (`id`, 4, 1, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."412"')), now(), now()),
        (`id`, 4, 1, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."413"')), now(), now()),
        (`id`, 4, 2, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."421"')), now(), now()),
        (`id`, 4, 2, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."422"')), now(), now()),
        (`id`, 4, 2, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."423"')), now(), now()),
        (`id`, 4, 3, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."431"')), now(), now()),
        (`id`, 4, 3, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."432"')), now(), now()),
        (`id`, 4, 3, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."433"')), now(), now()),
        
        (`id`, 5, 1, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."511"')), now(), now()),
        (`id`, 5, 1, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."512"')), now(), now()),
        (`id`, 5, 1, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."513"')), now(), now()),
        (`id`, 5, 2, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."521"')), now(), now()),
        (`id`, 5, 2, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."522"')), now(), now()),
        (`id`, 5, 2, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."523"')), now(), now()),
        (`id`, 5, 3, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."531"')), now(), now()),
        (`id`, 5, 3, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."532"')), now(), now()),
        (`id`, 5, 3, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."533"')), now(), now()),
        
        (`id`, 6, 1, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."611"')), now(), now()),
        (`id`, 6, 1, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."612"')), now(), now()),
        (`id`, 6, 1, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."613"')), now(), now()),
        (`id`, 6, 2, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."621"')), now(), now()),
        (`id`, 6, 2, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."622"')), now(), now()),
        (`id`, 6, 2, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."623"')), now(), now()),
        (`id`, 6, 3, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."631"')), now(), now()),
        (`id`, 6, 3, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."632"')), now(), now()),
        (`id`, 6, 3, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."633"')), now(), now()),
        
        (`id`, 7, 1, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."711"')), now(), now()),
        (`id`, 7, 1, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."712"')), now(), now()),
        (`id`, 7, 1, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."713"')), now(), now()),
        (`id`, 7, 2, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."721"')), now(), now()),
        (`id`, 7, 2, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."722"')), now(), now()),
        (`id`, 7, 2, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."723"')), now(), now()),
        (`id`, 7, 3, 1, JSON_UNQUOTE(JSON_EXTRACT(info, '$."731"')), now(), now()),
        (`id`, 7, 3, 2, JSON_UNQUOTE(JSON_EXTRACT(info, '$."732"')), now(), now()),
        (`id`, 7, 3, 3, JSON_UNQUOTE(JSON_EXTRACT(info, '$."733"')), now(), now());
    END IF;
    SET @rowcount = ROW_COUNT();
    SELECT @rowcount AS rowsAffacted;
END //


DELIMITER ;

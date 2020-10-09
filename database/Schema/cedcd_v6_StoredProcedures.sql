-- === CEDCD stored procedures  =====
-- === revised according to questionnarire v6 in 2020 =====
-- === mysql v 5.7 =====

/* 
CREATE DEFINER=`cedcd_admin`@`%` PROCEDUREs
*/

DELIMITER ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: advanced_cohort_select
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `advanced_cohort_select`;

CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `advanced_cohort_select`(in gender text, in age_info varchar(100), in study_population text,
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
		set @gender_query = concat("cs.gender_id in (",gender,") ");
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
		set @major_content_query = concat("cs.cohort_id in (select cohort_id from major_content where domain_id in (",domain,") ", " and (baseline=1 or followup = 1) group by cohort_id ");
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
    
    set @query = "select sql_calc_found_rows cs.cohort_id as id,cs.cohort_name, cs.cohort_acronym,cs.cohort_web_site,cs.update_time,sum(ec.enrollment_counts) as enrollment_total FROM cohort_basic cs, enrollment_count ec WHERE cs.cohort_id = ec.cohort_id ";
    
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
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_baseline_data
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `cohort_baseline_data`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_baseline_data`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id,cs.cohort_name,cs.cohort_acronym,mc.domain_id, ld.domain, ld.sub_domain, mc.baseline, mc.other_specify_baseline from cohort_basic cs, major_content mc, lu_domain ld where cs.cohort_id = mc.cohort_id and mc.domain_id = ld.id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_basic_info
-- -----------------------------------------------------------------------------------------------------------


DROP PROCEDURE IF EXISTS `cohort_basic_info`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_basic_info`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, " and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.*,lg.gender, ci.ci_confirmed_cancer_year,m.mort_year_mortality_followup from cohort_basic cs, cancer_info ci, mortality m, lu_gender lg where cs.cohort_id = ci.cohort_id and cs.cohort_id = m.cohort_id and cs.gender_id = lg.id",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_cancer_info
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `cohort_cancer_info`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_cancer_info`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,ci.* from cohort_basic cs, cancer_info ci where cs.cohort_id = ci.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_description
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `cohort_description`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_description`(in c_id int(11))
BEGIN
	select * from cohort_basic where cohort_id = c_id;
    select * from attachment where cohort_id = c_id;
    select * from person where cohort_id = c_id and category_id in (1,3,4);
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_followup_data
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `cohort_followup_data`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_followup_data`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id,cs.cohort_name,cs.cohort_acronym,mc.domain_id, ld.domain, ld.sub_domain, mc.followup, mc.other_specify_followup from cohort_basic cs, major_content mc, lu_domain ld where cs.cohort_id = mc.cohort_id and mc.domain_id = ld.id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_linkages_technology
-- -----------------------------------------------------------------------------------------------------------


DROP PROCEDURE IF EXISTS `cohort_linkages_technology`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_linkages_technology`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,cd.*, ct.* from cohort_basic cs, dlh cd, technology ct where cs.cohort_id = cd.cohort_id and cs.cohort_id = ct.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_list
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `cohort_list`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_list`()
BEGIN
	select id, cohort_name, cohort_acronym from cohort_basic order by cohort_acronym;
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_lookup
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `cohort_lookup`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_lookup`()
BEGIN
	select * from lu_gender;
    select * from lu_cancer;
    select * from lu_domain;
    select * from lu_ethnicity;
    select * from lu_race;
    select * from lu_specimen;
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_mortality
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `cohort_mortality`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_mortality`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,cm.* from cohort_basic cs, mortality cm where cs.cohort_id = cm.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_select
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `cohort_select`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_select`(in gender text,in age_info varchar(100), in study_population text, 
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
		set @major_content_query = concat("and cs.cohort_id in (select distinct cohort_id from major_content where domain_id in (",domain,") ", " and (baseline=1 or followup = 1) )");
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
		set @cohort_query = concat(@cohort_query, "and cs.gender_id in (",gender,") ");
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
    
    set @query = concat("select sql_calc_found_rows cs.cohort_id as id,cs.cohort_name, cs.cohort_acronym,cs.cohort_web_site,cs.update_time,sum(ec.enrollment_counts) as enrollment_total FROM cohort_basic cs, enrollment_count ec WHERE cs.cohort_id = ec.cohort_id ",@enrollment_query,@major_content_query,@specimen_query,@cancer_query);
    set @query = concat(@query, @cohort_query,@groupBy, @orderBy, @paging);
	PREPARE stmt FROM @query;
	EXECUTE stmt;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt;
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_specimen_overview
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `cohort_specimen_overview`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `cohort_specimen_overview`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cs.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cs.cohort_acronym asc"));
    
    set @query = concat("select cs.cohort_id as c_id,cs.cohort_name,cs.cohort_acronym,s.* from cohort_basic cs, specimen s where cs.cohort_id = s.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_cancer_counts
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `select_cancer_counts`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `select_cancer_counts`(in gender text, in cancer text,in cohort text)
BEGIN
    set @queryString = "select cc.cohort_id, cs.cohort_name, cs.cohort_acronym,concat(cc.gender_id,'_',cc.cancer_id) as u_id, cc.gender_id, lg.gender, cc.cancer_id, lc.cancer, cc.cancer_counts 
	from cancer_count cc, cohort_basic cs, lu_gender lg, lu_cancer lc
						where cc.cohort_id = cs.cohort_id 
						and cc.gender_id = lg.id
						and cc.cancer_id = lc.id ";
    
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
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_enrollment_counts
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `select_enrollment_counts`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `select_enrollment_counts`(in gender text, in race text,in ethnicity text,in cohort text)
BEGIN
    set @queryString = "select ec.cohort_id, cs.cohort_name, cs.cohort_acronym,concat(ec.gender_id,'_',ec.ethnicity_id,'_',ec.race_id) as u_id, ec.gender_id, lg.gender, ec.ethnicity_id, le.ethnicity, ec.race_id, lr.race, ec.enrollment_counts 
	from enrollment_count ec, cohort_basic cs, lu_gender lg, lu_ethnicity le, lu_race lr
						where ec.cohort_id = cs.cohort_id 
						and ec.gender_id = lg.id
						and ec.ethnicity_id = le.id
						and ec.race_id = lr.id ";
    
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
END ;;

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: select_specimen_counts
-- -----------------------------------------------------------------------------------------------------------

DROP PROCEDURE IF EXISTS `select_specimen_counts`;
CREATE DEFINER=`cedcd_admin`@`%` PROCEDURE `select_specimen_counts`(in specimen text, in cancer text,in cohort text)
BEGIN
    set @queryString = "select sc.cohort_id, cs.cohort_name, cs.cohort_acronym,concat(sc.specimen_id,'_',sc.cancer_id) as u_id, sc.specimen_id, ls.specimen, sc.cancer_id, lc.cancer, sc.specimens_counts 
	from specimen_count sc, cohort_basic cs, lu_specimen ls, lu_cancer lc
						where sc.cohort_id = cs.cohort_id 
						and sc.specimen_id = ls.id
						and sc.cancer_id = lc.id ";
    
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
END;;
DELIMITER ;
/*
Generate data for lookup table lu_gender
*/
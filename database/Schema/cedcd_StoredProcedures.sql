
define delimiter //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_baseline_data
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_baseline_data` //


CREATE PROCEDURE `cohort_baseline_data`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cb.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cb.cohort_acronym asc"));
    
    set @query = concat("select cb.cohort_id,cb.cohort_name,cb.cohort_acronym,cmc.* from cohort_basic cb, cohort_major_content cmc where cb.cohort_id = cmc.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_basic_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_basic_info` //

CREATE PROCEDURE `cohort_basic_info`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cb.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cb.cohort_acronym asc"));
    
    set @query = concat("select cb.*,cc.ci_confirmed_cancer_year,cm.mort_year_mortality_followup from cohort_basic cb, cohort_cancer cc, cohort_mortality cm where cb.cohort_id = cc.cohort_id and cb.cohort_id = cm.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //

-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_cancer_count
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_cancer_count` //

CREATE PROCEDURE `cohort_cancer_count`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cb.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cb.cohort_acronym asc"));
    
    set @query = concat("select cb.cohort_id,cb.cohort_name,cb.cohort_acronym,cc.* from cohort_basic cb, cohort_cancer cc where cb.cohort_id = cc.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_cancer_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_cancer_info` //

CREATE PROCEDURE `cohort_cancer_info`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cb.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cb.cohort_acronym asc"));
    
    set @query = concat("select cb.cohort_id,cb.cohort_name,cb.cohort_acronym,cc.*, cmc.mdc_acute_treatment_toxicity, cmc.mdc_late_effects_of_treatment,cmc.mdc_symptoms_management,cmc.mdc_other_cancer_condition,cmc.mdc_other_cancer_condition_specify  from cohort_basic cb, cohort_cancer cc, cohort_major_content cmc where cb.cohort_id = cc.cohort_id and cb.cohort_id = cmc.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_enrollment_countcohort_enrollment_countcohort_enrollment_countcohort_enrollment_countcohort_enrollment_countcohort_enrollment_countcohort_enrollment_count
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_enrollment_count` //

CREATE PROCEDURE `cohort_enrollment_count`(in cohort_info text)
BEGIN
    set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cb.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cb.cohort_acronym asc"));
    
    set @query = concat("select cb.cohort_id,cb.cohort_name,cb.cohort_acronym,ce.* from cohort_basic cb, cohort_enrollment ce where cb.cohort_id = ce.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_info
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_info` //

CREATE PROCEDURE `cohort_info`(in c_id int(11))
BEGIN
	select * from cohort_basic where cohort_id = c_id;
    select * from cohort_attachment where cohort_id = c_id;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_linkages_technology
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_linkages_technology` //

CREATE PROCEDURE `cohort_linkages_technology`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cb.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cb.cohort_acronym asc"));
    
    set @query = concat("select cb.cohort_id,cb.cohort_name,cb.cohort_acronym,cd.*, ct.* from cohort_basic cb, cohort_dlh cd, cohort_technology ct where cb.cohort_id = cd.cohort_id and cb.cohort_id = ct.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_mortality
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_mortality` //

CREATE PROCEDURE `cohort_mortality`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cb.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cb.cohort_acronym asc"));
    
    set @query = concat("select cb.cohort_id,cb.cohort_name,cb.cohort_acronym,cm.* from cohort_basic cb, cohort_mortality cm where cb.cohort_id = cm.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_published
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_published` //

CREATE PROCEDURE `cohort_published`(in searchText varchar(100), in columnName varchar(40), in columnOrder varchar(10),
																in pageIndex int, in pageSize int)
BEGIN
    if searchText != "" then 
		set @queryString = concat(" and ","cohort_name like '%",searchText,"%' or cohort_acronym like '%",searchText,"%'");
    else
		set @queryString = "";
    end if;

    if columnName != "" then
		set @orderBy = concat(" order by ",columnName," ",columnOrder," ");
	else
		set @orderBy = "";
    end if;
    
    if pageIndex > -1 then
		set @paging = concat(' limit ',pageIndex,',',pageSize,' ');
	else
		set @paging = "";
    end if;
    
    set @query = concat("select sql_calc_found_rows cohort_id,cohort_name, cohort_acronym,cohort_web_site,update_time from cohort_basic where status = 2",@queryString,@orderBy,@paging);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_select
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_select` //

CREATE PROCEDURE `cohort_select`(in gender int(1), in enrollment_info text,in age_info varchar(100),
									in cancer_info text,in collected_data text,in collected_specimen varchar(200),
                                    in disease_state varchar(10), in columnName varchar(40), in columnOrder varchar(10),
									in pageIndex int, in pageSize int)
BEGIN
	declare tmp text default '';
    declare v text default ''; 
	declare i int default 0;
    declare tmp_count int default 0; 
    
    if gender = 2 then 
		set @queryString = " and eligible_gender in (0,2) ";
    elseif gender = 1 then
		set @queryString = " and eligible_gender in (0,1) ";
	elseif gender = 0 then
		set @queryString = " and eligible_gender = 0 ";
    else
		set @queryString = "";
    end if;
    
    if enrollment_info != "" then
		set tmp_count = 1+length(enrollment_info) - length(replace(enrollment_info,',','')); 
		while i < tmp_count
		do
			set i=i+1;
			set tmp = concat(tmp,reverse(substring_index(reverse(substring_index(enrollment_info,',',i)),',',1)), ">0");
            if i < tmp_count then
				set tmp = concat(tmp," or ");
            end if;
		end while;

		set @queryString = concat(@queryString, "and (",tmp,") ");
	end if;
    
    set tmp = '';
    set i = 0;
    if age_info != "" then
		set tmp_count = 1+length(age_info) - length(replace(age_info,',','')); 
		while i < tmp_count
		do
			set i=i+1;
            set v = reverse(substring_index(reverse(substring_index(age_info,',',i)),',',1));
            if v = "0-14" then
				set tmp = concat(tmp,"enrollment_age_min <= 14");
            elseif v ="15-19" then
				set tmp = concat(tmp,"(enrollment_age_min >= 15 and enrollment_age_min <= 19)");
            elseif v = "20-24" then
				set tmp = concat(tmp,"(enrollment_age_min >= 20 and enrollment_age_min <= 24)");
			elseif v = "25-29" then
				set tmp = concat(tmp,"(enrollment_age_min >= 25 and enrollment_age_min <= 29)");
            elseif v = "30-34" then
				set tmp = concat(tmp,"(enrollment_age_min >= 30 and enrollment_age_min <= 34)");
			elseif v = "35-39" then
				set tmp = concat(tmp,"(enrollment_age_min >= 35 and enrollment_age_min <= 39)");
			elseif v = "40-44" then
				set tmp = concat(tmp,"(enrollment_age_min >= 40 and enrollment_age_min <= 44)");
			elseif v = "45-49" then
				set tmp = concat(tmp,"(enrollment_age_min >= 45 and enrollment_age_min <= 49)");
			elseif v = "50-54" then
				set tmp = concat(tmp,"(enrollment_age_min >= 50 and enrollment_age_min <= 54)");
			elseif v = "55-59" then
				set tmp = concat(tmp,"(enrollment_age_min >= 55 and enrollment_age_min <= 59)");
			elseif v = "60-64" then
				set tmp = concat(tmp,"(enrollment_age_min >= 60 and enrollment_age_min <= 64)");
			elseif v = "65-69" then
				set tmp = concat(tmp,"(enrollment_age_min >= 65 and enrollment_age_min <= 69)");
			elseif v = "70-74" then
				set tmp = concat(tmp,"(enrollment_age_min >= 70 and enrollment_age_min <= 74)");
			elseif v = "75-79" then
				set tmp = concat(tmp,"(enrollment_age_min >= 75 and enrollment_age_min <= 79)");
			elseif v = "80-85+" then
				set tmp = concat(tmp,"enrollment_age_min >= 80");
			else
				set tmp = "";
            end if;
			if i < tmp_count then
				set tmp = concat(tmp," or ");
            end if;
		end while;
        
		set @queryString = concat(@queryString, "and (",tmp,") ");
    end if;
    
    set i = 0;
    set tmp = '';
    if cancer_info != "" then
		set tmp_count = 1+length(cancer_info) - length(replace(cancer_info,',','')); 
		while i < tmp_count
		do
			set i=i+1;
			set tmp = concat(tmp,reverse(substring_index(reverse(substring_index(cancer_info,',',i)),',',1)),">0");
            if i < tmp_count then
				set tmp = concat(tmp," or ");
            end if;
		end while;

		set @queryString = concat(@queryString, "and (",tmp,") ");
	end if;
    
    set i = 0;
    set tmp = '';
    if collected_data != "" then
		set tmp_count = 1+length(collected_data) - length(replace(collected_data,',','')); 
		while i < tmp_count
		do
			set i=i+1;
			set tmp = concat(tmp,reverse(substring_index(reverse(substring_index(collected_data,',',i)),',',1)),"=1");
            if i < tmp_count then
				set tmp = concat(tmp," or ");
            end if;
		end while;

		set @queryString = concat(@queryString, "and (",tmp,") ");
	end if;
    
    set i = 0;
    set tmp = '';
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

		set @queryString = concat(@queryString, "and (",tmp,") ");
	end if;
    
    if disease_state != "" then
		set @queryString = concat(@queryString, "and eligible_disease in (",disease_state,") ");
    end if;
    
    if columnName != "" then
		set @orderBy = concat(" order by ",columnName," ",columnOrder," ");
	else
		set @orderBy = "";
    end if;
    
    if pageIndex > -1 then
		set @paging = concat(' limit ',pageIndex,',',pageSize,' ');
	else
		set @paging = "";
    end if;
    
    set @query = concat("select sql_calc_found_rows cohort_id,cohort_name, cohort_acronym,cohort_web_site,update_time,race_total_total from cohort_summary where 1=1 ",@queryString,@orderBy,@paging);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_specimen_count
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_specimen_count` //

CREATE PROCEDURE `cohort_specimen_count`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cb.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cb.cohort_acronym asc"));
    
    set @query = concat("select cb.cohort_id,cb.cohort_name,cb.cohort_acronym,cs.* from cohort_basic cb, cohort_specimens cs where cb.cohort_id = cs.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: cohort_specimen_overview
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `cohort_specimen_overview` //

CREATE PROCEDURE `cohort_specimen_overview`(in cohort_info text)
BEGIN
	set @queryString = "";
    
    if cohort_info != "" then
		set @queryString = concat(@queryString, "and cb.cohort_id in (",cohort_info,") ");
    end if;
    
    set @queryString = concat(@queryString, concat(" order by cb.cohort_acronym asc"));
    
    set @query = concat("select cb.cohort_id,cb.cohort_name,cb.cohort_acronym,cs.* from cohort_basic cb, cohort_specimens cs where cb.cohort_id = cs.cohort_id ",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
END //


-- -----------------------------------------------------------------------------------------------------------
-- Stored Procedure: contact_us
-- -----------------------------------------------------------------------------------------------------------
DROP PROCEDURE IF EXISTS `contact_us` //

CREATE PROCEDURE `contact_us`(in firstname varchar(50), in lastname varchar(50), in organization varchar(100), 
														in phone varchar(20), in email varchar(50), in topic int(3), in message text)
BEGIN
	set @queryString = concat("('",firstname,"','",lastname,"','",organization,"','",phone,"','",email,"',",topic,",'",message,"',now(),now())");
    
    set @query = concat("insert into contact(first_name, last_name,organization,phone,email,topic, message,create_time,update_time) values",@queryString);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
	DEALLOCATE PREPARE stmt;
    
    SELECT LAST_INSERT_ID();
END //
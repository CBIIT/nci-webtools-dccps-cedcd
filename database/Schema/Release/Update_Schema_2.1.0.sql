
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cohort_select` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cohort_select`(in gender int(1), in enrollment_info text,in age_info varchar(100),
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
    
    set @query = concat("select sql_calc_found_rows cohort_id,cohort_name, cohort_acronym,cohort_web_site,update_time from cohort_summary where 1=1 ",@queryString,@orderBy,@paging);
    PREPARE stmt FROM @query;
	EXECUTE stmt;
    select found_rows() as total;
	DEALLOCATE PREPARE stmt;
END ;;

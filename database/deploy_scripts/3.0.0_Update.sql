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

DELIMITER ;

call update_cohort_published_status();

DROP PROCEDURE IF EXISTS `update_cohort_published_status`;

-- end update_cohort_published_status  --
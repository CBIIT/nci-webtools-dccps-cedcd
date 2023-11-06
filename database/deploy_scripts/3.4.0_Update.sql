USE cedcd;

DROP PROCEDURE IF EXISTS `?`;
DELIMITER //
CREATE PROCEDURE `?`()
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;
  
    ALTER TABLE cohort
    ADD `type` VARCHAR(20) NOT NULL DEFAULT 'Etiology',
    ADD `outdated` BOOLEAN NOT NULL DEFAULT false,
    ADD `outdated_reminder` BOOLEAN NOT NULL DEFAULT false;

    UPDATE cohort
    SET `type` = 'Survivor'
    WHERE acronym = 'Pathways';

    UPDATE cohort
    SET `outdated` = true
    WHERE publish_time < DATE_SUB(NOW(),INTERVAL 2 YEAR);
END //
DELIMITER ;
CALL `?`();
DROP PROCEDURE `?`;
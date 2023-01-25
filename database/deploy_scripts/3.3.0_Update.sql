/*
* this script file includes DB updates during CEDCD release 3.3.0
*
* !!!! consider these sqls could be repeated for each deploy !!!!
*  
*
*/

use cedcd;
SET sql_safe_updates=0;
/*
*  update user table to rename seesion_id (not active column) to login_type
*/

DELIMITER //    
drop procedure if exists temp_update_user //
create procedure temp_update_user()
begin

    start transaction;

    -- add new field to keep cancer condition N/A status
    IF EXISTS( SELECT NULL
            FROM INFORMATION_SCHEMA.COLUMNS
             WHERE table_name = 'user'
             AND table_schema = 'cedcd'
             AND column_name = 'session_id')  THEN

        ALTER TABLE `user` RENAME COLUMN `session_id` TO `login_type`;

        ALTER TABLE `cedcd`.`user` DROP INDEX `user_user_name_uindex` ;

        ALTER TABLE `cedcd`.`user` CHANGE COLUMN `user_name` `user_name` VARCHAR(200) NULL ;


        update user a set a.login_type = 'Login.gov' where a.id > 0 and a.user_name like '%@%';
        update user a set a.login_type = 'NIH' where a.id > 0 and a.login_type is null;

        commit;

    END IF;

END //

DELIMITER ;

call temp_update_user();

drop procedure if exists temp_update_user;

SET sql_safe_updates=1;

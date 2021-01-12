/*
* this script file includes DB updates during CEDCD release 3.0.0
*
* !!!! consider these sqls could be repeated for each deploy !!!!
*  any table structures changes need update accordingly in Schema/cedec_Tables.sql file
*
*/

user cedcd;

DELIMITER //

drop procedure if exists temp_update_3_0_0 //
create procedure temp_update_3_0_0()
begin
    start transaction;

    /*
     check if user table being initialed with one one user index 
     */

    if (select COUNT(*) = 1 from user) then

    insert into user(user_name,first_name,last_name, access_level,active_status,last_login, email, create_time,update_time) 
    values
    ("kai-ling.chen@nih.gov","Kailing","Chen","CohortAdmin","Y","2021-01-06 18:42:27","kai-ling.chen@nih.gov","2020-11-10 15:37:20","2020-11-10 15:37:20"),
    ("zhaox18","Joe","Zhao","SystemAdmin","Y","2021-01-06 14:29:34","zhaox18@nih.gov","2020-11-02 19:57:33",now()),
    ("zhangchao","Chao","Zhang","SystemAdmin","Y","2021-01-06 19:03:59","chao.zhang3@nih.gov","2020-11-02 19:57:33","2020-12-23 21:00:34"),
    ("elena.joanne@example.com","Joanne","Elena","CohortAdmin","Y","NULL","elena.joanne@example.com","2020-11-02 19:57:33",now()),
    ("rogerssc","Scott","Rogers","CohortAdmin","Y","NULL","rogerssc@mail.nih.gov","2020-11-02 19:57:33",now()),
    ("pottingerca","Camille","Pottinger","CohortAdmin","Y","NULL","camille.pottinger@nih.gov","2020-11-02 19:57:33",now()),
    ("parkbw","Brian","Park","SystemAdmin","Y","2021-01-06 19:37:57","brian.park@nih.gov","2020-11-09 22:19:37",now()),
    ("brian.park@nih.gov","Brian","Park","CohortAdmin","Y","2021-01-06 19:39:44","brian.park@nih.gov","2020-11-10 17:14:20",now()),
    ("chao.zhang3@nih.gov","Chao","Zhang","CohortAdmin","Y","2021-01-06 17:40:23","chao.zhang3@nih.gov","2020-11-10 17:15:03","2021-01-04 18:33:12"),
    ("zhaox18@nih.gov","Joe","Zhao","CohortAdmin","Y","2021-01-06 16:54:16","zhaox18@nih.gov","2020-11-10 17:15:03",now()),
    ("kevin.matarodriguez@nih.gov","Kevin","Mata Rodriguez","CohortAdmin","Y","NULL","kevin.matarodriguez@nih.gov","2020-11-16 17:01:03",now()),
    ("matarodriguezko","Kevin","Mata Rodriguez","SystemAdmin","Y","NULL","kevin.matarodriguez@nih.gov","2020-11-16 17:08:08",now()),
    ("chenb10","Ben","Chen","CohortAdmin","Y","NULL","ben.chen@nih.gov","2020-12-14 18:20:21","2021-01-04 13:18:36"),
    ("ben.chen@nih.gov","Ben","Chen","CohortAdmin","Y","2021-01-06 19:47:01","ben.chen@nih.gov","2020-12-14 18:20:21",now()),
    ("jiangk3","Kevin","Jiang","SystemAdmin","Y","2021-01-05 23:15:39","kevin.jiang2@nih.gov","2020-12-14 18:20:21",now()),
    ("kevin.jiang2@nih.gov","Kevin","Jiang","CohortAdmin","Y","2021-01-06 18:32:45","kevin.jiang2@nih.gov","2020-12-14 18:20:21",now()),
    ("chop2","Phyllip","Cho","SystemAdmin","Y","NULL","phyllip.cho@nih.gov","2020-12-14 18:21:41",now()),
    ("phyllip.cho@nih.gov","Phyllip","Cho","CohortAdmin","Y","NULL","phyllip.cho@nih.gov","2020-12-14 18:21:41",now()),
    ("uddins2","Shomir","Uddin","SystemAdmin","Y","NULL","shomir.uddin@nih.gov","2020-12-28 15:49:13",now()),
    ("shomir.uddin@nih.gov","Shomir","Uddin","CohortAdmin","Y","NULL","shomir.uddin@nih.gov","2020-12-28 16:20:33",now());

    insert into cohort_user_mapping (cohort_acronym, user_id, update_time)
    select "ATBC", user.id, now() from user where user.user_name in ( 
    "kai-ling.chen@nih.gov",
    "brian.park@nih.gov",
    "chao.zhang3@nih.gov",
    "zhaox18@nih.gov",
    "kevin.matarodriguez@nih.gov",
    "ben.chen@nih.gov",
    "shomir.uddin@nih.gov");

    insert into cohort_user_mapping (cohort_acronym, user_id, update_time)
    select "PLCO", user.id, now() from user where user.user_name in ( 
    "kai-ling.chen@nih.gov",
    "chao.zhang3@nih.gov",
    "zhaox18@nih.gov",
    "ben.chen@nih.gov");
          
    end if;

    commit;
end //

DELIMITER ;

call temp_update_3_0_0();

drop procedure temp_update_3_0_0;


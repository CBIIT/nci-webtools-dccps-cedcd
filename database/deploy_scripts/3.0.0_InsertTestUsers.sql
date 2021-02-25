/*
* Insert test accounts for lower tiers only
*
*/

insert into user(user_name,first_name,last_name, access_level,active_status,last_login, email, create_time,update_time) 
values
("kai-ling.chen@nih.gov","Kailing","Chen","CohortAdmin","Y",NULL,"kai-ling.chen@nih.gov",now(),now()),
("zhaox18","Joe","Zhao","SystemAdmin","Y",NULL,"zhaox18@nih.gov","2020-11-02 19:57:33",now()),
("zhangchao","Chao","Zhang","SystemAdmin","Y",NULL,"chao.zhang3@nih.gov",now(),now()),
("parkbw","Brian","Park","SystemAdmin","Y",NULL,"brian.park@nih.gov",now(),now()),
("brian.park@nih.gov","Brian","Park","CohortAdmin","Y",NULL,"brian.park@nih.gov",now(),now()),
("chao.zhang3@nih.gov","Chao","Zhang","CohortAdmin","Y",NULL,"chao.zhang3@nih.gov",now(),now()),
("zhaox18@nih.gov","Joe","Zhao","CohortAdmin","Y",NULL,"zhaox18@nih.gov",now(),now()),
("kevin.matarodriguez@nih.gov","Kevin","Mata Rodriguez","CohortAdmin","Y", NULL ,"kevin.matarodriguez@nih.gov",now(),now()),
("matarodriguezko","Kevin","Mata Rodriguez","SystemAdmin","Y", NULL ,"kevin.matarodriguez@nih.gov",now(),now()),
("chenb10","Ben","Chen","CohortAdmin","Y", NULL ,"ben.chen@nih.gov",now(),now()),
("ben.chen@nih.gov","Ben","Chen","CohortAdmin","Y",NULL,"ben.chen@nih.gov",now(),now()),
("jiangk3","Kevin","Jiang","SystemAdmin","Y",NULL,"kevin.jiang2@nih.gov",now(),now()),
("kevin.jiang2@nih.gov","Kevin","Jiang","CohortAdmin","Y",NULL,"kevin.jiang2@nih.gov",now(),now()),
("chop2","Phyllip","Cho","SystemAdmin","Y", NULL ,"phyllip.cho@nih.gov",now(),now()),
("phyllip.cho@nih.gov","Phyllip","Cho","CohortAdmin","Y", NULL ,"phyllip.cho@nih.gov",now(),now()),
("uddins2","Shomir","Uddin","SystemAdmin","Y", NULL ,"shomir.uddin@nih.gov",now(),now()),
("shomir.uddin@nih.gov","Shomir","Uddin","CohortAdmin","Y", NULL ,"shomir.uddin@nih.gov",now(),now()),
("diego.juarez@nih.gov","Diego","Juarez","CohortAdmin","Y", NULL ,"diego.juarez@nih.gov",now(),now()),
("juarezds","Diego","Juarez","SystemAdmin","Y", NULL ,"diego.juarez@nih.gov",now(),now());

insert into cohort_user_mapping (cohort_acronym, user_id, update_time)
select "ATBC", user.id, now() from user where user.user_name in ( 
"kai-ling.chen@nih.gov",
"brian.park@nih.gov",
"chao.zhang3@nih.gov",
"zhaox18@nih.gov",
"kevin.matarodriguez@nih.gov",
"ben.chen@nih.gov",
"shomir.uddin@nih.gov",
"diego.juarez@nih.gov");

insert into cohort_user_mapping (cohort_acronym, user_id, update_time)
select "PLCO", user.id, now() from user where user.user_name in ( 
"kai-ling.chen@nih.gov",
"chao.zhang3@nih.gov",
"zhaox18@nih.gov",
"ben.chen@nih.gov");


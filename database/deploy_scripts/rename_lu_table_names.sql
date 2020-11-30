
/*
*  To clarify table names
*/

ALTER TABLE lu_data_collected_category RENAME TO lu_data_category ;
ALTER TABLE lu_category RENAME TO  lu_person_category ;

insert into lu_data_category (id,category) values (99 ,'Cancer Treatment');

UPDATE lu_data_category SET category= 'Physical function measures' WHERE id= 41;
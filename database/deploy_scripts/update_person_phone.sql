/*
*  add international phone input with country_code column in Person table
*/

alter table person add country_code varchar(10) null default '+1' after phone;
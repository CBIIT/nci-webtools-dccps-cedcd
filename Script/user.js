CREATE TABLE user (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  display_name varchar(100) NOT NULL,
  access_level int(3) NOT NULL,
  session_id varchar(50) DEFAULT NULL,
  lock int(1) DEFAULT NULL,
  last_login datetime DEFAULT NULL,
  lock_date datetime DEFAULT NULL,
  password_date datetime DEFAULT NULL,
  email varchar(50) NOT NULL,
  cohort_id int(11) DEFAULT NULL,
  salt varchar(50) DEFAULT NULL,
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE contact (
  contact_id int(11) not null AUTO_INCREMENT,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  organization varchar(100) not null,
  phone varchar(20),
  email varchar(50) not null,
  topic int(3) not null,
  message varchar(2000) not null,
  create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (contact_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
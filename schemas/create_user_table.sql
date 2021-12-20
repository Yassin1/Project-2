create table users(
    user_id int(11) AUTO_INCREMENT PRIMARY KEY,
    user_name varchar(255),
    user_email varchar(255),
    user_password varchar(255),
    user_phonenumber varchar(255),
    createdAt timestamp not null default current_timestamp,
    updatedAt timestamp not null default current_timestamp
 );

 
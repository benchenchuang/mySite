const users=`
create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    token VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    qq VARCHAR(100) NOT NULL,
    access VARCHAR(100) default '0',
    bio VARCHAR(100) NOT NULL,
    sign_time VARCHAR(100) NOT NULL,
    update_time VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id )
);`
module.exports=users;
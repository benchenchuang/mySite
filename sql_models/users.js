const users=`
create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    sign_time VARCHAR(100) NOT NULL,
    update_time VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id )
);`
module.exports=users;
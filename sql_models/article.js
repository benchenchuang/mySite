const sorts=`
create table if not exists article_sorts(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    create_time VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id )
)ENGINE=InnoDB;`
const articles=`
create table if not exists articles(
    id INT NOT NULL AUTO_INCREMENT,
    sort VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    pic VARCHAR(100) NOT NULL,
    content VARCHAR(100) NOT NULL,
    views VARCHAR(100) NOT NULL,
    create_time VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id )
)ENGINE=InnoDB;`
module.exports={
    sorts,
    articles
};
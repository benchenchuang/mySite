const sorts=`
create table if not exists article_sorts(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    create_time VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id ),
    INDEX ( name )
)ENGINE=InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci AUTO_INCREMENT=5;`
const articles=`
create table if not exists articles(
    id INT NOT NULL AUTO_INCREMENT,
    sort VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    pic VARCHAR(100) NOT NULL,
    content text(0) NOT NULL,
    views VARCHAR(100) NOT NULL,
    create_time VARCHAR(100) NOT NULL,
    PRIMARY KEY ( id ),
    FOREIGN KEY(sort) REFERENCES article_sorts(name) on delete cascade on update cascade
)ENGINE=InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;`;
const article_love=`
create table if not exists article_love(
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(100) DEFAULT '0' COMMENT '点赞人ID',
    topic_id VARCHAR(100) DEFAULT '0' COMMENT '话题ID',
    create_time datetime DEFAULT NULL,
    PRIMARY KEY ( id )
)ENGINE=InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;`

const article_comment=`
create table if not exists article_comment(
    id INT NOT NULL AUTO_INCREMENT,
    topic_id VARCHAR(100) DEFAULT '0' COMMENT '话题ID',
    user_id VARCHAR(100) DEFAULT '0' COMMENT '回复用户ID',
    user_id_reply VARCHAR(100) DEFAULT '0' COMMENT '被回复用户ID(如果为空，则回复话题发起人)',
    content text CHARACTER SET utf8 NOT NULL,
    create_time datetime DEFAULT NULL COMMENT '创建时间',
    PRIMARY KEY ( id )
)ENGINE=InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci;`

module.exports={
    sorts,
    articles,
    article_love,
    article_comment
};
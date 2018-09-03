const mysql=require('mysql');
const config=require('../config/default');
const User=require('../sql_models/users');
const Article=require('../sql_models/article')

const pool=mysql.createPool({
    host:config.database.HOST,
    port:config.database.PORT,
    database:config.database.DATABASE,
    user:config.database.USERNAME,
    password:config.database.PASSWORD
});

let query=(sql,values)=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err)
            }else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(rows)
                    }
                    connection.release();
                })
            }
        })
    })
};
// 建表函数
let createTable=(sql)=>{
    return query(sql,[]);
};
// 创建用户表
createTable(User);
//创建文章分类表
createTable(Article.sorts);
//创建文章列表表
createTable(Article.articles);
//创建文章点赞表
createTable(Article.article_love);
//创建评论表
createTable(Article.article_comment);

//注册新用户
const addUser=(value)=>{
    _sql="insert into users set username=?,password=?,access=?,sign_time=?";
    return query(_sql,value);
};
//根据用户名查找用户
const findByName=(name)=>{
    _sql=`select * from users where username="${name}"`;
    return query(_sql);
};
//根据用户id查询用户
const findById=(id)=>{
    _sql=`select * from users where id=${id}`;
    return query(_sql);
}
//修改用户信息
const updateUserInfo=(values)=>{
    _sql="update users set access=?, phone=?,email=?,qq=?,bio=?,update_time=? where id = ?";
    return query(_sql,values)
};
//更新用户token
const updateUserToken=(token,id)=>{
    _sql=`update users set token='${token}' where id =${id}`;
    return query(_sql)
};
//查询会员信息
const getCustomers=(values)=>{
    _sql='select * from users order by id';
    return query(_sql,values);
};
const getCustomersCount=()=>{
    _sql='select count(*) from users';
    return query(_sql);
}
//查看会员信息
const getCustomer=(id)=>{
    _sql=`select * from users where id=${id}`;
    return query(_sql);
}
//获取特定条件会员列表
const getFewCustomers=(values)=>{
    _sql='select * from users limit ?,?';
    return query(_sql,values);
}
//删除会员
const delCustomer=(value)=>{
    _sql=`delete from users where id in (${value})`;
    return query(_sql);
}
//创建分类
const createSort=(values)=>{
    _sql=`insert into article_sorts set name=?,create_time=?`;
    return query(_sql,values);
}
//查询分类
const findSort=(name)=>{
    _sql=`select * from article_sorts where name="${name}"`;
    return query(_sql);
};
//获取所有分类内容
const getSorts=()=>{
    _sql='select * from article_sorts';
    return query(_sql);
};
const getFewSorts=(values)=>{
    _sql='select * from article_sorts limit ?,?';
    return query(_sql,values);
}
//删除分类
const delSort=(value)=>{
    _sql=`delete from article_sorts where id in (${value})`;
    return query(_sql);
}
//获取分类详情
const getSort=(id)=>{
    _sql=`select * from article_sorts where id=${id}`;
    return query(_sql);
};
//修改分类信息
const updateSort=(values)=>{
    _sql="update article_sorts set name=? where id = ?";
    return query(_sql,values)
};
//根据title查询文章
const findArticleByTitle=(title)=>{
    _sql=`select * from articles where title='${title}'`;
    return query(_sql);
};
//根据id查询文章
const findArticleById=(id)=>{
    _sql=`select c.*,users.username from articles as c left join users on c.author=users.id  where c.id='${id}'`;
    return query(_sql);
};
//创建文章
const createArticle=(values)=>{
    _sql='insert into articles set sort=?,author=?,title=?,pic=?,content=?,views=?,create_time=?';
    return query(_sql,values);
};
//刷新浏览量
const addViews=(id)=>{
    _sql=`update articles set views=views+1 where id='${id}'`;
    return query(_sql);
}
//获取全部文章
const getAllArticles=()=>{
    _sql='select * from articles';
    return query(_sql);
};
const getFewArticles=(start,num,sort,title)=>{

    if(sort){
        if(title){
            _sql=`select a.*,count(b.topic_id) as reply_count from (SELECT * FROM articles where sort=${sort} and title like '%${title}%' order by id desc limit ${start},${num}) as a
            LEFT JOIN article_comment b on a.id=b.topic_id GROUP BY a.id
            order by -a.id`
        }else{
            _sql=`select a.*,count(b.topic_id) as reply_count from (SELECT * FROM articles where sort=${sort} order by id desc limit ${start},${num}) as a 
            LEFT JOIN article_comment b on a.id=b.topic_id GROUP BY a.id
            order by -a.id`;
        }
    }else{
        if(title){
            _sql=`select a.*,count(b.topic_id) as reply_count from (SELECT * FROM articles where title like '%${title}%' order by id desc limit ${start},${num}) as a
            LEFT JOIN article_comment b on a.id=b.topic_id GROUP BY a.id
            order by -a.id`;
        }else{
            _sql=`select a.*,count(b.topic_id) as reply_count from (SELECT * FROM articles limit ${start},${num}) as a 
            LEFT JOIN article_comment as b on a.id=b.topic_id GROUP BY a.id
            order by -a.id`;
        }
    }


    // `直接select * , count(id) from 文章表 group by 评论表的id字段`
    return query(_sql)
};
//根据id删除文章
const deleteArticleById=(id)=>{
    _sql=`delete from articles where id in (${id})`;
    return query(_sql);
}
//更新文章
const updateArticle=(values)=>{
    _sql='update articles set sort=?,title=?,pic=?,content=? where id = ?';
    return query(_sql,values);
};
//查询文章点赞数
const getArticleLoves=(topic)=>{
    _sql=`select * from article_love where topic_id=${topic}`;
    return query(_sql);
}
//新建点赞
const addArticleLove=(values)=>{
    _sql='insert into article_love set user_id=?,topic_id=?,create_time=?';
    return query(_sql,values);
};
//取消点赞
const cancelArticleLove=(id)=>{
    _sql=`delete from article_love where id=${id}`;
    return query(_sql);
};
//查询是否点赞
const findLove=(user,topic)=>{
    _sql=`select * from article_love where user_id=${user} and topic_id=${topic}`;
    return query(_sql)
};
//创建评论
const createComment=(values)=>{
    _sql='insert into article_comment set topic_id=?,user_id=?,user_id_reply=?,content=?,create_time=?';
    return query(_sql,values);
};
//查询评论
const getComments=(topic)=>{
    // _sql=`select * from article_comment left join users on article_comment.user_id=users.id where topic_id=${topic} `;
    _sql=`select c.*,a.username,b.username as username_reply from article_comment as c 
    left join users as a on c.user_id=a.id
    left join users as b on c.user_id_reply=b.id
    where topic_id=${topic} order by -c.id`
    return query(_sql)
};
//删除评论
const delComment=(id)=>{
    _sql=`delete from article_comment where id=${id}`;
    return query(_sql)
};


module.exports={
    addUser,
    findByName,
    findById,
    updateUserInfo,
    updateUserToken,
    getCustomers,
    getCustomersCount,
    getFewCustomers,
    getCustomer,
    delCustomer,
    createSort,
    findSort,
    getSorts,
    getFewSorts,
    delSort,
    getSort,
    updateSort,
    findArticleByTitle,
    createArticle,
    getAllArticles,
    findArticleById,
    addViews,
    getFewArticles,
    deleteArticleById,
    updateArticle,
    getArticleLoves,
    addArticleLove,
    cancelArticleLove,
    findLove,
    createComment,
    getComments,
    delComment
}



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

module.exports={
    addUser,
    findByName,
    findById,
    updateUserInfo,
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
    updateSort
}



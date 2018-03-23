const mysql=require('mysql');
const config=require('../config/default');
const User=require('../sql_models/users');

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

//注册新用户
const addUser=(value)=>{
    _sql="insert into users set username=?,password=?,sign_time=?";
    return query(_sql,value);
};
//根据用户名查找用户
const findByName=(name)=>{
    _sql=`select * from users where username="${name}"`;
    return query(_sql);
};



module.exports={
    addUser,
    findByName
}



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
//根据用户id查询用户
const findById=(id)=>{
    _sql=`select * from users where id=${id}`;
    return query(_sql);
}
//修改用户信息
const updateUserInfo=(values)=>{
    _sql="update users set phone=?,email=?,qq=?,bio=?,update_time=? where id = ?";
    return query(_sql,values)
};
//查询会员信息
const getCustomers=(values)=>{
    _sql='select * from users order by id';
    return query(_sql,values);
};
//获取特定条件会员列表
const getFewCustomers=(values)=>{
    _sql='select * from users limit ?,?';
    return query(_sql,values);
}
//删除会员
const delCustomer=(value)=>{
    _sql=`delete from users where id in (${value}`;
    return query(_sql);
}

module.exports={
    addUser,
    findByName,
    findById,
    updateUserInfo,
    getCustomers,
    getFewCustomers,
    delCustomer,
}



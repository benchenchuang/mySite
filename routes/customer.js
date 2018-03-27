const UserModel=require('../lib/mysql');
const moment=require('moment');

const customerModel=async (ctx,next)=>{
    await ctx.render('customer/customer',{
        title:'用户权限管理',
        user:ctx.session.user,
        index:8,
    });
};
const getCustomers=async (ctx,next)=>{
    let customers=await UserModel.getCustomers();
    let thisPage=parseInt(ctx.request.query.page || 1);
    let limit =parseInt(ctx.request.query.limit || 3);
    let startCount=(thisPage-1)*limit;
    let getData=await UserModel.getFewCustomers([startCount,limit]);
    return ctx.body={
        status:2,
        data:{
            customers:getData,
            access:ctx.session.user.access
        }
    };
};

const deleteCustomer=async (ctx,next)=>{
    var formData=ctx.request.body;
    var customerId=formData.customer;
    await UserModel.delCustomer(customerId).then(res=>{
        if(res.serverStatus==2){
            return ctx.body={
                status:2,
                data:"删除成功"
            }
        }else{
            return ctx.body={
                status:2,
                data:"操作错误"
            }
        }
    })
}

module.exports={
    customerModel,
    getCustomers,
    deleteCustomer,
}
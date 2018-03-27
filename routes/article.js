const ArticleModel=require('../lib/mysql');
const moment=require('moment');

const getSort=async (ctx,next)=>{
    return ctx.render('article/sort',{
        title:'文章分类',
        user:ctx.session.user,
        index:6
    });
};
const createSort=async (ctx,next)=>{
    var sortName=ctx.request.body.sort_name;
    try{
        if(!sortName.trim()){
            throw new Error('分类名不能为空')
        }
    }catch(e){
        return ctx.body={
            status:0,
            data:e.message
        }
    };
    await ArticleModel.findSort(sortName).then(async res=>{
        if(res.length){
            return ctx.body={
                status:0,
                data:'分类名已存在'
            }
        }else{
            await ArticleModel.createSort([sortName,moment().format('YYYY-MM-DD HH:mm:ss')]).then(res=>{
                if(res.serverStatus==2){
                    return ctx.body={
                        status:2,
                        data:'分类添加成功'
                    }
                }else{
                    return ctx.body={
                        status:1,
                        data:'分类添加失败'
                    } 
                }
            })
        }
    })
};
const getSorts=async (ctx,next)=>{
    var sorts=await ArticleModel.getSorts();
    let thisPage=parseInt(ctx.request.query.page || 1);
    let limit =parseInt(ctx.request.query.limit || 10);
    let startCount=(thisPage-1)*limit;
    let getData=await ArticleModel.getFewSorts([startCount,limit]);
    return ctx.body={
        status:2,
        data:getData,
        counts:sorts.length
    }
}
const deleteSort=async (ctx,next)=>{
    var formData=ctx.request.body;
    var sortId=formData.sort;
    await ArticleModel.delSort(sortId).then(res=>{
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
const sortDesc=async (ctx,next)=>{
    let id=ctx.request.query.id;
    let sort=await ArticleModel.getSort(id);
    return ctx.body={
        status:2,
        data:sort
    }
}
const updateSort=async (ctx,next)=>{
    let sortData=ctx.request.body;
    let id=sortData.id;
    let name=sortData.sort;
    await ArticleModel.updateSort([name,id]).then(res=>{
        if(res.serverStatus==2){
            return ctx.body={
                status:2,
                data:'更新成功'
            }
        }else{
            return ctx.body={
                status:0,
                data:'更新失败'
            } 
        }
    })
}

module.exports={
    getSort,
    createSort,
    getSorts,
    deleteSort,
    sortDesc,
    updateSort
}
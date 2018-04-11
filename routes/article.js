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
                status:3,
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
const showArticleList=async (ctx,next)=>{
    return ctx.render('article/article_list',{
        title:'文章管理列表',
        user:ctx.session.user,
        index:7
    });
}
const addArticle=async (ctx,next)=>{
    return ctx.render('article/article',{
        title:"添加文章",
        user:ctx.session.user,
        index:7
    })
};
const createArticle=async (ctx,next)=>{
    var formData=ctx.request.body;
    let pic=formData.pic;
    let title=formData.title;
    let sort=formData.sort;
    let content=formData.content;
    let views=0;
    let author=ctx.session.user.username;
    try{
        if(!pic){
            throw new Error("封面不能为空")
        }
        if(title.length<5){
            throw new Error("标题长度不少于5")
        }
        if(!sort){
            throw new Error("分类不能为空")
        }
        if(!content.length){
            throw new Error('内容不能为空')
        }
    }catch(e){
        return ctx.body={
            status:0,
            data:e.message
        }
    }
    await ArticleModel.findArticleByTitle(title).then(async res=>{
        if(res.length){
            return ctx.body={
                status:1,
                data:'文章标题已存在'
            }
        }else{
            await ArticleModel.createArticle([sort,author,title,pic,content,views,moment().format('YYYY-MM-DD HH:mm:ss')])
                    .then(res=>{
                        if(res.serverStatus==2){
                            return ctx.body={
                                status:2,
                                data:'创建成功'
                            }
                        }else{
                            return ctx.body={
                                status:3,
                                data:'创建失败'
                            }
                        }
                    })
        }
    })
};
const getArticleList=async (ctx,next)=>{
    let articles=await ArticleModel.getAllArticles();
    let thisPage=parseInt(ctx.request.query.page || 1);
    let limit =parseInt(ctx.request.query.limit || 10);
    let sort =parseInt(ctx.request.query.sort);
    let title =ctx.request.query.title;
    let startCount=(thisPage-1)*limit;
    let getData=await ArticleModel.getFewArticles(startCount,limit,sort,title);
    return ctx.body={
        status:2,
        data:getData,
        counts:articles.length
    }
}
const getArticle=async (ctx,next)=>{
    return ctx.render('article/desc',{
        title:'文章详情',
        user:ctx.session.user,
        index:7
    })
    
};
const getDesc=async (ctx,next)=>{
    let id=ctx.request.query.id;
    await ArticleModel.addViews(id);
    let article=await ArticleModel.findArticleById(id);
    if(article.length){
        return ctx.body={
            status:2,
            data:article
        }
    }else{
        return ctx.body={
            status:0,
            data:'文章不存在'
        }
    }
}
const deleteArticle=async (ctx,next)=>{
    let id=ctx.request.body.id;
    await ArticleModel.deleteArticleById(id).then(res=>{
        if(res.serverStatus==2){
            return ctx.body={
                status:2,
                data:"删除成功"
            }
        }else{
            return ctx.body={
                status:3,
                data:"操作错误"
            }
        }
    })
}
const getEditArticle=async (ctx,next)=>{
    return ctx.render('article/edit',{
        title:'编辑文章',
        user:ctx.session.user,
        index:7
    })
}
const updateArticle=async(ctx,next)=>{
    let formData=ctx.request.body;
    let id=formData.id;
    let pic=formData.pic;
    let title=formData.title;
    let sort=formData.sort;
    let content=formData.content;
    await ArticleModel.findArticleById(id).then(async res=>{
        if(!res.length){
            return ctx.body={
                status:1,
                data:'文章不存在'
            }
        }else{
            await ArticleModel.updateArticle([sort,title,pic,content,id]).then(res=>{
                if(res.serverStatus==2){
                    return ctx.body={
                        status:2,
                        data:'更新成功'
                    }
                }else{
                    return ctx.body={
                        status:3,
                        data:'更新失败'
                    }
                }
            })
        }
    });
};
const uploadImg=async(ctx,next)=>{
    let gallerys=ctx.req.files.gallery;
    let galleryData=[];
    if(gallerys){
        gallerys.forEach(item=>{
            galleryData.push('/uploads/'+item.filename)
        });
        return ctx.body={
            "errno": 0,
            "data": galleryData
        }
    }else{
        return ctx.body={
            "errno": 1,
            data:[]
        }
    }
}

module.exports={
    getSort,
    createSort,
    getSorts,
    deleteSort,
    sortDesc,
    updateSort,
    showArticleList,
    addArticle,
    createArticle,
    getArticleList,
    getArticle,
    getDesc,
    deleteArticle,
    getEditArticle,
    updateArticle,
    uploadImg
}
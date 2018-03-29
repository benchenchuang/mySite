
const getHome=async (ctx,next)=>{
    await ctx.render('index', {
        title: 'Hello Koa site!',
        user:ctx.session.user,
        index:1
      })
}
const uploadPic=async (ctx,next)=>{
    let filename=ctx.req.file.filename;
    if(filename){
        return ctx.body={
            status:2,
            data:{
                pic:filename,
                info:"上传成功"
            }
        }
    }else{
        return ctx.body={
            status:1,
            data:{
                info:'上传失败'
            } 
        }
    }
}


module.exports={
    getHome,
    uploadPic
}

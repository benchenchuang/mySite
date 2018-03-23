module.exports={
    //已登录
    checkNotLogin:async(ctx,next)=>{
        try{
            if(ctx.session.user){
                return ctx.redirect('/admin')
            }
        }catch(e){
            return ctx.redirect('/admin/login')
        }
        await next();
    },
    checkLogin:async(ctx,next)=>{
        if(!ctx.session.user){
            return ctx.redirect('/admin/login')
        }
        await next();
    }
}
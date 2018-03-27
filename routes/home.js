
const getHome=async (ctx,next)=>{
    await ctx.render('index', {
        title: 'Hello Koa site!',
        user:ctx.session.user,
        index:1
      })
}


module.exports={
    getHome
}

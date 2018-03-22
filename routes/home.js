
const getHome=async (ctx,next)=>{
    await ctx.render('index', {
        title: 'Hello Koa site!'
      })
}


module.exports={
    getHome
}

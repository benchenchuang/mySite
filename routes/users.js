const getLogin=async (ctx,next)=>{
  await ctx.render('users/login',{
    title:'登录'
  })
}

module.exports={
  getLogin
}

const router = require('koa-router')()
const Home=require('./home');
const Users=require('./users')

router.get('/',Home.getHome)

router.get('/login',Users.getLogin)

//地址错误
router.get('/*', async(ctx, next) => {
  await ctx.render('404', {
      title: '404 page'
  });
})
module.exports = router;

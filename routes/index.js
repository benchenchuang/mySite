const router = require('koa-router')();
const Check=require('../middlewares/check');
const Home=require('./home');
const Users=require('./users')
const Customer=require('./customer')

router.get('/admin',Check.checkLogin,Home.getHome)
// 登录
router.get('/admin/login',Check.checkNotLogin,Users.getLogin);
router.post('/admin/login',Users.postLogin);
// 注册
router.get('/admin/register',Check.checkNotLogin,Users.getRegister);
router.post('/admin/register',Users.postRegister);
// 验证码
router.get('/admin/code',Users.getCode);
//退出
router.get('/admin/out',Users.getOut);
//修改信息
router.get('/admin/info',Users.getInfo);
router.post('/admin/info',Users.postInfo);
//会员管理
router.get('/admin/customer',Customer.customerModel);
router.get('/admin/customers',Customer.getCustomers);
//删除会员
router.post('/admin/customer/delete',Customer.deleteCustomer);


//地址错误
router.get('/*', async(ctx, next) => {
  await ctx.render('error', {
      title: '404 page'
  });
})
module.exports = router;

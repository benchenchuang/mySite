const router = require('koa-router')();
const Check=require('../middlewares/check');
const Home=require('./home');
const Users=require('./users');
const Customer=require('./customer');
const Article=require('./article')

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
router.get('/admin/customers',Customer.customerModel);
router.get('/admin/customersData',Customer.getCustomers);
router.get('/admin/customer',Customer.getCustomer);
//删除会员
router.post('/admin/customer/delete',Customer.deleteCustomer);

//显示文章分类
router.get('/admin/article/sort',Article.getSort);
router.post('/admin/article/create',Article.createSort);
router.get('/admin/article/sorts',Article.getSorts);
//删除分类
router.post('/admin/sort/delete',Article.deleteSort);
router.get('/admin/sort/desc',Article.sortDesc);
router.post('/admin/sort/update',Article.updateSort)

//地址错误
router.get('/*', async(ctx, next) => {
  await ctx.render('error', {
      title: '404 page'
  });
})
module.exports = router;

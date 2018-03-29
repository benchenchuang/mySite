const router = require('koa-router')();
const Check=require('../middlewares/check');
const Home=require('./home');
const Users=require('./users');
const Customer=require('./customer');
const Article=require('./article');
// 上传图片的中间件
const multer=require('koa-multer');
//配置  
var storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) {  
    cb(null, 'public/uploads/')  
  },  
  //修改文件名称  
  filename: function (req, file, cb) {  
    var fileFormat = (file.originalname).split(".");  
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
  }  
}) 
//加载配置  
var upload = multer({ storage: storage }); 

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
//文章列表
router.get('/admin/article/list',Article.showArticleList);
router.get('/admin/article/new',Article.addArticle);
//上传图片
router.post('/admin/upload/pic',upload.single('pic'),Home.uploadPic);
//上传文章
router.post('/admin/')

//地址错误
router.get('/*', async(ctx, next) => {
  await ctx.render('error', {
      title: '404 page'
  });
})
module.exports = router;

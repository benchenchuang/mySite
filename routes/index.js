const router = require('koa-router')();
const Check=require('../middlewares/check');
const Home=require('./home');
const Users=require('./users');
const Customer=require('./customer');
const Article=require('./article');
const Token=require('../middlewares/token');
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

router.get('/admin',Token.checkToken,Check.checkLogin,Home.getHome)
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
router.get('/admin/info',Token.checkToken,Check.checkLogin,Users.getInfo);
router.post('/admin/info',Check.checkLogin,Users.postInfo);
//会员管理
router.get('/admin/customers',Token.checkToken,Check.checkLogin,Customer.customerModel);
router.get('/admin/customersData',Token.checkToken,Check.checkLogin,Customer.getCustomers);
router.get('/admin/customer',Token.checkToken,Check.checkLogin,Customer.getCustomer);
//删除会员
router.post('/admin/customer/delete',Check.checkLogin,Customer.deleteCustomer);

//显示文章分类
router.get('/admin/article/sort',Check.checkLogin,Article.getSort);
router.post('/admin/article/create',Check.checkLogin,Article.createSort);
router.get('/admin/article/sorts',Check.checkLogin,Article.getSorts);
//删除分类
router.post('/admin/sort/delete',Check.checkLogin,Article.deleteSort);
router.get('/admin/sort/desc',Check.checkLogin,Article.sortDesc);
router.post('/admin/sort/update',Check.checkLogin,Article.updateSort)
//文章列表
router.get('/admin/article/list',Check.checkLogin,Article.showArticleList);
router.get('/admin/article/all',Check.checkLogin,Article.getArticleList);
//上传图片
router.post('/admin/upload/pic',Check.checkLogin,upload.single('pic'),Home.uploadPic);
//上传文章
router.get('/admin/article/create',Check.checkLogin,Article.addArticle);
router.post('/admin/article/add',Check.checkLogin,Article.createArticle);
//查看文章
router.get('/admin/article/desc',Check.checkLogin,Article.getArticle);
router.get('/admin/article/id',Check.checkLogin,Article.getDesc);
//删除文章
router.post('/admin/article/delete',Check.checkLogin,Article.deleteArticle);
//编辑文章
router.get('/admin/article/edit',Article.getEditArticle);
router.post('/admin/article/edit',Article.updateArticle);
//文章赞
router.post('/admin/article/add_love',Check.checkLogin,Article.addLove);
router.post('/admin/article/cancel_love',Check.checkLogin,Article.cancelLove);
//评论 增加/删除
router.post('/admin/article/comment/add',Check.checkLogin,Article.addComment);
router.post('/admin/article/comment/del',Check.checkLogin,Article.delComment);


//editor upload图片
router.post('/admin/editor/upload',upload.fields([{ name: 'gallery', maxCount:10 }]),Article.uploadImg)
//地址错误
router.get('/*', async(ctx, next) => {
  await ctx.render('error', {
      title: '404 page'
  });
})
module.exports = router;

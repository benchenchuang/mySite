const UserModel=require('../lib/mysql');
const md5=require('md5');
const moment=require('moment');
const captchapng=require('captchapng');
//登录
const getLogin=async (ctx,next)=>{
  await ctx.render('users/login',{
    title:'登录'
  })
}
const postLogin=async (ctx,next)=>{
  let formData=ctx.request.body;
  let username=formData.username;
  let password=formData.password;
  let code=formData.code;
  let oldCode=ctx.session.code;

  try{
    if(!username){
      throw new Error('用户名不能为空')
    }
    if(password.length<3){
      throw new Error('密码不能少于3位数')
    }
    if(code!=oldCode){
      throw new Error('验证码不正确')
    }
  }catch(e){
    return ctx.body={
      status:1,
      data:e.message
    }
  }
  password=md5(password);
  await UserModel.findByName(username).then(async res=>{
    if(res.length){
      var user=res[0];
      if(user.password==password){
        user.password="";
        ctx.session.user=user;
        return ctx.body={
          status:2,
          data:'登录成功'
        }
      }else{
        return ctx.body={
          status:3,
          data:"密码不正确"
        }
      }
      console.log(user)
    }else{
      return ctx.body={
        status:4,
        data:'用户名未注册'
      }
    }
  })


};
//注册
const getRegister=async (ctx,next)=>{
  await ctx.render('users/register',{
    title:'注册'
  });
};
const postRegister=async (ctx,next)=>{
  var formData=ctx.request.body;
  var username=formData.username;
  var password=formData.password;
  var repassword=formData.repassword;
  var access=parseInt(formData.access) || 0;
  try{
    if(!username){
      throw new Error('用户名不能为空')
    }
    if(password.length<3){
      throw new Error('密码不能少于三位数')
    }
    if(password!=repassword){
      throw new Error('两次密码不一致')
    }
  }catch(e){
    return ctx.body={
      status:1,
      data:e.message
    }
  }
  password=md5(password);
  await UserModel.findByName(username).then(async res=>{
    if(res.length){
      return ctx.body={
        status:3,
        data:'用户名存在'
      }
    }else{
      var sign_time=moment().format('YYYY-MM-DD HH:mm:ss');
      await UserModel.addUser([username,password,access,moment().format('YYYY-MM-DD HH:mm:ss')]).then(res=>{
        if(res.serverStatus==2){
          return ctx.body={
            status:2,
            data:'注册成功'
          }
        }else{
          return ctx.body={
            status:4,
            data:'注册失败，请重新注册'
          }
        }
      })
    }
  })
}
//验证码
const getCode=async (ctx,next)=>{
  var str=parseInt(Math.random()*9000+1000);
  ctx.session.code=str;
  var p = new captchapng(80, 30, str); //生成图片
  p.color(0, 0, 0, 0);
  p.color(80, 80, 80, 255);
  var img = p.getBase64();
  var imgbase64 = new Buffer(img, 'base64');
  ctx.response.type="image/png";
  ctx.body=imgbase64;
}
//退出
const getOut=async (ctx,next)=>{
  ctx.session.user="";
  return ctx.redirect('/admin/login');
};
//修改信息
const getInfo=async (ctx,next)=>{
  await ctx.render('users/info', {
      title: '我的信息',
      user:ctx.session.user,
      index:9
    })
};
const postInfo=async (ctx,next)=>{
  let userInfo=ctx.request.body;
  let id=userInfo.user_id;
  let email=userInfo.user_email;
  let phone=userInfo.user_phone;
  let qq=userInfo.user_qq;
  let bio=userInfo.user_bio;
  let access=userInfo.user_access || ctx.session.user.access;
      access=parseInt(access);
  //邮箱正则
  let emailExp=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
  try{
    if(id==ctx.session.user.id && !access){
      throw new Error('不可更改自己的权限')
    }
    if(!id){
      throw new Error('用户信息不正确')
    }
    if(phone && phone.length!=11){
      throw new Error('手机号不正确')
    }
    if(email && emailExp.test(email)){
      throw new Error('邮箱格式不正确')
    }
  }catch(e){
    return ctx.body={
      status:0,
      data:e.message
    }
  }
  await UserModel.findById(id).then(async res=>{
    if(res.length){
        await UserModel.updateUserInfo([access,phone,email,qq,bio,moment().format('YYYY-MM-DD HH:mm:ss'),id]).then(async res=>{
          if(res.serverStatus==2){
            var userInfo=await UserModel.findById(id);
            userInfo[0].password='';
            ctx.session.user=userInfo[0];
            console.log(userInfo[0])
            return ctx.body={
              status:2,
              data:"更新成功"
            }
          }else{
            return ctx.body={
              status:3,
              data:"更新错误"
            }
          }
        })
    }else{
      return ctx.body={
        status:4,
        data:"用户不存在"
      }
    }
    
  })

}

module.exports={
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getCode,
  getOut,
  getInfo,
  postInfo
}

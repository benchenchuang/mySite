const jwt = require('jsonwebtoken');
const jwtAdd='29296549@qq.com'
module.exports={
    createToken:function (user_id){
        const token=jwt.sign({
            user_id:user_id
        },jwtAdd,{
            expiresIn:60*30
        });
        return token;
    },
    checkToken:async(ctx,next)=>{
        var token=ctx.request.body.token || ctx.query.token || ctx.session.token;
        console.log(ctx.request)
        try{
            if(token){
                var decoded=jwt.decode(token,jwtAdd);
                if(decoded.exp<(new Date()/1000)){
                    // return ctx.redirect('/admin/login');
                    ctx.session.user='';
                }
            }
        }catch(e){
            ctx.session.user='';
            // return ctx.redirect('/admin/login')
        }
        await next();  
    }
}
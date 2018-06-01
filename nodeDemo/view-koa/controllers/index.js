'use strict';
var fn_index = async (ctx,next) =>{
    ctx.render('index.html',{title:'Welcome'})
};
var fn_signin = async (ctx, next) => {
    var
        email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    if (email === 'admin@example.com' && password === '123456') {//登录成功
        ctx.render('signin-ok.html',{
            title: 'Sign In OK',
            name: 'Mr Node'
        });
    } else {//登录失败
        ctx.render('signin-failed.html',{
            title: 'Sign In Failed'
        });
    }
};
module.exports={
    'GET /':fn_index,
    'POST /signin':fn_signin
};
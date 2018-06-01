'use strict';
const Koa = require('koa');
const router = require('koa-router')();// 注意require('koa-router')返回的是函数
const bodyparser = require('koa-bodyparser');
const app = new Koa();
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL,`string` 是模板字符串，ES2015新增的符号,${}中包含变量
    await next(); // 调用下一个middleware
});

router.get('/hello/:name',async (ctx,next)=>{
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello,${name}!</h1>`;
});
router.get('/',async (ctx,next)=>{
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
});
router.post('/signin',async (ctx,next)=>{
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name},password: ${password}`);
    if(name == 'koa' && password == '12345'){
        ctx.response.body = `<h1>Welcome ,${name}</h1>`;
    }else{
        ctx.response.body = `<h1>登录失败！</h1>
        <p><a href='/'>重试</a></p>`;
    }
})
app.use(bodyparser());
app.use(router.routes());
app.listen(8080);
console.log('app started at port 8080...');
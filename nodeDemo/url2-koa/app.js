'use strict';
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const controller = require('./controller');

const app = new Koa();
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL,`string` 是模板字符串，ES2015新增的符号,${}中包含变量
    await next(); // 调用下一个middleware
});

app.use(bodyparser());
app.use(controller());
app.listen(8080);
console.log('app started at port 8080...');
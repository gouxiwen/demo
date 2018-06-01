'use strict';
var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

var server = http.createServer((request,response)=>{
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root,pathname);
    fs.stat(filepath,(err,stat)=>{
        if(!err && stat.isFile()){
            console.log('200'+request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        }else{
            console.log('404'+request.url);
            response.writeHead(404,{'Content-Type': 'text/html'});
            response.end('404');
        }
    })
}).listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');
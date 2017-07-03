const http =require('http');
const fs=require('fs');
const url=require('url');
const route= require('./router.js');
//create a server
const server = http.createServer(function (request,response){
	route.home(request,response);
	route.user(request,response);
}).listen(8888);

console.log('server is running in port : 8888');


// const profile = require("./profile.js");

// const user = process.argv.splice(2);
// user.forEach(profile.get);



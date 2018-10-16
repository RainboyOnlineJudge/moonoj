
var fs  =require("fs")
var path = require("path")
var mongoose = require("mongoose")
var C = require('../config/index.js')

var arguments = process.argv.splice(2);
var counts = 1

if(arguments.length !=0){
  let a = arguments[0]
  let int_a = parseInt(a)
  if(isNaN(int_a)){
    console.log('参数格式必须是数字!')
    return ;
  }
  counts = int_a
}

mongoose.Promise = require('bluebird');

// 连接数据库
//mongoose.connect(C.mongoConfig.url, C.mongoConfig.options)
mongoose.connect(C.DB.addr,C.DB.opts)

mongoose.connection.on('open',function(){
  console.log('数据库打开成功')
})


global.U = require('../utils/index.js')
global.C = C;
var inviteModel = mongoose.model('invite',require('../models/invite.js'),'invite')


async function add(){
  console.log('设置加入的邀请码为:',counts)
  for(let i =0; i <counts ;i++){
    let doc = await inviteModel.create({});
    console.log(i,doc._id)
  }
  mongoose.connection.close()
}

add()

var fs  =require("fs")
var path = require("path")
var mongoose = require("mongoose")
var C = require('../config/index.js')
var autoIncrement = require("mongoose-auto-increment")

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

autoIncrement.initialize(mongoose.connection)

mongoose.connection.on('open',function(){
  console.log('数据库打开成功')
})


global.U = require('../utils/index.js')
global.C = C;
var AOModel = mongoose.model('contest',require('../models/contest.js'),'contest')


async function add(){
  console.log('添加文档的数量为:',counts)
  for(let i =0; i <counts ;i++){
     await AOModel.create({});
    }
  mongoose.connection.close()
}

add()


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
var inviteModel = mongoose.model('invite',require('../models/csubmission.js'),'csubmission')


inviteModel.updateOne({_id:"59c859f01fb83a02ee7c5e8e"},{
  result:[{
    result:0,
    memory:1,
    time:1
  },
    {
    result:0,
    memory:1,
    time:1
    }
  ]
},function(err,res){
  console.log(res)
  mongoose.connection.close()
})

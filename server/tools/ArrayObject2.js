var fs  =require("fs")
var path = require("path")
var mongoose = require("mongoose")
var C = require('../config/index.js')


mongoose.Promise = require('bluebird');

// 连接数据库
//mongoose.connect(C.mongoConfig.url, C.mongoConfig.options)
mongoose.connect(C.DB.addr,C.DB.opts)

mongoose.connection.on('open',function(){
  console.log('数据库打开成功')
})


global.U = require('../utils/index.js')
global.C = C;
var AOModel = mongoose.model('array',require('./ArrayObjectModel.js'))


counts=2
async function add(){
  console.log('添加文档的数量为:',counts)
  let id = 'Bymucox4b'
  for(let i =0; i <counts ;i++){
    await AOModel.update({_id:id},{'$push':{
      array:{
        uid:'HyUepXW7-',
        val:i
      }
    }})
  }
  mongoose.connection.close()
}

add()

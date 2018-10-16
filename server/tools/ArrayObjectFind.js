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
  let id = 'Bymucox4b'
  let doc = await AOModel.findOne({_id:id,'array.val':0})
  console.log(doc.toJSON())
  mongoose.connection.close()
}

add()

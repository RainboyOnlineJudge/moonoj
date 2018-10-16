
var fs  =require("fs")
var path = require("path")
var mongoose = require("mongoose")
var C = require('./config/index.js')

mongoose.Promise = require('bluebird');

// 连接数据库
//mongoose.connect(C.mongoConfig.url, C.mongoConfig.options)
mongoose.connect(C.DB.addr,C.DB.opts)

mongoose.connection.on('open',function(){
  console.log('数据库打开成功')
})


global.U = require('./utils/index.js')
global.C = C;
var um = mongoose.model('user',require('./models/user.js'),'user')




async function findd(){
 res =  await um.findOne({}).then((data)=>{return data.toJSON()})
  console.log(res)
}

findd()

var fs  =require("fs")
var path = require("path")
var mongoose = require("mongoose")
var autoIncrement = require("mongoose-auto-increment")
var md5 = require('md5')

mongoose.Promise = require('bluebird');

// 连接数据库
//mongoose.connect(C.mongoConfig.url, C.mongoConfig.options)
mongoose.connect(C.DB.addr,C.DB.opts)
autoIncrement.initialize(mongoose.connection)



mongoose.connection.on('open',function(){
  console.log('数据库打开成功')
})



var base= U.pathJoin(__dirname,"..");
function loadModels(_path){
  let files = fs.readdirSync(_path)

  files.forEach( function(file){
    if(  file == "except") return;

    let file_path = path.join(_path,file)
    let stat = fs.statSync(file_path)

    if( stat.isFile() && path.extname(file) == '.js'){
      let basename = path.basename(file,'.js')
      //建立model
      M[basename] = mongoose.model(basename,require(file_path),basename)
    }
    else if(stat.isDirectory())
      loadModels(file_path)
  })
}

async function create_admin_user(){
  let doc = await M['user'].findOne({username:C.admin_name})
  if( doc  === null){
    debug("开始创建admin用户...")
    let secret = 
    await M['user'].create({
      username:C.admin_name,
      secret:  md5(C.admin_secret),
      isAdmin:true
    })
    debug("创建admin用户成功!")
  }
}

loadModels(base)
create_admin_user()

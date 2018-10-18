var path = require("path")
var shortid  = require("shortid")
var jwt = require("jsonwebtoken")
var fs = require('fs')


function verify_token(req,res,next){
  
  let token = req.headers["token"]
  debug('token:',token)
  if(token === undefined){
    next({
      status:-1,
      message:"need token"
    })
  }

  try {
    let decode = jwt.verify(token,C.jwt)
    req.uinfo= decode
    next()
  }
  catch(err){
    next({
      status:-1,
      message:err.name
    })
  }
}

function verifyAdminTokn(req,res,next){
  if(req.uinfo.isAdmin)
    next()
  else
    next({
      status:-1,
      message:"you are not admin"
    })
}

function data_check(path){
  infile_re = [/.in$/,/.input$/,/.txt$/]
  // 判断目录是否存在
  if( fs.existsSync(path) == false)
    return { status:-1, 'message':'数据目录不存在' }
  let raw_file_list = fs.readdirSync(path)
  let raw_file_set = new Set(raw_file_list)
  let result = []
  if( raw_file_list.length == 0)
        return { 'status':-1, 'message':'数据目录为空', 'data_dir':path }

  let real_infile_re=null
  for( i in infile_re){
    let in_re = infile_re[i]
    for(j in raw_file_list){
      let infile = raw_file_list[j]
      if( in_re.test(infile)) {
        real_infile_re = in_re
        break;
      }
    }
    if (real_infile_re != null)
      break;
  }

  if( real_infile_re == null)
        return { 'status':-1, 'message':'没有找到in文件', 'raw_file_list':raw_file_list }

  for(i in raw_file_list){
    let in_file = raw_file_list[i]
    if( real_infile_re.test(in_file)){
      raw_file_set.delete(in_file)
      let out_file  = ''
      for ( let item of raw_file_set.values() ){
        if( item.split('.')[0] == in_file.split('.')[0]){
          out_file = item
          result.push([in_file,item])
          break;
        }
      }
      if( out_file != '')
        raw_file_set.delete(out_file)
    }
  }
  return {
    'status':0,
    'result':result
  }
}



/* 自动加载函数 */
function autoload(_path_){
    _path_ =  path.resolve(_path_); //得到绝对地址
    let basename = path.basename(_path_)

    let ret_obj = {}

    //加载函数
    function __autoload(_path_){

        let files = fs.readdirSync(_path_)
        files.forEach( function(file){

            if(  file == "except") return;
            let file_path = path.join(_path_,file)
            let stat = fs.statSync(file_path)

            if( stat.isFile() && path.extname(file) == '.js'){
                let basename = path.basename(file,'.js')
                //载入
                ret_obj[basename] = require(file_path)
            }
            else if(stat.isDirectory())
                __autoload(file_path)
        })
    }

    __autoload(_path_)

    //返回结果
    return ret_obj
}



module.exports = {
  gen:shortid.generate,
  pathJoin:path.join,
  token:jwt,
  verifyToken:verify_token,
  verifyAdminToken:verifyAdminTokn,
  data_check:data_check,
  autoload:autoload
}

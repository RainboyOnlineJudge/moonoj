var express = require('express');
var router = express.Router();
var fse = require('fs-extra')
var jwt = require('jsonwebtoken');
var moment = require("moment")
var decompress = require('decompress');

var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, C.data_upload_path)
  },
  filename: function (req, file, cb) {
    cb(null, req.params.id+ '.zip')
  }
})

var upload = multer({ storage: storage })

/* 得到题目列表 */
router.get('/list',U.verifyToken,async function(req,res,next){
  debug('query参数:',req.query)

  let dataCount = parseInt(req.query.count) || 10
  let currentPage = parseInt(req.query.page) || 1

  let qdata = {hidden:false}
  if(req.uinfo.isAdmin)
    delete qdata.hidden

  
  let total = await M['problem'].find(qdata).count()

  let total_page_count = Math.ceil(total / dataCount)

  if( total_page_count < currentPage){
    res.json({
      status:-1,
      message:'over page'
    })
    return 
  }

  let skip = (dataCount*(currentPage-1))

  let data = await M['problem'].find(qdata)
    .sort("_id")
    .select('-content')
    .skip(skip).limit(dataCount)

  res.json({
    status:0,
    currentPage:currentPage, // 当前页数
    totalPage:total_page_count, //总页数
    total:total, // 数据量
    data:data
  })

})

/* 创建题目 
 * 
  title
  content
  tag
  time
  memory
  stack
  spj
  ctime
  score
  level
  posted
  passed
  creator
  source:String,//题目来源
 * */
router.post('/create',U.verifyToken,U.verifyAdminToken, async function(req,res,next){
  let id = req.uinfo._id
  let data = req.body
  data.creator = id
  await M['problem'].create(data)
  res.json({
    status:0,
    message:"ok"
  })
})

//题目更新
//pid
router.post('/update',U.verifyToken,U.verifyAdminToken, async function(req,res,next){
  let uid = req.uinfo._id

  let data = req.body
  let pid = data.pid

  delete data.pid

  let doc = await M['problem'].findOneAndUpdate({_id:pid},data)
  res.json({
    status:0,
    message:"ok"
  })
})

/* 题目数据上传*/
/*  单文件,文件名为 data
 *  force 要不要先删除
 * 
 * */


/* 检查对应文件是否存在*/
function uploadCheck(req,res,next){
  let data_path = U.pathJoin(C.data_upload_path,req.params.id+'.zip')
  req.data_upload_path = data_path
  let force = false
  console.log(req.query)
  if( req.query.force == 'true')
    force = true
  if(force == false && fse.pathExistsSync(data_path)){ //检查是不是有这个文件或文件夹
    res.json({
      status:-1,
      message:"数据目录已经存在,可以强制上传"
    })
    return 
  }
  next()

}
router.post('/:id/upload/',uploadCheck,upload.single('data'),async function(req,res,next){
  let unzip_path = U.pathJoin(C.data_path,req.params.id)


  if(fse.pathExistsSync(unzip_path)){ 
    fse.removeSync(unzip_path)
  }

  decompress(req.data_upload_path, unzip_path).then(files => {
    let ff = files.map(file => {
      return file.path
    })
    res.json({
      status:0,
      message:'上传完成',
      files:ff
    })
  });
})

/* 得到题目信息 */
router.get('/info/:id',U.verifyToken,async function(req,res,next){

  let id = parseInt(req.params.id)
  let data = {_id:id,hidden:false}
  if(req.query.force === 'true')
    delete data.hidden
  let doc  = await M['problem'].findOne(data)

  if( doc == null){
    res.json({
      status:-1,
      message:"没有找到题目,id:"+id
    })
  }
  else
  {
    res.json({
      status:0,
      problem:doc
    })
  }
})


module.exports = router

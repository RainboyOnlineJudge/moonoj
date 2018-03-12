var express = require('express');
var router = express.Router();
var fse = require('fs-extra')
var jwt = require('jsonwebtoken');
var moment = require("moment")

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

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
  let id = req.uinfo._id

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
router.post('/:id/upload',upload.single('data'),async function(req,res,next){

  let force = false
  let file = req.file
  let data_path = U.pathJoin(C.data_path,req.params.id)
  if(req.query.force){//删除
    force = true;
    await fse.emptyDir(data_path)
  }
  else if(fse.pathExistsSync(data_path)){ //检查是不是有这个文件或文件夹
    res.json({
      status:-1,
      message:"数据目录已经存在,如果要强制上传使用?force=true 参数"
    })
    return 
  }

   //解压
   //检查数据
   //删除数据
   fse.remove(file.path)

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

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var moment = require("moment")

var multer  = require('multer')


/* 得到题目列表 */
router.get('/list',U.verifyToken,async function(req,res,next){
  debug('query参数:',req.query)

  let dataCount = parseInt(req.query.count) || 10
  let currentPage = parseInt(req.query.page) || 1
  
  let total = await M['problem'].find({hidden:false}).count()

  let total_page_count = Math.ceil(total / dataCount)

  if( total_page_count < currentPage){
    res.json({
      status:-1,
      message:'over page'
    })
    return 
  }

  let skip = (dataCount*(currentPage-1))

  let data = await M['problem'].find({hidden:false})
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
router.post('/:id/upload',async function(req,res,next){

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

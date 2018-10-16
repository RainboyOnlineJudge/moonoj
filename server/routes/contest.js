var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var moment = require("moment");

var Promise = require('bluebird')



/* 得到 比赛 列表
 * params:
 *  - page 页数,1...
 *  - count 每页的数量
 *
 *  
 * return:
 *  - data {} 返回的数据
 *  - currentPage 现在的页数
 *  - totalPage 总页数
 * */
router.get('/list',U.verifyToken,async function(req,res,next){

  let dataCount = parseInt(req.query.count) || 10
  let currentPage = parseInt(req.query.page) || 1
  let uid = req.uinfo._id

  let total = await M['contest'].find({hidden:false}).count()
  let total_page_count = Math.ceil(total / dataCount)

  if( total_page_count < currentPage){
    res.json({
      status:-1,
      message:'over page'
    })
    return 
  }

  let skip = (dataCount*(currentPage-1))

  let data = await M['contest'].find({hidden:false}).sort({ctime:-1})
    .select('-content -problems')
    .skip(skip).limit(dataCount)

  let new_data = await Promise.map(data,function(___data){
    __data = ___data.toJSON()
    if(__data.userjoin.indexOf(uid) !== -1)
      __data.isIn = true
    else
      __data.isIn = false
    return __data
  })

  res.json({
    status:0,
    currentPage:currentPage, // 当前页数
    totalPage:total_page_count, //总页数
    total:total, // 数据量
    data:new_data
  })
})

/* 得到id的比赛的题目列表和信息
 * */
router.get('/list/:id',async function(req,res,next){
  let id = parseInt( req.params.id)
  if( isNaN(id))
    next({message:'the id is not Number'})
  else {
    let doc  = await M['content'].findOne({_id:id}).populate('problems');
    res.json({
      status:1,
      data:doc
    })
  }
})

/* 创建/更新比赛
 * post_data:
 *  - title
 *  - model
 *  - content
 *  - joinrule
 *  - stime
 *  - ttime
 * */
router.post('/create',U.verifyToken,async function(req,res,next){
  if(req.uinfo.isAdmin == false){
    res.json({
      status:-1,
      message:'user is not admin'
    })
    return
  }
  let data = req.body
  data.creator = req.uinfo._id
  await  M['contest'].create(data)
  res.json({
    status:0,
    message:'ok'
  })
})

/*  更新比赛,主要用来,创建题目
 *  - _id
 *  - title
 *  - model
 *  - problems
 *  - content
 *  - joinrule
 *  - stime
 *  - ttime
 *  - hidden
 * */
router.post('/upload',U.verifyToken,async function(req,res,next){
  if(req.uinfo.isAdmin === false){
    res.json({
      status:-1,
      message:'user is not admin'
    })
    return
  }
  let data = req.body
  let id = data._id
  delete data._id
  data.creator = req.uinfo._id
  let doc = await M['contest'].updateOne({_id:id},data)

  if( doc.n == 0){  // 表示修改了0个文档
    res.json({
      status:-1,
      message:'not found contest '+id
    })
  }
  else {
    res.json({
      status:0,
      message:'ok'
    })
  }
})

/* 参加比赛
 * cid
 * */
router.post('/add',U.verifyToken,async function(req,res,next){
  let uid = req.uinfo._id
  let cid = req.body.cid

  let doc = await M['contest'].updateOne({_id:cid},{$addToSet:{userjoin:uid}});

  if( doc.n == 0){  // 表示修改了0个文档
    res.json({
      status:-1,
      message:'add contest '+cid +' failed '
    })
  }
  else {
    res.json({
      status:0,
      message:'ok'
    })
  }
})


module.exports = router

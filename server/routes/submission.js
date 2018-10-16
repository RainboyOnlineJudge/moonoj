var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var moment = require("moment")

var objectId = require('mongoose').Types.ObjectId


router.get('/contest',async function(req,res,next){


})


/* 
 * 参数: 
 * page
 * cout
 * 
 * */
router.get('/normal',async function(req,res,next){
  if( req.query._id != undefined && req.query._id != null)
  {
    debug("_id:",req.query._id)
    debug("_id:", new objectId(req.query_id))
    let doc = await M['submission'].findOne({_id:req.query._id})
    res.json({
      status:0,
      result:doc
    })
    return;
  }

  let query_data = {}

  let dataCount = parseInt(req.query.count) || 10
  let currentPage = parseInt(req.query.page) || 1
  
  if( req.query.uid){
    query_data.uid = req.query.uid
  }

  if( req.query.pid)
    query_data.pid = parseInt(req.query.pid)

  let total = await M['submission'].find(query_data).count()
  let total_page_count = Math.ceil( total / dataCount)

  if( total_page_count < currentPage){
    res.json({
      status:-1,
      message:'over page'
    })
    return 
  }

  let skip = (dataCount*(currentPage-1))

  let __data =  await  M['submission'].find(query_data).sort("-_id").populate('pid','-content')
    .populate('uid','username')
    .skip(skip).limit(dataCount)


  res.json({
    status:0,
    currentPage:currentPage, // 当前页数
    totalPage:total_page_count, //总页数
    total:total, // 数据量
    data:__data
  })

})

module.exports = router

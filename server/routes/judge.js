var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var moment = require("moment")

var judge_api = require('../judge/index.js')()
var deal_judge_result = require('../judge/deal_judge_result.js')

router.post('/',U.verifyToken,async function(req,res,next){
  let uid = req.uinfo._id;
  let model = req.body.model;
  let cid = req.body.cid;

  if( cid == 'null') cid = null

  debug("pid",req.body.pid)
  debug("cid",req.body.cid)

  if( model != 'normal' &&  model != 'contest'){
    next({
      status:-1,
      message:"model不正确,必须是normal or contest"
    })
  }

  try {
    //posted +1
    await M['problem'].updateOne({_id:cid},{'$inc':{posted:1}})

    let _id = await judge_api[model](req.body.pid,uid,{
      lang:req.body.lang,
      code:req.body.code
    },cid)
    res.json({
      status:0,
      _id:_id,
      message:"已经发送评测到Judge_server"
    })
  }
  catch(err){
    next({
      status:-1,
      message:err
    })
  }

})


router.post('/deal',deal_judge_result)

module.exports = router

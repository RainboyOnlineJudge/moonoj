var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var moment = require("moment")

var multer  = require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, C.avatar_path)
  },
  filename: function (req, file, cb) {
    //cb(null, req.uinfo._id+'.png')
    cb(null, req.uinfo._id+'.png')
  }
})


var upload = multer({storage:storage});

router.post('/reg',async function(req,res,next){
  let uinfo = req.body
  let user = await M["user"].findOne({"username":uinfo.username})
  if( user !=null){
    res.json({
      status:-1,
      message:"User already exists:"+uinfo.username
    })
    return 
  }

  //查找invite code
  let invite = await M["invite"].findOne({_id:uinfo.invite_code})

  if(invite == null || invite.used ){
    res.json({
      status:-1,
      message:"illegal invite code"
    })
  }
  else if( moment() > invite.exp){
    res.json({
      status:-1,
      message:"invite code timeout"
    })
  }
  else {

    await M["invite"].updateOne({_id:uinfo.invite_code},{used:true});
    await M["user"].create({
      "username":uinfo.username,
      "realname":uinfo.realname,
      "secret":uinfo.secret,
      "intro":uinfo.intro || '还没有写下自己的名言'
    })

    res.json({
      status:0,
      message:"ok"
    })
  }
})

router.post('/login', async function(req, res, next) {
  //检查密码,
  let uinfo = req.body
  let isAdmin = uinfo.isAdmin || false
  let user = await M["user"].findOne({username:uinfo.username,secret:uinfo.secret,isAdmin:isAdmin})
  if( user != null){

    let token = U.token.sign({
      _id:user._id,
      isAdmin:user.isAdmin
    },C.jwt,{expiresIn:C.tokenExp})

    res.json({
      status:0,
      token:token,
      message:"ok"
    })
  }
  else {
    res.json({
      status:-1,
      message:"用户名或密码错误"
    })
  }
});


//需要token被解释后使用
router.get('/info',U.verifyToken,async function(req, res, next) {
  let id = req.uinfo._id;
  let user = await M["user"].findOne({_id:id}).select("-secret").then((data)=>{return data.toJSON()})

  res.json({
    status:0,
    uinfo:user
  })
});

router.post('/avatar/upload',[U.verifyToken,upload.single('avatar')],function(req,res,next){
  res.send({ret_code: '0'});
})

module.exports = router;

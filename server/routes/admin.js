var express = require('express');
var router = express.Router();
var moment = require("moment")

//创建邀请码
router.post("/invitecode",async function(req,res,next){
    await M["invite"].create({exp:moment().add(C.inviteExp,'d')});
    res.json({
      status:0,
      message:"create invite code success"
    })
})
module.exports = router;

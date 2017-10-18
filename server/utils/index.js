var path = require("path")
var shortid  = require("shortid")
var jwt = require("jsonwebtoken")


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

module.exports = {
  gen:shortid.generate,
  pathJoin:path.join,
  token:jwt,
  verifyToken:verify_token,
  verifyAdminToken:verifyAdminTokn
}

var path = require("path")
var shortid  = require("shortid")
var jwt = require("jsonwebtoken")


function verify_token(req,res,next){
  
  let token = req.headers["token"]
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

module.exports = {
  gen:shortid.generate,
  pathJoin:path.join,
  token:jwt,
  verifyToken:verify_token
}

var rp  = require('request-promise')
var md5 = require('md5')

global.C = require('../config')


async function post(url,params,token){
  let uri = C.base_url +url
  let ans = await rp({
    uri:uri,
    method:'POST',
    headers:{
      token:token
    },
    json:true,
    body:params
  })
  return ans
}

async function login(){
  let token = await post('user/login',{
    username:C.admin_name,
    secret:md5(C.admin_secret)
  })

  return token.token
}

exports.post = post
exports.login = login

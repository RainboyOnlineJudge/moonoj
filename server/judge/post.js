/* 
 * 功能:
 *      发送评测
 * */
var rq = require('request-promise');
var config = require('../config/index.js')

async function post_judge(__data){

  let j_url  = config.judge_server_url
  
  let body = __data;
  //加上r_url
  body.r_url = config.r_url

  let opts = {
    method:'POST',
    uri:j_url,
    headers:{
      token: config.judge_server_token
    },
    body:body,
    json:true
  }

  let res = await rq(opts)

  //检测返回的结果,如果返回的结果是 {status:0,message}
  if(res.message!= 'ok')
    throw Error('评测机出现错误:'+res.message);
}


async function post(pid,uid,data,cid){
  //1.存放数据库
  let _data = {
    pid:pid,
    uid:uid,
    lang:data.lang,
    code:data.code
  }
  let revert = {contest:true} // 默认是比赛的题目

  //posted+1
  M['problem'].updateOne({_id:pid},{'$inc':{posted:1}}).exec()

  // 是否是比赛的题目
  debug('是否是比赛,cid=:',cid)
  let doc;
  if( cid == undefined || cid == null){
    _data.cid = cid
    revert.contest = false;
    doc  =  await M['submission'].create(_data)
  }
  else  //比赛的题目
    doc  =  await M['csubmission'].create(_data)
  debug('创建的提交的_id:',doc._id)

  let pdoc = await M['problem'].findOne({_id:pid})

  //设置提交的数据库
  
  revert._id = doc._id
  revert.pid = pid

  //2.测评
  await post_judge({
    problem_id:pid,
    max_time:pdoc.time,
    max_memory:pdoc.memory,
    judge:pdoc.spj,
    lang:data.lang,
    code:data.code,
    revert:revert
  })
  return doc._id;

}

module.exports = post

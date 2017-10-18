/* 
 *  功能: 接收评测结果,处理结果数据
 * */

var objectId = require('mongoose').Types.ObjectId


function cmp(a,b){
  return a.count - b.count
}

module.exports = async function(req,res,next){

  let _id = req.body.revert._id;
  let model = M['submission']

  debug('处理的提交的_id:',_id)
  if(req.body.revert.contest == true){
    debug('%s 是比赛',_id)
    model = M['csubmission']
  }
  else {
    debug('%s 不是比赛',_id)
  }

  let pid = req.body.revert.pid
  debug("处理的题目是:",pid)

  let body = req.body
  let result = []
  let total_memory = 0
  let total_time = 0
  let score = 0
  let verdict = body.verdict

  if( body.verdict == 6) // compiler error
    result.push(body.result) //错误说明
  else {
    result = body.result
    //排序
    result.sort(cmp);

    let per_score = 100 / result.length

    for(let i =0 ;i <result.length;i++){
      if(result[i].result == 0) // 能过
        score += per_score
      total_time += result[i].time
      total_memory += result[i].memory
    }
    score = Math.ceil(score) // 向上取整
    if( score >= 99 && pid)
      await M['problem'].updateOne({_id:pid},{'$inc':{passed:1}})
  }
  
  let _data = {
    status:'judged',
    total_time:total_time,
    total_memory:total_memory,
    score:score,
    result:result,
    verdict:verdict
  }

  debug('处理的结果 : ',_data)

  let doc = await model.updateOne({_id:new objectId(_id)},_data)

  res.end()
}



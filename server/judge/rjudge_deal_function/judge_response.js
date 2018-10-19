/* 处理返回的结果 */

function cmp(a,b){
  return a.count - b.count
}

function deal_result(data){
  if(data.mid == 2 && data.status == -1){
    let sid  = data.revert.sid
    M['submission'].updateOne({_id:new objectId(sid)},{
      status:'judged',
      result:data.details,
      verdict:6
    }).exec()
  }
  else if( data.mid == 4){
    let sid  = data.revert.sid
    let pid = data.revert.pid
    let result = data.result
    result.sort(cmp);
    let per_score = 100 / result.length

    let total_memory = 0
    let total_time = 0
    let score = 0
    for(let i =0 ;i <result.length;i++){
      if(result[i].result == 0) // 能过
        score += per_score
      total_time += result[i].time
      total_memory += result[i].memory
    }
    score = Math.ceil(score) // 向上取整
    if( score >= 99 && pid)
      M['problem'].updateOne({_id:pid},{'$inc':{passed:1}}).exec()
    M['submission'].updateOne({_id:new objectId(sid)},{
      status:'judged',
      total_time:total_time,
      total_memory:total_memory,
      score:score,
      result:result,
      verdict:0
    }).exec()
  }
}

module.exports  = function(data){
  deal_result(data)
  NSP.connected[data.revert._id].emit('judge_response',data)
}

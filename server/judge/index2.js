var client_io = require('socket.io-client')
var jwt = require("jsonwebtoken")
var objectId = require('mongoose').Types.ObjectId


//连接评测机 
//rjudge  = client_io.connect("http://192.168.20.248:5000/judge")
rjudge  = client_io.connect("http://server.rainboy.cc:3005/judge")

rjudge.on('connect',function(){
  
  judgeServer_is_contented = true
  debug("评测机连接成功")
})

rjudge.on('disconnect',function(){
  judgeServer_is_contented = false
  debug("评测机断开连接")
})


function cmp(a,b){
  return a.count - b.count
}

rjudge.on('judge_response',function(data){
  //console.log(data.mid)
  //加入提交记录
  deal_result(data)
  NSP.connected[data.revert._id].emit('judge_response',data)
})

function deal(nsp){


  nsp.on('connect',function(socket){


    //监听
    debug("client connect,id:",socket.id)

    //处理提交
    socket.on("post_judge",function(data){

      data.revert._id = socket.id


      if( judgeServer_is_contented == false){
        socket.emit('judge_response',{mid:-1,status:-1,message:'webServer端没有连接JudgeServer'})
        return
      }

      // 上传数据的时候 必须有 token 这个id
      let token = data['token']
      debug('token:',token)
      if(token === undefined){
        socket.emit('error',{
          status:-1,
          message:"need token"
        })
        socket.disconnect(false)
        return
      }
      
      let decode = {}
      try {
        decode = jwt.verify(token,C.jwt)
      }
      catch(err){
        socket.emit('error',{
          status:-1,
          message:err.name
        })
        //socket.disconnect(true)
        socket.disconnect(false)
        return
      }

      //提交数据
      delete  data.token
      debug("提交数据:",data)

      M['problem'].findOne({_id:parseInt(data.judge_id),hidden:false},function(err,prob){
        if(err){

        socket.emit('judge_response',{mid:-1,status:-1,message:'DB中查找problem:'+data.judge_id+'时发生错误'})
          return
        }
        else if(prob == null){
        socket.emit('judge_response',{mid:-1,status:-1,message:'DB中查找problem:'+data.judge_id+'时没有找到'})
          return
        }

        let _data_ = {
          code:data.code,
          cmp:prob.spj || 'fcmp2',
          lang:data.lang,
          memory:prob.memory || 128,
          time: prob.time /1000 || 1,
          stack: prob.stack || 128,
          judge_id: prob._id+'',
          output_size:128,
          revert:data.revert
        }
        //加入提交记录
        return post(parseInt(data.judge_id),decode._id,_data_).then(function(doc,err){
          data.revert.sid = doc._id
          data.revert.pid = doc.pid
          rjudge.emit('request_judge',_data_)
        })

      })

    })

    })
}



function post(pid,uid,data){
  //posted+1
  M['problem'].updateOne({_id:pid},{'$inc':{posted:1}}).exec()

  return M['submission'].create({
    pid:pid,
    uid:uid,
    lang:data.lang,
    code:data.code
  })
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

module.exports = deal


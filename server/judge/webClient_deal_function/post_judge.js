/* 处理web 传递过来的参数 */
var jwt = require("jsonwebtoken")


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

function createPost(){
    var self = this
    return function (socket){
    //监听
    debug("client connect,id:",socket.id)

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
                self.rjudge.emit('request_judge',_data_)
            })

        })

    })
    }
}
module.exports = 

/* 
 * 中间件: 比赛信息
 * */

function async getContestInfo(req,res,next){

   let contest = await  M['contest'].findOne({_id:req.body._id});
   if( contest == null) { //没有找到 比赛
        // 进入 处理错误的方法
        next({      
            err_type:'contest',
            err_id:'NOT_FIND_CONTEST'
        })
   }
   else{
       req.contest = contest.toJSON()
       next()
   }
}

module.exports = getContestInfo

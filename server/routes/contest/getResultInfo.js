/* 
 * 得到比赛结果:
 *   比赛ID,必有
 *
 *   1. 用户 + 题目id 得到这个比赛的,用户的,题目id的,所有提交
 *   2. 用户 得到这个比赛的,用户的,所有提交
 *   3. 题目rank,得到这个题目的 rank排名 (可能用到分组操作)
 *   4. 比赛rank,得到这个比赛的 rank排名 (从constest DB 中读取)
 * */

function async getResultInfo(req,res){
}

module.exports = getResultInfo

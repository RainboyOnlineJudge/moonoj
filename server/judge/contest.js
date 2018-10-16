/* 
 * 比赛的时候评测
 * */
module.exports = async function(pid,uid,data,cid){
  let _id = await this.post(pid,uid,data,cid)
  return _id;
}

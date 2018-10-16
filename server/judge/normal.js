/* 
 *  作用: 普通评测
 *  data:
 *      lang
 *      code
 * */
module.exports = async function(pid,uid,data){
  let _id = await this.post(pid,uid,data)
  return _id
}

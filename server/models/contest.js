var Schema = require("mongoose").Schema
var moment = require('moment')


var ContestSchema = new Schema({
  title     :String,
  problems  :[{type:Number,ref:'problem'}],
  model     :String,//模式,person-strict p-low,p-normal
  content   :String,//markdown 描述
  userjoin  :[{type:String,ref:'user'}],    //参加的用户
  joinrule  :{type:Number,default:0},
  ctime     :{type:Date,default:Date.now},//创建时间
  stime     :{type:Date,default:Date.now},
  ttime     :{type:Date},//结束时间
  creator   :{type:String,ref:'user'},
  hidden    :{type:Boolean,default:true},//刚开始创建的时候是隐藏的
  result    :{}     // 混合数据类型 https://blog.csdn.net/zccz14/article/details/51298545
});

/* 
 * result :{
 *  uid:[{ lastSub:,lasSubScore:,maxSub:,maxSubScore:,}]
 * }
 *
 * */


ContestSchema.index({ctime:1})

module.exports = ContestSchema;

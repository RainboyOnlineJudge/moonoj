var Schema = require("mongoose").Schema

var submissionSchema = new Schema({
  pid:{type:Number,ref:'problem'}, //测评的题目的编号
  uid:{type:String,ref:'user'},    //测评的用户
  ctime:{type:Date,default:Date.now},//创建时间
  status:{type:String,default:'judging'}, // 状态
  lang:String, //语言
  code:String, //代码
  result:[], //结果
  score:Number, //分值
  verdict:Number, //结果 ,0 评测正确,6 编译错误
  total_memory:Number, //占用的总内存 kb 
  total_time:Number // 总时间, ms
});

module.exports = submissionSchema

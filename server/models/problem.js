var Schema = require("mongoose").Schema
var autoIncrement = require('mongoose-auto-increment')

var ProblemSchema = new Schema({
  title:String,
  content:String,
  tag:[{type:String,ref:'tag'}],
  time:{type:Number,default:1000},//限制的时间,ms
  memory:{type:Number,default:128},//限制的内存
  spj:{type:String,default:'fcmp'},//评测的
  ctime:{type:Date,default:Date.now},//创建时间
  score:{type:Number,default:100},
  level:{type:Number,default:1},//等级1-10
  posted:{type:Number,default:0},//通过的
  passed:{type:Number,default:0},//提交的
  creator:{type:String,ref:'user'},
  source:String,//题目来源
  hidden:{type:Boolean,default:true}//刚开始创建的时候是隐藏的
});

ProblemSchema.index({ctime:1})
ProblemSchema.plugin(autoIncrement.plugin,{
  model:'problem',
  startAt:1000
})

module.exports = ProblemSchema;

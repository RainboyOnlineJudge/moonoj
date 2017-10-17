var Schema = require("mongoose").Schema

var TagSchema = new Schema({
  _id:String,//就是name
  content:String,//说明
  creator:{type:String,ref:'user'},
  ctime:{type:Date,default:Date.now},
  hidden:{type:Boolean,default:false}
});

TagSchema.index({ctime:1})

module.exports = TagSchema;

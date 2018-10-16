var Schema = require("mongoose").Schema

var inviteSchema = new Schema({
  _id:{type:String,default:U.gen},
  exp:{type:Date},
  used:{type:Boolean,default:false}
  });

module.exports = inviteSchema

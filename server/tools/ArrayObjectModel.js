var Schema = require("mongoose").Schema

var ArrayObjectSchema = new Schema({
  _id:{type:String,default:U.gen},
  array:[{uid:{type:String,ref:"user"},val:Number}]
  });

ArrayObjectSchema.index({_id:1})

module.exports = ArrayObjectSchema

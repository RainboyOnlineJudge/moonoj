var Schema = require("mongoose").Schema

var fs = require("fs")

var UserSchema = new Schema({
  _id:{type:String,default:U.gen},
    username:String,
    realname:String,
    secret:String,
    intime:{type:Date,default:Date.now},
    score:{type:Number,default:0},
    posted:Object,
    intro:String,
    hidden:{type:Boolean,default:false},
    sex:{type:String,default:'male'},
    isAdmin:{type:Boolean,default:false}
  });

UserSchema.virtual("avatar").get(function(){
  let avatar_path = U.pathJoin( C.avatar_path,this._id+".png");
  if( fs.existsSync(avatar_path))
    return this._id+".png";
  else if(this.sex === 'male')
    return  "default_male.png"
  else
    return  "default_female.png"
})

UserSchema.set('toJSON', { getters: true, virtuals: true});

module.exports = UserSchema

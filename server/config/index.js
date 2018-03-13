module.exports ={
  "avatar_path":"/server/avatar/", //头像的存储地址
  "FrontEnd_path":"../FrontEnd/dist", // FrontEnd 前端地址
  "jwt":"Rainboy5978",
  "tokenExp":"7d",//token的有效时间
  "inviteExp":3,//邀请码有效时间,天数
  "web_server_address":'',//本地的server
  "judge_server_url":'http://192.168.20.248:5000/judge',//judge_server的地址
  "judge_server_token":'mytoken',
  "judge_interval_time":60*1000,//多长时间检测一个judge中要post的数据,ms
  "admin_name":"root",
  "admin_secret":"5978",
  "data_path":"/server/data", // 上传数据的地址
  "DB":{
    addr:"mongodb://localhost/moonoj",
    opts:{
      useMongoClient:true
    }
  }
}

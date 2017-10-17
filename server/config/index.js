module.exports ={
  "avatar_path":"/server/avatar/",
  "jwt":"Rainboy5978",
  "tokenExp":"7d",//token的有效时间
  "inviteExp":3,//邀请码有效时间,天数
  "web_server_address":'',//本地的server
  "judge_server_url":'http://192.168.20.248:4999/judge',//judge_server的地址
  "judge_server_token":'mytoken',
  "judge_interval_time":60*1000,//多长时间检测一个judge中要post的数据,ms
  "r_url":'http://192.168.20.253:3000/judge/deal',
  "DB":{
    addr:"mongodb://localhost/moonoj",
    opts:{
    }
  }
}

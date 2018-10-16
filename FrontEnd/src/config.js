const RESULT_CODE = {
  "-1":{
    code:'WRONG_ANSWER',
    short_code:'W',
    color:'red'
  },
  0:{
    code:'ACCEPTED',
    short_code:'A',
    color:'green'
  },
  1:{
    code:'CPU_TIME_LIMIT_EXCEEDED',
    short_code:'T',
    color:'blue'
  },
  2:{
    code:'REAL_TIME_LIMIT_EXCEEDED',
    short_code:'T',
    color:'blue'
  },
  3:{
    code:'MEMORY_LIMIT_EXCEEDED',
    short_code:'M',
    color:'yellow'
  },
  4:{
    code:'RUNTIME_ERROR',
    short_code:'R',
    color:'red'
  },
  5:{
    code:'SYSTEM_ERROR',
    short_code:'S',
    color:'red'
  },
  6:{
    code:'COMPILE_ERROR',
    short_code:'C',
    color:'red'
  },
  7:{
    code:'IDLENESS_LIMIT_EXCEEDED',
    short_code:'I',
    color:'red'
  },
  8:{
    code:'SUM_TIME_LIMIT_EXCEEDED',
    short_code:'T',
    color:'red'
  }
}

const server_api = {
  dev_api:'"/"',
  prod_api:'"/"',

}

const g_config = {
  judge_connecet_timeout:10000
}


// 评测相关的配置
const judge_config = {
  'WEBSERVER_JUDGERSER'   :-1,
  'PREPARE_JUDGE'   :0,
  'START_JUDGE':1,
  'COMPILE':2,
  'JUDGING':3,
  'END_JUDGE':4,
}

exports.RESULT_CODE= RESULT_CODE
exports.server_api = server_api
exports.g_config = g_config
exports.judge_config = judge_config


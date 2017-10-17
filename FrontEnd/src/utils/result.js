WRONG_ANSWER = -1
ACCEPTED = 0
CPU_TIME_LIMIT_EXCEEDED = 1
REAL_TIME_LIMIT_EXCEEDED = 2
MEMORY_LIMIT_EXCEEDED = 3
RUNTIME_ERROR = 4
SYSTEM_ERROR = 5
COMPILE_ERROR = 6
IDLENESS_LIMIT_EXCEEDED = 7
SUM_TIME_LIMIT_EXCEEDED = 8

var result_code = [
  //0
  {
    m:'Accepted',
    sm:'A',
    color:'blue'
  },
  //1
  {
    m:'CPU_TIME_LIMIT_EXCEEDED',
    sm:'T',
    color:'blue'
  },
  //2
  {
    m:'REAL_TIME_LIMIT_EXCEEDED',
    sm:'T',
    color:'blue'
  },
  //3
  {
    m:'MEMORY_LIMIT_EXCEEDED',
    sm:'M',
    color:'blue'
  },
  //4
  {
    m:'RUNTIME_ERROR',
    sm:'R',
    color:'blue'
  },
  //5
  {
    m:'SYSTEM_ERROR',
    sm:'S',
    color:'blue'
  },
  //5
  {
    m:'SYSTEM_ERROR',
    sm:'S',
    color:'blue'
  },
]


result_code[-1] = {
  m:'WRONG_ANSWER',
  sm:'W',
  color:'red'
}

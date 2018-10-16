var api = require('./lib/api.js')
var readfile   =require('./articlelib/index.js')
var path = require('path')


var argv = process.argv[2]

if( !argv ){
  console.log('输入文件')
  return ;
}

var pid = path.basename(argv,'.md')

pid = parseInt(pid)

async function  do_work(){

  let token = await api.login()
  console.log('token:',token)
  let problem = readfile(argv)
  delete problem.date
  delete problem.update

  problem.pid = pid
  
  let ans = await api.post('problem/update',problem,token)

  console.log(ans)
}

do_work()

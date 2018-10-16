var api = require('./lib/api.js')
var readfile   =require('./articlelib/index.js')


var argv = process.argv[2]

if( !argv ){
  console.log('输入文件')
  return ;
}

async function  do_work(){

  let token = await api.login()
  console.log('token:',token)
  let problem = readfile(argv)
  delete problem.date
  delete problem.update
  
  let ans = await api.post('problem/create',problem,token)

  console.log(ans)
}

do_work()

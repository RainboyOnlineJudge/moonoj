var api = require('./lib/api.js')
var readfile   =require('./articlelib/index.js')


async function  do_work(){

  let token = await api.login()
  console.log('token:',token)
  let problem = readfile('./problem/1001.md')
  delete problem.date
  delete problem.update
  
  let ans = await api.post('problem/create',problem,token)

  console.log(ans)
}

do_work()

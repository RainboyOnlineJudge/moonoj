import api from './index.js'

export default {
  problem(id,force){
    let params = {}
    if( force === true){
        params.force = 'true'
    }
    return api.get('problem/info/'+id,params)
  },
  submit(pid,cid,code,lang,model){
    model = model || 'normal'
    let data = {
      pid:pid,
      cid:cid,
      code:code,
      lang:lang,
      model:model
    }
    //console.log(data)
    return api.post('judge',{
      pid:pid,
      cid:cid,
      code:code,
      lang:lang,
      model:model
    })
  }
}

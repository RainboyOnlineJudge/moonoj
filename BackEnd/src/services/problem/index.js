import api from '../index.js'

export default {
  //创建题目
  create(data){
    return api.post('problem/create',data)
  },
  upload(data){
    return api.post('problem/upload',data)
  },
  get(pid){
    return api.get('problem/info/'+pid+'?force=true')
  }

}

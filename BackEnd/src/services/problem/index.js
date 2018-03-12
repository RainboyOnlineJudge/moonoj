import api from '../index.js'

export default {
  //创建题目
  create(data){
    return api.post('problem/create',data)
  },
}

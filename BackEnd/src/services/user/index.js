import api from '../index.js'

export default {
  reg(data){
    return api.post('user/reg',data)
  },
  login(data){
    return api.post('user/login',data)
  },
  info(){
    return api.get('user/info')
  }
}

import api from './index.js'

export default {
  addcontest(id){
    let data = {cid:id}
    return api.post('contest/add',data)
  }
}

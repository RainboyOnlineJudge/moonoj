import api from './index.js'

export default {
  getOne(id,isContest){
    let url = 'sub/normal'
    if(isContest)  url = 'sub/contest'
    let data = {
      _id:id
    }
    return api.get(url,data)
  }
}

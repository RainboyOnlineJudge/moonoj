import * as types from '../mutation-types'
import api from '../../services/user/index.js'

const state = {
  islogined:false,
  token:'',
  uinfo:{}
}

// getters
const getters = {
  islogined: state => state.islogined,
  token:state =>state.token,
  uinfo:state =>state.uinfo
}

const actions= {
  checkoutIsLogined ({ commit, state }) {
    let __token = window.localStorage.token
    if (__token == undefined)  return; //如果没有token 返回
    if (state.islogined ) return;
    return api.info().then( (data)=>{
        if(data.status === 0){
            commit(types.USER_TOKEN,__token)
            commit(types.USER_ISLOGINED,true)
            commit(types.USER_UINFO,data.uinfo)
            console.log("登录成功:",data)
        }
        else{
          console.log("登录失败:",data.message)
        }
    })
  },
  updateUserInfo({ commit, state ,dispatch}){
    commit(types.USER_ISLOGINED,false)
    return dispatch('checkoutIsLogined')
  }
}

const mutations= {
  [types.USER_TOKEN] (state, val) {
    state.token = val
  },
  [types.USER_ISLOGINED](state,val){
    state.islogined = val
  },
  [types.USER_UINFO](state,val){
    state.uinfo= val
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}

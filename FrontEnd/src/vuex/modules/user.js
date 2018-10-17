import * as types from '../mutation-types'
import api from '../../services/user/index.js'
import {md5} from '../../utils/index.js'


var base_url = 'https://www.gravatar.com/avatar/'
var size="200"
var default_avatar = "https%3a%2f%2fs1.ax1x.com%2f2018%2f10%2f17%2fid4Rl4.jpg"

const state = {
  islogined:false,
  token:'',
  uinfo:{},
  avatar:'', //头像地址
}

// getters
const getters = {
  islogined: state => state.islogined,
  token:state =>state.token,
  uinfo:state =>state.uinfo,
  avatar:state =>state.avatar
}

// actions
const actions = {
  checkoutIsLogined ({ commit, state }) {
    let __token = window.localStorage.token
    if (__token == undefined)  return; //如果没有token 返回
    if (state.islogined ) return;
    return api.info().then( (data)=>{
        if(data.status === 0){
            commit(types.USER_TOKEN,__token)
            commit(types.USER_ISLOGINED,true)
            commit(types.USER_UINFO,data.uinfo)
            let md5_url = md5(data.uinfo.email)
            commit(types.USER_AVATAR,`${base_url}${md5_url}?s=${size}&d=${default_avatar}`)
            console.log("登录成功:",data)
        }
        else{
          console.log("登录失败:",data.message)
        }
    })
  },
  logout ({commit,state}){
    window.localStorage.clear()
    commit(types.USER_TOKEN,'')
    commit(types.USER_ISLOGINED,false)
    commit(types.USER_UINFO,{})
    console.log("退出成功")
  },
  updateUserInfo({ commit, state ,dispatch}){
    commit(types.USER_ISLOGINED,false)
    return dispatch('checkoutIsLogined')
  }
}

// mutations
const mutations = {
  [types.USER_TOKEN] (state, val) {
    state.token = val
  },
  [types.USER_ISLOGINED](state,val){
    state.islogined = val
  },
  [types.USER_UINFO](state,val){
    state.uinfo= val
  },
  [types.USER_AVATAR](state,val){
    state.avatar= val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

import * as types from '../mutation-types'

const state = {
  auto_request:false,
  post_judge_data:null,// 最后一次请求评测的数据提交
  pre_problem_path:'/', //前一个题目的路径
}

// getters
const getters = {
  auto_request: state => state.auto_request,
  post_judge_data:state => state.post_judge_data,
  pre_problem_path: state => state.pre_problem_path
}

// actions
const actions = {
  auto_request_toggle({commit,state}){
    commit(types.SUB_NORMAL_AUTO_REQUEST)
  },
  set_post_judge_data({commit,state},data){
    commit(types.SET_POST_JUDGE_DATA,data)
  },
  set_pre_problem_path({commit,state},path){
    commit(types. SET_PRE_PROBLEM_PATH,path)
  },
}

// mutations
const mutations = {
  [types.SUB_NORMAL_AUTO_REQUEST] (state) {
    state.auto_request = !state.auto_request
  },
  [types.SET_POST_JUDGE_DATA](state,data){
    state.post_judge_data = data
  },
  [types.SET_PRE_PROBLEM_PATH](state,path){
    state.pre_problem_path = path
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

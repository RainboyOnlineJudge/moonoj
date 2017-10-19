import * as types from '../mutation-types'

const state = {
  auto_request:false
}

// getters
const getters = {
  auto_request: state => state.auto_request
}

// actions
const actions = {
  auto_request_toggle({commit,state}){
    commit(types.SUB_NORMAL_AUTO_REQUEST)
  }
}

// mutations
const mutations = {
  [types.SUB_NORMAL_AUTO_REQUEST] (state) {
    state.auto_request = !state.auto_request
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

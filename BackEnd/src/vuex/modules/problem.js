import * as types from '../mutation-types'

const state = {
  FixProblemId:null,
}

// getters
const getters = {
  FixProblemId: state => state.FixProblemId,
}

const actions= {
  setFixProbelmId({commit,state},val){
    commit(types.FIX_PROBLEM_ID,val)
  }
}

const mutations= {
  [types.FIX_PROBLEM_ID] (state, val) {
    state.FixProblemId= val
  },
}


export default {
  state,
  getters,
  actions,
  mutations
}

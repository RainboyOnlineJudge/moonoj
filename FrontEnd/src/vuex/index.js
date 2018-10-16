import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import submission from './modules/submission.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    submission
  },
  strict: debug
})

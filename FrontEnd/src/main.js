// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './vuex/index.js'
import VueCodeMirror from 'vue-codemirror'

var markdown = require('./utils/chg_marked.js')

Vue.config.productionTip = false

Vue.use(iView);
Vue.use(VueCodeMirror);

Vue.prototype.markdown = markdown



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

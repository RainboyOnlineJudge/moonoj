// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './vuex/index.js'

//var markdown = require('./utils/chg_marked.js')
var markdown = require("rmarked")()

import rmarkedEditor from 'rmarkedEditor'
Vue.prototype.markdown_render = markdown

//引入样式
import  'codemirror/lib/codemirror.css'
import "rmarkedEditor/src/css/simplemde.css"
import "rmarked/css/github-markdown.css"
import "katex/dist/katex.min.css"
import "highlight.js/styles/tomorrow-night-blue.css"

Vue.use(rmarkedEditor)

Vue.config.productionTip = false

Vue.use(iView);

Vue.prototype.markdown = markdown



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

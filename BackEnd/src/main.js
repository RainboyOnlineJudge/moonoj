// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView);

import store from './vuex/index.js'

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

/* eslint-disable no-new */
window.Vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

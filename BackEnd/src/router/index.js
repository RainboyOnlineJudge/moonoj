import Vue from 'vue'
import Router from 'vue-router'

import problemList from '@/views/problem/index.vue'
import problemCreate from '@/views/problem/create.vue'
import problemFix from '@/views/problem/fix.vue'

import UserLogin from '@/views/login/login.vue'

import NotFound from '@/views/404.vue'
Vue.use(Router)


const routes = [
    {
      path: '/',
      name: 'problemList',
      component: problemList
    },
    {
      path:'/login',
      name:'Login',
      components: {
        background:UserLogin
      }
    },
    {
      path: '/problem/create',
      name: 'problemCreate',
      component: problemCreate
    },
    {
      path: '/problem/fix',
      name: 'problemFix',
      component: problemFix
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    }

]

export default new Router({
  routes:routes
})

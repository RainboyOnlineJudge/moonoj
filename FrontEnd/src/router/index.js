import Vue from 'vue'
import Router from 'vue-router'

import Index from '../views/index.vue'


import UserBackground from '../views/user/moonbg.vue'
import UserLogin from '../views/user/login.vue'
import UserReg from '../views/user/reg.vue'


//user 相关
import userContainer from '../views/user/userContainer.vue'
import userAvatar from '../views/user/avatar.vue'
import userDetailInfo from '../views/user/detailInfo.vue'
import userSubmition  from '../views/user/submition.vue'


//problem 相关
import problemList from '../views/problem/list.vue'
import problemInfo from '../views/problem/problemInfo.vue'

//submission 相关
import Submission from '../views/submission/submission.vue'

//contest 相关
import contestList from '../views/contest/contestlist.vue'
import contest from '../views/contest/contest.vue'
import contestInfo from '../views/contest/info.vue'
import contestRank from '../views/contest/rank.vue'
import cproblem from'../views/contest/cproblem.vue'
import cproblemInfo from '../views/contest/problemInfo.vue'
import cproblemSub from '../views/contest/problemSub.vue'



import Page404 from '../views/404.vue'
import store from '../vuex/index.js'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      components: {
        default: Index,
      }
    },
    {
      path:'/login',
      name:'Login',
      components: {
        default: UserLogin,
        background:UserBackground
      }
    },
    {
      path:'/reg',
      name:'Reg',
      components: {
        default: UserReg,
        background:UserBackground
      }
    },
    {
      path:'/user',
      name:'userContainer',
      component: userContainer,
      redirect:'/user/info',
      children:[
        {
          name:'userAvatar',
          path:'avatar',
          component:userAvatar
        },
        {
          name:'userDetailInfo',
          path:'info',
          component:userDetailInfo
        },
        {
          name:'userSubmition',
          path:'submitions',
          component:userSubmition
        }
      ]
    },
    {
      path:'/problem-list',
      name:'problemList',
      component: problemList
    },
    {
      path:'/problem/:id',
      name:'problemInfo',
      component: problemInfo
    },
    {
      path:'/submission',
      name:'Submission',
      component: Submission
    },
    {
      path:'/contest-list',
      name:'contestList',
      component: contestList
    },
    {
      path:'/contest/:id',
      name:'contest',
      component: contest,
      redirect:'/contest/:id/info',
      children:[
        {
          path:'info',
          name:'contestInfo',
          component:contestInfo
        }, {
          path:'rank',
          name:'contestRank',
          component:contestRank
        }
      ]
    },
    {
      path:'/contest/:cid/problem/:id',
      name:'cproblem',
      component: cproblem,
      redirect:'/contest/:cid/problem/:id/info',
      children:[
        {
          path:'info',
          name:'cproblemInfo',
          component:cproblemInfo
        },
        {
          path:'rank',
          name:'cproblemSub',
          component:cproblemSub
        }
      ]
    },
    {
      path:'/404',
      name:'Page404',
      component: Page404
    },
    {
      path:'*',
      redirect:'/404'
    }
  ]
})

router.beforeEach((to,from,next)=>{
    if(to.name === 'Login' || to.name === 'Reg')
      next()
    else
    store.dispatch('checkoutIsLogined')
        .then( ()=>{
          if(!store.getters.islogined){
            next({name:'Login'})
          }
          else
            next()
        })
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/components/welcome'
import main from '@/components/main'
import login from './login'
import resume from './resume'
import conversation from './conversation'
import workManage from './work_manage'
import jobManage from './job_manage'
import store from '@/vuex/store'
Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children:[
        {
          path:'',
          redirect:'resume'
        },
        ...resume,
        ...conversation,
        ...workManage,
        ...jobManage
      ]
    },
    ...login
  ]
})

// router.beforeEach((to, from, next) => {

// })

export default router
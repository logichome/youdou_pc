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
import {GET_CONVERSATION_NEW_COUNT} from '@/vuex/actions_types'
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
          redirect:'conversation'
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

router.afterEach((to, from) => {
  if(store.state.login.loginState){
    store.dispatch(GET_CONVERSATION_NEW_COUNT)
  }
})

export default router
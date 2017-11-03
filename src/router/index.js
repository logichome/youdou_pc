import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/components/welcome'
import main from '@/components/main'
import login from './login'
import resume from './resume'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    ...login,
    ...resume
  ]
})

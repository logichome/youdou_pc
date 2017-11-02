import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/components/welcome'
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
    ...login,
    ...resume
  ]
})

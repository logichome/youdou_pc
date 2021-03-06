// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import api from '@/api'
import {API_ROOT} from '@/api/config'
import './assets/styles/public_class.styl'
import './assets/styles/reset.styl'
Vue.config.productionTip = false

import './assets/font/iconfont.css'
import ElementUI from 'element-ui';


import 'element-ui/lib/theme-chalk/index.css'
try{
  
Vue.use(ElementUI);


Vue.prototype.$api = api
Vue.prototype.$API_ROOT = API_ROOT

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

} catch(err){
  console.log(err)
}

export default Vue

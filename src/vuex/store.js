import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

import login from './modules/login';

const store = new Vuex.Store({
  modules:{
    login
  }
})

export default store;
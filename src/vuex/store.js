import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

import login from './modules/login';
import option from './modules/option';

const store = new Vuex.Store({
  modules:{
    login,
    option
  }
})

export default store;
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

import login from './modules/login';
import option from './modules/option';
import conversation from './modules/conversation';
import jobManage from './modules/job_manage';

const store = new Vuex.Store({
  modules:{
    login,
    option,
    conversation,
    jobManage 
  }
})

export default store;
import {
  UPDATE_LOGIN_STATE,
  SET_LOGIN_INFO,
  SET_LOGIN_STEP,
  SET_USER_INFO,
  SET_TEMP_INFO,
  UPDATE_FORM_OPTION
} from '@/vuex/mutations_types'

import {
  INIT_LOGIN,
  INIT_USER_INFO
} from '@/vuex/actions_types'

import api from '@/api'
import router from '@/router'

const state = {
  loginState: false,
  loginStep:0,
  business_id:'',
  u_id:'',
  token:'',
  username: '',
  tempBaseInfo:{},
  userInfo:{}
}

const mutations = {
  // 更新登陆状态
  [UPDATE_LOGIN_STATE](state, isLogin) {
    state.loginState = isLogin || false;
  },
  //更新完善信息进度
  [SET_LOGIN_STEP](state,step){
    state.loginStep = step
  },
  //初始化登陆信息
  [SET_LOGIN_INFO](state, loginInfo) {
    state.u_id = loginInfo.u_id || state.u_id
    state.business_id = loginInfo.business_id || state.business_id
    state.token = loginInfo.token || state.token
    localStorage.YOUDOU_PC_TOKEN = loginInfo.token || state.token || ''
    localStorage.YOUDOU_PC_BUSINESS_ID = loginInfo.business_id || state.business_id || ''
    localStorage.YOUDOU_PC_U_ID = loginInfo.u_id || state.u_id || ''
  },
  //初始化用户信息
  [SET_USER_INFO](state, userInfo) {
    state.uid = userInfo.uid
    state.username = userInfo.username
  },
  //设置临时表单信息
  [SET_TEMP_INFO](state, info){
    state.tempBaseInfo = info
  }
}

const actions = {
  //初始化登陆信息
  [INIT_LOGIN]({commit,dispatch}, loginInfo) {
    commit(UPDATE_LOGIN_STATE,true)
    commit(SET_LOGIN_INFO,loginInfo)
    //获取表单选项
    api.login.getFormOption()
      .then(res => {
        if(res.data.error === '0'){
          commit(UPDATE_FORM_OPTION,res.data.data)
        }
      })
    //如果已完善信息则获取公司信息
    if(loginInfo.is_business === '1'){
      dispatch(INIT_USER_INFO)
      router.push('/main')
    } else {
      commit(SET_LOGIN_STEP,1)
    }
  },
  // 初始化用户信息
  [INIT_USER_INFO]({state,commit}){
    api.login.getUserInfo({business_id:localStorage.YOUDOU_PC_BUSINESS_ID})
      .then(res => {
        if(res.data.error === '0'){
          state.userInfo = res.data.data
        }
      })
  }
}

export default {
  state,
  mutations,
  actions
}
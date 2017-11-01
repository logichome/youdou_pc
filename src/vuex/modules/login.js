import {
  UPDATE_LOGIN_STATE,
  SET_USER_INFO
} from '@/vuex/mutations_types'

const state = {
  loginState: false,
  uid: 0,
  username: ''
}

const mutations = {
  // 更新登陆状态
  [UPDATE_LOGIN_STATE](state, isLogin) {
    state.loginState = isLogin || false;
  },
  //初始化用户信息
  [SET_USER_INFO](state, userInfo) {
    state.uid = userInfo.uid
    state.username = userInfo.username
  }
}

export default {
  state,
  mutations
}
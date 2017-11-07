import {
  UPDATE_CONVERSATION_LIST,
  SET_CONVERSATION_LIST_LOADING,
  UPDATE_CONVERSATION_FILTER,
  UPDATE_CONVERSATION_TOTAL,
  UPDATE_CONVERSATION_NEW_COUNT
} from '@/vuex/mutations_types'

import {
  GET_CONVERSATION_LIST
} from '@/vuex/actions_types'

import api from '@/api'

const state = {
  listLoading:false,
  conversationList:[],
  filter:{
    invitation:0,
    status:0,
    exper:0,
    education:0,
    treatment:0,
    experience:0,
    page:1
  },
  total:0,
  newConut:0
}

const mutations = {
  //更新沟通列表
  [UPDATE_CONVERSATION_LIST](state,list){
    state.conversationList = list
  },
  //更新加载状态
  [SET_CONVERSATION_LIST_LOADING](state,isLoading){
    state.listLoading = isLoading || false
  },
  //更新过滤条件
  [UPDATE_CONVERSATION_FILTER](state,filter){
    if(filter){
      state.filter = {...state.filter, ...filter}
    }
  },
  //更新总条数
  [UPDATE_CONVERSATION_TOTAL](state,total){
    state.total = total
  },
  //更新新人数
  [UPDATE_CONVERSATION_NEW_COUNT](state,count){
    state.newCount = count
  }
}

const actions = {
  //获取沟通列表
  [GET_CONVERSATION_LIST]({state,commit},filter){
    commit(SET_CONVERSATION_LIST_LOADING,true)
    commit(UPDATE_CONVERSATION_FILTER,filter)
    api.conversation.getConversationList(state.filter)
      .then(res => {
        if(res.data.error === '0'){
          commit(UPDATE_CONVERSATION_LIST,res.data.data.list)
          commit(UPDATE_CONVERSATION_TOTAL,res.data.data.count)
        }
        commit(SET_CONVERSATION_LIST_LOADING,false)
      })
      .catch(err => {
        console.error(err)
        commit(SET_CONVERSATION_LIST_LOADING,false)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
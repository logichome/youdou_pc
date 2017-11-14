import {
  UPDATE_JOB_LIST,
  UPDATE_JOB_FILTER,
  SET_JOB_LIST_LOADING,
  UPDATE_JOB_TOTAL
} from '@/vuex/mutations_types'

import {
  GET_JOB_MANAGE_LIST
} from '@/vuex/actions_types'

import api from '@/api'

const state = {
  listLoading:false,
  jobList:[],
  filter:{
    status:1,
    page:1
  },
  total:0
}

const mutations = {
  //更新职位列表
  [UPDATE_JOB_LIST](state,list){
    state.jobList = list
  },
  //更新加载状态
  [SET_JOB_LIST_LOADING](state,isLoading){
    state.listLoading = isLoading || false
  },
  //更新过滤条件
  [UPDATE_JOB_FILTER](state,filter){
    if(filter){
      state.filter = {...state.filter, ...filter}
    }
  },
  //更新总条数
  [UPDATE_JOB_TOTAL](state,total){
    state.total = total
  },
}

const actions = {
  //获取职位列表
  [GET_JOB_MANAGE_LIST]({state,commit},filter){
    commit(SET_JOB_LIST_LOADING,true)
    commit(UPDATE_JOB_FILTER,filter)
    api.jobManage.getJobManageList(state.filter)
      .then(res => {
        if(res.data.error === '0'){
          commit(UPDATE_JOB_LIST,res.data.data.list)
          commit(UPDATE_JOB_TOTAL,res.data.data.count)
        } else {
          commit(UPDATE_JOB_LIST,[])
          commit(UPDATE_JOB_TOTAL,0)
        }
        commit(SET_JOB_LIST_LOADING,false)
      })
      .catch(err => {
        console.error(err)
        commit(SET_JOB_LIST_LOADING,false)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
import {
  UPDATE_FORM_OPTION,
  UPDATE_JOB_FORM_OPTION,
  UPDATE_CITY_OPTION
} from '@/vuex/mutations_types'

const state = {
  welfare: [],
  industry: [],
  scale: [],
  property:[],
  experience:[],
  education:[],
  treatment:[],
  category:[],
  addressOptions:[]
}

const mutations = {
  // 更新表单选项
  [UPDATE_FORM_OPTION](state, options) {
    state.welfare = options.welfare
    state.industry = options.industry
    state.scale = options.scale
    state.property = options.property
  },
  [UPDATE_JOB_FORM_OPTION](state, options) {
    state.experience = options.experience
    state.education = options.education
    state.treatment = options.treatment
    state.category = options.category
  },
  [UPDATE_CITY_OPTION](state,option) {
    state.addressOptions = option
  }
}

export default {
  state,
  mutations
}
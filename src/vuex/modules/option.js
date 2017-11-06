import {
  UPDATE_FORM_OPTION,
  UPDATE_JOB_FORM_OPTION
} from '@/vuex/mutations_types'

const state = {
  welfare: [],
  industry: [],
  scale: [],
  property:[],
  experience:[],
  education:[],
  treatment:[],
  category:[]
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
  }
}

export default {
  state,
  mutations
}
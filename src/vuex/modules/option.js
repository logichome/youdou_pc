import {
  UPDATE_FORM_OPTION
} from '@/vuex/mutations_types'

const state = {
  welfare: [],
  industry: [],
  scale: [],
  property:[]
}

const mutations = {
  // 更新表单选项
  [UPDATE_FORM_OPTION](state, options) {
    state.welfare = options.welfare
    state.industry = options.industry
    state.scale = options.scale
    state.property = options.property
  }
}

export default {
  state,
  mutations
}
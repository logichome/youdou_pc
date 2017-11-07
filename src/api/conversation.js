import axios from './interceptors'
import {API_ROOT} from './config'

/**
 * 获取沟通列表
 * @param {*过滤条件} filter 
 */
export const getConversationList = filter => axios.get(API_ROOT + 'communicate/index',{params:filter})

/**
 * 更新沟通列状态
 * @param {*状态信息} stateInfo 
 */
export const updateConversationState = stateInfo => axios.post(API_ROOT + 'communicate/update',stateInfo)
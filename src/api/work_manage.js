import axios from './interceptors'
import {API_ROOT} from './config'

/**
 * 获取工作管理列表
 * @param {*过滤条件} filter 
 */
export const getWorkManageList = filter => axios.get(API_ROOT + 'interview/index',{params:filter})
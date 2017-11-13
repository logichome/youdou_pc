import axios from './interceptors'
import {API_ROOT} from './config'

/**
 * 获取职位管理列表
 * @param {*过滤条件} filter 
 */
export const getJobManageList = filter => axios.post(API_ROOT + 'businessjob/view',filter)
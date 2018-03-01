import axios from './interceptors'
import {API_ROOT} from './config'

/**
 * 获取职位管理列表
 * @param {*过滤条件} filter 
 */
export const getJobManageList = filter => axios.post(API_ROOT + 'businessjob/view',filter)

/**
 * 创建职位
 * @param {*职位信息} info 
 */
export const createJob = info => axios.post(API_ROOT + 'businessjob/create',info)

/**
 * 修改职位信息
 * @param {*职位信息} info 
 */
export const editJobInfo = info => axios.post(API_ROOT + 'businessjob/update',info)

/**
 * 获取岗位详情
 * @param {*岗位id} id 
 */
export const getJobInfo = id => axios.post(API_ROOT + 'businessjob/detail',id)
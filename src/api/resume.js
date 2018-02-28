import axios from './interceptors'
import {API_ROOT} from './config'

/**
 * 人才库
 * @param {*过滤条件} filter 
 */
export const getResumeList = filter  => axios.get(API_ROOT + 'resume/show',{params:filter})

/**
 * 获取城市选项(废弃)
 */
export const getCityOptions = () => axios.get(API_ROOT + 'area/show')

/**
 * 邀约面试
 * @param {*邀约信息} info 
 */
export const inviteSubmit = info => axios.post(API_ROOT + 'invitation/create',info)

/**
 * 查询所有上架的职位列表
 * @param {*上架状态} status 
 */
export const getAllJobList = status => axios.get(API_ROOT + 'businessjob/shelves',{params:status})
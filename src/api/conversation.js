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

/**
 * 获取对话详情
 * @param {*对话信息} info 
 */
export const getConversationDetail = info => axios.get(API_ROOT + 'interview/chatdetail',{params:info})

/**
 * 获取简历详情
 * @param {*简历id} id 
 */
export const getConversationResume = id => axios.get(API_ROOT + 'business/user_detail',{params:id})

/**
 * 发送消息
 * @param {*消息内容} message 
 */
export const sendConversationMessage = message => axios.post(API_ROOT + 'chat/create',message)

/**
 * 面试/offer/未通过
 * @param {*邀约信息} info 
 */
export const inviteOffer = info => axios.post(API_ROOT + 'interview/create',info)

/**
 * 获取新人数量
 */

 export const getNewPeopleCount = () => axios.get(API_ROOT + 'communicate/numbers')
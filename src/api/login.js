import axios from './interceptors'
import {API_ROOT} from './config'

export const login = info => axios.post(API_ROOT + 'companyuser/login',info)

/**
 * 获取用户信息
 * @param {*用户信息} info 
 */
export const getUserInfo = info => axios.get(API_ROOT + 'getuserinfo',{params:info})

/**
 * 上传头像
 * @param {*发送参数} formData 
 * @param {*进度条回调} onUploadProgress 
 */
export const uploadAvatar = (formData,onUploadProgress) => axios({
  url:API_ROOT + 'uploadAvatar',
  method:'post',
  data:formData,
  headers: {'Content-Type': 'multipart/form-data'},
  onUploadProgress
})
import axios from './interceptors'
import {API_ROOT} from './config'

/**
 * 密码登陆
 * @param {*登陆表单} info 
 */
export const login = info => axios.post(API_ROOT + 'companyuser/login',info)

/**
 * 获取验证码
 * @param {*电话} phone 
 */
export const getCheckCode = phone => axios.post(API_ROOT + 'companyuser/verifycode',phone)

/**
 * 获取完善企业信息选项内容
 */
export const getFormOption = () => axios.get(API_ROOT + 'business/businfo')

/**
 * 获取岗位相关信息选项
 */
export const getJobFormOption = () => axios.get(API_ROOT + 'businessjob/info')

/**
 * 手机号注册
 * @param {*注册信息} info 
 */
export const submitRegister = info => axios.post(API_ROOT + 'companyuser/quicklogin',info)

/**
 * 手机号登陆
 * @param {*登陆信息} info 
 */
export const messageLogin = info => axios.post(API_ROOT + 'companyuser/quicklogin',info)

/**
 * 完善企业信息
 * @param {*企业信息} info 
 */
export const completeCompanyInfo = info => axios.post(API_ROOT + 'business/create',info)

/**
 * 获取用户信息
 * @param {*企业id} id 
 */
export const getUserInfo = id => axios.get(API_ROOT + 'business/view',{params:id})

/**
 * 上传图片
 * @param {*发送参数} formData 
 * @param {*进度条回调} onUploadProgress 
 */
export const uploadCompanyImg = (formData,onUploadProgress) => axios({
  url:API_ROOT + 'businessimg/create',
  method:'post',
  data:formData,
  headers: {'Content-Type': 'multipart/form-data'},
  onUploadProgress
})

/**
 * 获取登陆二维码
 */
export const getQrcodeImg = () => axios.get(API_ROOT + 'companyuser/qrcode')
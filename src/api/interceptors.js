import Axios from 'axios'
import { Message } from 'element-ui';
import store from '@/vuex/store'
import { SET_LOGIN_STEP } from '@/vuex/mutations_types'

function getXtoken() {
  return localStorage.YOUDOU_PC_TOKEN
}
/**
 * 拦截请求
 */
Axios.interceptors.request.use(
  config => {
    let token = getXtoken()
    if (!token) {
      return config
    }
    if (config.method == 'post') {
      if(config.headers['Content-Type'] === 'multipart/form-data'){
        config.data.append('_t',Date.parse(new Date()) / 1000)
        config.data.append('token',token)
      } else {
        config.data = {
          ...config.data,
          _t: Date.parse(new Date()) / 1000,
          token
        }
      }
    } else if (config.method == 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        token,
        ...config.params
      }
    }
    return config
  },

  error => {
    return Promise.reject(error)
  }
)
/**
 * 拦截响应
 */
Axios.interceptors.response.use( response => {
  if(response.status!==200) {
    Message({
      message: '请求出错，状态码：'+response.status,
      type: 'error'
    })
    return response
  }
  if (response.data.error !== '0') {
    Message({
      message: response.data.msg,
      type: 'error'
    })
    switch(response.data.error){
      case '10002':
        localStorage.clear()
        router.replace({
          path: '/login'
        })
        store.commit(SET_LOGIN_STEP,0)
        break;
    }

  }
  return response
},
  error => {
    Message({
      message: '请求出错，未知错误',
      type: 'error'
    })
    console(error)
    return Promise.reject(error)
  }
)

export default Axios
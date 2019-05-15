import axios from 'axios'
import Vue from 'vue'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.urlApi,
  timeout: 6000
})

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      Vue.$vux.toast.show({
        text: res.msg,
        type: 'text'
      })
      return Promise.reject(new Error('error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Vue.$vux.toast.show({
      text: error.message,
      type: 'text'
    })
    return Promise.reject(error)
  }
)

export default service

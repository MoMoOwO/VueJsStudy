import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入组件相关样式
import 'element-ui/lib/theme-chalk/index.css'

// 导入axios
import Axios from 'axios'
import VueAxios from 'vue-axios'
// 配置请求根路径
Axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 配置 Axios 请求拦截器
Axios.interceptors.request.use(config => {
  // console.log(config)
  // 为请求头对象添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 配置 axios
Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入全局样式表
import './assets/css/global.css'

// 导入表格插件
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器组件
import VueQuillEditor from 'vue-quill-editor'

// 导入进度条第三方组件
import NProgress from 'nprogress'

// 导入axios
import Axios from 'axios'
import VueAxios from 'vue-axios'
// 配置请求根路径
Axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 配置 Axios 请求拦截器
Axios.interceptors.request.use(config => {
  // 在 request 拦截器中展示进度条
  NProgress.start()
  // console.log(config)
  // 为请求头对象添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Axios.interceptors.response.use(config => {
  // 在 response 拦截其中，隐藏进度条
  NProgress.done()
  return config
})

// 配置 axios
Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

// 注册第三方组件，全局可用的组件
Vue.component('tree-table', TreeTable)
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

// 注册全局的时间过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

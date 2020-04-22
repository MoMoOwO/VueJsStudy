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
// 配置 axios
Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

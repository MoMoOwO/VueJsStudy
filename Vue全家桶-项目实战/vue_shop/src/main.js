import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入 Element-UI 组件库
import ElementUI from 'element-ui'
// 导入组件相关样式
import 'element-ui/lib/theme-chalk/index.css'

// 导入axios
import Axios from 'axios'
import VueAxios from 'vue-axios'

// 配置插件
Vue.use(ElementUI)
// 配置 axios
Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

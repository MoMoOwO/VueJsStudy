import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/Login'
}, {
  path: '/login',
  component: Login
}, {
  path: '/home',
  component: Home,
  redirect: '/welcome', // 重定向
  children: [{ // 子路由规则
    path: '/welcome',
    component: Welcome
  }, {
    path: '/users',
    component: Users
  }, {
    path: '/rights',
    component: Rights
  }]
}]

const router = new VueRouter({
  routes
})

// 为路由象添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行；next() 直接放行，next('/login') 强制跳转
  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') {
    return next()
  } else {
    // 从 sessionStorage 中获取保存的 token 值
    const tokenStr = window.sessionStorage.getItem('token')
    // 没有 token 强制跳转到登录页
    if (!tokenStr) {
      return next('/login')
    } else {
      next()
    }
  }
})

export default router

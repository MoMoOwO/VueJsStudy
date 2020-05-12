import Vue from 'vue'
import VueRouter from 'vue-router'

/* import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue' */

const Login = () => import( /* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
const Home = () => import( /* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
const Welcome = () => import( /* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')

/* import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue' */
const Users = () => import( /* webpackChunkName: "users_rights_roles" */ '../components/user/Users.vue')
const Rights = () => import( /* webpackChunkName: "users_rights_roles" */ '../components/power/Rights.vue')
const Roles = () => import( /* webpackChunkName: "users_rights_roles" */ '../components/power/Roles.vue')

/* import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue' */
const Cate = () => import( /* webpackChunkName: "cate_params" */ '../components/goods/Cate.vue')
const Params = () => import( /* webpackChunkName: "cate_params" */ '../components/goods/Params.vue')

/* import GoodsList from '../components/goods/List.vue'
import AddGood from '../components/goods/Add.vue' */
const GoodsList = () => import( /* webpackChunkName: "goodslist_addgood" */ '../components/goods/List.vue')
const AddGood = () => import( /* webpackChunkName: "goodslist_addgood" */ '../components/goods/Add.vue')

/* import OrderList from '../components/order/Order.vue'
import Report from '../components/report/Report.vue' */
const OrderList = () => import( /* webpackChunkName: "orderlist_report" */ '../components/order/Order.vue')
const Report = () => import( /* webpackChunkName: "orderlist_report" */ '../components/report/Report.vue')

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
  }, {
    path: '/roles',
    component: Roles
  }, {
    path: '/categories',
    component: Cate
  }, {
    path: '/params',
    component: Params
  }, {
    path: '/goods',
    component: GoodsList
  }, {
    path: '/goods/add',
    component: AddGood
  }, {
    path: '/orders',
    component: OrderList
  }, {
    path: '/reports',
    component: Report
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

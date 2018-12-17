import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from 'common/js/storeUtil'
const Home = () => import('views/home/home')
const Login = () => import('views/login/login')
const HomeContainer = () => import('views/home_container/home_container')
const NotFound = () => import('views/notfound/notfound')

Vue.use(Router)

/* 初始加载的路由 */
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

/* 需要动态加载的路由 */
export const DynamicRoutes = [
  {
    path: '',
    name: 'homeContainer',
    redirect: 'home',
    component: HomeContainer,
    meta: {
      requiresAuth: true,
      name: '首页'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          requiresAuth: true,
          name: '首页',
          icon: 'icon-home'
        }
      }
    ],
  },
  {
    path: '*',
    component: NotFound
  }
]

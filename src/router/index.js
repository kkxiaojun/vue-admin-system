import Vue from 'vue'
import Router from 'vue-router'
import { getCookie } from 'common/js/storeUtil'
const Home = () => import('views/home/home')
const Login = () => import('views/login/login')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log('getCookie', getCookie('user'))
  if (getCookie('user') || to.path === '/') {
    next()
  } else {
    next({ name: 'login'})
  }
})
export default router

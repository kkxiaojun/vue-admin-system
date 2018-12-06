import Vue from 'vue'
import Router from 'vue-router'
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
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to) {
    console.log('to', to)
    next()
  } else {
    console.log('from:', from)
  }
})
export default router

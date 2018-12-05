import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('pages/home/home')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Home
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

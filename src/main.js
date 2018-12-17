// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/less/index.less'
import 'common/js/filters'

// 使用element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// vuex
import store from './store/index.js'

import { getCookie } from '@/common/js/storeUtil'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 路由前置守卫
router.beforeEach((to, from, next) => {
    if (!store.state.token && !getCookie('token')) {
        if (
            to.matched.length > 0 &&
            !to.matched.some(record => record.meta.requiresAuth)
        ) {
            next()
        } else {
            next({ path: '/login' })
        }
    } else {
        if (!store.state.permission.permissionList) {
            store.dispatch('permission/FETCH_PERMISSION').then(() => {
                next({ path: to.path })
            })
        } else {
            if (to.path !== '/login') {
                next()
            } else {
                next(from.fullPath)
            }
        }
    }
})

// router 后置守卫,实现面包屑导航
router.afterEach((to, from, next) => {
    var routerList = to.matched
    store.commit('SET_CRUMB_LIST', routerList)
    store.commit('permission/SET_CURRENT_MENU', to.name)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

# 基于vue、vue-router、vuex、fetch、cookie和addRoutes的动态菜单路由权限控制
## 登录整体逻辑
1. 根据token判断是否需要重新登录(token获取后存储在vuex和cookie中)，先从vuex获取token，再从cookie中获取token(刷新页面，vuex会清空)

vuex操作
```
[types.LOGIN](state, data) {
state.token = data.token;
setCookie('token', data.token);
},
[types.LOGINOUT](state) {
state.token = '';
removeCookie('token');
},
```
cookie操作
```
export const setCookie = (name, value) => {
    // 24 * 60 * 60 * 1000
    var exp = new Date();
    exp.setTime(exp.getTime() + COMMON_PARAMS.REMEMBERDAY * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
export const getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
}
export const removeCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
    }
}
```
2. router的拦截与判断
由于权限数组的模块有点儿多，增加一个permission的module, 用`permissionList`记录获取到的权限路由
刚开始的路由
```
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
```
操作步骤：localhost:8080，此时无token，路由中只有`/login`, redirect到login.
输入账号密码触发mutations `LOGIN`，获取到token。触发FETCH_PERMISSION
```
// 路由前置守卫
router.beforeEach((to, from, next) => {
    // 无token, redirect到login
    if (!store.state.token && !getCookie('token')) {
        // 匹配不到路由也redirect到login
        if (
            to.matched.length > 0 &&
            !to.matched.some(record => record.meta.requiresAuth)
        ) {
            next()
        } else {
            next({ path: '/login' })
        }
    } else { // 有token
        // 无permissionList，触发FETCH_PERMISSION，
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
```
## 路由动态加载的核心addRoutes
有token,无permissionList，触发FETCH_PERMISSION, 具体过程：
1. 从后台获取权限数组，`getPermission()`
```
let permissionList = await getPermission()
```
2. 用设置好的权限路由与返回的权限路由进行筛选

```
/*  根据权限筛选出我们设置好的路由并加入到path=''的children */
let routes = recursionRouter(permissionList.data || [], dynamicRouter)

/* 前端设置的需要权限判断的路由 */
const DynamicRouters = [
    {
        path: '/side',
        component: Side,
        name: 'side',
        meta: {
            name: '订单管理',
            icon: 'icon-email'
        },
        children: [
            {
                name: 'order',
                path: '/sidelist',
                component: Side,
                meta: {
                    name: '订单列表'
                }
            }
        ]
    },
]

/* 后台返回的权限路由 */
{
    "code": 200,
    "message": "获取权限成功",
    "data": [
        {
            "name": "订单管理",
            "children": [
                {
                    "name": "订单列表"
                },
                {
                    "name": "生产管理",
                    "children": [
                        {
                            "name": "生产列表"
                        }                     
                    ]
                },
                {
                    "name": "退货管理"
                }
            ]
        }
    ]
}
```
3. 生成左侧菜单, 动态加载路由
```
/* 生成左侧导航菜单 */
commit('SET_MENU', children)

/*
    为所有有children的菜单路由设置第一个children为默认路由
    主要是供面包屑用，防止点击面包屑后进入某个路由下的 '' 路由,比如/manage/
    而我们的路由是
    [
        /manage/menu1,
        /manage/menu2
    ]
*/
setDefaultRoute([MainContainer])

/*  初始路由 */
let initialRoutes = router.options.routes

/*  动态添加路由 */
router.addRoutes(DynamicRoutes)
/* 完整的路由表 */
commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])
```
完整permission模块代码
```
import router, { DynamicRoutes } from '@/router/index'
import dynamicRouter from '@/router/dynamic_router'
import { recursionRouter, setDefaultRoute} from 'common/js/routerUtil'
import { getPermission } from '@/service/getData'

const state = {
    permissionList: null /** 所有路由 */,
    sidebarMenu: [] /** 导航菜单 */,
    currentMenu: '' /** 当前active导航菜单 */
}

const mutations = {
    SET_PERMISSION(state, routes) {
        state.permissionList = routes
    },
    CLEAR_PERMISSION(state) {
        state.permissionList = null
    },
    SET_MENU(state, menu) {
        state.sidebarMenu = menu
    },
    CLEAR_MENU(state) {
        state.sidebarMenu = []
    },
    SET_CURRENT_MENU(state, currentMenu) {
        state.currentMenu = currentMenu
    }
}

const actions = {
    async FETCH_PERMISSION({ commit, state }) {
        let permissionList = await getPermission()
        /*  根据权限筛选出我们设置好的路由并加入到path=''的children */
        let routes = recursionRouter(permissionList.data || [], dynamicRouter)
        let MainContainer = DynamicRoutes.find(v => v.path === '')
        let children = MainContainer.children
        children.push(...routes)

        /* 生成左侧导航菜单 */
        commit('SET_MENU', children)

        /*
            为所有有children的菜单路由设置第一个children为默认路由
            主要是供面包屑用，防止点击面包屑后进入某个路由下的 '' 路由,比如/manage/
            而我们的路由是
            [
                /manage/menu1,
                /manage/menu2
            ]
        */
        setDefaultRoute([MainContainer])

        /*  初始路由 */
        let initialRoutes = router.options.routes

        /*  动态添加路由 */
        router.addRoutes(DynamicRoutes)
        /* 完整的路由表 */
        commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])
    }
}

export default {
    // 解决不同模块之间的命名冲突问题，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    namespaced: true,
    state,
    getters: {},
    actions,
    mutations: mutations
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

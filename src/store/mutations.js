import * as types from './mutation-types'
import { setCookie, removeCookie } from '@/utils/storeUtil'

// 对于vuex的用法，其实理解了流程就行
// vuex -> actions -> 提交（commit）mutations ->state -> view -> dispatch 触发 actions ->...
// actions 其实是mutations的升级版，它实现了mutations只能同步改变状态不能异步改变
// actions 就是可以异步操作mutation的提交
export const mutations = {
  // 这里的data指提交时：
  // 从/api/login传回的user对象，其中包含name,messeage等信息
  [types.LOGIN](state, data) {
    state.token = data.token;
    // vuex的本质作用是管理组件之间复杂的状态的（如购物车逻辑等等...）
    // 所以当刷新浏览器时，这些状态也会一并被清空
    // 所以还是需要有一个长期在浏览器中保存如登录/登出状态的机制
    // 因此这里采用了localStorage
    // 一定要明白vuex这类库的本质作用，它极大的增加了前端逻辑处理的可能性
    setCookie('token', data.token);
    // localStorage.setItem('session', data.session.user)
  },
  [types.LOGINOUT](state) {
    state.token = '';
    removeCookie('token');
  },
  [types.TOGGLE_NAV](state) {
    state.isSidebarNavCollapse = !state.isSidebarNavCollapse
  },
  [types.SET_CRUMB_LIST](state, list) {
      state.crumbList = list
  }
}

export default mutations
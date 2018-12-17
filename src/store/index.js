import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

Vue.use(Vuex);

const state = {
    token: '',
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: []
}

export default new Vuex.Store({
    getters,
    state,
    mutations,
    actions,
    modules
})
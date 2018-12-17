import fetch from './http/fetch'

/**
 * 用户认证所用到的 API
 */
class authService {
    getLogin(user) {
        return fetch('/static/login.json')
    }
    getPermission() {
        return fetch('/static/permission.json')
    }
}
// 实例化后导出，全局单例
export default new authService()
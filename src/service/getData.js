import fetch from '@/config/fetch'

// export const getLogin = (user) => fetch('/pmc/service/login', {
//   account: user.username,
//   password: user.password
// }, 'post')

export const getLogin = (user) => fetch('/static/login.json')

export const getPermission = () => fetch('/static/permission.json')

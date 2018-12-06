import fetch from '@/config/fetch'

export const detail = (username, password) => fetch('/pmc/service/login', {
  account: username,
  password: password
}, 'post')
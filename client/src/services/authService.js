import api from './api'
export const registerUser = async (data) => {
  return (await api.post('/auth/register', data)).data
}
export const loginUser = async (creds) => {
  const res = (await api.post('/auth/login', creds)).data
  if (res.token) {
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
  }
  return res
}
export const logoutUser = () => {
  localStorage.clear()
}

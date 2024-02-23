import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3009/api',
  validateStatus: () => true,
})

instance.interceptors.request.use((config) => {
  const userToken = window.localStorage.getItem('userToken');
  const barberToken = window.localStorage.getItem('barberToken');
  if (userToken) {
    config.headers.Authorization = userToken;
  }
  else if (barberToken) {
    config.headers.Authorization = barberToken;
  }
  return config;
})

export default instance
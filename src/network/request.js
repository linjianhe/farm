import axios from 'axios'
import { Promise } from 'q'
import cookie from 'vue-cookie'
const service = axios.create({
  // baseURL: process.env.BASE_URL,
  // baseURL: 'http://localhost:3000',
  timeout: 150000
})

service.interceptors.request.use(
  config => {
    if ((/^\/farm\/users\//).test(config.url)) {
      return config
    } else {
      let token = cookie.get('token')
      config.headers.token = token
    }
    return config
  }, error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return Promise.resolve(response.data)
  }, error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service

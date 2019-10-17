import axios from 'axios'
import { Promise } from 'q'

const service = axios.create({
  // baseURL: process.env.BASE_URL,
  timeout: 150000
})

service.interceptors.request.use(
  config => {
    return config
  }, error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  }, error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service

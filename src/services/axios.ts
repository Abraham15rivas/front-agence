import axios, { AxiosInstance} from 'axios'

const config = {
  baseURL: `${process.env.VUE_APP_API_URL}`,
  headers: <any>{
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
}

const axiosInstance: AxiosInstance = axios.create(config)

export default axiosInstance

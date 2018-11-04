import axios from 'axios'

const pilonApiBaseUrl = 'https://api.pilon.io/v1'

const axiosInstance = axios.create({
  baseURL: pilonApiBaseUrl,
})

export default {
  pilonApiBaseUrl,
  environmentId: '7b488672-dfa6-11e8-96fb-d7aa255a0e95',
  pilonApi: axiosInstance,
}

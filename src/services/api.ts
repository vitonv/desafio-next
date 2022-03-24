import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()
export const api = axios.create({
    baseURL: 'https://backend-necxt.herokuapp.com/api/',
    headers:{
        'x-access-token': `${cookies['cabelex.accessToken']}`
    }
})
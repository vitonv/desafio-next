import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()
export const api = axios.create({
    baseURL: process.env.API_URL,
    headers:{
        'x-access-token': `${cookies['cabelex.accessToken']}`
    }
})
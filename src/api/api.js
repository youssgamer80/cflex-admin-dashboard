import axios from "axios"
const mockRequests = false
import { getUserData } from '../utility/Utils'

const user = getUserData()
const client = mockRequests ? axios : user ? axios.create({
    baseURL: 'http://192.168.252.21:4001/api',
    headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${user.accesToken}`
    }
}) : axios.create({
    baseURL: 'http://192.168.252.21:4001/api',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json"
    }
})

export default client
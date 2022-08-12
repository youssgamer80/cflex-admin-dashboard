import axios from "axios"
const mockRequests = true

const client = mockRequests ? axios : axios.create({
    baseURL: 'http://xxxx:3000/api/',
    timeout: 1000,
    headers: { "Content-Type": "application/json" }
})

export default client
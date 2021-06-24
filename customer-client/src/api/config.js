import axios from 'axios'
export default axios.create({
  baseURL: 'https://y-store.herokuapp.com'
  // baseURL: 'https://localhost:3000'
})

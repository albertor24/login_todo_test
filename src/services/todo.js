import axios from 'axios'
import {getCurrentUser} from './auth'
// import store from '../store/main'

function getTodos () {
  const todoUrl = 'https://jsonplaceholder.typicode.com/todos'
  const user = getCurrentUser()
  return axios.get(todoUrl).then(response => {
    return response.data.filter(list => list.userId === user.id)
  })
}

export {
  getTodos
}

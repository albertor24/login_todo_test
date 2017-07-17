import axios from 'axios'
import {getCurrentUser} from './auth'

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

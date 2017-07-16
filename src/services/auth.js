import axios from 'axios'
import store from '../store/main'

const ACCESS_TOKEN_KEY = 'access_token'

export {
  isUserAuth,
  getCurrentUser,
  login,
  logout
}

function login (username) {
  const usersUrl = 'http://jsonplaceholder.typicode.com/users'
  return axios.get(usersUrl).then(response => {
    let foundUser = response.data.find(user => user.username === username)
    if (foundUser) {
      store.commit('setAuth', true)
      setLogin(foundUser)
    }
    return !!foundUser
  })
}

function logout () {
  clearLogin()
  store.commit('setAuth', false)
}

// Return a string. Parse it only when necessary
function getCurrentUser () {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

/** **** Private Functions  ***** **/
function setLogin (foundUser) {
  let user = {
    id: foundUser.id,
    name: foundUser.name,
    date: Date.now()
  }
  user.secret = unsafeHash('encrypt', [user.name, user.date].reduce((t, c) => t + c + ';', ';'))
  let userString = JSON.stringify(user)
  localStorage.setItem(ACCESS_TOKEN_KEY, userString)
}

function clearLogin () {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// If we were using backend, we would use NodeJS and JWT for authentication
function isUserAuth () {
  let currentUser = JSON.parse(getCurrentUser())
  if (!currentUser) {
    return false
  }
  let [name, date] = unsafeHash('decrypt', currentUser.secret).split`;`.filter(i => i)
  let isAuth = name === currentUser.name && date === `${currentUser.date}`
  if (!isAuth) {
    // Someone messed with the local storage
    console.warn('Warning! Local storage was tampered with')
    clearLogin()
    return false
  }
  return true
}

// A encrypting/decrypting function to prevent trivial login by
// editing local storage. It's insecure, but quick and easy
function unsafeHash (action = 'encrypt', toProcess = '') {
  let actionObj = {
    encrypt (str) {
      return encodeURIComponent(btoa(str))
    },
    decrypt (str) {
      return atob(decodeURIComponent(str))
    }
  }
  if (Object.keys(actionObj).indexOf(action) === -1) {
    console.log('Unsupported action', action)
  }
  return actionObj[action](toProcess)
}

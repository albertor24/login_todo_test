import axios from 'axios'
import store from '../store/main'

const ACCESS_TOKEN_KEY = 'access_token'
const SECRET_SEPARATOR = ';;'

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

// In a real scenario, we would use NodeJS and JWT for authentication
// This does not protect from user copying the local storage and accessing it from somewhere else
// However, it protects from trivial localStorage tampering
function isUserAuth () {
  let currentUserStr = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!currentUserStr) {
    return false
  }
  try {
    var currentUser = JSON.parse(currentUserStr)
  } catch (e) {
    handleTampering()
  }
  let [name, date] = unsafeHash('decrypt', currentUser.secret).split(SECRET_SEPARATOR).filter(i => i)
  let isAuth = name === currentUser.name && date === `${currentUser.date}`
  if (!isAuth) {
    // Someone messed with the local storage
    handleTampering()
    return false
  }
  store.commit('setAuth', true)
  return true
}

export {
  ACCESS_TOKEN_KEY,
  // functions
  isUserAuth,
  getCurrentUser,
  login,
  logout
}

/** **** Private Functions  ***** **/
function setLogin (foundUser) {
  let user = {
    id: foundUser.id,
    name: foundUser.name,
    date: Date.now()
  }
  user.secret = unsafeHash('encrypt', [user.name, user.date].reduce((t, c) => {
    return t + c + SECRET_SEPARATOR
  }, SECRET_SEPARATOR))
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(user))
}

function clearLogin () {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// A very rough encrypting/decrypting function to do trivial validation of our token's secret
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

// Handle people tampering with the local storage
function handleTampering () {
  console.warn('Warning! Local storage was tampered with')
  clearLogin()
}

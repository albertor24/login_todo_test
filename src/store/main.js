import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  },
  setUser (state, user) {
    state.user = user
  },
  setTodos (state, todos) {
    console.log('Used')
    state.todos = todos
  }
}

const state = {
  auth: false,
  user: {},
  todos: []
}

export default new Vuex.Store({
  state,
  mutations
})

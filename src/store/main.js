import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const mutations = {
  setAuth (state, auth) {
    state.auth = auth
  },
  setUser (state, user) {
    state.user = user
  }
}

const state = {
  auth: false,
  user: {}
}

export default new Vuex.Store({
  state,
  mutations
})
